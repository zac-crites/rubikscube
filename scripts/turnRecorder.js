var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./replay", "./timer", "./turnable"], function (require, exports, replay_1, timer_1, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TurnRecorder = /** @class */ (function (_super) {
        __extends(TurnRecorder, _super);
        function TurnRecorder(target, moveData) {
            var _this = _super.call(this, target) || this;
            _this.timer = new timer_1.Timer();
            _this.stopTime = null;
            _this.moves = moveData || [];
            return _this;
        }
        TurnRecorder.prototype.apply = function (t) {
            this.moves.push({
                timestamp: this.timer.getTime(),
                turn: t,
            });
            _super.prototype.apply.call(this, t);
            return this;
        };
        TurnRecorder.prototype.reset = function () {
            this.moves = [];
            this.timer.reset();
        };
        TurnRecorder.prototype.start = function () {
            this.timer.start();
        };
        TurnRecorder.prototype.stop = function () {
            this.stopTime = this.stopTime || this.timer.getTime();
        };
        TurnRecorder.prototype.getReplay = function () {
            return new replay_1.Replay(this.moves);
        };
        return TurnRecorder;
    }(turnable_1.TurnableWrapper));
    exports.TurnRecorder = TurnRecorder;
});
//# sourceMappingURL=turnRecorder.js.map