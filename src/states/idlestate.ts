import { Hotkeys, MenuOption } from "../hotkeys";
import { IState, StateContext } from "./state";

export class IdleState implements IState {
    private context: StateContext;
    private hotkeys: Hotkeys;

    public constructor(context: StateContext, keys: Hotkeys) {
        this.context = context;
        this.hotkeys = keys;
    }

    public enter(): void {
        this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
            new MenuOption("f", "Timed solve", () => this.context.setState(this.context.scramblerState)),
            new MenuOption("j", "Practice", () => this.context.setState(this.context.practiceState)),
        ]);
    }

    public exit(): void {
        return;
    }
}
