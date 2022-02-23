import { MgActor } from './actor/actor.js';
import { preloadHandlebarsTemplates } from './helpers/templates.js';
import { MouseguardActorSheet } from './sheets/character-sheet.js';

Hooks.once('init', async function () {
    // @ts-expect-error(2339)
    game.mouseguard = {
        MgActor
    }
    CONFIG.Actor.documentClass = MgActor;

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("mouseguard", MouseguardActorSheet, { makeDefault: true });

    return preloadHandlebarsTemplates();
})