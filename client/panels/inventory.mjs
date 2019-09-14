import * as alt from 'alt';
import * as native from 'natives';
//import * as panelsPanelStatus from 'client/panels/panelstatus.mjs';
//import { WebView } from 'client/utility/webview.mjs';
import { View } from 'client/utility/view.mjs';

alt.log(`Loaded: client->panels->inventory.mjs`);

const url = 'http://resource/client/html/inventory/index.html';
let webview;

// Show the Dialogue for the Inventory
export function showDialogue() {
    if (webview) return;
    webview = new View(url, true);
    webview.on('inventory:Drop', drop);
    webview.on('inventory:Use', use);
    webview.on('inventory:Destroy', destroy);
    webview.on('inventory:FetchItems', fetchItems);
    webview.on('inventory:SetPosition', setPosition);
    webview.on('inventory:Rename', rename);
    webview.on('inventory:Exit', exit);
}

function setPosition(newIndexPosition, oldIndexPosition) {
    alt.emitServer('inventory:UpdatePosition', newIndexPosition, oldIndexPosition);
}

export function fetchItems() {
    if (webview === undefined) return;

    let itemJSON = alt.Player.local.getMeta('inventory');
    let itemArray = JSON.parse(itemJSON);

    webview.emit('clearitems');

    itemArray.forEach((item, index) => {
        if (!item) {
            webview.emit('inventory:AddItem', index, null);
            return;
        }

        const canuse = item.useitem ? true : item.consumeable ? true : false;

        webview.emit(
            'inventory:AddItem',
            index,
            item.label,
            item.hash,
            item.props,
            item.quantity,
            item.slot,
            item.rename,
            canuse,
            item.droppable,
            item.icon
        );
    });

    webview.emit('enablebuttons');
}

function exit() {
    webview.close();
    webview = undefined;
}

function destroy(hash) {
    alt.emitServer('inventory:DestroyItem', hash);
}

function use(hash) {
    alt.emitServer('inventory:UseItem', hash);
}

function drop(hash, quantity) {
    alt.emitServer('inventory:DropItem', hash, quantity);
}

function rename(hash, name) {
    alt.emitServer('inventory:RenameItem', hash, name);
}
