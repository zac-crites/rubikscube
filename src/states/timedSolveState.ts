import { ICameraControls } from "../CameraControls";
import { ICubeState } from "../cube";
import { IReplayLog } from "../currentReplayProvider";
import { Hotkeys } from "../hotkeys";
import { StandardControlScheme } from "../standardControlScheme";
import { Timer } from "../timer";
import { ITurnable, Turn, TurnableWrapper } from "../turnable";
import { IRecorder } from "../turnRecorder";
import { IState, StateContext } from "./state";

export class TimedSolveState implements IState {
    private context: StateContext;
    private cube: ITurnable;
    private hotkeys: Hotkeys;
    private camera: ICameraControls;
    private timer: Timer;
    private cubeState: ICubeState;
    private recorder: IRecorder;
    private replayLog: IReplayLog;
    private active: boolean;

    public constructor(
        context: StateContext,
        cube: ITurnable,
        hotkeys: Hotkeys,
        camera: ICameraControls,
        timer: Timer,
        cubeState: ICubeState,
        recorder: IRecorder,
        replayLog: IReplayLog) {

        this.context = context;
        this.cube = cube;
        this.hotkeys = hotkeys;
        this.camera = camera;
        this.timer = timer;
        this.cubeState = cubeState;
        this.recorder = recorder;
        this.replayLog = replayLog;
        this.active = false;
    }

    public enter(): void {
        const cube = this.cube;
        const camera = this.camera;
        const wrapper = new TurnCompletedWrapper(cube, () => this.onTurnCompleted());

        new StandardControlScheme().register(this.hotkeys, wrapper, camera);
        this.hotkeys.setupButton("/", "🎲", () => {
            this.timer.reset();
            this.context.setState(this.context.scramblerState);
        });
        this.timer.start();
        this.active = true;
    }

    public exit(): void {
        this.active = false;
        this.hotkeys.reset();
    }

    private onTurnCompleted(): void {
        if (this.active && this.cubeState.isSolved()) {
            this.timer.stop();
            this.recorder.stop();
            this.replayLog.pushReplay(this.recorder.getReplay());
            this.context.setState(this.context.solvedState);
        }
    }
}

class TurnCompletedWrapper extends TurnableWrapper {
    private callback: () => void;
    public constructor(target: ITurnable, callback: () => void) {
        super(target);
        this.callback = callback;
    }

    public apply(turn: Turn): ITurnable {
        super.apply(turn);
        super.waitForMoves().then(() => this.callback());
        return this;
    }
}
