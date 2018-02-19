define(["require", "exports", "../standardControlScheme"], function (require, exports, standardControlScheme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimedSolveState = /** @class */ (function () {
        function TimedSolveState(context, cube, hotkeys, camera, timer, cubeState) {
            this.context = context;
            this.cube = cube;
            this.hotkeys = hotkeys;
            this.camera = camera;
            this.timer = timer;
            this.cubeState = cubeState;
        }
        TimedSolveState.prototype.enter = function () {
            var _this = this;
            var cube = this.cube;
            var camera = this.camera;
            var wrapper = this.turnCompletedListeningWrapper(cube, function () { return _this.onTurnCompleted(); });
            new standardControlScheme_1.StandardControlScheme().register(this.hotkeys, wrapper, camera);
            this.hotkeys.setupButton("/", "🎲", function () {
                _this.timer.reset();
                _this.context.setState(_this.context.scramblerState);
            });
            this.timer.start();
        };
        TimedSolveState.prototype.exit = function () {
            this.hotkeys.reset();
        };
        TimedSolveState.prototype.onTurnCompleted = function () {
            if (this.cubeState.isSolved()) {
                this.timer.stop();
                this.context.setState(this.context.idleState);
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