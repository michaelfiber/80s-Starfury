import { GameRect } from "./game.js";

export function GetElementCursorPosition(element: HTMLElement, event: { clientX: number; clientY: number }) {
    const rect = element.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

export function isColliding(rect1: GameRect, rect2: GameRect): boolean {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y) {
        return true;
    }

    return false;
}

export function isInside(point: { x: number; y: number}, rect: GameRect): boolean {
    if (point.x >= rect.x && 
        point.x <= rect.x + rect.width 
        && point.y >= rect.y 
        && rect.y <= rect.y + rect.height) {
        return true;
    }

    return false;
}