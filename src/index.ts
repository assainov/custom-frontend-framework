import User from './models/User';

const user = new User({});

user.set({name: 'Ilyas', age: 26});

user.persist();

setTimeout(() => {
    console.log(user);
}, 3000)