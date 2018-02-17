import { State, StateContext } from "./state";
import { Timer } from "../timer";
import { Turnable } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { StandardControls } from "../standardControls";

export class CountdownState implements State {
    private context: StateContext;
    private nextState: State;
    private timer: Timer;
    private controls: StandardControls;
    private cube: Turnable;

    public constructor(context: StateContext, timer: Timer, hotkeys: Hotkeys, cube: Turnable) {
        this.context = context;
        this.timer = timer;
        this.controls = new StandardControls(hotkeys);
        this.cube = cube;
    }

    public enter(): void {
        this.controls.register(this.wrap(this.cube, (legal) => this.onMove(legal)), null);

        this.timer.countdown(15000).then(() => {
            this.context.setState(this.nextState || this.context.solveState);
        });
    }

    public exit(): void {
        this.timer.stop();
        this.controls.reset();
    }

    public setNextState(next: State): void {
        this.nextState = next;
    }

    private wrap(target: Turnable, move: (isLegal: boolean) => void): Turnable {
        let legalNames = ["X", "Xi", "Y", "Yi", "Z", "Zi"];
        let wrapper = {};

        Object.getOwnPropertyNames(target).forEach(name => {
            wrapper[name] = (...args: any[]) => {
                let isLegal = legalNames.some(n => n === name);
                move(isLegal);
                target[name](...args);
            };
        });
        return <Turnable>wrapper;
    }

    private onMove(isLegal) {
        if (!isLegal) {
            this.context.setState(this.nextState || this.context.solveState);
        }
    }
}