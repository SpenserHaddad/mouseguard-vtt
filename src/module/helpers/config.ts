export interface StringMap {
    [name: string]: string
}

export class MouseGuardConfig {
    static readonly background: StringMap = {
        name: "MOUSEGUARD.NameStr",
        age: "MOUSEGUARD.AgeStr",
        home: "MOUSEGUARD.HomeStr",
        furColor: "MOUSEGUARD.FurColorStr",
        guardRank: "MOUSEGUARD.GuardRankStr",
        cloakColor: "MOUSEGUARD.CloakColorStr",
        parents: "MOUSEGUARD.ParentsStr",
        artisan: "MOUSEGUARD.ArtisanStr",
        mentor: "MOUSEGUARD.MentorStr",
        friend: "MOUSEGUARD.FriendStr",
        enemy: "MOUSEGUARD.EnemyStr",
    };

    static readonly rewards: StringMap = {
        fatePoints: "MOUSEGUARD.FatePointsStr",
        personaPoints: "MOUSEGUARD.PersonaPointsStr",
    };

    static readonly characteristics: StringMap = {
        belief: "MOUSEGUARD.BeliefStr",
        goal: "MOUSEGUARD.GoalStr",
        instinct: "MOUSEGUARD.InstinctStr",
    };

    static readonly abilities: StringMap = {
        nature: "MOUSEGUARD.AbilityMouseNature",
        will: "MOUSEGUARD.AbilityWill",
        health: "MOUSEGUARD.AbilityHealth",
        resources: "MOUSEGUARD.AbilityResources",
        circles: "MOUSEGUARD.AbilityCircles",
    }

    static readonly wises: StringMap = {
        wises: "MOUSEGUARD.WisesStr",
    }

    static readonly skills: StringMap = {
        fighter: "MOUSEGUARD.SkillFighter",
        healer: "MOUSEGUARD.SkillHealer",
        hunter: "MOUSEGUARD.SkillHunter",
        instructor: "MOUSEGUARD.SkillInstructor",
        pathfinder: "MOUSEGUARD.SkillPathfinder",
        scout: "MOUSEGUARD.SkillScout",
        survivalist: "MOUSEGUARD.SkillSurvivalist",
        weatherWatcher: "MOUSEGUARD.SkillWeatherWatcher",
        manipulator: "MOUSEGUARD.SkillManipulator",
        orator: "MOUSEGUARD.SkillOrator",
        persuader: "MOUSEGUARD.SkillPersuader",
    }

    static readonly traits: StringMap = {
        name: "MOUSEGUARD.TraitNameStr",
        level: "MOUSEGUARD.TraitLevelStr",
        usedForSelf: "MOUSEGUARD.TraitUsedForSelfStr",
        usedAgainstSelf: "MOUSEGUARD.TraitUsedAgainstSelfStr"
    }
}

export const MOUSEGUARD = new MouseGuardConfig();