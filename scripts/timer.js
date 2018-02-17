define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Timer = /** @class */ (function () {
        function Timer(element) {
            this.interval = 0;
            this.element = element;
            element.innerText = "-.--";
        }
        Timer.prototype.start = function (startTime) {
            var _this = this;
            this.startTime = startTime || new Date();
            this.interval = window.setInterval(function () { return _this.update(); }, 16);
        };
        Timer.prototype.stop = function () {
            this.update();
            if (this.interval !== 0) {
                window.clearInterval(this.interval);
                this.interval = 0;
            }
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