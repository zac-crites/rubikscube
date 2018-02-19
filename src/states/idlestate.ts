import { State, StateContext } from "./state";
import { Hotkeys, MenuOption } from "../hotkeys";

export class IdleState implements State {
    private context: StateContext;
    private hotkeys: Hotkeys;
    private listener: () => void;

    public constructor(context: StateContext, keys: Hotkeys, nextState?: State) {
        this.context = context;
        this.hotkeys = keys;
        this.listener = () => context.setState(nextState || context.scramblerState);
    }

    public enter(): void {
        let context = this.context;
        this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
            new MenuOption("f", "Timed solve", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Practice", () => this.context.setState(this.context.solveState)),
        ]);
    }

    public exit(): void {
        window.removeEventListener("keypress", this.listener);
    }
}