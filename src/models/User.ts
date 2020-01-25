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
    }
}