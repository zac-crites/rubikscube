function Replay(_stopwatch) {
    var _moveList = [];
    var _replaying = false;

    this.Execute = (action) => {
        _moveList.push({
            timestamp: _stopwatch.GetTimestamp(),
            move: action
        });
        action();
    }

    this.Clear = () => _moveList = [];

    this.Replay = () => {
        if (_moveList.length === 0)
            return;
        _replaying = true;
        TimerUpdate();
    }

    this.IsReplaying = () => _replaying;

    function TimerUpdate() {
        if (_moveList.length === 0) {
            _replaying = false;
            return;
        }

        var currentTime = _stopwatch.GetTimestamp();
        while (_moveList.length > 0 && _moveList[0].timestamp <= currentTime) {
            _moveList[0].move();
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
    var replay = new Replay(stopwatch);

    buttons.AddButton("Z'", () => Rotate(() => renderer3d.Zi()), 81, "Q");
    buttons.AddButton("B", () => FaceTurn(() => renderer3d.B()), 87, "W");
    buttons.AddButton("L'", () => FaceTurn(() => renderer3d.Li()), 69, "E");
    buttons.AddButton("I'", () => FaceTurn(() => renderer3d.Ii()), 82, "R");
    buttons.AddButton("", () => { }, 84, "T");
    buttons.AddButton("X", () => Rotate(() => renderer3d.X()), 89, "Y");
    buttons.AddButton("r", () => FaceTurn(() => renderer3d.r()), 85, "U");
    buttons.AddButton("R", () => FaceTurn(() => renderer3d.R()), 73, "I");
    buttons.AddButton("B'", () => FaceTurn(() => renderer3d.Bi()), 79, "O");
    buttons.AddButton("Z", () => Rotate(() => renderer3d.Z()), 80, "P");
    buttons.AddButton("Y'", () => Rotate(() => renderer3d.Yi()), 65, "A");
    buttons.AddButton("D", () => FaceTurn(() => renderer3d.D()), 83, "S");
    buttons.AddButton("L", () => FaceTurn(() => renderer3d.L()), 68, "D");
    buttons.AddButton("U'", () => FaceTurn(() => renderer3d.Ui()), 70, "F");
    buttons.AddButton("F'", () => FaceTurn(() => renderer3d.Fi()), 71, "G");
    buttons.AddButton("F", () => FaceTurn(() => renderer3d.F()), 72, "H");
    buttons.AddButton("U", () => FaceTurn(() => renderer3d.U()), 74, "J");
    buttons.AddButton("R'", () => FaceTurn(() => renderer3d.Ri()), 75, "K");
    buttons.AddButton("D'", () => FaceTurn(() => renderer3d.Di()), 76, "L");
    buttons.AddButton("Y", () => Rotate(() => renderer3d.Y()), 186, ";");
    buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttons.AddButton("↪️", () => StartReplay(), 88, "X");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => FaceTurn(() => renderer3d.I()), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => Rotate(() => renderer3d.Xi()), 78, "N");
    buttons.AddButton("r'", () => FaceTurn(() => renderer3d.ri()), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");
    buttons.AddButton("", () => { }, 190, ".");
    buttons.AddButton("🎲", () => Scramble(renderer3d), 191, "/", "Scramble");

    renderer3d.AddAnimationCompletedListener(() => {
        if (replay.IsReplaying())
            return;

        if (stopwatch.IsSolving() && cube.IsSolved()) {
            replay.Execute(() => {
                stopwatch.Stop();
                renderer3d.Pulse();
            });
        }
    });

    function Reset() {
        if (scrambling)
            return;
        renderer3d.Reset();
        stopwatch.Reset();
        replay.Clear();
    }

    function Rotate(rotate) {
        if (scrambling || replay.IsReplaying())
            return;

        replay.Execute(rotate);
    }

    function FaceTurn(move) {
        if (scrambling || replay.IsReplaying())
            return;

        if (stopwatch.IsTicking() && !stopwatch.IsSolving()) {
            replay.Execute(() => stopwatch.SolveStart());
        }

        replay.Execute(move);
    }

    function StartReplay() {
        if (!cube.IsSolved()) {
            renderer3d.Reset();
            renderer3d.AddQueuedAnimationsCompletedListener(StartReplay);
            return;
        }

        stopwatch.Reset();
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

        stopwatch.Reset();
        scrambling = true;

        var faceMoves = []
        faceMoves.push([() => r.U(), () => r.Ui(), () => r.U2()]);
        faceMoves.push([() => r.D(), () => r.Di(), () => r.D2()]);
        faceMoves.push([() => r.L(), () => r.Li(), () => r.L2()]);
        faceMoves.push([() => r.R(), () => r.Ri(), () => r.R2()]);
        faceMoves.push([() => r.F(), () => r.Fi(), () => r.F2()]);
        faceMoves.push([() => r.B(), () => r.Bi(), () => r.B2()]);

        for (var i = 0; i < 30; i++) {
            var idx = Math.floor(Math.random() * (faceMoves.length - 1));
            var face = faceMoves[idx];
            faceMoves.splice(idx, 1);
            replay.Execute(face[Math.floor(Math.random() * face.length)]);
            faceMoves.push(face);
        }

        replay.Execute(() => {
            r.AddQueuedAnimationsCompletedListener(() => {
                scrambling = false;
                stopwatch.Start();
            });
        });
    }
};
