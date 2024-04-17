import { Dimensions } from 'react-native';

const useWindow = true;

const SOURCE = useWindow ? 'window' : 'screen';

const ResponsiveDimensions = {
    customTextInput: {
        big: {
            width: '83%',
            height: 0.05254777070063694 * Dimensions.get(SOURCE).height,
        },
        small: {
            width: 0.40104166666666663 * Dimensions.get(SOURCE).width,
            height: 0.05254777070063694 * Dimensions.get(SOURCE).height,
        }
    },
    customDatePicker: {
        big: {
            width: '83%',
        },
        small: {
            width: '50%',
        }
    },
    squareCheckbox: {
        width: 0.04861111111111111 * Dimensions.get(SOURCE).width,
        height: 0.023885350318471336 * Dimensions.get(SOURCE).height
    },
    circleCheckbox: {
        width: 0.05347222222222222 * Dimensions.get(SOURCE).width,
        height: 0.023885350318471336 * Dimensions.get(SOURCE).height
    },
    customButton: {
        height: 0.04777070063694267 * Dimensions.get(SOURCE).height
    },
    smallSquareImageContainer: {
        width: 0.24305555555555555 * Dimensions.get(SOURCE).width,
        height: 0.11942675159235669 * Dimensions.get(SOURCE).height
    },
    roundImageContainer: {
        small: {
            width: 0.25 * Dimensions.get(SOURCE).width, // 110
            height: 0.12 * Dimensions.get(SOURCE).height, // 100
            borderRadius: 60,
        },
        big: {
            width: 0.37 * Dimensions.get(SOURCE).width,  // 160
            height: 0.18 * Dimensions.get(SOURCE).height,  // 150
            borderRadius: 80
        }
    },
    screen: {
        width: Dimensions.get(SOURCE).width,
        height: Dimensions.get(SOURCE).height,
        defaultMarginTop: .06 * Dimensions.get(SOURCE).height
    },
    expenseStatus: {
        totalExpense: {
            marginTop: 0.035828025477707005 * Dimensions.get(SOURCE).height,
            marginBottom: 0.059713375796178345 * Dimensions.get(SOURCE).height
        },
        horizontalLine: {
            width: 0.8020833333333333 * Dimensions.get(SOURCE).width
        },
        verticalLine: {
            height: 0.11942675159235669 * Dimensions.get(SOURCE).height
        },
        toPayContainer: {
            marginTop: 0.035828025477707005 * Dimensions.get(SOURCE).height,
            marginRight: 0.12152777777777778 * Dimensions.get(SOURCE).width
        },
        toPayText: {
            marginRight: 0.024305555555555556 * Dimensions.get(SOURCE).width
        },
        toPayValue: {
            marginTop: 0.011942675159235668 * Dimensions.get(SOURCE).height
        },
        paidContainer: {
            marginTop: 0.035828025477707005 * Dimensions.get(SOURCE).height,
            marginLeft: 0.12152777777777778 * Dimensions.get(SOURCE).width
        },
        totalExpenseText: {
            marginBottom: 0.005971337579617834 * Dimensions.get(SOURCE).height
        },
        totalExpenseValue: {
            marginTop: 0.005971337579617834 * Dimensions.get(SOURCE).height
        },
        iconSize: {
            value: 0.023885350318471336 * Dimensions.get(SOURCE).height
        }
    },
    homeScreen: {
        upperContainer: {
            margin: 0.011942675159235668 * Dimensions.get(SOURCE).height
        },
        expenseStatus: {
            padding: 0.011942675159235668 * Dimensions.get(SOURCE).height,
            margin: 0.011942675159235668 * Dimensions.get(SOURCE).height
        }
    },
    expenseCard: {
        padding: 0.035828025477707005 * Dimensions.get(SOURCE).height,
        margin: 0.023885350318471336 * Dimensions.get(SOURCE).height,
        borderRadius: 0.011942675159235668 * Dimensions.get(SOURCE).height
    }
};

export { ResponsiveDimensions };
