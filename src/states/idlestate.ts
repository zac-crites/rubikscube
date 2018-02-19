import { State, StateContext } from "./state";
import { Hotkeys, MenuOption } from "../hotkeys";

export class IdleState implements State {
    private context: StateContext;
    private hotkeys: Hotkeys;

    public constructor(context: StateContext, keys: Hotkeys) {
        this.context = context;
        this.hotkeys = keys;
    }

    public enter(): void {
        let context = this.context;
        this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
            new MenuOption("f", "Timed solve", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Practice", () => this.context.setState(this.context.practiceState)),
        ]);
    }

    public exit(): void {
    }
}