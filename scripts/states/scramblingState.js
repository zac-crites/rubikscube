define(["require", "exports", "../scrambler"], function (require, exports, scrambler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScramblingState = /** @class */ (function () {
        function ScramblingState(context, cube, recorder, timer, state) {
            this.context = context;
            this.cube = cube;
            this.recorder = recorder;
            this.timer = timer;
            this.scrambler = new scrambler_1.Scrambler();
            this.nextState = null;
            this.state = state;
        }
        ScramblingState.prototype.enter = function () {
            var _this = this;
            if (!this.state.isSolved()) {
                this.state.reset();
            }
            this.timer.reset();
            this.recorder.reset();
            this.scrambler.scramble(this.cube, 30);
            this.recorder.start();
            this.cube.waitForMoves().then(function () {
                _this.context.setState(_this.nextState || _this.context.countdownState);
                _this.nextState = null;
            });
        };
        ScramblingState.prototype.exit = function () {
            return;
        };
        ScramblingState.prototype.setNextState = function (next) {
            this.nextState = next;
        };
        return ScramblingState;
    }());
    exports.ScramblingState = ScramblingState;
});
//# sourceMappingURL=scramblingState.js.map