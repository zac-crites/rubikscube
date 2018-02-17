define(["require", "exports", "./cube", "./hotkeys", "./states/state", "./states/sandbox", "./states/scramblingState"], function (require, exports, cube_1, hotkeys_1, state_1, sandbox_1, scramblingState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var renderer3d = new CubeRenderer(cube);
            var controls = new hotkeys_1.Hotkeys((document.getElementById("buttons")));
            var stateContext = new state_1.StateContext();
            var scramble = new scramblingState_1.ScramblingState(stateContext, renderer3d);
            scramble.setNextState(new sandbox_1.SandboxState(renderer3d, controls, renderer3d));
            stateContext.setState(scramble);
            return 0;
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map