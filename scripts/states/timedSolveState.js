define(["require", "exports", "../standardControls", "./idlestate"], function (require, exports, standardControls_1, idlestate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimedSolveState = /** @class */ (function () {
        function TimedSolveState(context, cube, controls, camera, timer, cubeState) {
            this.context = context;
            this.cube = cube;
            this.controls = new standardControls_1.StandardControls(controls);
            this.camera = camera;
            this.timer = timer;
            this.cubeState = cubeState;
        }
        TimedSolveState.prototype.enter = function () {
            var _this = this;
            var cube = this.cube;
            var camera = this.camera;
            camera.refreshFacelets();
            var wrapper = this.turnCompletedListeningWrapper(cube, function () { return _this.onTurnCompleted(); });
            this.controls.register(wrapper, camera);
            this.timer.start();
        };
        TimedSolveState.prototype.exit = function () {
            this.controls.reset();
        };
        TimedSolveState.prototype.onTurnCompleted = function () {
            if (this.cubeState.isSolved()) {
                this.timer.stop();
                this.context.setState(new idlestate_1.IdleState(this.context));
            }
        };
        TimedSolveState.prototype.turnCompletedListeningWrapper = function (target, callback) {
            var wrapper = {};
            Object.getOwnPropertyNames(target).forEach(function (name) {
                wrapper[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    target[name].apply(target, args);
                    target.waitForMoves().then(function () {
                        callback();
                    });
                };
            });
            return wrapper;
        };
        return TimedSolveState;
    }());
    exports.TimedSolveState = TimedSolveState;
});
//# sourceMappingURL=timedSolveState.js.map