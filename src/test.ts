
import * as lr from "./letsRole";

const Tables: lr.Tables = undefined;
const log: lr.log = undefined;
const each: lr.Each = undefined;
const _: lr.Translate = undefined;
const Dice: lr.Dice = undefined;

let init: (sheet: lr.Sheet) => void = undefined;
// in the generated file remove everything above this line

function find<T>(data: lr.Eachable<T>, pred: (t: T) => boolean): T | null {
    let result = null;
    each<T>(data, function (t: T) {
        if (pred(t)) {
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

interface CharacterSheet {
    strength: lr.Component,
    melee: lr.Component,
    character_class: lr.Component,
    displayed_character_class: lr.Component
    sav_death: lr.Component,
    sav_wands: lr.Component,
    sav_paralysis: lr.Component,
    sav_breath: lr.Component,
    sav_spells: lr.Component,
    wis_mod: lr.Component,
}

const classe_names: lr.Index<string> = {
    "cleric": _("Cleric"),
    "fighter": _("Fighter"),
    "magic-user": _("Magic-User"),
    "thief": _("Thief")
};

interface ClassProgression {
    level: number,
    xp: number,
    hd: string,
    thac0: number,
    aac: number,
    sav_d: number,
    sav_w: number,
    sav_p: number,
    sav_b: number,
    sav_s: number,
}

const cleric_class: ClassProgression[] =
    [
        { level: 0, xp: 0, hd: "1d6", thac0: 19, aac: 0, sav_d: 11, sav_w: 12, sav_p: 14, sav_b: 16, sav_s: 15 }, // dummy value to align level with indices
        { level: 1, xp: 0, hd: "1d6", thac0: 19, aac: 0, sav_d: 11, sav_w: 12, sav_p: 14, sav_b: 16, sav_s: 15 },
        { level: 2, xp: 1500, hd: "1d6", thac0: 19, aac: 0, sav_d: 11, sav_w: 12, sav_p: 14, sav_b: 16, sav_s: 15 },
        { level: 3, xp: 3000, hd: "1d6", thac0: 19, aac: 0, sav_d: 11, sav_w: 12, sav_p: 14, sav_b: 16, sav_s: 15 },

    ]


const fighter_class: ClassProgression[] =
    [
        { level: 0, xp: 0, hd: "1d8", thac0: 19, aac: 0, sav_d: 12, sav_w: 13, sav_p: 14, sav_b: 15, sav_s: 16 }, // dummy value to align level with indices
        { level: 1, xp: 0, hd: "1d8", thac0: 19, aac: 0, sav_d: 12, sav_w: 13, sav_p: 14, sav_b: 15, sav_s: 16 },
        { level: 2, xp: 2000, hd: "1d8", thac0: 19, aac: 0, sav_d: 12, sav_w: 13, sav_p: 14, sav_b: 15, sav_s: 16 },
        { level: 3, xp: 4000, hd: "1d8", thac0: 19, aac: 0, sav_d: 12, sav_w: 13, sav_p: 14, sav_b: 15, sav_s: 16 },
    ]

const magic_user_class: ClassProgression[] =
    [
        { level: 0, xp: 0, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 }, // dummy value to align level with indices
        { level: 1, xp: 0, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },
        { level: 2, xp: 2500, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },
        { level: 3, xp: 5000, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },

    ]

const thief_class: ClassProgression[] =
    [
        { level: 0, xp: 0, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 }, // dummy value to align level with indices
        { level: 1, xp: 0, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },
        { level: 2, xp: 1200, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },
        { level: 3, xp: 2400, hd: "1d4", thac0: 19, aac: 0, sav_d: 13, sav_w: 14, sav_p: 13, sav_b: 16, sav_s: 15 },

    ]



function extract(sheet: lr.Sheet): CharacterSheet {
    return {
        strength: sheet.get("strength"),
        melee: sheet.get("melee"),
        character_class: sheet.get("character_class"),
        displayed_character_class: sheet.get("displayed_character_class"),
        sav_death: sheet.get("sav_death"),
        sav_wands: sheet.get("sav_wands"),
        sav_paralysis: sheet.get("sav_paralysis"),
        sav_breath: sheet.get("sav_breath"),
        sav_spells: sheet.get("sav_spells"),
        wis_mod: sheet.get("wis_mod"),
    };
}

const strength_modifiers: StrengthModifier[] =
    [
        { min_str: 3, max_str: 3, melee: -3, open_doors: 1 },
        { min_str: 4, max_str: 5, melee: -2, open_doors: 1 },
        { min_str: 6, max_str: 8, melee: -1, open_doors: 1 },
        { min_str: 9, max_str: 12, melee: 0, open_doors: 2 },
        { min_str: 13, max_str: 15, melee: 1, open_doors: 3 },
        { min_str: 16, max_str: 17, melee: 2, open_doors: 4 },
        { min_str: 18, max_str: 18, melee: 3, open_doors: 5 },
    ];

function compute_model(sheet: CharacterSheet): Attributes {
    return {
        strength: sheet.strength.value() as number
    };
}

function compute_values(attr: Attributes): ComputedValues {
    let str_mod = find(strength_modifiers, function (m) {
        return m.min_str <= attr.strength && attr.strength <= m.max_str;
    });

    return {
        melee: str_mod.melee
    };
}

function write_computed_values(sheet: CharacterSheet, cv: ComputedValues) {
    sheet.melee.text(cv.melee);
}

interface ClassChoiceResult {
    character_class_choice: string
}


function init_main(sheet: lr.Sheet) {

    const mySheet = extract(sheet);
    log("mySheet.character_class = " + mySheet.character_class.value());

    if (mySheet.character_class.value() == "") {
        sheet.prompt("Choix de la classe", sheet_ids.class_choice, function (result: ClassChoiceResult) {
            mySheet.character_class.value(result.character_class_choice);
            mySheet.displayed_character_class.value(classe_names[result.character_class_choice]);
        })
    }

    const update = function () {
        write_computed_values(mySheet, compute_values(compute_model(mySheet)));
    };

    mySheet.strength.on("update", update);

    update();
}

const sheet_ids = {
    main: "main",
    class_choice: "class_choice"
}


function init_class_choice(sheet: lr.Sheet) {
    sheet.get("character_class_choice").setChoices(classe_names);
}

init = function (sheet: lr.Sheet) {

    log("init - " + sheet.id());

    if (sheet.id() == sheet_ids.main) {
        init_main(sheet);
    }
    else if (sheet.id() == sheet_ids.class_choice) {
        init_class_choice(sheet);
    }
    else {
        log("init " + sheet.id() + " unhandled")
    }

}


