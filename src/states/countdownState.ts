import { Hotkeys } from "../hotkeys";
import { StandardControlScheme } from "../standardControlScheme";
import { Timer } from "../timer";
import { ITurnable, Turn, TurnableWrapper } from "../turnable";
import { IState, StateContext } from "./state";

export class CountdownState implements IState {
    private context: StateContext;
    private nextState: IState | null;
    private timer: Timer;
    private hotkeys: Hotkeys;
    private cube: ITurnable;

    public constructor(context: StateContext, timer: Timer, hotkeys: Hotkeys, cube: ITurnable) {
        this.context = context;
        this.timer = timer;
        this.hotkeys = hotkeys;
        this.cube = cube;
        this.nextState = null;
    }

    public enter(): void {
        const cubeWrapper = new SafeCheckWrapper(this.cube, (isSafe) => this.onMove(isSafe));
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

    public setNextState(next: IState): void {
        this.nextState = next;
    }

    private onMove(isSafe: boolean) {
        if (!isSafe) {
            this.context.setState(this.nextState || this.context.solveState);
        }
    }
}

class SafeCheckWrapper extends TurnableWrapper {
    private safeTurns = [Turn.X, Turn.Xi, Turn.Y, Turn.Yi, Turn.Z, Turn.Zi];
    private callback: (isSafe: boolean) => void;

    public constructor(target: ITurnable, callback: (isSafe: boolean) => void) {
        super(target);
        this.callback = callback;
    }

    public apply(turn: Turn): ITurnable {
        this.callback(this.safeTurns.some((s) => s === turn));
        super.apply(turn);
        return this;
    }
}
