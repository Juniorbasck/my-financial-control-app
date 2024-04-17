const alphaLower = 'abcdefghijklmnopqrstuvwxyz';
const alphaUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const digit = '0123456789';

const special = '!`\'"@#$%^&*()_+{}|\?/.><,+*/-';

function validateEmail(email) {
    // return new RegExp(
    //     '[\\w.-]+@[\\w-]+(\\.[a-z]+)+'
    // ).test(email);
    let regex = /[\w.-]+@[\w-]+(\.[a-z]+)+/;
    return regex.test(email);
}

function validatePassword(password) {
    // A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial.
    let cleanPassword = password.trim();
    if (cleanPassword.length < 6) {
        return false;
    }
    let hasOneLowerCaseLetter = false, hasOneUpperCaseLetter = false, hasOneSpecial = false;
    for (let i of cleanPassword) {
        if (alphaLower.indexOf(i) != -1) {
            hasOneLowerCaseLetter = true;
        }
        if (alphaUpper.indexOf(i) != -1) {
            hasOneUpperCaseLetter = true;
        }
        if (special.indexOf(i) != -1) {
            hasOneSpecial = true;
        }
        if (hasOneLowerCaseLetter && hasOneUpperCaseLetter && hasOneSpecial) {
            break;
        }
    }
    return hasOneLowerCaseLetter && hasOneUpperCaseLetter && hasOneSpecial;
}

function validateTextField(text) {
    return text.trim().length > 0;
}



export { validateEmail, validatePassword, validateTextField };
