define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var KeyData = /** @class */ (function () {
        function KeyData(_a) {
            var key = _a.key, element = _a.element;
            this.key = key;
            this.element = element;
        }
        return KeyData;
    }());
    var Hotkeys = /** @class */ (function () {
        function Hotkeys(element) {
            var _this = this;
            this.keyMap = {};
            this.initializeUI(element);
            window.addEventListener("keydown", function (ev) { return _this.keyHandler(ev); });
        }
        Hotkeys.prototype.setupButton = function (key, text, action) {
            this.keyMap[key.toLowerCase()].element.textContent = text;
            this.keyMap[key.toLowerCase()].action = action;
        };
        Hotkeys.prototype.reset = function () {
            var _this = this;
            Object.keys(this.keyMap).forEach(function (key) {
                _this.keyMap[key].action = undefined;
                _this.keyMap[key].element.innerText = null;
            });
        };
        Hotkeys.prototype.keyHandler = function (ev) {
            var data = this.keyMap[ev.key];
            if (data === undefined || data.action === undefined) {
                return;
            }
            data.action();
        };
        Hotkeys.prototype.initializeUI = function (rootElement) {
            this.addRow(rootElement, ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]);
            this.addRow(rootElement, ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"]);
            this.addRow(rootElement, ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]);
        };
        Hotkeys.prototype.addRow = function (rootElement, buttons) {
            var currentRow = (document.createElement('div'));
            currentRow.classList.add("tr");
            rootElement.appendChild(currentRow);
            for (var i = 0; i < buttons.length; i++) {
                this.addButton(currentRow, buttons[i], "");
            }
        };
        Hotkeys.prototype.addButton = function (row, keytext, text) {
            var keyDiv = (document.createElement('div'));
            keyDiv.classList.add("keybind");
            keyDiv.textContent = keytext;
            var textDiv = (document.createElement('div'));
            textDiv.classList.add("buttontext");
            textDiv.textContent = text;
            var button = (document.createElement('div'));
            button.classList.add("movebutton");
            button.classList.add("td");
            button.appendChild(keyDiv);
            button.appendChild(textDiv);
            row.appendChild(button);
            this.keyMap[keytext.toLowerCase()] = new KeyData({
                key: keytext,
                element: textDiv
            });
        };
        return Hotkeys;
    }());
    exports.Hotkeys = Hotkeys;
});
//# sourceMappingURL=hotkeys.js.map