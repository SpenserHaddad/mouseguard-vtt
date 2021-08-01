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
        nature: "MOUSEGUARD.NatureStr",
        will: "MOUSEGUARD.WillStr",
        health: "MOUSEGUARD.HealthStr",
        resources: "MOUSEGUARD.ResourcesStr",
        circles: "MOUSEGUARD.CirclesStr",
    }

    static readonly wises: StringMap = {
        wises: "MOUSEGUARD.WisesStr",
    }

    static readonly skills: StringMap = {
        fighter: "MOUSEGUARD.FighterStr",
        healer: "MOUSEGUARD.HealerStr",
        hunter: "MOUSEGUARD.HunterStr",
        instructor: "MOUSEGUARD.InstructorStr",
        pathfinder: "MOUSEGUARD.PathfinderStr",
        scout: "MOUSEGUARD.ScoutStr",
        survivalist: "MOUSEGUARD.SurvivalistStr",
        weatherWatcher: "MOUSEGUARD.WeatherWatcherStr",
        manipulator: "MOUSEGUARD.ManipulatorStr",
        orator: "MOUSEGUARD.OratorStr",
        persuader: "MOUSEGUARD.PersuaderStr",
    }

    static readonly traits: StringMap = {
        name: "MOUSEGUARD.TraitNameStr",
        level: "MOUSEGUARD.TraitLevelStr",
        usedForSelf: "MOUSEGUARD.TraitUsedForSelfStr",
        usedAgainstSelf: "MOUSEGUARD.TraitUsedAgainstSelfStr"
    }
}

export const MOUSEGUARD = new MouseGuardConfig();