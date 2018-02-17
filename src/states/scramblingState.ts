import { State, StateContext } from "./state";
import { Scrambler } from "../scrambler";
import { Turnable } from "../turnable";
import { Cube } from "../cube";

export class ScramblingState implements State {
    private context: StateContext;
    private nextState: State;
    private scrambler: Scrambler;
    private cube: Turnable;

    public constructor(context: StateContext, cube: Turnable) {
        this.context = context;
        this.cube = cube;
        this.scrambler = new Scrambler();
    }

    public enter(): void {
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