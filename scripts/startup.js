define(["require", "exports", "./cube", "./hotkeys", "./states/state", "./states/sandbox", "./states/scramblingState", "./timer"], function (require, exports, cube_1, hotkeys_1, state_1, sandbox_1, scramblingState_1, timer_1) {
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
            stateContext.scramblerState = new scramblingState_1.ScramblingState(stateContext, renderer3d);
            stateContext.solveState = new sandbox_1.SandboxState(stateContext, renderer3d, controls, renderer3d, timer);
            stateContext.setState(stateContext.scramblerState);
            return 0;
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map