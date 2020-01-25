import User from './models/User';

const user = new User({});

user.set({name: 'Talgat'});
user.set({age: 2});

console.log(user.get('name'), user.get('age'));