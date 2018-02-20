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
import { SolvedState } from "./states/solvedState";
import { ReplayState } from "./states/replayState";
import { ReplayConverter } from "./replayConverter";

declare var CubeRenderer;

export class Startup {
    public run(): number {
        let cube = new Cube();
        let renderer3d = new CubeRenderer(cube);
        let controls = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));
        let timer = new Timer(<HTMLDivElement>(document.getElementById("timerDisplay")));
        let stateContext = new StateContext();

        let recordingWrapper = new TurnRecorder(renderer3d);

        this.implementApply(renderer3d);

        var parseIndex = window.location.href.indexOf('?');
        if (parseIndex > 0) {
            var queryString = window.location.href.substring(parseIndex + 1);
            let replay = new ReplayConverter().stringToReplay(queryString);
            recordingWrapper = new TurnRecorder(renderer3d, replay.moves);
        }

        stateContext.idleState = new IdleState(stateContext, controls, recordingWrapper);
        stateContext.scramblerState = new ScramblingState(stateContext, recordingWrapper, recordingWrapper, timer);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, recordingWrapper);
        stateContext.solveState = new TimedSolveState(stateContext, recordingWrapper, controls, renderer3d, timer, cube);
        stateContext.practiceState = new PracticeState(renderer3d, controls, renderer3d);
        stateContext.solvedState = new SolvedState(stateContext, controls, recordingWrapper);
        stateContext.replayState = new ReplayState(stateContext, renderer3d, recordingWrapper, timer);

        stateContext.setState((parseIndex > 0) ? stateContext.solvedState : stateContext.idleState);

        return 0;
    }

    private implementApply(t: any) {
        t.apply = (turn: Turn): Turnable => {
            t[Turn[turn]]();
            return t;
        };
    }
}