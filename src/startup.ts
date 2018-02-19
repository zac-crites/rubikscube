import { Turnable, Turn } from "./turnable";
import { Cube, Face } from "./cube";
import { Hotkeys } from "./hotkeys";
import { Scrambler } from "./scrambler";
import { StateContext } from "./states/state";
import { TimedSolveState } from "./states/timedSolveState";
import { ScramblingState } from "./states/scramblingState";
import { Timer } from "./timer";
import { CountdownState } from "./states/countdownState";

declare var CubeRenderer;

export class Startup {
    public run(): number {
        let cube = new Cube();
        let renderer3d = new CubeRenderer(cube);
        let controls = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));
        let timer = new Timer(<HTMLDivElement>(document.getElementById("timerDisplay")));
        let stateContext = new StateContext();

        this.implementApply(renderer3d);

        stateContext.scramblerState = new ScramblingState(stateContext, renderer3d);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, renderer3d);
        stateContext.solveState = new TimedSolveState(stateContext, renderer3d, controls, renderer3d, timer, cube);
        stateContext.setState(stateContext.scramblerState);

        return 0;
    }

    private implementApply(t: any) {
        t.apply = (turn: Turn): Turnable => {
            t[turn]();
            return t;
        };
    }
}