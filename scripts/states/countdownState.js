define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CountdownState = /** @class */ (function () {
        function CountdownState(context, timer) {
            this.context = context;
            this.timer = timer;
        }
        CountdownState.prototype.enter = function () {
            var _this = this;
            this.timer.countdown(15000).then(function () {
                _this.context.setState(_this.nextState || _this.context.solveState);
            });
        };
        CountdownState.prototype.exit = function () {
            this.timer.stop();
        };
        CountdownState.prototype.setNextState = function (next) {
            this.nextState = next;
        };
        return CountdownState;
    }());
    exports.CountdownState = CountdownState;
});
//# sourceMappingURL=countdownState.js.map