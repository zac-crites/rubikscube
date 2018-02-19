define(["require", "exports", "./cube", "./hotkeys", "./states/state", "./states/timedSolveState", "./states/scramblingState", "./timer", "./states/countdownState", "./states/idlestate", "./states/practiceState"], function (require, exports, cube_1, hotkeys_1, state_1, timedSolveState_1, scramblingState_1, timer_1, countdownState_1, idlestate_1, practiceState_1) {
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
            stateContext.idleState = new idlestate_1.IdleState(stateContext, controls);
            stateContext.scramblerState = new scramblingState_1.ScramblingState(stateContext, renderer3d);
            stateContext.countdownState = new countdownState_1.CountdownState(stateContext, timer, controls, renderer3d);
            stateContext.solveState = new timedSolveState_1.TimedSolveState(stateContext, renderer3d, controls, renderer3d, timer, cube);
            stateContext.practiceState = new practiceState_1.PracticeState(renderer3d, controls, renderer3d);
            stateContext.setState(stateContext.idleState);
            return 0;
        };
        Startup.prototype.implementApply = function (t) {
            t.apply = function (turn) {
                t[turn]();
                return t;
            };
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map