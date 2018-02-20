define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var MenuOption = /** @class */ (function () {
        function MenuOption(key, text, callback) {
            this.key = key;
            this.text = text;
            this.callback = callback;
        }
        MenuOption.prototype.toString = function () {
            return this.key + ": " + this.text;
        };
        return MenuOption;
    }());
    exports.MenuOption = MenuOption;
    var Hotkeys = /** @class */ (function () {
        function Hotkeys(element) {
            var _this = this;
            this.actions = {};
            this.elements = {};
            this.rootElement = element;
            this.initialize(element);
            window.addEventListener("keydown", function (ev) { return _this.keyHandler(ev); });
        }
        Hotkeys.prototype.setupButton = function (key, text, action) {
            var k = key.toLowerCase();
            this.actions[k] = action;
            if (this.elements[k]) {
                this.elements[k].textContent = text;
            }
        };
        Hotkeys.prototype.reset = function () {
            var _this = this;
            Object.keys(this.elements).forEach(function (key) { return _this.elements[key].textContent = ""; });
            this.actions = {};
        };
        Hotkeys.prototype.showMenu = function (prompt, options) {
            var _this = this;
            var oldActions = this.actions;
            this.actions = {};
            var menu = document.getElementById("menu");
            var rows = this.rootElement.getElementsByClassName("tr");
            menu.innerHTML = "";
            menu.classList.remove("hidden");
            for (var i = 0; i < rows.length; i++) {
                rows[i].classList.add("hidden");
            }
            return new Promise(function (resolve, reject) {
                var menuHeader = document.createElement("div");
                menuHeader.classList.add("menuheader");
                menuHeader.textContent = prompt;
                menu.appendChild(menuHeader);
                options.forEach(function (option) {
                    var menuoption = document.createElement("div");
                    menuoption.classList.add("menuitem");
                    menuoption.textContent = option.key + ": " + option.text;
                    menu.appendChild(menuoption);
                    _this.actions[option.key.toLowerCase()] = function () { return resolve(option); };
                });
            }).then(function (option) {
                _this.actions = oldActions;
                menu.classList.add("hidden");
                for (var i = 0; i < rows.length; i++) {
                    rows[i].classList.remove("hidden");
                }
                option.callback();
                return option;
            });
        };
        Hotkeys.prototype.keyHandler = function (ev) {
            var action = this.actions[ev.key];
            if (!ev.repeat && action !== undefined) {
                action();
            }
        };
        Hotkeys.prototype.initialize = function (rootElement) {
            var keys = [
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
                ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
            ];
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var row = keys_1[_i];
                this.addRow(rootElement, row);
            }
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
            this.elements[keytext.toLowerCase()] = textDiv;
        };
        return Hotkeys;
    }());
    exports.Hotkeys = Hotkeys;
});
//# sourceMappingURL=hotkeys.js.map