define(["require", "exports", "../scrambler"], function (require, exports, scrambler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScramblingState = /** @class */ (function () {
        function ScramblingState(context, cube, recorder) {
            this.context = context;
            this.cube = cube;
            this.recorder = recorder;
            this.scrambler = new scrambler_1.Scrambler();
        }
        ScramblingState.prototype.enter = function () {
            var _this = this;
            this.recorder.start();
            this.scrambler.scramble(this.cube, 30);
            this.cube.waitForMoves().then(function () {
                _this.context.setState(_this.nextState || _this.context.countdownState);
            });
        };
        ScramblingState.prototype.exit = function () {
        };
        ScramblingState.prototype.setNextState = function (next) {
            this.nextState = next;
        };
        return ScramblingState;
    }());
    exports.ScramblingState = ScramblingState;
});
//# sourceMappingURL=scramblingState.js.map