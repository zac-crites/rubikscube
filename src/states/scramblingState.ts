import { Scrambler } from "../scrambler";
import { Timer } from "../timer";
import { ITurnable } from "../turnable";
import { IRecorder } from "../turnRecorder";
import { IState, StateContext } from "./state";

export class ScramblingState implements IState {
    private context: StateContext;
    private nextState: IState | null;
    private scrambler: Scrambler;
    private cube: ITurnable;
    private recorder: IRecorder;
    private timer: Timer;

    public constructor(context: StateContext, cube: ITurnable, recorder: IRecorder, timer: Timer) {
        this.context = context;
        this.cube = cube;
        this.recorder = recorder;
        this.timer = timer;
        this.scrambler = new Scrambler();
        this.nextState = null;
    }

    public enter(): void {
        this.timer.reset();
        this.recorder.reset();
        this.scrambler.scramble(this.cube, 30);
        this.recorder.start();
        this.cube.waitForMoves().then(() => {
            this.context.setState(this.nextState || this.context.countdownState);
            this.nextState = null;
        });
    }

    public exit(): void {
        return;
    }

    public setNextState(next: IState) {
        this.nextState = next;
    }
}
