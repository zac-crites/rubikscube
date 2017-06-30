window.onload = function () {
    var cube = new Cube();
    var renderer3d = new CubeRenderer(cube);
    var buttons = new KeyboardControls();
    var stopwatch = new Stopwatch(document.getElementById("timerDisplay"));
    var scrambling = false;

    buttons.AddButton("Z'", () => scrambling || renderer3d.Zi(), 81, "Q");
    buttons.AddButton("B", () => FaceTurn(() => renderer3d.B()), 87, "W");
    buttons.AddButton("L'", () => FaceTurn(() => renderer3d.Li()), 69, "E");
    buttons.AddButton("I'", () => FaceTurn(() => renderer3d.Ii()), 82, "R");
    buttons.AddButton("", () => { }, 84, "T");
    buttons.AddButton("X", () => scrambling || renderer3d.X(), 89, "Y");
    buttons.AddButton("r", () => FaceTurn(() => renderer3d.r()), 85, "U");
    buttons.AddButton("R", () => FaceTurn(() => renderer3d.R()), 73, "I");
    buttons.AddButton("B'", () => FaceTurn(() => renderer3d.Bi()), 79, "O");
    buttons.AddButton("Z", () => scrambling || renderer3d.Z(), 80, "P");
    buttons.AddButton("Y'", () => scrambling || renderer3d.Yi(), 65, "A");
    buttons.AddButton("D", () => FaceTurn(() => renderer3d.D()), 83, "S");
    buttons.AddButton("L", () => FaceTurn(() => renderer3d.L()), 68, "D");
    buttons.AddButton("U'", () => FaceTurn(() => renderer3d.Ui()), 70, "F");
    buttons.AddButton("F'", () => FaceTurn(() => renderer3d.Fi()), 71, "G");
    buttons.AddButton("F", () => FaceTurn(() => renderer3d.F()), 72, "H");
    buttons.AddButton("U", () => FaceTurn(() => renderer3d.U()), 74, "J");
    buttons.AddButton("R'", () => FaceTurn(() => renderer3d.Ri()), 75, "K");
    buttons.AddButton("D'", () => FaceTurn(() => renderer3d.Di()), 76, "L");
    buttons.AddButton("Y", () => scrambling || renderer3d.Y(), 186, ";");
    buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttons.AddButton("", () => { }, -1, "X");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => FaceTurn(() => renderer3d.I()), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => scrambling || renderer3d.Xi(), 78, "N");
    buttons.AddButton("r'", () => FaceTurn(() => renderer3d.ri()), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");
    buttons.AddButton("", () => { }, 190, ".");
    buttons.AddButton("🎲", () => Scramble(renderer3d), 191, "/", "Scramble");

    renderer3d.AddAnimationCompletedListener(() => {
        if (scrambling && !renderer3d.IsAnimating()) {
            scrambling = false;
            stopwatch.Start();
        }
        if (cube.IsSolved()) {
            stopwatch.Stop();
        }
    });

    function FaceTurn(move) {
        if (scrambling)
            return;

        if ( stopwatch.IsTicking() && !stopwatch.IsSolving()) {
            stopwatch.SolveStart();
        }
        move();
    }

    function Scramble(r) {
        if (scrambling)
            return;

        stopwatch.Reset();
        scrambling = true;

        var moves = []
        moves.push([() => r.U(), () => r.Ui(), () => r.U2()]);
        moves.push([() => r.D(), () => r.Di(), () => r.D2()]);
        moves.push([() => r.L(), () => r.Li(), () => r.L2()]);
        moves.push([() => r.R(), () => r.Ri(), () => r.R2()]);
        moves.push([() => r.F(), () => r.Fi(), () => r.F2()]);
        moves.push([() => r.B(), () => r.Bi(), () => r.B2()]);

        for (var i = 0; i < 30; i++) {
            var idx = Math.floor(Math.random() * (moves.length - 1));
            var move = moves[idx];
            moves.splice(idx, 1);
            move[Math.floor(Math.random() * move.length)]();
            moves.push(move);
        }
    }
};
