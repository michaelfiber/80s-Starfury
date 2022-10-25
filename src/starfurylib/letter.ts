import { Geometry, GeometryPoint } from './geometry.js';

// letters all start with 0,0 in bottom left corner.
// all letters should be 1.0 x 1.0 in size.
export const letters: {
    [key: string]: Array<GeometryPoint>;
} = {
    ' ': [],
    a: [
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0.5, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0, y: -0.4 },
        { action: 'l', x: 1, y: -0.4 }
    ],
    b: [
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.6 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.4 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0, y: 0 },
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 }
    ],
    c: [
        { action: 'm', x: 1, y: -0.8 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 }
    ],
    d: [
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0, y: 0 }
    ],
    e: [
        { action: 'm', x: 1, y: -1 },
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0, y: 0 },
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 }
    ],
    f: [
        { action: 'm', x: 1, y: -1 },
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0, y: 0 },
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 }
    ],
    g: [
        { action: 'm', x: 1, y: -0.8 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 1, y: -0.5 },
        { action: 'l', x: 0.5, y: -0.5 }
    ],
    h: [
        { action: 'l', x: 0, y: -1 },
        { action: 'm', x: 1, y: -1 },
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 1, y: -0.5 }
    ],
    i: [
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0.5, y: 0 },
        { action: 'l', x: 0.5, y: -1 },
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 1, y: -1 }
    ],
    j: [
        { action: 'm', x: 1, y: -1 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0, y: -0.5 }
    ],
    k: [
        { action: 'l', x: 0, y: -1 },
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 1, y: -1 },
        { action: 'm', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.3 },
        { action: 'l', x: 1, y: 0 }
    ],
    l: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 0, y: 0 },
        { action: 'l', x: 1, y: 0 }
    ],
    m: [
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.3, y: -1 },
        { action: 'l', x: 0.5, y: -0.8 },
        { action: 'l', x: 0.7, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0.5, y: -0.8 },
        { action: 'l', x: 0.5, y: -0.5 }
    ],
    n: [
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 1, y: 0 },
        { action: 'l', x: 1, y: -1 }
    ],
    o: [
        { action: 'm', x: 0, y: -0.2 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 }
    ],
    p: [
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 0, y: -0.5 }
    ],
    q: [
        { action: 'm', x: 0, y: -0.2 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'm', x: 0.5, y: -0.5 },
        { action: 'l', x: 1, y: 0 }
    ],
    r: [
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 0, y: -0.5 },
        { action: 'm', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.3 },
        { action: 'l', x: 1, y: 0 }
    ],
    s: [
        { action: 'm', x: 1, y: -0.8 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.7 },
        { action: 'l', x: 0.2, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.3 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 }
    ],
    t: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 1, y: -1 },
        { action: 'm', x: 0.5, y: -1 },
        { action: 'l', x: 0.5, y: 0 }
    ],
    u: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 1, y: -1 }
    ],
    v: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 0.5, y: 0 },
        { action: 'l', x: 1, y: -1 }
    ],
    w: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.3, y: 0 },
        { action: 'l', x: 0.5, y: -0.2 },
        { action: 'l', x: 0.7, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 1, y: -1 },
        { action: 'm', x: 0.5, y: -0.2 },
        { action: 'l', x: 0.5, y: -0.5 }
    ],
    x: [
        { action: 'l', x: 1, y: -1 },
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 1, y: 0 }
    ],
    y: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 0.5, y: -0.5 },
        { action: 'l', x: 1, y: -1 },
        { action: 'm', x: 0.5, y: -0.5 },
        { action: 'l', x: 0.5, y: 0 }
    ],
    z: [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 1, y: -1 },
        { action: 'l', x: 0, y: 0 },
        { action: 'l', x: 1, y: 0 }
    ],
    '-': [
        { action: 'm', x: 0, y: -0.5 },
        { action: 'l', x: 1, y: -0.5 }
    ],
    '1': [
        { action: 'l', x: 1, y: 0 },
        { action: 'm', x: 0.5, y: 0 },
        { action: 'l', x: 0.5, y: -1 },
        { action: 'l', x: 0.3, y: -0.8 }
    ],
    '2': [
        { action: 'm', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.5 },
        { action: 'l', x: 0, y: 0 },
        { action: 'l', x: 1, y: 0 }
    ],
    '3': [
        { action: 'm', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 0.2, y: -0.5 },
        { action: 'm', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.3 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 }
    ],
    '4': [
        { action: 'm', x: 0.8, y: 0 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 1, y: -0.2 }
    ],
    '5': [
        { action: 'm', x: 1, y: -1 },
        { action: 'l', x: 0, y: -1 },
        { action: 'l', x: 0, y: -0.5 },
        { action: 'l', x: 0.2, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.7 },
        { action: 'l', x: 1, y: -0.5 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 }
    ],
    '6': [
        { action: 'm', x: 1, y: -0.8 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 1, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.7 },
        { action: 'l', x: 0.2, y: -0.7 },
        { action: 'l', x: 0, y: -0.5 }
    ],
    '7': [
        { action: 'm', x: 0, y: -1 },
        { action: 'l', x: 1, y: -1 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.7 },
        { action: 'l', x: 0.7, y: -0.7 },
        { action: 'l', x: 0.5, y: -0.5 },
        { action: 'l', x: 0.5, y: 0 }
    ],
    '8': [
        { action: 'm', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.7 },
        { action: 'l', x: 0.8, y: -0.5 },
        { action: 'l', x: 1, y: -0.3 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0, y: -0.3 },
        { action: 'l', x: 0.2, y: -0.5 },
        { action: 'l', x: 0, y: -0.7 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'm', x: 0.2, y: -0.5 },
        { action: 'l', x: 0.8, y: -0.5 }
    ],
    '9': [
        { action: 'm', x: 0, y: -0.2 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.5 },
        { action: 'l', x: 0.2, y: -0.3 },
        { action: 'l', x: 0.8, y: -0.3 },
        { action: 'l', x: 1, y: -0.5 }
    ],
    '0': [
        { action: 'm', x: 0, y: -0.8 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.8, y: -1 },
        { action: 'l', x: 1, y: -0.8 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'l', x: 0.2, y: 0 },
        { action: 'l', x: 0, y: -0.2 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'm', x: 0.1, y: -0.9 },
        { action: 'l', x: 0.8, y: -0.1 }
    ],
    '%': [
        { action: 'm', x: 0, y: -0.9 },
        { action: 'l', x: 0.1, y: -1 },
        { action: 'l', x: 0.2, y: -1 },
        { action: 'l', x: 0.3, y: -0.9 },
        { action: 'l', x: 0.3, y: -0.8 },
        { action: 'l', x: 0.2, y: -0.7 },
        { action: 'l', x: 0.1, y: -0.7 },
        { action: 'l', x: 0, y: -0.8 },
        { action: 'l', x: 0, y: -0.9 },
        { action: 'm', x: 0.8, y: 0 },
        { action: 'l', x: 0.9, y: 0 },
        { action: 'l', x: 1, y: -0.1 },
        { action: 'l', x: 1, y: -0.2 },
        { action: 'l', x: 0.9, y: -0.3 },
        { action: 'l', x: 0.8, y: -0.3 },
        { action: 'l', x: 0.7, y: -0.2 },
        { action: 'l', x: 0.7, y: -0.1 },
        { action: 'l', x: 0.8, y: 0 },
        { action: 'm', x: 0, y: 0 },
        { action: 'l', x: 1, y: -1 }
    ]
}

export class Letter extends Geometry {
    constructor(public letter: keyof typeof letters, x: number, y: number, scale: number) {
        super(x, y, scale);
        this.isMirrored = false;
        this.points.push({ action: 'm', x: 0, y: 0 });
        letters[this.letter].forEach(p => this.points.push(p));
    }

    update(delta: number) { }
}
