export enum Turn {
    X = "X",
    Y = "Y",
    Z = "Z",
    Xi = "Xi",
    Yi = "Yi",
    Zi = "Zi",
    X2 = "X2",
    Y2 = "Y2",
    Z2 = "Z2",
    U = "U",
    D = "D",
    L = "L",
    R = "R",
    F = "F",
    B = "B",
    Ui = "Ui",
    Di = "Di",
    Li = "Li",
    Ri = "Ri",
    Fi = "Fi",
    Bi = "Bi",
    U2 = "U2",
    D2 = "D2",
    L2 = "L2",
    R2 = "R2",
    F2 = "F2",
    B2 = "B2",
    I = "I",
    Ii = "Ii",
    r = "r",
    ri = "ri",
}

export interface Turnable {
    apply(turn:Turn):Turnable;

    X(): Turnable;
    Y(): Turnable;
    Z(): Turnable;
    Xi(): Turnable;
    Yi(): Turnable;
    Zi(): Turnable;
    X2(): Turnable;
    Y2(): Turnable;
    Z2(): Turnable;
    U(): Turnable;
    D(): Turnable;
    L(): Turnable;
    R(): Turnable;
    F(): Turnable;
    B(): Turnable;
    Ui(): Turnable;
    Di(): Turnable;
    Li(): Turnable;
    Ri(): Turnable;
    Fi(): Turnable;
    Bi(): Turnable;
    U2(): Turnable;
    D2(): Turnable;
    L2(): Turnable;
    R2(): Turnable;
    F2(): Turnable;
    B2(): Turnable;
    I(): Turnable;
    Ii(): Turnable;
    r(): Turnable;
    ri(): Turnable;
    
    waitForMoves(): Promise<void>;
}