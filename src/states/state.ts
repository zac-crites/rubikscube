export interface State {
    enter(): void;
    exit(): void;
}

export class StateContext {
    private currentState: State;

    public idleState: State;
    public scramblerState: State;
    public solveState: State;
    public countdownState: State;
    public practiceState: State;

    public constructor(state?: State) {
        this.currentState = state || {
            enter: () => { },
            exit: () => { }
        };
        this.currentState.enter();
    }

    public setState(state: State) {
        this.currentState.exit();
        this.currentState = state;
        this.currentState.enter();
    }
}