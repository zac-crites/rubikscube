export class StateContext {

    private currentState: State;

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

export interface State {
    enter(): void;
    exit(): void;
}