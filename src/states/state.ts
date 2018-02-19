export interface State {
    enter(): void;
    exit(): void;
}

export class StateContext {
    private currentState: State;

    public idleState:State;
    public scramblerState:State;
    public solveState:State;
    public countdownState:State;
    public practiceState:State;

    public constructor(state?: State) {
        this.setState(state);
    }

    public setState(state: State) {
        if (this.currentState) {
            this.currentState.exit();
        }
        this.currentState = state;
        if (this.currentState) {
            this.currentState.enter();
        }
    }
}