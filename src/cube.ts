import { ITurnable, Turn } from "./turnable";

export enum Face {
    U,
    L,
    F,
    R,
    B,
    D,
}

export interface ICubeState {
    isSolved(): boolean;
    getFacelet(face: Face, i?: number): Face;
    reset(): void;
}

interface IFaceData {
    readonly center: Face;
    readonly facelets: Face[];
}

export class Cube implements ITurnable, ICubeState {
    private faces: IFaceData[] = [];

    public constructor() {
        this.reset();
    }

    public reset(): void {
        this.faces = [];
        for (let i = 0; i < 6; i++) {
            this.faces.push(this.faceData(i));
        }
    }

    public isSolved(): boolean {
        return this.faces.every((face) => face.facelets.every((facelet) => facelet === face.center));
    }

    public getFacelet(face: Face, i: number): Face {
        if (i === undefined) {
            return this.faces[face].center;
        }
        return this.faces[face].facelets[i];
    }

    public waitForMoves(): Promise<void> {
        return Promise.resolve();
    }

    public apply(turn: Turn | Turn[]): Cube {
        if (typeof turn !== "number") {
            const turnList = turn as Turn[];
            for (const t of turnList) {
                this.apply(t);
            }
            return this;
        }

        switch (turn) {
            case Turn.X:
                return this.X();
            case Turn.Y:
                return this.Y();
            case Turn.Z:
                return this.Z();
            case Turn.U:
                return this.U();
            case Turn.Xi:
                return this.apply([Turn.X, Turn.X, Turn.X]);
            case Turn.Yi:
                return this.apply([Turn.Y, Turn.Y, Turn.Y]);
            case Turn.Zi:
                return this.apply([Turn.Z, Turn.Z, Turn.Z]);
            case Turn.X2:
                return this.apply([Turn.X, Turn.X]);
            case Turn.Y2:
                return this.apply([Turn.Y, Turn.Y]);
            case Turn.Z2:
                return this.apply([Turn.Z, Turn.Z]);
            case Turn.D:
                return this.apply([Turn.X, Turn.F, Turn.Xi]);
            case Turn.L:
                return this.apply([Turn.Z, Turn.U, Turn.Zi]);
            case Turn.R:
                return this.apply([Turn.Zi, Turn.U, Turn.Z]);
            case Turn.F:
                return this.apply([Turn.X, Turn.U, Turn.Xi]);
            case Turn.B:
                return this.apply([Turn.Xi, Turn.U, Turn.X]);
            case Turn.Ui:
                return this.apply([Turn.U, Turn.U, Turn.U]);
            case Turn.Di:
                return this.apply([Turn.D2, Turn.D]);
            case Turn.Li:
                return this.apply([Turn.L2, Turn.L]);
            case Turn.Ri:
                return this.apply([Turn.R2, Turn.R]);
            case Turn.Fi:
                return this.apply([Turn.F2, Turn.F]);
            case Turn.Bi:
                return this.apply([Turn.B2, Turn.B]);
            case Turn.U2:
                return this.apply([Turn.U, Turn.U]);
            case Turn.D2:
                return this.apply([Turn.D, Turn.D]);
            case Turn.L2:
                return this.apply([Turn.L, Turn.L]);
            case Turn.R2:
                return this.apply([Turn.R, Turn.R]);
            case Turn.F2:
                return this.apply([Turn.F, Turn.F]);
            case Turn.B2:
                return this.apply([Turn.B, Turn.B]);
            case Turn.I:
                return this.apply([Turn.R, Turn.X]);
            case Turn.Ii:
                return this.apply([Turn.Ri, Turn.Xi]);
            case Turn.r:
                return this.apply([Turn.Li, Turn.Xi]);
            case Turn.ri:
                return this.apply([Turn.Li, Turn.Xi]);
        }
        return this;
    }

    private X(): Cube {
        this.rotateFace(this.faces[1], 1);
        this.rotateFace(this.faces[3], 3);

        const tmp = this.faces[0];
        this.faces[0] = this.faces[2];
        this.faces[2] = this.faces[5];
        this.faces[5] = this.faces[4];
        this.rotateFace(this.faces[5], 2);
        this.faces[4] = tmp;
        this.rotateFace(this.faces[4], 2);

        return this;
    }

    private Y(): Cube {
        this.rotateFace(this.faces[0], 3);
        this.rotateFace(this.faces[5], 1);

        const tmp = this.faces[1];
        this.faces[1] = this.faces[2];
        this.faces[2] = this.faces[3];
        this.faces[3] = this.faces[4];
        this.faces[4] = tmp;
        return this;
    }

    private Z(): Cube {
        this.rotateFace(this.faces[2], 3);
        this.rotateFace(this.faces[4], 1);

        const tmp = this.faces[0];
        this.faces[0] = this.faces[1];
        this.rotateFace(this.faces[0], 3);
        this.faces[1] = this.faces[5];
        this.rotateFace(this.faces[1], 3);
        this.faces[5] = this.faces[3];
        this.rotateFace(this.faces[5], 3);
        this.faces[3] = tmp;
        this.rotateFace(this.faces[3], 3);
        return this;
    }

    private U(): Cube {
        this.rotateFace(this.faces[0], 3);
        this.shift(0);
        this.shift(1);
        this.shift(2);
        return this;
    }

    private faceData(face: Face): IFaceData {
        const facelets: Face[] = [];
        for (let i = 0; i < 8; i++) {
            facelets.push(face);
        }
        return {
            get center(): Face { return face; },
            get facelets(): Face[] { return facelets; },
        };
    }

    private replace(f: IFaceData, i: number, value: number) {
        const tmp = f.facelets[i];
        f.facelets[i] = value;
        return tmp;
    }

    private shift(i: number) {
        const f = this.faces;
        this.replace(f[1], i, this.replace(f[2], i, this.replace(f[3], i, this.replace(f[4], i, f[1].facelets[i]))));
    }

    private rotateFace(face: IFaceData, times: number) {
        for (let i = 0; i < times * 2; i++) {
            face.facelets.push(face.facelets.splice(0, 1)[0]);
        }
    }
}
