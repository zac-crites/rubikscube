import { Turnable } from "./turnable"

export enum Face {
    U,
    L,
    F,
    R,
    B,
    D,
}

class FaceData {
    readonly center: Face;
    facelets: Face[] = [];

    constructor(face: Face) {
        this.center = face;
        while (this.facelets.length < 8) {
            this.facelets.push(face);
        }
    }
}

export class Cube implements Turnable {

    private faces: FaceData[];

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.faces = [];
        for (let i = 0; i < 6; i++) {
            this.faces.push(new FaceData(i));
        }
    }

    public isSolved(): boolean {
        for (let i = 0; i < this.faces.length; i++) {
            if (!this.faces[i].facelets.every(facelet => facelet === i)) {
                return false;
            }
        }
        return true;
    }

    public getFacelet(face: Face, i: number): Face {
        if (i === undefined) {
            return this.faces[face].center;
        }
        return this.faces[face].facelets[i];
    }

    public X(): Cube {
        this.rotateFace(this.faces[1], 1);
        this.rotateFace(this.faces[3], 3);

        var tmp = this.faces[0];
        this.faces[0] = this.faces[2];
        this.faces[2] = this.faces[5];
        this.faces[5] = this.faces[4];
        this.rotateFace(this.faces[5], 2);
        this.faces[4] = tmp;
        this.rotateFace(this.faces[4], 2);

        return this;
    }

    public Y(): Cube {
        this.rotateFace(this.faces[0], 3);
        this.rotateFace(this.faces[5], 1);

        var tmp = this.faces[1];
        this.faces[1] = this.faces[2];
        this.faces[2] = this.faces[3];
        this.faces[3] = this.faces[4];
        this.faces[4] = tmp;
        return this;
    }

    public Z(): Cube {
        this.rotateFace(this.faces[2], 3);
        this.rotateFace(this.faces[4], 1);

        var tmp = this.faces[0];
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

    public U(): Cube {
        this.rotateFace( this.faces[0], 3 );
        this.shift(0);
        this.shift(1);
        this.shift(2);
        return this;
    }

    public Xi(): Cube {
        return this.X().X().X();
    }

    public Yi(): Cube {
        return this.Y().Y().Y();
    }

    public Zi(): Cube {
        return this.Z().Z().Z();
    }

    public X2(): Cube {
        return this.X().X();
    }

    public Y2(): Cube {
        return this.Y().Y();
    }

    public Z2(): Cube {
        return this.Z().Z();
    }

    public D(): Cube {
        return this.X().F().Xi();
    }
    
    public L(): Cube {
        return this.Z().U().Zi();
    }

    public R(): Cube {
        return this.Zi().U().Z();
    }

    public F(): Cube {
        return this.X().U().Xi();
    }

    public B(): Cube {
        return this.Xi().U().X();
    }

    public Ui(): Cube {
        return this.U().U().U();
    }

    public Di(): Cube {
        return this.D2().D();
    }
    
    public Li(): Cube {
        return this.L2().L();
    }
    
    public Ri(): Cube {
        return this.R2().R();
    }
    
    public Fi(): Cube {
        return this.F2().F();
    }
    
    public Bi(): Cube {
        return this.B2().B();
    }

    public U2(): Cube {
        return this.U().U();
    }

    public D2(): Cube {
        return this.D2().D2();
    }

    public L2(): Cube {
        return this.L().L();
    }

    public R2(): Cube {
        return this.R().R();
    }

    public F2(): Cube {
        return this.F().F();
    }

    public B2(): Cube {
        return this.B().B();
    }

    private replace(f:FaceData, i:number, value:number){
        var tmp = f.facelets[i];
        f.facelets[i] = value;
        return tmp;
    }

    private shift(i: number) {
        let f = this.faces;
        this.replace( f[1], i, this.replace( f[2], i, this.replace( f[3], i, this.replace( f[4], i, f[1].facelets[i]))));
    }

    private rotateFace(face: FaceData, times: number) {
        for (let i = 0; i < times * 2; i++) {
            face.facelets.push(face.facelets.splice(0, 1)[0]);
        }
    }
}