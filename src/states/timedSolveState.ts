import { State, StateContext } from "./state";
import { Turnable, Turn, TurnableWrapper } from "../turnable";
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
        let wrapper = new TurnCompletedWrapper(cube, () => this.onTurnCompleted());

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
}

class TurnCompletedWrapper extends TurnableWrapper {
    private callback: () => void;
    public constructor(target: Turnable, callback: () => void) {
        super(target);
        this.callback = callback;
    }

    public apply(turn: Turn): Turnable {
        super.apply(turn);
        super.waitForMoves().then(() => this.callback());
        return this;
    }
}