
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

export interface Index<T> {
    [id: string]: T;
}

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
    setChoices(choices: Index<string>): void,
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
export type log = (msg: any) => void;

export type Eachable<T> = T[] | Index<T>;

export interface Each {
    <T>(data: Eachable<T>, callback: Callback<T>): void
}

export type Translate = (msg: string) => string;

export type CompareOp = ">" | "<" | "<=" | ">=" | "=" | "!="
export interface DiceBuilder {
    add(value: string) : DiceBuilder,
    minus(value: string) : DiceBuilder,
    multiply(value: string) : DiceBuilder,
    divide(value: string) : DiceBuilder,
    tag(... args: string[]) : DiceBuilder,
    compare(op: CompareOp, right: string, weight: string): DiceBuilder,
    round(): DiceBuilder,
    ceil(): DiceBuilder,
    flour(): DiceBuilder,
    keeph(max: number): DiceBuilder,
    keepl(max: number): DiceBuilder,
    remh(max: number): DiceBuilder,
    reml(max: number): DiceBuilder,
    expl(expr: string, ... exploding: number[]): DiceBuilder,
    expladd(expr: string, ... exploding: number[]): DiceBuilder,
    mul(multiplier: number): DiceBuilder,
    reroll(expr: string, ... exploding: number[]): DiceBuilder,
    rerolln(expr: string, ... exploding: number[]): DiceBuilder,
    ternary(then_ : string, else_: string): DiceBuilder
}

export interface SingleDiceResult {
    dimension: number,
    value: number,
    discarded: boolean
}


export enum RollType { "dice", "number", "comparison" }


export interface BaseDiceResult {
    title: string,
    expression: string,
    visibility: Visibility,
    type: RollType,
    total: number,
    tags: string[],
    all: SingleDiceResult[],
    children: DiceResult[],
    containsTag(tag: string): boolean
}

export interface DiceDiceResult extends BaseDiceResult {
    type: RollType.dice,
    size: number,
    dimension: number,
    values: number[],
    discarded: number[]
}
export interface NumberDiceResult extends BaseDiceResult {
    type: RollType.number,
}
export interface ComparisonDiceResult extends BaseDiceResult {
    type: RollType.comparison,
    left: DiceResult,
    right: DiceResult,
    success: number,
    failure: number
}

type DiceResult = DiceDiceResult | NumberDiceResult | ComparisonDiceResult


export type Actions = Index<Callback<DiceResult>>;
export type Visibility = "all" | "gm" | "gmonly";
export interface Dice {
    create(expression: string) : DiceBuilder,
    roll(sheet: Sheet, expression: string| DiceBuilder, title?: string, visibility?: Visibility, actions?: Actions): void

}