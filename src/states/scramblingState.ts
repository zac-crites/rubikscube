import { State, StateContext } from "./state";
import { Scrambler } from "../scrambler";
import { Turnable } from "../turnable";
import { Cube } from "../cube";
import { TurnRecorder, Recorder } from "../turnRecorder";

export class ScramblingState implements State {
    private context: StateContext;
    private nextState: State;
    private scrambler: Scrambler;
    private cube: Turnable;
    private recorder: Recorder;

    public constructor(context: StateContext, cube: Turnable, recorder:Recorder) {
        this.context = context;
        this.cube = cube;
        this.recorder = recorder;
        this.scrambler = new Scrambler();
    }

    public enter(): void {
        this.recorder.start();
        this.scrambler.scramble(this.cube, 30);
        this.cube.waitForMoves().then(() => {
            this.context.setState(this.nextState || this.context.countdownState);
        });
    }

    public exit(): void {
    }

    public setNextState(next: State) {
        this.nextState = next;
    }
}