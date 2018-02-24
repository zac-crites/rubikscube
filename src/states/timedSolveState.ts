import { ICameraControls } from "../CameraControls";
import { ICubeState } from "../cube";
import { CurrentReplayProvider } from "../currentReplayProvider";
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
    private currentReplayProvider: CurrentReplayProvider;

    public constructor(
        context: StateContext,
        cube: ITurnable,
        hotkeys: Hotkeys,
        camera: ICameraControls,
        timer: Timer,
        cubeState: ICubeState,
        recorder: IRecorder,
        currentReplay: CurrentReplayProvider) {

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
        const cube = this.cube;
        const camera = this.camera;
        const wrapper = new TurnCompletedWrapper(cube, () => this.onTurnCompleted());

        new StandardControlScheme().register(this.hotkeys, wrapper, camera);
        this.hotkeys.setupButton("/", "🎲", () => {
            this.timer.reset();
            this.cubeState.reset();
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
