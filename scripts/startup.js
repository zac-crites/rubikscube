define(["require", "exports", "./cube", "./currentReplayProvider", "./hotkeys", "./states/countdownState", "./states/idlestate", "./states/logBrowserState", "./states/practiceState", "./states/replayState", "./states/scramblingState", "./states/solvedState", "./states/state", "./states/timedSolveState", "./timer", "./turnable", "./turnRecorder"], function (require, exports, cube_1, currentReplayProvider_1, hotkeys_1, countdownState_1, idlestate_1, logBrowserState_1, practiceState_1, replayState_1, scramblingState_1, solvedState_1, state_1, timedSolveState_1, timer_1, turnable_1, turnRecorder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var renderer3d = new CubeRenderer(cube);
            var controls = new hotkeys_1.Hotkeys(document.getElementById("buttons"));
            var timer = new timer_1.Timer(document.getElementById("timerDisplay"));
            var stateContext = new state_1.StateContext();
            var recordingWrapper = new turnRecorder_1.TurnRecorder(renderer3d);
            var replay = new currentReplayProvider_1.CurrentReplayProvider();
            this.implementEnums(cube);
            this.implementApply(renderer3d);
            stateContext.idleState = new idlestate_1.IdleState(stateContext, controls);
            stateContext.scramblerState = new scramblingState_1.ScramblingState(stateContext, recordingWrapper, recordingWrapper, timer);
            stateContext.countdownState = new countdownState_1.CountdownState(stateContext, timer, controls, recordingWrapper);
            stateContext.practiceState = new practiceState_1.PracticeState(renderer3d, controls, renderer3d);
            stateContext.solvedState = new solvedState_1.SolvedState(stateContext, controls, replay);
            stateContext.replayState = new replayState_1.ReplayState(stateContext, renderer3d, replay, timer);
            stateContext.logBrowserState = new logBrowserState_1.LogBrowserState(stateContext, controls, replay);
            stateContext.solveState = new timedSolveState_1.TimedSolveState(stateContext, recordingWrapper, controls, renderer3d, timer, cube, recordingWrapper, replay);
            stateContext.setState(replay.currentReplay || replay.getLog().length !== 0
                ? stateContext.solvedState
                : stateContext.idleState);
            return 0;
        };
        Startup.prototype.implementEnums = function (t) {
            var _loop_1 = function (i) {
                var idx = i;
                var turn = turnable_1.Turn[idx];
                if (t[turn] === undefined) {
                    t[turn] = function () { return t.apply(idx); };
                }
            };
            for (var i = turnable_1.Turn.X; i <= turnable_1.Turn.ri; i++) {
                _loop_1(i);
            }
        };
        Startup.prototype.implementApply = function (t) {
            t.apply = function (turn) {
                t[turnable_1.Turn[turn]]();
                return t;
            };
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map