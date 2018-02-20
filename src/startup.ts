import { Turnable, Turn } from "./turnable";
import { Cube, Face } from "./cube";
import { Hotkeys } from "./hotkeys";
import { Scrambler } from "./scrambler";
import { StateContext } from "./states/state";
import { TimedSolveState } from "./states/timedSolveState";
import { ScramblingState } from "./states/scramblingState";
import { Timer } from "./timer";
import { CountdownState } from "./states/countdownState";
import { IdleState } from "./states/idlestate";
import { PracticeState } from "./states/practiceState";
import { TurnRecorder } from "./turnRecorder";

declare var CubeRenderer;

export class Startup {
    public run(): number {
        let cube = new Cube();
        let renderer3d = new CubeRenderer(cube);
        let controls = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));
        let timer = new Timer(<HTMLDivElement>(document.getElementById("timerDisplay")));
        let stateContext = new StateContext();

        this.implementApply(renderer3d);

        let recordingWrapper = new TurnRecorder(renderer3d);

        stateContext.idleState = new IdleState(stateContext, controls, recordingWrapper);
        stateContext.scramblerState = new ScramblingState(stateContext, recordingWrapper, recordingWrapper);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, recordingWrapper);
        stateContext.solveState = new TimedSolveState(stateContext, recordingWrapper, controls, renderer3d, timer, cube);
        stateContext.practiceState = new PracticeState(renderer3d, controls, renderer3d);

        stateContext.setState(stateContext.idleState);

        return 0;
    }

    private implementApply(t: any) {
        t.apply = (turn: Turn): Turnable => {
            t[Turn[turn]]();
            return t;
        };
    }
}