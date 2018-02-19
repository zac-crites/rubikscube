import { State, StateContext } from "./state";
import { Turnable, Turn } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { CameraControls } from "../CameraControls";
import { Scrambler } from "../scrambler";
import { ScramblingState } from "./scramblingState";
import { Timer } from "../timer";
import { CubeState } from "../cube";
import { IdleState } from "./idlestate";
import { StandardControlScheme } from "../standardControlScheme";

export class TimedSolveState implements State {
    private context: StateContext;
    private cube: Turnable;
    private hotkeys: Hotkeys;
    private camera: CameraControls;
    private timer: Timer;
    private cubeState: CubeState;

    public constructor(context: StateContext, cube: Turnable, hotkeys: Hotkeys, camera: CameraControls, timer: Timer, cubeState: CubeState) {
        this.context = context;
        this.cube = cube;
        this.hotkeys = hotkeys;
        this.camera = camera;
        this.timer = timer;
        this.cubeState = cubeState;
    }

    public enter(): void {
        let cube = this.cube;
        let camera = this.camera;

        let wrapper = this.turnCompletedListeningWrapper(cube, () => this.onTurnCompleted());

        new StandardControlScheme().register(this.hotkeys, wrapper, camera);
        this.hotkeys.setupButton("/", "🎲", () => {
            this.timer.reset();
            this.context.setState(this.context.scramblerState);
        });
        this.timer.start();
    }

    public exit(): void {
        this.hotkeys.reset();
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
