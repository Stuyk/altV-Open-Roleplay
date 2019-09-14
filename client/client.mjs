/* eslint-disable no-unused-vars */
import * as alt from 'alt';
import * as native from 'natives';

alt.log('Loaded: client.mjs');

// Import Events that need to be imported.
// Importing these pretty much imports the rest.
import * as serverEvents from 'client/serverEvents/events.mjs';
import * as eventsDisconnect from 'client/events/disconnect.mjs';
import * as eventsUpdate from 'client/events/update.mjs';
import * as eventsKeyup from 'client/events/keyup.mjs';
import * as systemsEquip from 'client/systems/equip.mjs';
import * as systemsInteraction from 'client/systems/interaction.mjs';
import * as systemsWeather from 'client/systems/weather.mjs';
import * as systemsCallbacks from 'client/systems/callbacks.mjs';
import * as systemsContext from 'client/systems/context.mjs';
import * as systemsCombat from 'client/systems/combat.mjs';
import * as systemsJob from 'client/systems/job.mjs';
import * as systemsShop from 'client/systems/shop.mjs';
import * as utilitySandbox from 'client/utility/sandbox.mjs';
import * as hud from 'client/hud/hud.mjs';

// Context
import * as contextmenuObject from 'client/contextmenus/object.mjs';
import * as contextmenuPed from 'client/contextmenus/ped.mjs';
import * as contextmenuVehicle from 'client/contextmenus/vehicle.mjs';
import * as contextmenuPlaye from 'client/contextmenus/player.mjs';
