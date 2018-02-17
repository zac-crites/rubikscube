define(["require", "exports", "./cube", "./hotkeys", "./scrambler"], function (require, exports, cube_1, hotkeys_1, scrambler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var scrambler = new scrambler_1.Scrambler();
            scrambler.scramble(cube);
            var renderer3d = new CubeRenderer(cube);
            var buttons = new hotkeys_1.Hotkeys((document.getElementById("buttons")));
            var cubeBindings = [
                ["q", "Z'", renderer3d.Zi],
                ["w", "B", renderer3d.B],
                ["e", "L'", renderer3d.Li],
                ["r", "I'", renderer3d.Ii],
                ["y", "X", renderer3d.X],
                ["u", "r", renderer3d.r],
                ["i", "R", renderer3d.R],
                ["o", "B'", renderer3d.Bi],
                ["p", "Z", renderer3d.Z],
                ["a", "Y'", renderer3d.Yi],
                ["s", "D", renderer3d.D],
                ["d", "L", renderer3d.L],
                ["f", "U'", renderer3d.Ui],
                ["g", "F'", renderer3d.Fi],
                ["h", "F", renderer3d.F],
                ["j", "U", renderer3d.U],
                ["k", "R'", renderer3d.Ri],
                ["l", "D'", renderer3d.Di],
                [";", "Y", renderer3d.Y],
                ["z", "📹", renderer3d.ResetCamera],
                ["v", "I", renderer3d.I],
                ["n", "X'", renderer3d.Xi],
                ["m", "r'", renderer3d.ri],
            ];
            cubeBindings.forEach(function (binding) {
                buttons.setupButton(binding[0], binding[1], binding[2]);
            });
            return 0;
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map