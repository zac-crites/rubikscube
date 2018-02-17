define(["require", "exports", "./cube"], function (require, exports, cube_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Startup = /** @class */ (function () {
        function Startup() {
        }
        Startup.prototype.run = function () {
            var cube = new cube_1.Cube();
            var renderer3d = new CubeRenderer(cube);
            var buttons = new KeyboardControls();
            buttons.AddButton("Z'", function () { return renderer3d.Zi(); }, 81, "Q");
            buttons.AddButton("B", function () { return renderer3d.B(); }, 87, "W");
            buttons.AddButton("L'", function () { return renderer3d.Li(); }, 69, "E");
            buttons.AddButton("I'", function () { return renderer3d.Ii(); }, 82, "R");
            buttons.AddButton("", function () { }, 84, "T");
            buttons.AddButton("X", function () { return renderer3d.X(); }, 89, "Y");
            buttons.AddButton("r", function () { return renderer3d.r(); }, 85, "U");
            buttons.AddButton("R", function () { return renderer3d.R(); }, 73, "I");
            buttons.AddButton("B'", function () { return renderer3d.Bi(); }, 79, "O");
            buttons.AddButton("Z", function () { return renderer3d.Z(); }, 80, "P");
            buttons.AddButton("Y'", function () { return renderer3d.Yi(); }, 65, "A");
            buttons.AddButton("D", function () { return renderer3d.D(); }, 83, "S");
            buttons.AddButton("L", function () { return renderer3d.L(); }, 68, "D");
            buttons.AddButton("U'", function () { return renderer3d.Ui(); }, 70, "F");
            buttons.AddButton("F'", function () { return renderer3d.Fi(); }, 71, "G");
            buttons.AddButton("F", function () { return renderer3d.F(); }, 72, "H");
            buttons.AddButton("U", function () { return renderer3d.U(); }, 74, "J");
            buttons.AddButton("R'", function () { return renderer3d.Ri(); }, 75, "K");
            buttons.AddButton("D'", function () { return renderer3d.Di(); }, 76, "L");
            buttons.AddButton("Y", function () { return renderer3d.Y(); }, 186, ";");
            buttons.AddButton("📹", function () { return renderer3d.ResetCamera(); }, 90, "Z", "Reset camera");
            buttons.AddButton("", function () { }, 88, "X");
            buttons.AddButton("", function () { }, -1, "C");
            buttons.AddButton("I", function () { return renderer3d.I(); }, 86, "V");
            buttons.AddButton("", function () { }, -1, "B");
            buttons.AddButton("X'", function () { return renderer3d.Xi(); }, 78, "N");
            buttons.AddButton("r'", function () { return renderer3d.ri(); }, 77, "M");
            buttons.AddButton("", function () { }, -1, ",");
            buttons.AddButton("", function () { }, 190, ".");
            buttons.AddButton("", function () { }, 191, "/");
            return 0;
        };
        return Startup;
    }());
    exports.Startup = Startup;
});
//# sourceMappingURL=startup.js.map