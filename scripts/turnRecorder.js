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
define(["require", "exports", "./turnable", "./timer"], function (require, exports, turnable_1, timer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TurnRecorder = /** @class */ (function (_super) {
        __extends(TurnRecorder, _super);
        function TurnRecorder(target, moveData) {
            var _this = _super.call(this, target) || this;
            _this.timer = new timer_1.Timer();
            _this.moves = moveData || [];
            return _this;
        }
        TurnRecorder.prototype.apply = function (turn) {
            this.moves.push({
                turn: turn,
                timestamp: this.timer.getTime()
            });
            _super.prototype.apply.call(this, turn);
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
            return {
                moves: this.moves
            };
        };
        return TurnRecorder;
    }(turnable_1.TurnableWrapper));
    exports.TurnRecorder = TurnRecorder;
});
//# sourceMappingURL=turnRecorder.js.map