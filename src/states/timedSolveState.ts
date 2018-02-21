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
import { Recorder, CurrentReplayProvider } from "../turnRecorder";

export class TimedSolveState implements State {
    private context: StateContext;
    private cube: Turnable;
    private hotkeys: Hotkeys;
    private camera: CameraControls;
    private timer: Timer;
    private cubeState: CubeState;
    private recorder: Recorder;
    private currentReplayProvider: CurrentReplayProvider;

    public constructor(context: StateContext, cube: Turnable, hotkeys: Hotkeys, camera: CameraControls, timer: Timer, cubeState: CubeState, recorder: Recorder, currentReplay: CurrentReplayProvider) {
        this.context = context;
        this.cube = cube;
        this.hotkeys = hotkeys;
        this.camera = camera;
        this.timer = timer;
        this.cubeState = cubeState;
        this.recorder = recorder;
        this.currentReplayProvider = currentReplay;
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
            this.recorder.stop();
            this.currentReplayProvider.currentReplay = this.recorder.getReplay();
            this.context.setState(this.context.solvedState);
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