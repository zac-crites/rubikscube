define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Timer = /** @class */ (function () {
        function Timer(element) {
            this.interval = 0;
            this.element = element || document.createElement("div");
            element.innerHTML = "&nbsp;";
        }
        Timer.prototype.start = function () {
            var _this = this;
            if (this.interval === 0) {
                this.startTime = new Date();
                this.interval = window.setInterval(function () { return _this.update(); }, 16);
            }
        };
        Timer.prototype.countdown = function (duration) {
            var _this = this;
            this.startTime = new Date();
            this.startTime.setTime(this.startTime.getTime() + duration);
            return new Promise(function (resolve) {
                _this.interval = window.setInterval(function () {
                    _this.update();
                    if (new Date().getTime() > _this.startTime.getTime()) {
                        _this.stop();
                        resolve();
                    }
                }, 16);
            });
        };
        Timer.prototype.stop = function () {
            if (this.interval !== 0) {
                this.update();
                window.clearInterval(this.interval);
                this.interval = 0;
            }
        };
        Timer.prototype.reset = function () {
            this.stop();
            this.element.innerHTML = "&nbsp;";
        };
        Timer.prototype.update = function () {
            var diff = new Date().getTime() - this.startTime.getTime();
            this.element.innerHTML = this.displayDuration(diff);
        };
        Timer.prototype.displayDuration = function (duration) {
            if (duration < 0) {
                return Math.floor(duration / 1000).toString();
            }
            var minutes = Math.floor(duration / 60000);
            var seconds = (duration % 60000) / 1000;
            return (minutes > 0 ? (minutes + ":" + (seconds < 10 ? "0" : "")) : "") + seconds.toFixed(2);
        };
        return Timer;
    }());
    exports.Timer = Timer;
});
//# sourceMappingURL=timer.js.map