import { State, StateContext } from "./state";
import { Timer } from "../timer";
import { Turnable, Turn, TurnableWrapper } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { StandardControlScheme } from "../standardControlScheme";

export class CountdownState implements State {
    private context: StateContext;
    private nextState: State;
    private timer: Timer;
    private hotkeys: Hotkeys;
    private cube: Turnable;

    public constructor(context: StateContext, timer: Timer, hotkeys: Hotkeys, cube: Turnable) {
        this.context = context;
        this.timer = timer;
        this.hotkeys = hotkeys;
        this.cube = cube;
    }

    public enter(): void {
        let cubeWrapper = new SafeCheckWrapper(this.cube, (isSafe) => this.onMove(isSafe));
        new StandardControlScheme().register(this.hotkeys, cubeWrapper);
        this.hotkeys.setupButton("/", "🎲", () => this.context.setState(this.context.scramblerState));

        this.timer.countdown(15000).then(() => {
            this.context.setState(this.nextState || this.context.solveState);
        });
    }

    public exit(): void {
        this.timer.reset();
        this.hotkeys.reset();
    }

    public setNextState(next: State): void {
        this.nextState = next;
    }

    private onMove(isSafe) {
        if (!isSafe) {
            this.context.setState(this.nextState || this.context.solveState);
        }
    }
}

class SafeCheckWrapper extends TurnableWrapper {
    private safeTurns = [Turn.X, Turn.Xi, Turn.Y, Turn.Yi, Turn.Z, Turn.Zi];
    private callback: (isSafe: boolean) => void;

    public constructor(target: Turnable, callback: (isSafe: boolean) => void) {
        super(target);
        this.callback = callback;
    }

    public apply(turn: Turn): Turnable {
        this.callback(this.safeTurns.some(s => s === turn));
        super.apply(turn);
        return this;
    }
}