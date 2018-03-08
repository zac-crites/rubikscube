import { ICameraControls } from "./cameraControls";
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
import { ITurnable } from "./turnable";
import { TurnRecorder } from "./turnRecorder";

declare var CubeRenderer: any;

export class App {
    public run(): number {
        const cube = new Cube();
        const renderer3d = new CubeRenderer(cube) as ITurnable & ICameraControls;
        const controls = new Hotkeys(document.getElementById("buttons") as HTMLDivElement);
        const timer = new Timer(document.getElementById("timerDisplay") as HTMLDivElement);
        const stateContext = new StateContext();

        const testMesh = new CubeMesh(cube);
        testMesh.CreateScene(document.getElementById("cube4d") as HTMLDivElement);
        const animator = new MeshAnimator( testMesh, cube );

        const recordingWrapper = new TurnRecorder(animator);
        const replay = new CurrentReplayProvider();

        stateContext.idleState = new IdleState(stateContext, controls, replay);
        stateContext.scramblerState = new ScramblingState(
            stateContext, recordingWrapper, recordingWrapper, timer, cube);
        stateContext.countdownState = new CountdownState(stateContext, timer, controls, recordingWrapper);
        stateContext.practiceState = new PracticeState(animator, controls, renderer3d);
        stateContext.solvedState = new SolvedState(stateContext, controls, replay);
        stateContext.replayState = new ReplayState(stateContext, animator, replay, timer);
        stateContext.logBrowserState = new LogBrowserState(stateContext, controls, replay);
        stateContext.solveState = new TimedSolveState(
            stateContext, recordingWrapper, controls, renderer3d, timer, cube, recordingWrapper, replay);

        stateContext.setState(replay.currentReplay
            ? new ReplayStartState(stateContext, replay, controls)
            : stateContext.idleState);

        return 0;
    }
}

new App().run();
