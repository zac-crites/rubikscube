import { Matrix4, Vector3 } from "three";
import { CubeMesh } from "./cubeMesh";
import { ITurnable, Turn } from "./turnable";

interface IAnimateable {
    animate: (time: number) => void;
}

interface IAnimDataCollection {
    [turn: string]: [
        Matrix4,
        [number, number, number] | null,
        [number, number, number] | null,
        Turn[],
        Turn[]
    ];
}

export class MeshAnimator implements ITurnable {
    private animationDuration: number = 8;
    private mesh: CubeMesh;
    private cube: ITurnable;
    private readonly animationQueue: IAnimateable[] = [];
    private pAnimationData: IAnimDataCollection | null = null;

    public constructor(mesh: CubeMesh, cube: ITurnable) {
        this.mesh = mesh;
        this.cube = cube;
        this.Start();
    }

    public apply(turn: Turn | Turn[]): ITurnable {
        if (Array.isArray(turn)) {
            turn.forEach((t) => this.apply(t));
            return this;
        }

        const data = this.animationData[turn] || [new Matrix4(), null, null, [turn], []];
        const animation = this.CreateAnimation(
            data[0],
            data[1] ? new Vector3(...data[1] as [number, number, number]) : null,
            data[2] ? new Vector3(...data[2] as [number, number, number]) : null,
            () => this.cube.apply(data[3]),
            () => this.cube.apply(data[4]));

        this.animationQueue.push(animation);
        return this;
    }

    public waitForMoves(): Promise<void> {
        return new Promise((resolve) => {
            this.animationQueue.push({
                animate: ( time ) => {
                    resolve();
                    this.animationQueue.shift();
                    if (this.animationQueue.length > 0) {
                        this.animationQueue[0].animate( time );
                    }
                },
            });
        });
    }

    private Start(): void {
        const animationQueue = this.animationQueue;
        (function Animate() {
            requestAnimationFrame(Animate);
            if (animationQueue.length > 0) {
                animationQueue[0].animate(0);
            }
        })();
    }

    private CreateAnimation(baseRotation: Matrix4,
                            topRotationAxis: Vector3 | null,
                            bottomRotationAxis: Vector3 | null,
                            startMoves: () => void, endMoves: () => void): IAnimateable {

        const finish = this.animationDuration;
        const topLayerMeshes = this.mesh.topLayer;
        const bottomLayerMeshes = this.mesh.notTopLayer;
        let t = 0;

        return {
            animate: () => {
                if (t === 0) {
                    this.mesh.meshes.forEach((m) => m.rotation.setFromRotationMatrix(baseRotation));
                    startMoves();
                    this.mesh.Update();
                }
                if (topRotationAxis) {
                    const rotationMatrix = new Matrix4()
                        .makeRotationAxis(topRotationAxis, (1 - (t / finish)) * Math.PI / 2).multiply(baseRotation);
                    topLayerMeshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(rotationMatrix));
                }
                if (bottomRotationAxis) {
                    const rotationMatrix = new Matrix4()
                        .makeRotationAxis(bottomRotationAxis, (1 - (t / finish)) * Math.PI / 2).multiply(baseRotation);
                    bottomLayerMeshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(rotationMatrix));
                }
                if (t >= finish && this.animationQueue.length > 0) {
                    this.animationQueue.shift();
                    this.mesh.meshes.forEach((mesh) => mesh.rotation.setFromRotationMatrix(new Matrix4()));
                    endMoves();
                    this.mesh.Update();
                }
                t++;
            },
        };
    }

    private get animationData(): IAnimDataCollection {
        if (this.pAnimationData) {
            return this.pAnimationData;
        }
        const map = this.pAnimationData = {} as IAnimDataCollection;
        map[Turn.X] = [new Matrix4(), [1, 0, 0], [1, 0, 0], [Turn.X], []];
        map[Turn.Y] = [new Matrix4(), [0, 1, 0], [0, 1, 0], [Turn.Y], []];
        map[Turn.Z] = [new Matrix4(), [0, 0, 1], [0, 0, 1], [Turn.Z], []];
        map[Turn.Xi] = [new Matrix4(), [-1, 0, 0], [-1, 0, 0], [Turn.Xi], []];
        map[Turn.Yi] = [new Matrix4(), [0, -1, 0], [0, -1, 0], [Turn.Yi], []];
        map[Turn.Zi] = [new Matrix4(), [0, 0, -1], [0, 0, -1], [Turn.Zi], []];
        map[Turn.U] = [new Matrix4(), [0, 1, 0], null, [Turn.U], []];
        map[Turn.D] = [new Matrix4().makeRotationX(Math.PI),
        [0, -1, 0], null, [Turn.D, Turn.X, Turn.X], [Turn.X, Turn.X]];
        map[Turn.L] = [new Matrix4().makeRotationZ(Math.PI / 2),
        [-1, 0, 0], null, [Turn.L, Turn.Z], [Turn.Zi]];
        map[Turn.R] = [new Matrix4().makeRotationZ(- Math.PI / 2),
        [1, 0, 0], null, [Turn.R, Turn.Zi], [Turn.Z]];
        map[Turn.F] = [new Matrix4().makeRotationX(Math.PI / 2),
        [0, 0, 1], null, [Turn.F, Turn.X], [Turn.Xi]];
        map[Turn.B] = [new Matrix4().makeRotationX(-Math.PI / 2),
        [0, 0, -1], null, [Turn.B, Turn.Xi], [Turn.X]];
        map[Turn.Ui] = [new Matrix4(), [0, -1, 0], null, [Turn.Ui], []];
        map[Turn.Di] = [new Matrix4().makeRotationX(Math.PI),
        [0, 1, 0], null, [Turn.Di, Turn.X, Turn.X], [Turn.X, Turn.X]];
        map[Turn.Li] = [new Matrix4().makeRotationZ(Math.PI / 2),
        [1, 0, 0], null, [Turn.Li, Turn.Z], [Turn.Zi]];
        map[Turn.Ri] = [new Matrix4().makeRotationZ(- Math.PI / 2),
        [-1, 0, 0], null, [Turn.Ri, Turn.Zi], [Turn.Z]];
        map[Turn.Fi] = [new Matrix4().makeRotationX(Math.PI / 2),
        [0, 0, -1], null, [Turn.Fi, Turn.X], [Turn.Xi]];
        map[Turn.Bi] = [new Matrix4().makeRotationX(-Math.PI / 2),
        [0, 0, 1], null, [Turn.Bi, Turn.Xi], [Turn.X]];
        map[Turn.I] = [new Matrix4().makeRotationZ(- Math.PI / 2),
            null, [-1, 0, 0], [Turn.Zi, Turn.U, Turn.Yi], [Turn.Z]];
        map[Turn.Ii] = [new Matrix4().makeRotationZ(- Math.PI / 2),
            null, [1, 0, 0], [Turn.Zi, Turn.Ui, Turn.Y], [Turn.Z]];
        map[Turn.r] = [new Matrix4().makeRotationZ(Math.PI / 2),
            null, [1, 0, 0], [Turn.Z, Turn.U, Turn.Yi], [Turn.Zi]];
        map[Turn.ri] = [new Matrix4().makeRotationZ(Math.PI / 2),
            null, [-1, 0, 0], [Turn.Z, Turn.Ui, Turn.Y], [Turn.Zi]];
        return map;
    }
}
