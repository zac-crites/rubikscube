import { State, StateContext } from "./state";

export class IdleState implements State {
    private listener: () => void;

    public constructor(context: StateContext, nextState?: State) {
        this.listener = () => context.setState(nextState || context.scramblerState);
    }

    public enter(): void {
        window.addEventListener("keypress", this.listener);
    }

    public exit(): void {
        window.removeEventListener("keypress", this.listener);
    }
}