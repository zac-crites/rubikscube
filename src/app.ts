import { Cube } from "./cube";
import { CubeMesh } from "./cubeMesh";
import { CurrentReplayProvider } from "./currentReplayProvider";
import { Hotkeys } from "./hotkeys";
import { MeshAnimator } from "./meshAnimator";
import { CountdownState } from "./states/countdownState";
import { IdleState } from "./states/idlestate";
import { LogBrowserState } from "./states/logBrowserState";
import { PracticeState } from "./states/practiceState";
import { ReplayStartState } from "./states/replayStartState";
import { ReplayState } from "./states/replayState";
import { ScramblingState } from "./states/scramblingState";
import { SolvedState } from "./states/solvedState";
import { StateContext } from "./states/state";
import { TimedSolveState } from "./states/timedSolveState";
import { Timer } from "./timer";
import { TurnRecorder } from "./turnRecorder";

export class App {
    public run(): number {
        const cube = new Cube();
        const controls = new Hotkeys(document.getElementById("buttons") as HTMLDivElement);
        const timer = new Timer(document.getElementById("timerDisplay") as HTMLDivElement);
        const stateContext = new StateContext();

        const cubeMesh = new CubeMesh(cube);
        const camera = cubeMesh.CreateScene(document.getElementById("cube3d") as HTMLDivElement);
        const animator = new MeshAnimator( cubeMesh, cube );

        const recordingWrapper = new TurnRecorder(animator);
        const replay = new CurrentReplayProvider();

        stateContext.idleState = new IdleState(stateContext, controls, replay);
        stateContext.scramblerState = new ScramblingState(
            stateContext, recordingWrapper, recordingWrapper, timer, cube);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, recordingWrapper);
        stateContext.practiceState = new PracticeState(animator, controls, camera);
        stateContext.solvedState = new SolvedState(stateContext, controls, replay);
        stateContext.replayState = new ReplayState(stateContext, animator, replay, timer);
        stateContext.logBrowserState = new LogBrowserState(stateContext, controls, replay);
        stateContext.solveState = new TimedSolveState(
            stateContext, recordingWrapper, controls, camera, timer, cube, recordingWrapper, replay);

        stateContext.setState(replay.currentReplay
            ? new ReplayStartState(stateContext, replay, controls)
            : stateContext.idleState);

        return 0;
    }
}

new App().run();
