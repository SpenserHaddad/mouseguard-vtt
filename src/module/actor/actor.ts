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
    age: MgActorBackgroundAgeProp;
    home: MgActorBackgroundProp;
    furColor: MgActorBackgroundProp;
    guardRank: MgActorBackgroundProp;
    cloakColor: MgActorBackgroundProp;
    parents: MgActorBackgroundProp;
    artisan: MgActorBackgroundProp;
    mentor: MgActorBackgroundProp;
    friend: MgActorBackgroundProp;
    enemy: MgActorBackgroundProp;
}

export class MgActorBackgroundProp<T = string> {
    label: string;
    value: T;
}

export class MgActorBackgroundAgeProp extends MgActorBackgroundProp<number> {
    readonly min = 0;
    readonly max = 50;

    constructor(age: number = 18) {
        super();
        this.value = age;
    }
}