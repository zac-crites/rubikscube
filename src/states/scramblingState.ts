import { State, StateContext } from "./state";
import { Scrambler } from "../scrambler";
import { Turnable } from "../turnable";
import { Cube } from "../cube";
import { TurnRecorder, Recorder } from "../turnRecorder";
import { Timer } from "../timer";

export class ScramblingState implements State {
    private context: StateContext;
    private nextState: State | null;
    private scrambler: Scrambler;
    private cube: Turnable;
    private recorder: Recorder;
    private timer: Timer;

    public constructor(context: StateContext, cube: Turnable, recorder:Recorder, timer:Timer) {
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
    }

    public setNextState(next: State) {
        this.nextState = next;
    }
}