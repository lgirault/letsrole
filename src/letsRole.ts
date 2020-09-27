
export interface Table {
    get(id: string): Table,
    each(callback: Function): void,
    random(callback: Function): void,
    random(count: number, callback: Function): void,
}

export interface Tables {
    get: (id: string) => Table
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
    value(newValue: Value) : Value,
    rawValue(): Value,
    virtualValue(): Value,
    virtualValue(newValue: Value) : Value,
    text(): string | null,
    text(replacement: string): string | null,
    visible(): boolean,
    sheet() : Sheet, // readonly
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

export type log = (...args: string[]) => void