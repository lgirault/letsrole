
import * as lr from "./letsRole";

const Tables : lr.Tables = undefined;
const log : lr.log = undefined;
const each: lr.Each = undefined;
let init : (sheet: lr.Sheet) => void = undefined;
// in the generated file remove everything above this line

function find<T>(data : lr.Eachable<T>, pred: (t: T) => boolean ): T | null {
    let result = null;
    each<T>(data, function(t : T) {
        if(pred(t)){
            result = t;
        }
    })
    return result;

}

// the following is specific to my system


interface Attributes {
    strength: number
}
interface ComputedValues {
    melee: number
}

interface StrengthModifier {
    min_str: number,
    max_str: number,
    melee: number,
    open_doors: number
}

interface MySheet {
    strength : lr.Component,
    melee: lr.Component
}

function extract(sheet: lr.Sheet) : MySheet {
    return {
        strength: sheet.get("strength"),
        melee: sheet.get("test1c")
    };
}

const strength_modifiers: StrengthModifier[] = 
    [
        {min_str: 3, max_str : 3, melee: -3, open_doors: 1},
        {min_str: 4, max_str : 5, melee: -2, open_doors: 1},
        {min_str: 6, max_str : 8, melee: -1, open_doors: 1},
        {min_str: 9, max_str : 12, melee: 0, open_doors: 2},
        {min_str: 13, max_str : 15, melee: 1, open_doors: 3},
        {min_str: 16, max_str : 17, melee: 2, open_doors: 4},
        {min_str: 18, max_str : 18, melee: 3, open_doors: 5},
    ];

function compute_model(sheet: MySheet): Attributes {
    return {
        strength: sheet.strength.value() as number
    };
}

function compute_values(attr : Attributes) : ComputedValues {
    let str_mod = find(strength_modifiers, function(m){
        return m.min_str <= attr.strength && attr.strength <= m.max_str;
    });

    return {
        melee: str_mod.melee
    };
}

function write_computed_values(sheet: MySheet, cv: ComputedValues ) {
    sheet.melee.text(cv.melee);
}


init = function(sheet: lr.Sheet) {
    log(sheet.id());

    const mySheet = extract(sheet);

    const update = function(){
        write_computed_values(mySheet, compute_values(compute_model(mySheet)));
    };

    mySheet.strength.on("update", update);
    
    update();
}


