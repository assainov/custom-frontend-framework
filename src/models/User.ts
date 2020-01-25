import axios from 'axios';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = (propName: string, newPropValue: any) => void;

export default class User {
    constructor(private props: UserProps) {}

    get(propName: string): (string | number) {
        return this.props[propName];
    }

    set(newProps: UserProps): void {
        Object.assign(this.props, newProps);
        for(const propName in newProps) {
            this.notify(propName, newProps[propName]);
        }
    }

    private subscribers: Callback[] = [];

    subscribe(callback: Callback): void {
        this.subscribers.push(callback);
    }

    unsubscribe(callback: Callback): void {
        this.subscribers = this.subscribers.filter((subscriber: Callback) => subscriber !== callback);
    }

    private notify(propName: string, newPropValue: any): void {
        this.subscribers.forEach((subscriber: Callback) => subscriber(propName, newPropValue));
    }

    async fetch(): Promise<UserProps> {
        try {
            const response = await axios.get(`http://localhost:3000/users/${this.get('id')}`);
    
            const user = <UserProps>response.data;
            this.set(user);
            
        } catch(e) {
            // error handler here
            throw e;
        }
        return;
    }

    async persist(): Promise<UserProps> {
        const id = this.get('id');

        try {
            if (id) {
                await axios.put(`http://localhost:3000/users/${id}`, this.props);
            } else {
                await axios.post('http://localhost:3000/users/', this.props);
            }
        } catch(e) {
            // error handler here
            throw e;
        }

        return;
    }
}