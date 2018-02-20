define(["require", "exports", "./turnable", "./cube", "./hotkeys", "./states/state", "./states/timedSolveState", "./states/scramblingState", "./timer", "./states/countdownState", "./states/idlestate", "./states/practiceState", "./turnRecorder", "./states/solvedState"], function (require, exports, turnable_1, cube_1, hotkeys_1, state_1, timedSolveState_1, scramblingState_1, timer_1, countdownState_1, idlestate_1, practiceState_1, turnRecorder_1, solvedState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var renderer3d = new CubeRenderer(cube);
            var controls = new hotkeys_1.Hotkeys((document.getElementById("buttons")));
            var timer = new timer_1.Timer((document.getElementById("timerDisplay")));
            var stateContext = new state_1.StateContext();
            this.implementApply(renderer3d);
            var recordingWrapper = new turnRecorder_1.TurnRecorder(renderer3d);
            stateContext.idleState = new idlestate_1.IdleState(stateContext, controls, recordingWrapper);
            stateContext.scramblerState = new scramblingState_1.ScramblingState(stateContext, recordingWrapper, recordingWrapper);
            stateContext.countdownState = new countdownState_1.CountdownState(stateContext, timer, controls, recordingWrapper);
            stateContext.solveState = new timedSolveState_1.TimedSolveState(stateContext, recordingWrapper, controls, renderer3d, timer, cube);
            stateContext.practiceState = new practiceState_1.PracticeState(renderer3d, controls, renderer3d);
            stateContext.solvedState = new solvedState_1.SolvedState(stateContext, controls, recordingWrapper);
            stateContext.setState(stateContext.idleState);
            return 0;
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