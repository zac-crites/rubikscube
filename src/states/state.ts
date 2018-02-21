export interface IState {
    enter(): void;
    exit(): void;
}

const state: IState = {
    enter: () => { return; },
    exit: () => { return; },
};

export class StateContext {
    public idleState: IState = state;
    public scramblerState: IState = state;
    public solveState: IState = state;
    public countdownState: IState = state;
    public practiceState: IState = state;
    public solvedState: IState = state;
    public replayState: IState = state;

    private currentState: IState;

    public constructor(startState?: IState) {
        this.currentState = startState || state;
        this.currentState.enter();
    }

    public setState(newState: IState) {
        this.currentState.exit();
        this.currentState = newState;
        this.currentState.enter();
    }
}
