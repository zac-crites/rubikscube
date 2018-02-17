define(["require", "exports", "./cube", "./hotkeys", "./scrambler", "./states/state", "./states/sandbox"], function (require, exports, cube_1, hotkeys_1, scrambler_1, state_1, sandbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var scrambler = new scrambler_1.Scrambler();
            var renderer3d = new CubeRenderer(cube);
            scrambler.scramble(renderer3d);
            var buttons = new hotkeys_1.Hotkeys((document.getElementById("buttons")));
            var stateContext = new state_1.StateContext(new sandbox_1.SandboxState(renderer3d, buttons, renderer3d));
            return 0;
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map