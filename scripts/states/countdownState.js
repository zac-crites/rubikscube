define(["require", "exports", "../turnable", "../standardControls"], function (require, exports, turnable_1, standardControls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CountdownState = /** @class */ (function () {
        function CountdownState(context, timer, hotkeys, cube) {
            this.context = context;
            this.timer = timer;
            this.controls = new standardControls_1.StandardControls(hotkeys);
            this.cube = cube;
        }
        CountdownState.prototype.enter = function () {
            var _this = this;
            this.controls.register(this.wrap(this.cube, function (safe) { return _this.onMove(safe); }), null);
            this.timer.countdown(15000).then(function () {
                _this.context.setState(_this.nextState || _this.context.solveState);
            });
        };
        CountdownState.prototype.exit = function () {
            this.timer.stop();
            this.controls.reset();
        };
        CountdownState.prototype.setNextState = function (next) {
            this.nextState = next;
        };
        CountdownState.prototype.wrap = function (target, move) {
            var safeTurns = [turnable_1.Turn.X, turnable_1.Turn.Xi, turnable_1.Turn.Y, turnable_1.Turn.Yi, turnable_1.Turn.Z, turnable_1.Turn.Zi];
            var wrapper = {};
            Object.getOwnPropertyNames(target).forEach(function (name) {
                wrapper[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var isSafe = safeTurns.some(function (n) { return turnable_1.Turn[n] === name; });
                    move(isSafe);
                    target[name].apply(target, args);
                };
            });
            return wrapper;
        };
        CountdownState.prototype.onMove = function (isSafe) {
            if (!isSafe) {
                this.context.setState(this.nextState || this.context.solveState);
            }
        };
        return CountdownState;
    }());
    exports.CountdownState = CountdownState;
});
//# sourceMappingURL=countdownState.js.map