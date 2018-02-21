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
    ri,
}

export interface ITurnable {
    apply(turn: Turn | Turn[]): ITurnable;
    waitForMoves(): Promise<void>;
}

export class TurnableWrapper implements ITurnable {
    private target: ITurnable;
    public constructor(target: ITurnable) {
        this.target = target;
    }
    public apply(turn: Turn | Turn[]): ITurnable {
        this.target.apply(turn);
        return this;
    }
    public waitForMoves(): Promise<void> {
        return this.target.waitForMoves();
    }
}
