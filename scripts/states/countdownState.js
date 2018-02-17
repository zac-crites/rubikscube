define(["require", "exports", "../standardControls"], function (require, exports, standardControls_1) {
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
            this.controls.register(this.wrap(this.cube, function (legal) { return _this.onMove(legal); }), null);
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
            var legalNames = ["X", "Xi", "Y", "Yi", "Z", "Zi"];
            var wrapper = {};
            Object.getOwnPropertyNames(target).forEach(function (name) {
                wrapper[name] = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var isLegal = legalNames.some(function (n) { return n === name; });
                    move(isLegal);
                    target[name].apply(target, args);
                };
            });
            return wrapper;
        };
        CountdownState.prototype.onMove = function (isLegal) {
            if (!isLegal) {
                this.context.setState(this.nextState || this.context.solveState);
            }
        };
        return CountdownState;
    }());
    exports.CountdownState = CountdownState;
});
//# sourceMappingURL=countdownState.js.map