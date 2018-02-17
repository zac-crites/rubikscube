export class StateContext {

    private currentState: State;

    public constructor(state: State) {
        this.currentState = state;
        this.currentState.enter();
    }

    public setState(state: State) {
        this.currentState.exit();
        this.currentState = state;
        this.currentState.enter();
    }
}

export interface State {
    enter(): void;
    exit(): void;
}