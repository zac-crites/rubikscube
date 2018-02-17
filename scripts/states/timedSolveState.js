define(["require", "exports", "../standardControls"], function (require, exports, standardControls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimedSolveState = /** @class */ (function () {
        function TimedSolveState(context, cube, controls, camera, timer) {
            this.context = context;
            this.cube = cube;
            this.controls = new standardControls_1.StandardControls(controls);
            this.camera = camera;
            this.timer = timer;
        }
        TimedSolveState.prototype.enter = function () {
            var cube = this.cube;
            var camera = this.camera;
            camera.refreshFacelets();
            this.controls.register(cube, camera);
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