define(["require", "exports", "../turnable", "../standardControlScheme"], function (require, exports, turnable_1, standardControlScheme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CountdownState = /** @class */ (function () {
        function CountdownState(context, timer, hotkeys, cube) {
            this.context = context;
            this.timer = timer;
            this.hotkeys = hotkeys;
            this.cube = cube;
        }
        CountdownState.prototype.enter = function () {
            var _this = this;
            var cubeWrapper = this.wrap(this.cube, function (safe) { return _this.onMove(safe); });
            new standardControlScheme_1.StandardControlScheme().register(this.hotkeys, cubeWrapper);
            this.hotkeys.setupButton("/", "🎲", function () { return _this.context.setState(_this.context.scramblerState); });
            this.timer.countdown(15000).then(function () {
                _this.context.setState(_this.nextState || _this.context.solveState);
            });
        };
        CountdownState.prototype.exit = function () {
            this.timer.reset();
            this.hotkeys.reset();
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