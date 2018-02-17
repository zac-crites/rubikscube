import { State, StateContext } from "./state";
import { Scrambler } from "../scrambler";
import { AnimatedTurnable } from "../turnable";
import { Cube } from "../cube";

export class ScramblingState implements State {
    private context: StateContext;
    private nextState: State;
    private scrambler: Scrambler;
    private cube: AnimatedTurnable;

    public constructor(context: StateContext, cube: AnimatedTurnable) {
        this.context = context;
        this.cube = cube;
        this.scrambler = new Scrambler();
    }

    public enter(): void {
        this.scrambler.scramble(this.cube);

        this.cube.waitForQueuedMoves().then(() => {
            this.context.setState(this.nextState || this.context.solveState);
        });
    }

    public exit(): void {
    }

    public setNextState(next: State) {
        this.nextState = next;
    }
}