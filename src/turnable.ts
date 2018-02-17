export interface Turnable {
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