const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Piyush Maheshwari',
        email: 'piyush@test.com',
        walletBalance: 40,
        pastOrders:[
            {
                date: "1 Feb",
                restaurant: "CafeXYZ",
                orderValue: 50
            }
        ]
    },
    {
        id: 'u2',
        name: 'Wandan Tibrewal',
        email: 'wandan@test.com',
        walletBalance: 40,
        pastOrders:[
            {
                date: "1 Jan",
                restaurant: "CafeABC",
                orderValue: 20
            }
        ]
    },
    {
        id: 'u3',
        name: 'Swapnil Ahlawat',
        email: 'swapnil@test.com',
        walletBalance: 20,
        pastOrders:[
            {
                date: "1 Feb",
                restaurant: "CafeXYZ",
                orderValue: 50
            },
            {
                date: "1 Jan",
                restaurant: "CafeABC",
                orderValue: 20
            }
        ]
    }
]

const userDetails = (req, res, next) => {
    const id = req.query['id'];

    const identifiedUser = DUMMY_USERS.find(u => u.id === id);
    if(!identifiedUser){
        const error = Error('User not found.');
        error.code = 404;
        throw error;
    }
    res.json(identifiedUser);
}

exports.userDetails = userDetails;