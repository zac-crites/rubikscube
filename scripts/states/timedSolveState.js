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
define(["require", "exports", "../standardControlScheme", "../turnable"], function (require, exports, standardControlScheme_1, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TimedSolveState = /** @class */ (function () {
        function TimedSolveState(context, cube, hotkeys, camera, timer, cubeState, recorder, currentReplay) {
            this.context = context;
            this.cube = cube;
            this.hotkeys = hotkeys;
            this.camera = camera;
            this.timer = timer;
            this.cubeState = cubeState;
            this.recorder = recorder;
            this.currentReplayProvider = currentReplay;
        }
        TimedSolveState.prototype.enter = function () {
            var _this = this;
            var cube = this.cube;
            var camera = this.camera;
            var wrapper = new TurnCompletedWrapper(cube, function () { return _this.onTurnCompleted(); });
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
                this.recorder.stop();
                this.currentReplayProvider.currentReplay = this.recorder.getReplay();
                this.context.setState(this.context.solvedState);
            }
        };
        return TimedSolveState;
    }());
    exports.TimedSolveState = TimedSolveState;
    var TurnCompletedWrapper = /** @class */ (function (_super) {
        __extends(TurnCompletedWrapper, _super);
        function TurnCompletedWrapper(target, callback) {
            var _this = _super.call(this, target) || this;
            _this.callback = callback;
            return _this;
        }
        TurnCompletedWrapper.prototype.apply = function (turn) {
            var _this = this;
            _super.prototype.apply.call(this, turn);
            _super.prototype.waitForMoves.call(this).then(function () { return _this.callback(); });
            return this;
        };
        return TurnCompletedWrapper;
    }(turnable_1.TurnableWrapper));
});
//# sourceMappingURL=timedSolveState.js.map