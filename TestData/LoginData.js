export const LoginTestdata = [

    {
        scenario: 'Valid Login',
        email: 'yuva5@gmail.com',
        password: '123456',
        expectedResult: 'success'
    },
    {
        scenario: 'Invalid Login',
        email: 'wrong@gmail.com',
        password: 'WrongPassword',
        expectedResult: 'error'
    },
    {
        scenario: 'Empty Credentials',
        email: '',
        password: '',
        expectedResult: 'validation'
    }
]
