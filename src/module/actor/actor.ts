import { MouseGuardConfig } from "../helpers/config.js";

export class MgActor extends Actor {
    abilities = new MgActorAbilities();
    background = new MgActorBackground();
    characteristics = new MgActorCharacteristics();
    skills: MgActorSkills = new MgActorSkills();
}

// TODO: Max 24 skills
export class MgActorSkills {
    fighter = new MgActorSkill(MouseGuardConfig.skills.fighter);
    healer = new MgActorSkill(MouseGuardConfig.skills.healer);
    hunter = new MgActorSkill(MouseGuardConfig.skills.hunter);
    instructor = new MgActorSkill(MouseGuardConfig.skills.instructor);
    pathfinder = new MgActorSkill(MouseGuardConfig.skills.pathfinder);
    scout = new MgActorSkill(MouseGuardConfig.skills.scout);
    survivalist = new MgActorSkill(MouseGuardConfig.skills.survivalist);
    weatherWatcher = new MgActorSkill(MouseGuardConfig.skills.weatherWatcher);
    manipulator = new MgActorSkill(MouseGuardConfig.skills.manipulator);
    orator = new MgActorSkill(MouseGuardConfig.skills.orator);
    persuader = new MgActorSkill(MouseGuardConfig.skills.persuader);

    get allProperties(): IMgActorAdvanceableProp[] {
        return [
            this.fighter,
            this.healer,
            this.hunter,
            this.instructor,
            this.pathfinder,
            this.scout,
            this.survivalist,
            this.weatherWatcher,
            this.manipulator,
            this.orator,
            this.persuader,
        ]
    }
}

export class MgActorAbilities {
    nature = new MgActorAbility(MouseGuardConfig.abilities.nature, 0, 7);
    will = new MgActorAbility(MouseGuardConfig.abilities.will, 1, 6);
    health = new MgActorAbility(MouseGuardConfig.abilities.health, 1, 6);
    resources = new MgActorAbility(MouseGuardConfig.abilities.resources, 1, 10);
    circles = new MgActorAbility(MouseGuardConfig.abilities.circles, 1, 10);


    get allProperties(): IMgActorAdvanceableProp[] {
        return [this.nature, this.will, this.health, this.resources, this.circles];
    }
}

export class MgActorCharacteristics {
    belief = new MgActorStrProp(MouseGuardConfig.characteristics.belief);
    goal = new MgActorStrProp(MouseGuardConfig.characteristics.goal);
    instinct = new MgActorStrProp(MouseGuardConfig.characteristics.instinct);

    get allProperties(): IMgActorProp[] {
        return [this.belief, this.goal, this.instinct]
    }
}

export class MgActorBackground {
    age: MgActorBackgroundAgeProp = new MgActorBackgroundAgeProp(MouseGuardConfig.background.age);
    home: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.home);
    furColor: IMgActorProp = new MgActorStrProp(MouseGuardConfig.background.furColor);
    guardRank: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.guardRank);
    cloakColor: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.cloakColor);
    parents: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.parents);
    artisan: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.artisan);
    mentor: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.mentor);
    friend: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.friend);
    enemy: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.enemy);

    get allProperties(): IMgActorProp[] {
        return [
            this.age,
            this.home,
            this.furColor,
            this.guardRank,
            this.cloakColor,
            this.parents,
            this.artisan,
            this.mentor,
            this.friend,
            this.enemy];
    }
}

export interface IMgActorProp {
    readonly configName: string;
    label: string;
    value: string | number;
}

export interface IMgActorAdvanceableProp extends IMgActorProp {
    passes: number;
    get passesNeeded(): number;

    failures: number;
    get failuresNeeded(): number;

    get canAdvance(): boolean;
    advance(): void;
}

export class MgActorAbility implements IMgActorAdvanceableProp {
    label: string;
    configName: string;
    _value: number;
    min_value: number;
    max_value: number;
    _passes: number = 0;
    _failures: number = 0;

    constructor(configName: string, min_value: number, max_value: number) {
        this.configName = configName;
        this.min_value = min_value;
        this.max_value = max_value;
        this.value = min_value;
    }

    get value(): number {
        return this._value;
    }

    set value(new_value: number) {
        if (new_value < this.min_value || new_value > this.max_value) {
            throw new RangeError(`Value must be between ${this.min_value} and ${this.max_value}`);
        }
        this._value = new_value;
    }

    get passes(): number {
        return this._passes;
    }

    set passes(value: number) {
        if (value < 0 || value > this.passesNeeded) {
            throw new RangeError(`Number of passes must be between 0 and ${this.passesNeeded}`);
        }
        this._passes = value;
    }

    get failures(): number {
        return this._failures;
    }

    set failures(value: number) {
        if (value < 0 || value > this.failuresNeeded) {
            throw new RangeError(`Number of failures must be between 0 and ${this.failuresNeeded}`);
        }
        this._passes = value;
    }

    get passesNeeded(): number {
        return this.value;
    }

    get failuresNeeded(): number {
        return this.value - 1;
    }

    get canAdvance(): boolean {
        if (this.value == this.max_value) {
            return false;
        }
        return (this.passes == this.passesNeeded) && (this.failures == this.failuresNeeded);
    }

    advance(force: boolean = false) {
        if (!this.canAdvance && !force) {
            throw new Error("Stat does not meet criteria for advancement.") // TODO: proper exception class
        }
        else if (this.value == this.max_value) {
            throw new Error("Stat is already at max value")
        }
        this.value += 1;
        this.passes = 0;
        this.failures = 0;
    }
}

export class MgActorSkill extends MgActorAbility {
    constructor(configName: string) {
        super(configName, 1, 6);
    }
}

export class MgActorStrProp implements IMgActorProp {
    label: string;
    value: string;
    readonly configName: string

    constructor(configName: string) {
        this.configName = configName;
    }
}

export class MgActorBackgroundAgeProp implements IMgActorProp {
    readonly min = 0;
    readonly max = 50;
    label: string;
    readonly configName: string;
    value: number;

    constructor(configName: string, age: number = 18) {
        this.configName = configName;
        this.value = age;
    }
}
