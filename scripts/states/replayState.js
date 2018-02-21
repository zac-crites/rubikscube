define(["require", "exports", "../timer", "../turnable"], function (require, exports, timer_1, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ReplayState = /** @class */ (function () {
        function ReplayState(context, target, replay, timer) {
            this.context = context;
            this.target = target;
            this.replay = replay;
            this.displayTimer = timer;
        }
        ReplayState.prototype.enter = function () {
            this.displayTimer.reset();
            this.start();
        };
        ReplayState.prototype.exit = function () {
            return;
        };
        ReplayState.prototype.start = function () {
            var _this = this;
            if (this.replay.currentReplay === null) {
                this.context.setState(this.context.idleState);
                return;
            }
            var replay = this.replay.currentReplay;
            var replayTimer = new timer_1.Timer();
            var started = false;
            var i = 0;
            var update;
            while (i < replay.moves.length && replay.moves[i].timestamp === 0) {
                this.target.apply(replay.moves[i].turn);
                i++;
            }
            update = function () {
                while (i < replay.moves.length && replay.moves[i].timestamp < replayTimer.getTime()) {
                    var move = replay.moves[i];
                    if (move.turn > turnable_1.Turn.Z2 && !started) {
                        started = true;
                        _this.displayTimer.reset();
                        _this.displayTimer.start();
                    }
                    _this.target.apply(move.turn);
                    i++;
                }
                if (i >= replay.moves.length) {
                    _this.target.waitForMoves().then(function () {
                        _this.displayTimer.stop();
                        _this.context.setState(_this.context.solvedState);
                    });
                }
                else {
                    setTimeout(update, 100);
                }
            };
            this.target.waitForMoves().then(function () {
                _this.displayTimer.countdown(15000);
                replayTimer.start();
                update();
            });
        };
        return ReplayState;
    }());
    exports.ReplayState = ReplayState;
});
//# sourceMappingURL=replayState.js.map