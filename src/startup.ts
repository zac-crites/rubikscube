import { ICameraControls } from "./cameraControls";
import { Cube } from "./cube";
import { Hotkeys } from "./hotkeys";
import { CountdownState } from "./states/countdownState";
import { IdleState } from "./states/idlestate";
import { PracticeState } from "./states/practiceState";
import { ReplayState } from "./states/replayState";
import { ScramblingState } from "./states/scramblingState";
import { SolvedState } from "./states/solvedState";
import { StateContext } from "./states/state";
import { TimedSolveState } from "./states/timedSolveState";
import { Timer } from "./timer";
import { ITurnable, Turn } from "./turnable";
import { CurrentReplayProvider, TurnRecorder } from "./turnRecorder";

declare var CubeRenderer: any;

export class Startup {
    public run(): number {
        const cube = new Cube();
        const renderer3d = new CubeRenderer(cube) as ITurnable & ICameraControls;
        const controls = new Hotkeys(document.getElementById("buttons") as HTMLDivElement);
        const timer = new Timer(document.getElementById("timerDisplay") as HTMLDivElement);
        const stateContext = new StateContext();

        const recordingWrapper = new TurnRecorder(renderer3d);
        const replay = new CurrentReplayProvider();

        this.implementApply(renderer3d);

        stateContext.idleState = new IdleState(stateContext, controls);
        stateContext.scramblerState = new ScramblingState(stateContext, recordingWrapper, recordingWrapper, timer);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, recordingWrapper);
        stateContext.practiceState = new PracticeState(renderer3d, controls, renderer3d);
        stateContext.solvedState = new SolvedState(stateContext, controls);
        stateContext.replayState = new ReplayState(stateContext, renderer3d, replay, timer);
        stateContext.solveState = new TimedSolveState(
            stateContext, recordingWrapper, controls, renderer3d, timer, cube, recordingWrapper, replay);

        stateContext.setState(replay.currentReplay !== null ? stateContext.solvedState : stateContext.idleState);

        return 0;
    }

    private implementApply(t: any) {
        t.apply = (turn: Turn): ITurnable => {
            t[Turn[turn]]();
            return t;
        };
    }
}
