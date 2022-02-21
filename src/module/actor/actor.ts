import { MouseGuardConfig } from "../helpers/config.js";

export class MgActor extends Actor {
    background: MgActorBackground;
    abilities: MgActorAbilities;
    skills: MgActorSkills;
}

export class MgActorSkills {

}

export class MgActorAbilities {

}

export class MgActorBackground {
    age: MgActorBackgroundAgeProp = new MgActorBackgroundAgeProp(MouseGuardConfig.background.age);
    home: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.home);
    furColor: MgActorProp = new MgActorStrProp(MouseGuardConfig.background.furColor);
    guardRank: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.guardRank);
    cloakColor: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.cloakColor);
    parents: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.parents);
    artisan: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.artisan);
    mentor: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.mentor);
    friend: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.friend);
    enemy: MgActorStrProp = new MgActorStrProp(MouseGuardConfig.background.enemy);

    get allProperties(): MgActorProp[] {
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

export interface MgActorProp {
    label: string;
    readonly configName: string;
}

export class MgActorStrProp<T = string> implements MgActorProp {
    label: string;
    value: T;
    readonly configName: string

    constructor(configName: string) {
        this.configName = configName;
    }
}

export class MgActorBackgroundAgeProp extends MgActorStrProp<number> {
    readonly min = 0;
    readonly max = 50;

    constructor(configName: string, age: number = 18) {
        super(configName);
        this.value = age;
    }
}