export interface MouseGuardCharacterDataSource {
    type: "character";
    data: MouseGuardCharacterDataSourceData
}

interface MouseGuardCharacterDataSourceData {
    background: MouseGuardCharacterBackground;
    characteristics: MouseGuardCharacterCharacteristics;
    abilities: MouseGuardCharacterAbilities;
    wises: string[];
    skills: MouseGuardCharacterDefaultSkillset
    customSkills: MouseGuardCharacterSkill[]
    traits: MouseguardCharacterTrait[]
}

interface MouseGuardCharacterBackground {
    name: string;
    age: number;
    home: string;
    furColor: string;
    guardRank: string;
    cloakColor: string;
    parents: [string, string];
    artisan: string;
    mentor: string;
    friend: string;
    enemy: string;
}

interface MouseGuardCharacterRewards {
    fatePoints: number;
    personaPoints: number;
}

interface MouseGuardCharacterCharacteristics {
    belief: string;
    goal: string;
    instinct: string;
}

interface MouseGuardCharacterAbilities {
    nature: MouseGuardCharacterAbility;
    will: MouseGuardCharacterAbility;
    health: MouseGuardCharacterAbility;
    resources: MouseGuardCharacterAbility;
    circles: MouseGuardCharacterAbility;
}

interface MouseGuardCharacterAbility {
    value: number
    passes: MouseGuardCharacterAbilitySuccessCounts
    fails: MouseGuardCharacterAbilitySuccessCounts

}

interface MouseGuardCharacterAbilitySuccessCounts {
    value: number;
    total: number
}

interface MouseGuardCharacterDefaultSkillset {
    fighter: MouseGuardCharacterSkill;
    healer: MouseGuardCharacterSkill;
    hunter: MouseGuardCharacterSkill;
    instructor: MouseGuardCharacterSkill;
    pathfinder: MouseGuardCharacterSkill;
    scout: MouseGuardCharacterSkill;
    survivalist: MouseGuardCharacterSkill;
    weatherWatcher: MouseGuardCharacterSkill;
    manipulator: MouseGuardCharacterSkill;
    orator: MouseGuardCharacterSkill;
    persuader: MouseGuardCharacterSkill;

}

interface MouseGuardCharacterSkill {
    value: number;
    passes: MouseGuardCharacterAbilitySuccessCounts;
    fails: MouseGuardCharacterAbilitySuccessCounts;
}

interface MouseguardCharacterTrait {
    name: string;
    level: number;
    usedForSelf: boolean;
    usedAgainstSelf: number;
}

declare global {
    interface SourceConfig {
        Actor: MouseGuardCharacterDataSource;
    }
}