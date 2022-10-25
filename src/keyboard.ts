export interface GameKeyboardEvent {
    type: string;
    key: string;
}

export class Keyboard {
    private static _events: Array<GameKeyboardEvent> = [];

    static keydown(ev: KeyboardEvent) {
        Keyboard._events.push({
            type: 'keydown',
            key: ev.key
        })
    }
    static keyup(ev: KeyboardEvent) {
        Keyboard._events.push({
            type: 'keyup',
            key: ev.key
        });
    }

    static getEvents() {
        let events: Array<GameKeyboardEvent> = [];
        while (Keyboard._events.length > 0) events.push(Keyboard._events.shift() as GameKeyboardEvent);
        return events;
    }
}

window.addEventListener('keydown', Keyboard.keydown);
window.addEventListener('keyup', Keyboard.keyup);