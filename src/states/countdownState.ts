import { State, StateContext } from "./state";
import { Timer } from "../timer";

export class CountdownState implements State {
    private context: StateContext;
    private nextState: State;
    private timer: Timer;

    public constructor(context: StateContext, timer: Timer) {
        this.context = context;
        this.timer = timer;
    }

    public enter(): void {
        this.timer.countdown(15000).then(() => {
            this.context.setState(this.nextState || this.context.solveState);
        });
    }

    public exit(): void {
        this.timer.stop();
    }

    public setNextState(next: State): void {
        this.nextState = next;
    }
}