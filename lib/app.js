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
define("cameraControls", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("turnable", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Turn;
    (function (Turn) {
        Turn[Turn["X"] = 0] = "X";
        Turn[Turn["Y"] = 1] = "Y";
        Turn[Turn["Z"] = 2] = "Z";
        Turn[Turn["Xi"] = 3] = "Xi";
        Turn[Turn["Yi"] = 4] = "Yi";
        Turn[Turn["Zi"] = 5] = "Zi";
        Turn[Turn["X2"] = 6] = "X2";
        Turn[Turn["Y2"] = 7] = "Y2";
        Turn[Turn["Z2"] = 8] = "Z2";
        Turn[Turn["U"] = 9] = "U";
        Turn[Turn["D"] = 10] = "D";
        Turn[Turn["L"] = 11] = "L";
        Turn[Turn["R"] = 12] = "R";
        Turn[Turn["F"] = 13] = "F";
        Turn[Turn["B"] = 14] = "B";
        Turn[Turn["Ui"] = 15] = "Ui";
        Turn[Turn["Di"] = 16] = "Di";
        Turn[Turn["Li"] = 17] = "Li";
        Turn[Turn["Ri"] = 18] = "Ri";
        Turn[Turn["Fi"] = 19] = "Fi";
        Turn[Turn["Bi"] = 20] = "Bi";
        Turn[Turn["U2"] = 21] = "U2";
        Turn[Turn["D2"] = 22] = "D2";
        Turn[Turn["L2"] = 23] = "L2";
        Turn[Turn["R2"] = 24] = "R2";
        Turn[Turn["F2"] = 25] = "F2";
        Turn[Turn["B2"] = 26] = "B2";
        Turn[Turn["I"] = 27] = "I";
        Turn[Turn["Ii"] = 28] = "Ii";
        Turn[Turn["r"] = 29] = "r";
        Turn[Turn["ri"] = 30] = "ri";
    })(Turn = exports.Turn || (exports.Turn = {}));
    var TurnableWrapper = /** @class */ (function () {
        function TurnableWrapper(target) {
            this.target = target;
        }
        TurnableWrapper.prototype.apply = function (turn) {
            this.target.apply(turn);
            return this;
        };
        TurnableWrapper.prototype.waitForMoves = function () {
            return this.target.waitForMoves();
        };
        return TurnableWrapper;
    }());
    exports.TurnableWrapper = TurnableWrapper;
});
define("cube", ["require", "exports", "turnable"], function (require, exports, turnable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Face;
    (function (Face) {
        Face[Face["U"] = 0] = "U";
        Face[Face["L"] = 1] = "L";
        Face[Face["F"] = 2] = "F";
        Face[Face["R"] = 3] = "R";
        Face[Face["B"] = 4] = "B";
        Face[Face["D"] = 5] = "D";
    })(Face = exports.Face || (exports.Face = {}));
    var Cube = /** @class */ (function () {
        function Cube() {
            this.faces = [];
            this.reset();
        }
        Cube.prototype.reset = function () {
            this.faces = [];
            for (var i = 0; i < 6; i++) {
                this.faces.push(this.faceData(i));
            }
        };
        Cube.prototype.isSolved = function () {
            return this.faces.every(function (face) { return face.facelets.every(function (facelet) { return facelet === face.center; }); });
        };
        Cube.prototype.getFacelet = function (face, i) {
            if (i === undefined) {
                return this.faces[face].center;
            }
            return this.faces[face].facelets[i];
        };
        Cube.prototype.waitForMoves = function () {
            return Promise.resolve();
        };
        Cube.prototype.apply = function (turn) {
            if (typeof turn !== "number") {
                var turnList = turn;
                for (var _i = 0, turnList_1 = turnList; _i < turnList_1.length; _i++) {
                    var t = turnList_1[_i];
                    this.apply(t);
                }
                return this;
            }
            switch (turn) {
                case turnable_1.Turn.X:
                    return this.X();
                case turnable_1.Turn.Y:
                    return this.Y();
                case turnable_1.Turn.Z:
                    return this.Z();
                case turnable_1.Turn.U:
                    return this.U();
                case turnable_1.Turn.Xi:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.X, turnable_1.Turn.X]);
                case turnable_1.Turn.Yi:
                    return this.apply([turnable_1.Turn.Y, turnable_1.Turn.Y, turnable_1.Turn.Y]);
                case turnable_1.Turn.Zi:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.Z, turnable_1.Turn.Z]);
                case turnable_1.Turn.X2:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.X]);
                case turnable_1.Turn.Y2:
                    return this.apply([turnable_1.Turn.Y, turnable_1.Turn.Y]);
                case turnable_1.Turn.Z2:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.Z]);
                case turnable_1.Turn.D:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.F, turnable_1.Turn.Xi]);
                case turnable_1.Turn.L:
                    return this.apply([turnable_1.Turn.Z, turnable_1.Turn.U, turnable_1.Turn.Zi]);
                case turnable_1.Turn.R:
                    return this.apply([turnable_1.Turn.Zi, turnable_1.Turn.U, turnable_1.Turn.Z]);
                case turnable_1.Turn.F:
                    return this.apply([turnable_1.Turn.X, turnable_1.Turn.U, turnable_1.Turn.Xi]);
                case turnable_1.Turn.B:
                    return this.apply([turnable_1.Turn.Xi, turnable_1.Turn.U, turnable_1.Turn.X]);
                case turnable_1.Turn.Ui:
                    return this.apply([turnable_1.Turn.U, turnable_1.Turn.U, turnable_1.Turn.U]);
                case turnable_1.Turn.Di:
                    return this.apply([turnable_1.Turn.D2, turnable_1.Turn.D]);
                case turnable_1.Turn.Li:
                    return this.apply([turnable_1.Turn.L2, turnable_1.Turn.L]);
                case turnable_1.Turn.Ri:
                    return this.apply([turnable_1.Turn.R2, turnable_1.Turn.R]);
                case turnable_1.Turn.Fi:
                    return this.apply([turnable_1.Turn.F2, turnable_1.Turn.F]);
                case turnable_1.Turn.Bi:
                    return this.apply([turnable_1.Turn.B2, turnable_1.Turn.B]);
                case turnable_1.Turn.U2:
                    return this.apply([turnable_1.Turn.U, turnable_1.Turn.U]);
                case turnable_1.Turn.D2:
                    return this.apply([turnable_1.Turn.D, turnable_1.Turn.D]);
                case turnable_1.Turn.L2:
                    return this.apply([turnable_1.Turn.L, turnable_1.Turn.L]);
                case turnable_1.Turn.R2:
                    return this.apply([turnable_1.Turn.R, turnable_1.Turn.R]);
                case turnable_1.Turn.F2:
                    return this.apply([turnable_1.Turn.F, turnable_1.Turn.F]);
                case turnable_1.Turn.B2:
                    return this.apply([turnable_1.Turn.B, turnable_1.Turn.B]);
                case turnable_1.Turn.I:
                    return this.apply([turnable_1.Turn.R, turnable_1.Turn.X]);
                case turnable_1.Turn.Ii:
                    return this.apply([turnable_1.Turn.Ri, turnable_1.Turn.Xi]);
                case turnable_1.Turn.r:
                    return this.apply([turnable_1.Turn.Li, turnable_1.Turn.Xi]);
                case turnable_1.Turn.ri:
                    return this.apply([turnable_1.Turn.Li, turnable_1.Turn.Xi]);
            }
            return this;
        };
        Cube.prototype.X = function () {
            this.rotateFace(this.faces[1], 1);
            this.rotateFace(this.faces[3], 3);
            var tmp = this.faces[0];
            this.faces[0] = this.faces[2];
            this.faces[2] = this.faces[5];
            this.faces[5] = this.faces[4];
            this.rotateFace(this.faces[5], 2);
            this.faces[4] = tmp;
            this.rotateFace(this.faces[4], 2);
            return this;
        };
        Cube.prototype.Y = function () {
            this.rotateFace(this.faces[0], 3);
            this.rotateFace(this.faces[5], 1);
            var tmp = this.faces[1];
            this.faces[1] = this.faces[2];
            this.faces[2] = this.faces[3];
            this.faces[3] = this.faces[4];
            this.faces[4] = tmp;
            return this;
        };
        Cube.prototype.Z = function () {
            this.rotateFace(this.faces[2], 3);
            this.rotateFace(this.faces[4], 1);
            var tmp = this.faces[0];
            this.faces[0] = this.faces[1];
            this.rotateFace(this.faces[0], 3);
            this.faces[1] = this.faces[5];
            this.rotateFace(this.faces[1], 3);
            this.faces[5] = this.faces[3];
            this.rotateFace(this.faces[5], 3);
            this.faces[3] = tmp;
            this.rotateFace(this.faces[3], 3);
            return this;
        };
        Cube.prototype.U = function () {
            this.rotateFace(this.faces[0], 3);
            this.shift(0);
            this.shift(1);
            this.shift(2);
            return this;
        };
        Cube.prototype.faceData = function (face) {
            var facelets = [];
            for (var i = 0; i < 8; i++) {
                facelets.push(face);
            }
            return {
                get center() { return face; },
                get facelets() { return facelets; },
            };
        };
        Cube.prototype.replace = function (f, i, value) {
            var tmp = f.facelets[i];
            f.facelets[i] = value;
            return tmp;
        };
        Cube.prototype.shift = function (i) {
            var f = this.faces;
            this.replace(f[1], i, this.replace(f[2], i, this.replace(f[3], i, this.replace(f[4], i, f[1].facelets[i]))));
        };
        Cube.prototype.rotateFace = function (face, times) {
            for (var i = 0; i < times * 2; i++) {
                face.facelets.push(face.facelets.splice(0, 1)[0]);
            }
        };
        return Cube;
    }());
    exports.Cube = Cube;
});
define("replay", ["require", "exports", "turnable"], function (require, exports, turnable_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Replay = /** @class */ (function () {
        function Replay(moves) {
            this.moves = moves || [];
        }
        Object.defineProperty(Replay.prototype, "duration", {
            get: function () {
                var s = 133;
                var lastMoveFinishTime = this.moves.reduce(function (acc, m) { return Math.max(acc + s, m.timestamp + s); }, 0);
                var startMove = this.moves.find(function (move) { return move.timestamp > 0 && move.turn > turnable_2.Turn.Z2; });
                var startMoveTime = startMove ? startMove.timestamp : 0;
                return lastMoveFinishTime - startMoveTime;
            },
            enumerable: true,
            configurable: true
        });
        return Replay;
    }());
    exports.Replay = Replay;
});
define("replayConverter", ["require", "exports", "replay", "turnable"], function (require, exports, replay_1, turnable_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // tslint:disable:no-bitwise
    var ReplayConverter = /** @class */ (function () {
        function ReplayConverter() {
            this.timeResolution = 150;
        }
        ReplayConverter.prototype.replayToString = function (replay) {
            var bytes = [];
            var lastTimestamp = 0;
            for (var _i = 0, _a = replay.moves; _i < _a.length; _i++) {
                var move = _a[_i];
                var id = move.turn << 3;
                if (move.timestamp > lastTimestamp) {
                    var offset = move.timestamp - lastTimestamp;
                    var ticks = Math.floor(offset / this.timeResolution);
                    lastTimestamp += ticks * this.timeResolution;
                    while (ticks >= 8) {
                        bytes.push((turnable_3.Turn.ri + 1) << 3);
                        ticks -= 8;
                    }
                    id += ticks;
                }
                bytes.push(id);
            }
            var i = 0;
            var arr = new Uint8Array(bytes.length);
            bytes.forEach(function (byte) { return arr[i++] = byte; });
            return btoa(String.fromCharCode.apply(null, arr));
        };
        ReplayConverter.prototype.stringToReplay = function (replayString) {
            var newMoveList = [];
            var decodedMovesAsStr = atob(replayString);
            var timeRes = this.timeResolution;
            var currentTimestamp = 0;
            Array.prototype.forEach.call(decodedMovesAsStr, function (char) {
                var i = char.charCodeAt(0) >> 3;
                var t = char.charCodeAt(0) % 8;
                currentTimestamp += timeRes * t;
                if (i > turnable_3.Turn.ri) {
                    currentTimestamp += timeRes * 8;
                }
                else {
                    newMoveList.push({
                        timestamp: currentTimestamp,
                        turn: i,
                    });
                }
            });
            return new replay_1.Replay(newMoveList);
        };
        return ReplayConverter;
    }());
    exports.ReplayConverter = ReplayConverter;
});
define("currentReplayProvider", ["require", "exports", "replay", "replayConverter"], function (require, exports, replay_2, replayConverter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CurrentReplayProvider = /** @class */ (function () {
        function CurrentReplayProvider() {
            this.replayLog = [];
            this.replayConverter = new replayConverter_1.ReplayConverter();
            this.replay = null;
            if (localStorage.replayLog !== null) {
                var moveData = JSON.parse(localStorage.replayLog || "[]");
                this.replayLog = moveData.map(function (moves) { return new replay_2.Replay(moves); });
            }
            var parseIndex = window.location.href.indexOf("?");
            this.replay = parseIndex > 0
                ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
                : this.replayLog.length > 0 ? this.replayLog[this.replayLog.length - 1] : null;
        }
        Object.defineProperty(CurrentReplayProvider.prototype, "currentReplay", {
            get: function () {
                return this.replay;
            },
            set: function (v) {
                this.replay = v;
                window.history.replaceState("", "", (v != null) ? "?" + new replayConverter_1.ReplayConverter().replayToString(v) : "");
                if (v && this.replayLog.indexOf(v) < 0) {
                    this.replayLog.push(v);
                    localStorage.replayLog = JSON.stringify(this.replayLog.map(function (log) { return log.moves; }));
                }
            },
            enumerable: true,
            configurable: true
        });
        CurrentReplayProvider.prototype.getLog = function () {
            return this.replayLog;
        };
        return CurrentReplayProvider;
    }());
    exports.CurrentReplayProvider = CurrentReplayProvider;
});
define("hotkeys", ["require", "exports"], function (require, exports) {
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
            // tslint:disable-next-line:prefer-for-of
            for (var i = 0; i < rows.length; i++) {
                rows[i].classList.add("hidden");
            }
            return new Promise(function (resolve) {
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
                // tslint:disable-next-line:prefer-for-of
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
                ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
            ];
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var row = keys_1[_i];
                this.addRow(rootElement, row);
            }
        };
        Hotkeys.prototype.addRow = function (rootElement, buttons) {
            var currentRow = (document.createElement("div"));
            currentRow.classList.add("tr");
            rootElement.appendChild(currentRow);
            for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                var button = buttons_1[_i];
                this.addButton(currentRow, button, "");
            }
        };
        Hotkeys.prototype.addButton = function (row, keytext, text) {
            var keyDiv = document.createElement("div");
            keyDiv.classList.add("keybind");
            keyDiv.textContent = keytext;
            var textDiv = document.createElement("div");
            textDiv.classList.add("buttontext");
            textDiv.textContent = text;
            var button = document.createElement("div");
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
define("standardControlScheme", ["require", "exports", "turnable"], function (require, exports, turnable_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StandardControlScheme = /** @class */ (function () {
        function StandardControlScheme() {
        }
        StandardControlScheme.prototype.register = function (hotkeys, target, camera) {
            var targetBindings = [
                ["q", "Z'", turnable_4.Turn.Zi],
                ["w", "B", turnable_4.Turn.B],
                ["e", "L'", turnable_4.Turn.Li],
                ["r", "I'", turnable_4.Turn.Ii],
                ["y", "X", turnable_4.Turn.X],
                ["u", "r", turnable_4.Turn.r],
                ["i", "R", turnable_4.Turn.R],
                ["o", "B'", turnable_4.Turn.Bi],
                ["p", "Z", turnable_4.Turn.Z],
                ["a", "Y'", turnable_4.Turn.Yi],
                ["s", "D", turnable_4.Turn.D],
                ["d", "L", turnable_4.Turn.L],
                ["f", "U'", turnable_4.Turn.Ui],
                ["g", "F'", turnable_4.Turn.Fi],
                ["h", "F", turnable_4.Turn.F],
                ["j", "U", turnable_4.Turn.U],
                ["k", "R'", turnable_4.Turn.Ri],
                ["l", "D'", turnable_4.Turn.Di],
                [";", "Y", turnable_4.Turn.Y],
                ["v", "I", turnable_4.Turn.I],
                ["n", "X'", turnable_4.Turn.Xi],
                ["m", "r'", turnable_4.Turn.ri],
            ];
            if (camera) {
                hotkeys.setupButton("z", "📹", camera.resetCamera);
            }
            targetBindings.forEach(function (binding) {
                hotkeys.setupButton(binding[0], binding[1], function () { return target.apply(binding[2]); });
            });
        };
        StandardControlScheme.prototype.registerG1 = function (hotkeys, target, camera) {
            var targetBindings = [
                ["w", "B2", turnable_4.Turn.B2],
                ["e", "L2", turnable_4.Turn.L2],
                ["i", "R2", turnable_4.Turn.R2],
                ["o", "B2'", turnable_4.Turn.B2],
                ["a", "Y'", turnable_4.Turn.Yi],
                ["s", "D", turnable_4.Turn.D],
                ["d", "L2", turnable_4.Turn.L2],
                ["f", "U'", turnable_4.Turn.Ui],
                ["g", "F2", turnable_4.Turn.F2],
                ["h", "F2", turnable_4.Turn.F2],
                ["j", "U", turnable_4.Turn.U],
                ["l", "D'", turnable_4.Turn.Di],
                [";", "Y", turnable_4.Turn.Y],
                ["k", "R2", turnable_4.Turn.R2],
            ];
            if (camera) {
                hotkeys.setupButton("z", "📹", camera.resetCamera);
            }
            targetBindings.forEach(function (binding) {
                hotkeys.setupButton(binding[0], binding[1], function () { return target.apply(binding[2]); });
            });
        };
        return StandardControlScheme;
    }());
    exports.StandardControlScheme = StandardControlScheme;
});
define("timer", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Timer = /** @class */ (function () {
        function Timer(element) {
            this.interval = 0;
            this.startTime = new Date();
            this.element = element || document.createElement("div");
            this.element.innerHTML = "&nbsp;";
            this.endTime = null;
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
            var startTime = this.startTime = new Date();
            this.startTime.setTime(this.startTime.getTime() + duration);
            return new Promise(function (resolve) {
                _this.interval = window.setInterval(function () {
                    _this.update();
                    if (new Date().getTime() > startTime.getTime()) {
                        _this.stop();
                        resolve();
                    }
                }, 16);
            });
        };
        Timer.prototype.stop = function () {
            if (this.interval !== 0) {
                this.endTime = new Date();
                this.update();
                window.clearInterval(this.interval);
                this.interval = 0;
            }
        };
        Timer.prototype.reset = function () {
            this.stop();
            this.startTime = null;
            this.endTime = null;
            this.element.innerHTML = "&nbsp;";
        };
        Timer.prototype.getTime = function () {
            return this.startTime !== null ? (this.endTime || new Date()).getTime() - this.startTime.getTime() : 0;
        };
        Timer.prototype.isStarted = function () {
            return this.interval !== 0;
        };
        Timer.prototype.update = function () {
            if (this.startTime) {
                var diff = new Date().getTime() - this.startTime.getTime();
                this.element.innerHTML = this.displayDuration(diff);
            }
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
define("states/state", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var state = {
        enter: function () { return; },
        exit: function () { return; },
    };
    var StateContext = /** @class */ (function () {
        function StateContext(startState) {
            this.idleState = state;
            this.scramblerState = state;
            this.solveState = state;
            this.countdownState = state;
            this.practiceState = state;
            this.solvedState = state;
            this.replayState = state;
            this.logBrowserState = state;
            this.currentState = startState || state;
            this.currentState.enter();
        }
        StateContext.prototype.setState = function (newState) {
            this.currentState.exit();
            this.currentState = newState;
            this.currentState.enter();
        };
        return StateContext;
    }());
    exports.StateContext = StateContext;
});
define("states/countdownState", ["require", "exports", "standardControlScheme", "turnable"], function (require, exports, standardControlScheme_1, turnable_5) {
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
            _this.safeTurns = [turnable_5.Turn.X, turnable_5.Turn.Xi, turnable_5.Turn.Y, turnable_5.Turn.Yi, turnable_5.Turn.Z, turnable_5.Turn.Zi];
            _this.callback = callback;
            return _this;
        }
        SafeCheckWrapper.prototype.apply = function (turn) {
            this.callback(this.safeTurns.some(function (s) { return s === turn; }));
            _super.prototype.apply.call(this, turn);
            return this;
        };
        return SafeCheckWrapper;
    }(turnable_5.TurnableWrapper));
});
define("states/idlestate", ["require", "exports", "hotkeys"], function (require, exports, hotkeys_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IdleState = /** @class */ (function () {
        function IdleState(context, keys) {
            this.context = context;
            this.hotkeys = keys;
        }
        IdleState.prototype.enter = function () {
            var _this = this;
            this.hotkeys.showMenu("Rubik's cube simulator.  Choose mode:", [
                new hotkeys_1.MenuOption("f", "Timed solve", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_1.MenuOption("j", "Practice", function () { return _this.context.setState(_this.context.practiceState); }),
            ]);
        };
        IdleState.prototype.exit = function () {
            return;
        };
        return IdleState;
    }());
    exports.IdleState = IdleState;
});
define("states/logBrowserState", ["require", "exports", "hotkeys"], function (require, exports, hotkeys_2) {
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
                new hotkeys_2.MenuOption("d", "Back", function () { return _this.showMenu((i - 1 + solves.length) % solves.length); }),
                new hotkeys_2.MenuOption("f", "Next", function () { return _this.showMenu((i + 1) % solves.length); }),
                new hotkeys_2.MenuOption("j", "Replay", function () { return _this.startReplay(i); }),
                new hotkeys_2.MenuOption("k", "Cancel", function () { return _this.context.setState(_this.context.solvedState); }),
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
define("scrambler", ["require", "exports", "turnable"], function (require, exports, turnable_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Scrambler = /** @class */ (function () {
        function Scrambler() {
        }
        Scrambler.prototype.scramble = function (cube, turns) {
            var faceMoves = [
                [turnable_6.Turn.U, turnable_6.Turn.Ui, turnable_6.Turn.U2],
                [turnable_6.Turn.D, turnable_6.Turn.Di, turnable_6.Turn.D2],
                [turnable_6.Turn.L, turnable_6.Turn.Li, turnable_6.Turn.L2],
                [turnable_6.Turn.R, turnable_6.Turn.Ri, turnable_6.Turn.R2],
                [turnable_6.Turn.F, turnable_6.Turn.Fi, turnable_6.Turn.F2],
                [turnable_6.Turn.B, turnable_6.Turn.Bi, turnable_6.Turn.B2],
            ];
            for (var i = 0; i < turns; i++) {
                var idx = Math.floor(Math.random() * (faceMoves.length - 1));
                var face = faceMoves[idx];
                faceMoves.splice(idx, 1);
                cube.apply(face[Math.floor(Math.random() * face.length)]);
                faceMoves.push(face);
            }
        };
        return Scrambler;
    }());
    exports.Scrambler = Scrambler;
});
define("states/practiceState", ["require", "exports", "scrambler", "standardControlScheme"], function (require, exports, scrambler_1, standardControlScheme_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PracticeState = /** @class */ (function () {
        function PracticeState(cube, hotkeys, camera) {
            this.cube = cube;
            this.hotkeys = hotkeys;
            this.camera = camera;
        }
        PracticeState.prototype.enter = function () {
            var _this = this;
            new standardControlScheme_2.StandardControlScheme().register(this.hotkeys, this.cube, this.camera);
            this.hotkeys.setupButton("/", "🎲", function () {
                _this.hotkeys.reset();
                new scrambler_1.Scrambler().scramble(_this.cube, 30);
                _this.cube.waitForMoves().then(function () { return _this.enter(); });
            });
        };
        PracticeState.prototype.exit = function () {
            return;
        };
        return PracticeState;
    }());
    exports.PracticeState = PracticeState;
});
define("states/replayState", ["require", "exports", "timer", "turnable"], function (require, exports, timer_1, turnable_7) {
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
                    if (move.turn > turnable_7.Turn.Z2 && !started) {
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
define("turnRecorder", ["require", "exports", "replay", "timer", "turnable"], function (require, exports, replay_3, timer_2, turnable_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TurnRecorder = /** @class */ (function (_super) {
        __extends(TurnRecorder, _super);
        function TurnRecorder(target, moveData) {
            var _this = _super.call(this, target) || this;
            _this.timer = new timer_2.Timer();
            _this.stopTime = null;
            _this.moves = moveData || [];
            return _this;
        }
        TurnRecorder.prototype.apply = function (t) {
            this.moves.push({
                timestamp: this.timer.getTime(),
                turn: t,
            });
            _super.prototype.apply.call(this, t);
            return this;
        };
        TurnRecorder.prototype.reset = function () {
            this.moves = [];
            this.timer.reset();
        };
        TurnRecorder.prototype.start = function () {
            this.timer.start();
        };
        TurnRecorder.prototype.stop = function () {
            this.stopTime = this.stopTime || this.timer.getTime();
        };
        TurnRecorder.prototype.getReplay = function () {
            return new replay_3.Replay(this.moves);
        };
        return TurnRecorder;
    }(turnable_8.TurnableWrapper));
    exports.TurnRecorder = TurnRecorder;
});
define("states/scramblingState", ["require", "exports", "scrambler"], function (require, exports, scrambler_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScramblingState = /** @class */ (function () {
        function ScramblingState(context, cube, recorder, timer, state) {
            this.context = context;
            this.cube = cube;
            this.recorder = recorder;
            this.timer = timer;
            this.scrambler = new scrambler_2.Scrambler();
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
define("states/solvedState", ["require", "exports", "hotkeys"], function (require, exports, hotkeys_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SolvedState = /** @class */ (function () {
        function SolvedState(context, hotkeys, replay) {
            this.context = context;
            this.hotkeys = hotkeys;
            this.replay = replay;
        }
        SolvedState.prototype.enter = function () {
            var _this = this;
            var options = [
                new hotkeys_3.MenuOption("f", "Scramble", function () { return _this.context.setState(_this.context.scramblerState); }),
                new hotkeys_3.MenuOption("j", "Replay", function () {
                    _this.context.setState(_this.context.replayState);
                }),
            ];
            if (this.replay.getLog().length > 1) {
                options.push(new hotkeys_3.MenuOption("k", "Log", function () { return _this.context.setState(_this.context.logBrowserState); }));
            }
            this.hotkeys.showMenu("Solved!", options);
        };
        SolvedState.prototype.exit = function () {
            this.hotkeys.reset();
        };
        return SolvedState;
    }());
    exports.SolvedState = SolvedState;
});
define("states/timedSolveState", ["require", "exports", "standardControlScheme", "turnable"], function (require, exports, standardControlScheme_3, turnable_9) {
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
            this.active = false;
        }
        TimedSolveState.prototype.enter = function () {
            var _this = this;
            var cube = this.cube;
            var camera = this.camera;
            var wrapper = new TurnCompletedWrapper(cube, function () { return _this.onTurnCompleted(); });
            new standardControlScheme_3.StandardControlScheme().register(this.hotkeys, wrapper, camera);
            this.hotkeys.setupButton("/", "🎲", function () {
                _this.timer.reset();
                _this.context.setState(_this.context.scramblerState);
            });
            this.timer.start();
            this.active = true;
        };
        TimedSolveState.prototype.exit = function () {
            this.active = false;
            this.hotkeys.reset();
        };
        TimedSolveState.prototype.onTurnCompleted = function () {
            if (this.active && this.cubeState.isSolved()) {
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
    }(turnable_9.TurnableWrapper));
});
define("app", ["require", "exports", "cube", "currentReplayProvider", "hotkeys", "states/countdownState", "states/idlestate", "states/logBrowserState", "states/practiceState", "states/replayState", "states/scramblingState", "states/solvedState", "states/state", "states/timedSolveState", "timer", "turnable", "turnRecorder"], function (require, exports, cube_1, currentReplayProvider_1, hotkeys_4, countdownState_1, idlestate_1, logBrowserState_1, practiceState_1, replayState_1, scramblingState_1, solvedState_1, state_1, timedSolveState_1, timer_3, turnable_10, turnRecorder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = /** @class */ (function () {
        function App() {
        }
        App.prototype.run = function () {
            var cube = new cube_1.Cube();
            var renderer3d = new CubeRenderer(cube);
            var controls = new hotkeys_4.Hotkeys(document.getElementById("buttons"));
            var timer = new timer_3.Timer(document.getElementById("timerDisplay"));
            var stateContext = new state_1.StateContext();
            var recordingWrapper = new turnRecorder_1.TurnRecorder(renderer3d);
            var replay = new currentReplayProvider_1.CurrentReplayProvider();
            this.implementEnums(cube);
            this.implementApply(renderer3d);
            stateContext.idleState = new idlestate_1.IdleState(stateContext, controls);
            stateContext.scramblerState = new scramblingState_1.ScramblingState(stateContext, recordingWrapper, recordingWrapper, timer, cube);
            stateContext.countdownState = new countdownState_1.CountdownState(stateContext, timer, controls, recordingWrapper);
            stateContext.practiceState = new practiceState_1.PracticeState(renderer3d, controls, renderer3d);
            stateContext.solvedState = new solvedState_1.SolvedState(stateContext, controls, replay);
            stateContext.replayState = new replayState_1.ReplayState(stateContext, renderer3d, replay, timer);
            stateContext.logBrowserState = new logBrowserState_1.LogBrowserState(stateContext, controls, replay);
            stateContext.solveState = new timedSolveState_1.TimedSolveState(stateContext, recordingWrapper, controls, renderer3d, timer, cube, recordingWrapper, replay);
            stateContext.setState(replay.currentReplay || replay.getLog().length !== 0
                ? stateContext.solvedState
                : stateContext.idleState);
            return 0;
        };
        App.prototype.implementEnums = function (t) {
            var _loop_1 = function (i) {
                var idx = i;
                var turn = turnable_10.Turn[idx];
                if (t[turn] === undefined) {
                    t[turn] = function () { return t.apply(idx); };
                }
            };
            for (var i = turnable_10.Turn.X; i <= turnable_10.Turn.ri; i++) {
                _loop_1(i);
            }
        };
        App.prototype.implementApply = function (t) {
            t.apply = function (turn) {
                t[turnable_10.Turn[turn]]();
                return t;
            };
        };
        return App;
    }());
    exports.App = App;
    new App().run();
});
//# sourceMappingURL=app.js.map