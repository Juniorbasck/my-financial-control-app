import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expenses from './expenses.json';
import { 
    AuthCredential, 
    EmailAuthProvider, 
    getAuth, 
    GoogleAuthProvider, 
    reauthenticateWithCredential,
    signInWithPopup,
    updatePassword,
    
} from 'firebase/auth';
import { 
    doc,
    collection,
    getDoc, 
    setDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
    increment,
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    uploadString,
    deleteObject,
    getDownloadURL
} from 'firebase/storage';
import { 
    firestore,
    storage
} from './firebase.config';

const sort = exps => {
    let sorted = exps.sort((exp1, exp2) => new Date(exp1.date).getTime() - new Date(exp2.date).getTime());
    let paid = [], notPaid = [];
    for (let exp of sorted) {
        if (exp.paid) {
            paid.push(exp);
        } else {
            notPaid.push(exp);
        }
    }
    return notPaid.concat(paid);
};

const sortState = exps => {
    let sorted = exps.value.sort((exp1, exp2) => new Date(exp1.date).getTime() - new Date(exp2.date).getTime());
    let paid = [], notPaid = [];
    for (let exp of sorted) {
        if (exp.paid) {
            paid.push(exp);
        } else {
            notPaid.push(exp);
        }
    }
    return notPaid.concat(paid);
};

const emailNotTaken = async email => {
    const collecRef = collection(firestore, 'users');
    const theDocs = await getDocs(collecRef);
    let answer = true;
    theDocs.forEach(doc => {
        if (doc.id === email)
            answer = false;
    });
    return answer;
};

const usernameNotTaken = async username => {
    const collecRef = collection(firestore, 'users');
    const theDocs = await getDocs(collecRef);
    let docData;
    let answer = true;
    theDocs.forEach(doc => {
        docData = doc.data();
        if (docData.username === username)
            answer = false;
    });
    return answer;
};

const createNewUserAsync = async (name, surname, username, email) => {
    const docRef = doc(firestore, 'users', email);
    // Create user data document.
    await setDoc(docRef, {
        name: name,
        surname: surname,
        username: username,
        email: email,
        id: await nextUserIdAsync(),
        image: null
    });
    // Create user expenses document.
    const expDocRef = doc(firestore, 'expenses', email);
    await setDoc(expDocRef, {
        expenses: [],
        nextId: 1
    });
    // Create user historic.
    const histDocRef = doc(firestore, 'historics', email);
    await setDoc(histDocRef, {
        historic: []
    });
};

const saveHistoric = async data => {
    const currentUser = getAuth().currentUser;
    const histDocRef = doc(firestore, 'historics', currentUser.email);
    await updateDoc(histDocRef, {
        historic: arrayUnion(data)
    });
};

const fetchExpensesAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let temp = theDoc.data();
    temp.expenses.forEach(async e => {
        if (e.image) { // If there's an image.
            try {
                await fetch(e.image.uri); // Try to fetch it from the local storage of the phone.
            } catch (err) { // If not found, download from the cloud.
                await getDownloadURL(ref(storage, 'users/' + currentUser.email + `/images/expenses/expense${e.id}/expense.jpeg`));
            }
        }
    });
    return sort(temp.expenses);
};

const fetchExpensesMock = () => {
    return sort(expenses);
}

const fetchUserDataAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'users', currentUser.email);
    const theDoc = await getDoc(docRef);
    let data = theDoc.data();
    if (data.image) {
        try {
            await fetch(data.image.uri); // Check if the image is present locally.
        } catch (err) { // If not, download it from the cloud.
            await getDownloadURL(ref(storage, 'users/' + currentUser.email + '/images/profile/profile.jpeg'));
        }
    }
    return data;
};

const fetchUserDataMock = () => {
    return {
        name: 'Marinna',
        surname: 'Silva',
        username: 'mari123',
        email: 'mari123@gmail.com'
    };
};

const updateExpenseAsync = async (oldExpense, updatedExpense) => {
    updatedExpense.price = parseFloat(updatedExpense.price);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (
            e.id !== updatedExpense.id &&
            e.title === updatedExpense.title && 
            e.entity === updatedExpense.entity && 
            e.price === updatedExpense.price &&
            e.date === updatedExpense.date &&
            e.paymentMethod === updatedExpense.paymentMethod
        ) {
            throw new Error('Já existe uma despesa com esses mesmos dados. Tente novamente mudando os valores dos campos');
        }
    });
    // Remove former expense from database.
    await updateDoc(docRef, {
        expenses: arrayRemove(oldExpense)
    });
    // Add the new one.
    await updateDoc(docRef, {
        expenses: arrayUnion(updatedExpense)
     });
    const imagePath = 'users/' + currentUser.email + `/images/expenses/expense${updatedExpense.id}/expense.jpeg`;
    const imageRef = ref(storage, imagePath);
    if (oldExpense.image) { // Delete from the cloud.
        try {
            await deleteObject(imageRef);
        } catch(err) {
            console.log('Error when trying to delete the profile image ------');
            console.log(err.message);
        }
    }
    if (updatedExpense.image) { // Upload to the cloud.
        const imageResponse = await fetch(updatedExpense.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(imageRef, imageBlob);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: updatedExpense.date,
        expenseTitle: updatedExpense.title,
        entity: updatedExpense.entity,
        paymentMethod: updatedExpense.paymentMethod,
        price: updatedExpense.price,
        paid: updatedExpense.paid,
        operation: 2
    };
    await saveHistoric(historic);
}

const createExpenseAsync = async (title, entity, date, price, paymentMethod, image, paid) => {
    let newExpense = {
        id: await currentUserExpenseNextIdAsync(),
        title: title,
        entity: entity,
        date: date,
        price: parseFloat(price),
        paymentMethod: paymentMethod,
        image: image,
        paid: paid
    };
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if the new expense is not repeated.
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (
            e.id !== newExpense.id, // The id is used to differentiate one expense from the others.
            e.title === title && 
            e.entity === entity && 
            e.price === price &&
            e.date === date &&
            e.paymentMethod === paymentMethod
        ) {
            throw new Error('Já existe uma despesa com esses mesmos dados. Tente novamente mudando os valores dos campos');
        }
    });
    await updateDoc(docRef, {
        expenses: arrayUnion(newExpense)
    });
    if (newExpense.image) { // If there's an image, save it to firebase storage.
        const imagePath = 'users/' + currentUser.email + `/images/expenses/expense${newExpense.id}/expense.jpeg`;
        const imageRef = ref(storage, imagePath);
        const imageResponse = await fetch(newExpense.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(imageRef, imageBlob);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: newExpense.date,
        expenseTitle: newExpense.title,
        entity: newExpense.entity,
        paymentMethod: newExpense.paymentMethod,
        price: newExpense.price,
        paid: newExpense.paid,
        operation: 1
    };
    await saveHistoric(historic);
}

const currentUserExpenseNextIdAsync = async _ => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let nextId = theDoc.get('nextId');
    await updateDoc(docRef, {
        nextId: increment(1)
    });
    return nextId;
};

const nextUserIdAsync = async _ => {
    const docRef = doc(firestore, 'config', 'nextUserId');
    const theDoc = await getDoc(docRef);
    let nextUserId = theDoc.get('nextUserId');
    await updateDoc(docRef, {
        nextUserId: increment(1)
    });
    return nextUserId;
};

const deleteExpenseAsync = async expense => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    await updateDoc(docRef, {
        expenses: arrayRemove(expense)
    });
    // Try to remove the image of the expense.
    const imageRef = ref(storage, 'users/' + currentUser.email + `/images/expenses/expense${expense.id}/expense.jpeg`);
    try {
        await deleteObject(imageRef);
    } catch (err) {
        console.log('Error when trying to delete objet at ' + imageRef.fullPath);
        console.log(err.message);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: expense.date,
        expenseTitle: expense.title,
        entity: expense.entity,
        paymentMethod: expense.paymentMethod,
        price: expense.price,
        paid: expense.paid,
        operation: 3
    };
    await saveHistoric(historic);
};

const signInGoogle = () => {
    Alert.alert('Login com Google');
}

const getPaymentMethods = async onGet => {
    const docRef = doc(firestore, 'config', 'paymentMethods');
    const theDoc = await getDoc(docRef);
    onGet(theDoc.get('paymentMethods'));
};

const updateUserAsync = async newUserData => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if username is not already taken.
    const users = collection(firestore, 'users');
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach(doc => {
        if (doc.id != currentUser.email) {
            if (doc.get('username') === newUserData.username) {
                throw new Error(`O nome de utilizador '${newUserData.username}' já está sendo usado`);
            }
        }
    });
    const profileImagePath = 'users/' + currentUser.email + '/images/profile/profile.jpeg';
    const profileRef = ref(storage, profileImagePath);
    if (newUserData.image) { // If there's an image, save it to firebase storage.
        const imageResponse = await fetch(newUserData.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(profileRef, imageBlob);
        getDownloadURL(profileRef)
        .then(url => {
            newUserData.image = {uri: url}
        });
    } else { // Else, try to delete the one that's in the firebase storage if any.
        try {
            await deleteObject(profileRef);
        } catch(err) {
            console.log('Error when trying to delete the profile image ------');
            console.log(err.message);
        }
    }
    const docRef = doc(firestore, 'users', currentUser.email);
    await updateDoc(docRef, newUserData);
};

const reauthenticate = async password => {
    let auth = getAuth();
    let currentUser = auth.currentUser;
    let credential = EmailAuthProvider.credential(currentUser.email, password);
    try {
        await reauthenticateWithCredential(currentUser, credential);
        return true;
    } catch(err) {
        return false;
    }
};

const updatePasswd = async newPassword => {
    let auth = getAuth();
    const currentUser = auth.currentUser;
    try {
        await updatePassword(currentUser, newPassword);
    } catch (err) {
        console.log('Error when trying to update password -----');
        console.log(err.message);
    }
};

const fetchHistoricAsync = async () => {
    const histDocRef = doc(firestore, 'historics', getAuth().currentUser.email);
    const theDoc = await getDoc(histDocRef);
    return theDoc.get('historic');
};

const emailExistsOnApp = async email => {
    const collRef = collection(firestore, 'users');
    const theDocs = await getDocs(collRef);
    let res = false;
    theDocs.forEach(theDoc => {
        if (theDoc.id === email)
            res = true;
    });
    return res;
};

const fetchHistoricMock = () => {
    return [
        {
            timestamp: '2022-10-20T16:30:00',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 5,
            price: 500,
            paid: false,
            operation: 1
        },
        {
            timestamp: '2023-01-03T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 3,
            price: 340,
            paid: true,
            operation: 3
        },
        {
            timestamp: '2023-01-04T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 4,
            price: 340,
            paid: true,
            operation: 2
        },
        {
            timestamp: '2023-01-05T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 2,
            price: 340,
            paid: true,
            operation: 2
        },
        {
            timestamp: '2023-01-06T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 3,
            price: 340,
            paid: true,
            operation: 3
        },
    ];
};

const stringifyOperation = operation => {
    switch (operation) {
        default:
        case 1: return 'Criação';
        case 2: return 'Alteração';
        case 3: return 'Deleção';
    }
};

const stringifyPaymentMethod = paymentMethod => {
    switch (paymentMethod) {
        default:
        case 1: return 'Cartão de crédito';
        case 2: return 'Débito direto';
        case 3: return 'Transferência';
        case 4: return 'MBWay';
        case 5: return 'Cheque';
        case 6: return 'Monetário';
    }
};

const storeDataAsync = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
};

const getDataAsync = async (key, onGetData) => {
    try {
        AsyncStorage.getItem(key).then(value => onGetData(JSON.parse(value)));
    } catch (e) {} 
};

export { 
    sort,
    sortState,
    emailNotTaken,
    usernameNotTaken,
    fetchExpensesAsync,
    fetchExpensesMock,
    updateExpenseAsync,
    createExpenseAsync,
    deleteExpenseAsync,
    updateUserAsync,
    getPaymentMethods,
    fetchUserDataAsync,
    fetchUserDataMock,
    fetchHistoricAsync,
    fetchHistoricMock,
    signInGoogle,
    stringifyOperation,
    stringifyPaymentMethod,
    storeDataAsync,
    getDataAsync,
    createNewUserAsync,
    reauthenticate,
    updatePasswd,
    emailExistsOnApp
};
