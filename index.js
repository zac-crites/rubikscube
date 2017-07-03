function Pad(str, n) {

    var pad = "";
    for (var i = 0; i < n; i++)
        pad += "0";
    return pad.substring(0, pad.length - str.length) + str
}

function Replay(_stopwatch, _cube) {
    var _moveList = [];
    var _replaying = false;

    var _encodingData = [];
    _encodingData.push(new Encoding("U", cube => cube.U()));
    _encodingData.push(new Encoding("U'", cube => cube.Ui()));
    _encodingData.push(new Encoding("U2", cube => cube.U2()));
    _encodingData.push(new Encoding("L", cube => cube.L()));
    _encodingData.push(new Encoding("L'", cube => cube.Li()));
    _encodingData.push(new Encoding("L2", cube => cube.L2()));
    _encodingData.push(new Encoding("F", cube => cube.F()));
    _encodingData.push(new Encoding("F'", cube => cube.Fi()));
    _encodingData.push(new Encoding("F2", cube => cube.F2()));
    _encodingData.push(new Encoding("R", cube => cube.R()));
    _encodingData.push(new Encoding("R'", cube => cube.Ri()));
    _encodingData.push(new Encoding("R2", cube => cube.R2()));
    _encodingData.push(new Encoding("B", cube => cube.B()));
    _encodingData.push(new Encoding("B'", cube => cube.Bi()));
    _encodingData.push(new Encoding("B2", cube => cube.B2()));
    _encodingData.push(new Encoding("D", cube => cube.D()));
    _encodingData.push(new Encoding("D'", cube => cube.Di()));
    _encodingData.push(new Encoding("D2", cube => cube.D2()));
    _encodingData.push(new Encoding("X", cube => cube.X(), true));
    _encodingData.push(new Encoding("X'", cube => cube.Xi(), true));
    _encodingData.push(new Encoding("Z", cube => cube.Z(), true));
    _encodingData.push(new Encoding("Z'", cube => cube.Zi(), true));
    _encodingData.push(new Encoding("Y", cube => cube.Y(), true));
    _encodingData.push(new Encoding("Y'", cube => cube.Yi(), true));
    _encodingData.push(new Encoding("I", cube => cube.I()));
    _encodingData.push(new Encoding("I'", cube => cube.Ii()));
    _encodingData.push(new Encoding("r", cube => cube.r()));
    _encodingData.push(new Encoding("r'", cube => cube.ri()));
    _encodingData.push(new Encoding("TimerSignal", () => QueueTimerToggle()));

    console.log(_encodingData.length);
    if (_encodingData.length > 32)
        throw "Can't encode id >= 32";

    function Encoding(opcode, execute, clean) {
        this.opcode = opcode;
        this.execute = execute;
        this.clean = (clean !== undefined) && clean;
    }

    this.EncodeMoveList = () => {

        var strEncode = [];
        _moveList.forEach(move => move.data.opcode === undefined || strEncode.push(move.data.opcode));
        console.log("Encoded:");
        console.log(strEncode);

        var arr = new Uint8Array(_moveList.length);
        var i = 0;
        var lastTimestamp = 0;

        _moveList.forEach(move => {
            if (move.data.opcode !== undefined) {
                var id = _encodingData.findIndex(d => d.opcode === move.data.opcode);
                if (id >= 0 && id < 32) {
                    id = id << 3;
                    arr[i++] = id;
                } else {
                    console.log("opcode error - " + move.opcode)
                }
            }
            else {
                console.log(move);
            }
        });

        console.log(arr);
        var result = btoa(String.fromCharCode.apply(null, arr));

        console.log("(" + result.length + ") " + result);
    }

    function QueueTimerToggle() {
        _cube.AddQueuedAnimationsCompletedListener(() => {
            if (!_stopwatch.IsTicking()) {
                _stopwatch.Start();
            }
            else {
                _stopwatch.Stop();
            }
        });
    }

    this.DecodeMoveString = encodedMoves => {
        _moveList = [];


        var decodedMovesAsStr = atob(encodedMoves);
        var testStrs = [];

        Array.prototype.forEach.call(decodedMovesAsStr, function (char) {
            var i = char.charCodeAt(0) >> 3;
            var t = char.charCodeAt(0) % 8;

            testStrs.push(Pad(i.toString(2), 5) + " " + Pad(t.toString(2), 3));

            _moveList.push({
                timestamp: 0,
                data: _encodingData[i]
            });
        });

        var strEncode = [];
        _moveList.forEach(move => move.data.opcode === undefined || strEncode.push(move.data.opcode));
        console.log("Decoded(" + _encodingData.length + ") = [" + strEncode.join(' ') + "]");
    }

    function Execute(encoderEntry) {
        if (!_encodingData[i].clean && !_stopwatch.IsSolving())
            _stopwatch.SolveStart();
        _encodingData[i].execute(_cube);
    }

    this.ExecuteOperation = moveString => {
        moveString.split(" ").forEach(opcode => {
            var move = _encodingData.find(d => d.opcode === opcode);
            _moveList.push({
                timestamp: _stopwatch.GetTimestamp(),
                data: move
            });
            if (move.clean !== true)
                _stopwatch.SolveStart();
            move.execute(_cube);
        });
    }

    this.Reset = () => {
        _moveList = [];
        _stopwatch.Reset();
    }

    this.Replay = () => {
        if (_moveList.length === 0)
            return;
        _stopwatch.Reset();
        _replaying = true;
        TimerUpdate();
    }

    this.Finish = () => {
        if (!_stopwatch.IsTicking())
            return;
        _stopwatch.Stop();
        _cube.Pulse();
    }

    this.IsReplaying = () => _replaying;

    function TimerUpdate() {
        if (_moveList.length === 0) {
            _replaying = false;
            return;
        }

        var currentTime = _stopwatch.GetTimestamp();
        while (_moveList.length > 0 && _moveList[0].timestamp <= currentTime) {
            if (_moveList[0].data.clean !== true) {
                _cube.AddQueuedAnimationsCompletedListener(() => _stopwatch.SolveStart());
            }
            _moveList[0].data.execute(_cube);
            _moveList.shift();
        }

        if (_moveList.length > 0) {
            setTimeout(TimerUpdate, 100);
        } else {
            _replaying = false;
        }
    }
}

window.onload = function () {
    var cube = new Cube();
    var renderer3d = new CubeRenderer(cube);
    var buttons = new KeyboardControls();
    var stopwatch = new Stopwatch(document.getElementById("timerDisplay"));
    var scrambling = false;
    var replay = new Replay(stopwatch, renderer3d);

    var parseIndex = window.location.href.indexOf('?');
    if (parseIndex > 0) {
        var queryString = window.location.href.substring(parseIndex + 1);
        replay.DecodeMoveString(queryString);
    }

    buttons.AddButton("Z'", () => Rotate(() => renderer3d.Zi(), "Z'"), 81, "Q");
    buttons.AddButton("B", () => FaceTurn(() => renderer3d.B(), 'B'), 87, "W");
    buttons.AddButton("L'", () => FaceTurn(() => renderer3d.Li(), "L'"), 69, "E");
    buttons.AddButton("I'", () => FaceTurn(() => renderer3d.Ii(), "I'"), 82, "R");
    buttons.AddButton("", () => { }, 84, "T");
    buttons.AddButton("X", () => Rotate(() => renderer3d.X(), "X"), 89, "Y");
    buttons.AddButton("r", () => FaceTurn(() => renderer3d.r(), "r"), 85, "U");
    buttons.AddButton("R", () => FaceTurn(() => renderer3d.R(), "R"), 73, "I");
    buttons.AddButton("B'", () => FaceTurn(() => renderer3d.Bi(), "B'"), 79, "O");
    buttons.AddButton("Z", () => Rotate(() => renderer3d.Z(), "Z"), 80, "P");
    buttons.AddButton("Y'", () => Rotate(() => renderer3d.Yi(), "Y'"), 65, "A");
    buttons.AddButton("D", () => FaceTurn(() => renderer3d.D(), "D"), 83, "S");
    buttons.AddButton("L", () => FaceTurn(() => renderer3d.L(), "L"), 68, "D");
    buttons.AddButton("U'", () => FaceTurn(() => renderer3d.Ui(), "U'"), 70, "F");
    buttons.AddButton("F'", () => FaceTurn(() => renderer3d.Fi(), "F'"), 71, "G");
    buttons.AddButton("F", () => FaceTurn(() => renderer3d.F(), "F"), 72, "H");
    buttons.AddButton("U", () => FaceTurn(() => renderer3d.U(), "U"), 74, "J");
    buttons.AddButton("R'", () => FaceTurn(() => renderer3d.Ri(), "R'"), 75, "K");
    buttons.AddButton("D'", () => FaceTurn(() => renderer3d.Di(), "D'"), 76, "L");
    buttons.AddButton("Y", () => Rotate(() => renderer3d.Y(), "Y"), 186, ";");
    buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttons.AddButton("↪️", () => StartReplay(), 88, "X");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => FaceTurn(() => renderer3d.I(), "I"), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => Rotate(() => renderer3d.Xi(), "X'"), 78, "N");
    buttons.AddButton("r'", () => FaceTurn(() => renderer3d.ri(), "r'"), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");
    buttons.AddButton("EC", () => replay.EncodeMoveList(), 190, ".");
    buttons.AddButton("🎲", () => Scramble(renderer3d), 191, "/", "Scramble");

    renderer3d.AddAnimationCompletedListener(() => {
        if (replay.IsReplaying())
            return;

        if (cube.IsSolved()) {
            replay.Finish();
        }
    });

    function Reset() {
        if (scrambling)
            return;
        renderer3d.Reset();
        replay.Reset();
    }

    function Rotate(rotate, code) {
        if (scrambling || replay.IsReplaying())
            return;

        replay.ExecuteOperation(code);
    }

    function FaceTurn(move, code) {
        if (scrambling || replay.IsReplaying())
            return;

        replay.ExecuteOperation(code);
    }

    function StartReplay() {
        if (!cube.IsSolved()) {
            renderer3d.Reset();
            renderer3d.AddQueuedAnimationsCompletedListener(StartReplay);
            return;
        }

        replay.Replay();
    }

    function Scramble(r) {
        if (scrambling || replay.IsReplaying())
            return;

        if (!cube.IsSolved()) {
            Reset();
            renderer3d.AddQueuedAnimationsCompletedListener(() => Scramble(r));
            return;
        }

        replay.Reset();
        scrambling = true;

        var faceMoves = []
        faceMoves.push(["U", "U'", "U2"]);
        faceMoves.push(["D", "D'", "D2"]);
        faceMoves.push(["L", "L'", "L2"]);
        faceMoves.push(["R", "R'", "R2"]);
        faceMoves.push(["F", "F'", "F2"]);
        faceMoves.push(["B", "B'", "B2"]);

        for (var i = 0; i < 30; i++) {
            var idx = Math.floor(Math.random() * (faceMoves.length - 1));
            var face = faceMoves[idx];
            faceMoves.splice(idx, 1);
            replay.ExecuteOperation(face[Math.floor(Math.random() * face.length)]);
            faceMoves.push(face);
        }

        replay.ExecuteOperation("TimerSignal");
        renderer3d.AddQueuedAnimationsCompletedListener(() => scrambling = false);
    }
};
