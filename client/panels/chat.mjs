import * as alt from 'alt';
import * as native from 'natives';
import { currentView } from 'client/utility/view.mjs';

alt.log('Loaded: client->panels->chat.mjs');

const url = 'http://resource/client/html/chat/index.html';
let isActive = false;
let webview;
let isViewHidden = false;

/*
Warning; this is meant to be a seperate webview.
Do not use 'View' for this view. Chat needs to be
decoupled from everything else.
*/

alt.on('meta:Changed', turnOnChat);

function turnOnChat(key, value) {
    if (key !== 'loggedin') return;
    alt.off('meta:Changed', turnOnChat);
    toggleDialogue();
}

export function toggleDialogue() {
    if (webview === undefined) {
        webview = new alt.WebView(url);
        webview.on('routeMessage', routeMessage);
        webview.on('chat:Ready', ready);
        return;
    }

    if (currentView.isFocused()) return;

    if (!isActive) {
        isActive = true;
        alt.Player.local.setMeta('chat', true);
        webview.focus();
        webview.emit('chat:ShowChatInput');
        alt.toggleGameControls(false);
        alt.showCursor(true);
    }
}

export function send(msg) {
    if (webview === undefined) return;

    webview.emit('chat:AppendMessage', msg);
}

alt.on('chat:Toggle', toggleHide);

export function toggleHide() {
    if (webview === undefined) return;

    isViewHidden = !isViewHidden;
    webview.emit('chat:Hide', isViewHidden);
    native.displayRadar(!isViewHidden);
}

function routeMessage(msg) {
    alt.toggleGameControls(true);
    webview.unfocus();
    isActive = false;
    alt.Player.local.setMeta('chat', false);

    try {
        alt.showCursor(false);
    } catch (err) {}

    if (!msg) return;
    if (msg.length <= 0) return;

    if (msg === '/clearchat') {
        webview.emit('chat:ClearChatBox');
        return;
    }

    alt.emitServer('chat:RouteMessage', msg);
}

function ready() {
    alt.emitServer('sync:Ready');
}

alt.on('meta:Changed', (key, value) => {
    if (!webview) return;
    if (key === 'cash') {
        webview.emit('chat:SetCash', value);
    }
});

alt.on('hud:SetLocation', location => {
    if (!webview) return;
    webview.emit('chat:SetLocation', location);
});

alt.on('hud:SetSpeed', speed => {
    if (!webview) return;
    webview.emit('chat:SetSpeed', speed);
});
