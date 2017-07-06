function Replay(_stopwatch, _cube) {
    var _moveList = [];
    var _replaying = false;
    var _encodedTimeResolution = 150;

    var _encoder = new ReplayEncoder();

    this.EncodeMoveList = () => _encoder.EncodeMoveList(_moveList);

    this.DecodeMoveString = encodedMoves => {

        var newMoveList = _encoder.DecodeMoveListString(encodedMoves);

        if (_moveList.length === 0)
            _moveList = newMoveList;
    }

    this.ExecuteOperation = moveString => {
        moveString.split(" ").forEach(opcode => {
            var move = _encoder.GetOperationData(opcode);
            _moveList.push({
                timestamp: _stopwatch.GetTimestamp(),
                data: move
            });
            if (move.clean !== true)
                _stopwatch.SolveStart();
            move.execute(_cube, _stopwatch);
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
            if (_moveList[0].data.clean !== true && !_stopwatch.IsSolving()) {
                _cube.AddQueuedAnimationsCompletedListener(() => _stopwatch.SolveStart());
            }
            _moveList[0].data.execute(_cube, _stopwatch);
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
        // UBBoOHBAgBAwgGAggFBgUAh4YFAAUBhoIIBYQHBY4OiSs7K86OgIOgMBuBoBAgqxVznogYU6gDHoATkKsZM1DDM1SQFSMjcLOToAMrS4uwoKTghRAUoAUwpKCglQ6Ai+GwhRASEISgACs0sBUQFJAAFSAAG1uyEJGQkhCQkZCQkzMQIZUDIxIEkBMjE=
        var queryString = window.location.href.substring(parseIndex + 1);
        replay.DecodeMoveString(queryString);
        replay.Replay();
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
    buttons.AddButton("↪️", () => StartReplay(), 88, "X", "Start replay");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => FaceTurn(() => renderer3d.I(), "I"), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => Rotate(() => renderer3d.Xi(), "X'"), 78, "N");
    buttons.AddButton("r'", () => FaceTurn(() => renderer3d.ri(), "r'"), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");
    buttons.AddButton("", () => replay.EncodeMoveList(), 190, ".");
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
