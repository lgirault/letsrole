
export type Callback<T> = (t: T) => void;

export interface Ided {
    id: string;
}

export interface Table<T extends Ided> {
    get(id: string): T,
    each(callback: Function): void,
    random(callback: Function): void,
    random(count: number, callback: Function): void,
}

export interface Tables {
    get<T extends Ided>(id: string): Table<T>
}

export type Event = "click" | "update" | "mouseenter" | "mouseleave" | "keyup";
export type Value = number | string | object | null;

export interface Component {
    parent(): Component | null,
    find(id: string): Component | null,
    on(event: Event, callback: Function): void,
    on(event: Event, delegate: string, callback: Function): void,

    off(event: Event): void,
    off(event: Event, delegate: string): void,

    hide(): void,
    show(): void,
    addClass(clazz: string): void,
    removeClass(clazz: string): void,
    value(): Value,
    value(newValue: Value): Value,
    rawValue(): Value,
    virtualValue(): Value,
    virtualValue(newValue: Value): Value,
    text(): string | null,
    text(replacement: any): string | null,
    visible(): boolean,
    sheet(): Sheet, // readonly
    setChoices(choices: object): void,
    name(): string,
    id(): string

}

export interface Sheet {
    get(id: string): Component | null,
    getVariable(id: string): number | null,
    setData(data: object): void,
    prompt(title: string, view: string, callback: Function): void,
    id(): string,
    name(): string
}

//Utilities
export type log = (...args: any[]) => void

export interface Index<T> {
    [id: string]: T;
}


export type Eachable<T> = T[] | Index<T>;

export interface Each {
    <T>(data: Eachable<T>, callback: Callback<T>): void
}
