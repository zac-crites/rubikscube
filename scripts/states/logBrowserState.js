define(["require", "exports", "../hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LogBrowserState = /** @class */ (function () {
        function LogBrowserState(context, keys, replay) {
            this.context = context;
            this.replay = replay;
            this.hotkeys = keys;
            this.lastMenu = 0;
        }
        LogBrowserState.prototype.enter = function () {
            if (this.replay.getLog().length === 0) {
                this.context.setState(this.context.idleState);
                return;
            }
            this.showMenu(Math.min(this.lastMenu, this.replay.getLog().length - 1));
            return;
        };
        LogBrowserState.prototype.exit = function () {
            this.hotkeys.reset();
        };
        LogBrowserState.prototype.showMenu = function (i) {
            var _this = this;
            this.lastMenu = i;
            var solves = this.replay.getLog();
            var duration = solves[i].duration;
            this.hotkeys.showMenu("" + (i + 1) + "/" + solves.length + " - Solve ( " + (duration / 1000) + " )", [
                new hotkeys_1.MenuOption("d", "Back", function () { return _this.showMenu((i - 1 + solves.length) % solves.length); }),
                new hotkeys_1.MenuOption("f", "Next", function () { return _this.showMenu((i + 1) % solves.length); }),
                new hotkeys_1.MenuOption("j", "Replay", function () { return _this.startReplay(i); }),
                new hotkeys_1.MenuOption("k", "Cancel", function () { return _this.context.setState(_this.context.solvedState); }),
            ]);
        };
        LogBrowserState.prototype.startReplay = function (i) {
            this.replay.currentReplay = this.replay.getLog()[i];
            this.context.setState(this.context.replayState);
        };
        return LogBrowserState;
    }());
    exports.LogBrowserState = LogBrowserState;
});
//# sourceMappingURL=logBrowserState.js.map