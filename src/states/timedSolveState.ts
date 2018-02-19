import { State, StateContext } from "./state";
import { Turnable, Turn } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { CameraControls } from "../CameraControls";
import { Scrambler } from "../scrambler";
import { ScramblingState } from "./scramblingState";
import { Timer } from "../timer";
import { StandardControls } from "../standardControls";
import { CubeState } from "../cube";
import { IdleState } from "./idlestate";

export class TimedSolveState implements State {
    private context: StateContext;
    private cube: Turnable;
    private controls: StandardControls;
    private camera: CameraControls;
    private timer: Timer;
    private cubeState: CubeState;

    public constructor(context: StateContext, cube: Turnable, controls: Hotkeys, camera: CameraControls, timer: Timer, cubeState: CubeState) {
        this.context = context;
        this.cube = cube;
        this.controls = new StandardControls(controls);
        this.camera = camera;
        this.timer = timer;
        this.cubeState = cubeState;
    }

    public enter(): void {
        let cube = this.cube;
        let camera = this.camera;

        camera.refreshFacelets();

        let wrapper = this.turnCompletedListeningWrapper(cube, () => this.onTurnCompleted());

        this.controls.register(wrapper, camera);
        this.timer.start();
    }

    public exit(): void {
        this.controls.reset();
    }

    private onTurnCompleted(): void {
        if (this.cubeState.isSolved()) {
            this.timer.stop();
            this.context.setState(this.context.idleState);
        }
    }

    private turnCompletedListeningWrapper(target: Turnable, callback: () => void): Turnable {
        let wrapper = {};

        Object.getOwnPropertyNames(target).forEach(name => {
            wrapper[name] = (...args: any[]) => {
                target[name](...args);
                target.waitForMoves().then(() => {
                    callback();
                });
            }
        });

        return <Turnable>wrapper;
    }
}
