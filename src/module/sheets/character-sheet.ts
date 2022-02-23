import { MgActor, MgActorData } from "../actor/actor.js";

export class MouseguardActorSheet extends ActorSheet {
    static get defaultOptions(): ActorSheet.Options {
        return mergeObject(super.defaultOptions, {
            classes: ["mouseguard", "sheet", "actor"],
            template: "systems/mouseguard/src/templates/character-sheet.html",
            width: 600,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]

        })
    }

    get template(): string {
        return `systems/mouseguard/templates/${this.actor.data.type}-sheet.html`
    }

    async getData() {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = await super.getData();
        if (!(game instanceof Game))
            return context;

        // Use a safe clone of the actor data for further operations.
        const actor = context.actor as MgActor;
        // if (actor.data._source.type === "character") {
        //     actor.data._source.data.background.name;
        // }
        const actorData = <MgActorData>actor.data.data;
        for (let abProp of actorData.abilities.allProperties) {
            abProp.label = game.i18n.localize(abProp.configName);
        }

        for (let bgProp of actorData.background.allProperties) {
            bgProp.label = game.i18n.localize(bgProp.configName);
        }

        for (let chProp of actorData.characteristics.allProperties) {
            chProp.label = game.i18n.localize(chProp.configName);
        }

        for (let skillProp of actorData.skills.allProperties) {
            skillProp.label = game.i18n.localize(skillProp.configName);
        }

        // Add the actor's data to context.data for easier access, as well as flags.
        context.data = { ...context.data, ...actorData };
        console.log(context.data);
        context.cssClass = actor.isOwner ? "editable" : "locked"
        return context;
    }
}