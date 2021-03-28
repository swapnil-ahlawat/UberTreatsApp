const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Piyush Maheshwari',
        email: 'piyush',
        password: 'treats',
        type: 'customer'        // restaurant, warehouse, delivery
    },
    {
        id: 'u2',
        name: 'Wandan Tibrewal',
        email: 'wandan',
        password: 'treats',
        type: 'restaurant'
    },
    {
        id: 'u3',
        name: 'Swapnil Ahlawat',
        email: 'swapnil',
        password: 'treats',
        type: 'customer'
    }
]

const login = (req, res, next) => {
    const { email, password, type } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email && u.type === type);
    if(!identifiedUser || identifiedUser.password !== password){
        const error = Error('Invalid credentials.');
        error.code = 401;
        throw error;
    }
    res.json({
        message: 'Logged in successfully!',
        name: identifiedUser.name
    });
}

exports.login = login;