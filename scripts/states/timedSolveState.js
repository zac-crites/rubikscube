define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimedSolveState = /** @class */ (function () {
        function TimedSolveState(context, cube, controls, camera, timer) {
            this.context = context;
            this.cube = cube;
            this.controls = controls;
            this.camera = camera;
            this.timer = timer;
        }
        TimedSolveState.prototype.enter = function () {
            var _this = this;
            var cube = this.cube;
            var camera = this.camera;
            camera.refreshFacelets();
            var cubeBindings = [
                ["q", "Z'", cube.Zi],
                ["w", "B", cube.B],
                ["e", "L'", cube.Li],
                ["r", "I'", cube.Ii],
                ["y", "X", cube.X],
                ["u", "r", cube.r],
                ["i", "R", cube.R],
                ["o", "B'", cube.Bi],
                ["p", "Z", cube.Z],
                ["a", "Y'", cube.Yi],
                ["s", "D", cube.D],
                ["d", "L", cube.L],
                ["f", "U'", cube.Ui],
                ["g", "F'", cube.Fi],
                ["h", "F", cube.F],
                ["j", "U", cube.U],
                ["k", "R'", cube.Ri],
                ["l", "D'", cube.Di],
                [";", "Y", cube.Y],
                ["v", "I", cube.I],
                ["n", "X'", cube.Xi],
                ["m", "r'", cube.ri],
                ["z", "📹", camera.resetCamera],
                ["/", "🎲", function () { return _this.context.setState(_this.context.scramblerState); }]
            ];
            cubeBindings.forEach(function (binding) {
                _this.controls.setupButton(binding[0], binding[1], binding[2]);
            });
            this.timer.start();
        };
        TimedSolveState.prototype.exit = function () {
            this.timer.reset();
            this.controls.reset();
        };
        return TimedSolveState;
    }());
    exports.TimedSolveState = TimedSolveState;
});
//# sourceMappingURL=timedSolveState.js.map