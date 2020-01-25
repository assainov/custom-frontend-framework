interface UserProps {
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

    private observers: Callback[] = [];

    subscribe(callback: Callback): void {
        this.observers.push(callback);
    }

    unsubscribe(callback: Callback): void {
        this.observers = this.observers.filter((subscriber: Callback) => subscriber !== callback);
    }

    private notify(propName: string, newPropValue: any): void {
        this.observers.forEach((subscriber: Callback) => subscriber(propName, newPropValue));
    }
}