import User from './models/User';

const user = new User({});

user.subscribe(printNotification);

user.set({name: 'Talgat'});
user.set({age: 2});

user.unsubscribe(printNotification);

function printNotification(propName: string, newPropValue: any): void {
    console.log('Notification:', `${propName} has changed to ${newPropValue}.`);
}