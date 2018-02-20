export enum Turn {
    X,
    Y,
    Z,
    Xi,
    Yi,
    Zi,
    X2,
    Y2,
    Z2,
    U,
    D,
    L,
    R,
    F,
    B,
    Ui,
    Di,
    Li,
    Ri,
    Fi,
    Bi,
    U2,
    D2,
    L2,
    R2,
    F2,
    B2,
    I,
    Ii,
    r,
    ri
}

export interface Turnable {
    apply(turn: Turn): Turnable;
    waitForMoves(): Promise<void>;
}