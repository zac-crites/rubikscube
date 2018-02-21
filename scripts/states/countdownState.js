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
    var CountdownState = /** @class */ (function () {
        function CountdownState(context, timer, hotkeys, cube) {
            this.context = context;
            this.timer = timer;
            this.hotkeys = hotkeys;
            this.cube = cube;
            this.nextState = null;
        }
        CountdownState.prototype.enter = function () {
            var _this = this;
            var cubeWrapper = new SafeCheckWrapper(this.cube, function (isSafe) { return _this.onMove(isSafe); });
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
        CountdownState.prototype.onMove = function (isSafe) {
            if (!isSafe) {
                this.context.setState(this.nextState || this.context.solveState);
            }
        };
        return CountdownState;
    }());
    exports.CountdownState = CountdownState;
    var SafeCheckWrapper = /** @class */ (function (_super) {
        __extends(SafeCheckWrapper, _super);
        function SafeCheckWrapper(target, callback) {
            var _this = _super.call(this, target) || this;
            _this.safeTurns = [turnable_1.Turn.X, turnable_1.Turn.Xi, turnable_1.Turn.Y, turnable_1.Turn.Yi, turnable_1.Turn.Z, turnable_1.Turn.Zi];
            _this.callback = callback;
            return _this;
        }
        SafeCheckWrapper.prototype.apply = function (turn) {
            this.callback(this.safeTurns.some(function (s) { return s === turn; }));
            _super.prototype.apply.call(this, turn);
            return this;
        };
        return SafeCheckWrapper;
    }(turnable_1.TurnableWrapper));
});
//# sourceMappingURL=countdownState.js.map