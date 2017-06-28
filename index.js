window.onload = function () {
    var cube = new Cube();
    var renderer3d = new CubeRenderer(cube);
    var buttons = new KeyboardControls();

    var timer = document.getElementById("timerDisplay");
    var stopwatch = new Stopwatch();
    var scrambling = false;
    var solving = false;
    var timerUpdating = false;

    buttons.AddButton("Z'", () => CubeTurn(() => renderer3d.Zi()), 81, "Q");
    buttons.AddButton("B", () => FaceTurn(() => renderer3d.B()), 87, "W");
    buttons.AddButton("L'", () => FaceTurn(() => renderer3d.Li()), 69, "E");
    buttons.AddButton("I'", () => FaceTurn(() => renderer3d.Ii()), 82, "R");
    buttons.AddButton("", () => { }, 84, "T");
    buttons.AddButton("X", () => CubeTurn(() => renderer3d.X()), 89, "Y");
    buttons.AddButton("r", () => FaceTurn(() => renderer3d.r()), 85, "U");
    buttons.AddButton("R", () => FaceTurn(() => renderer3d.R()), 73, "I");
    buttons.AddButton("B'", () => FaceTurn(() => renderer3d.Bi()), 79, "O");
    buttons.AddButton("Z", () => CubeTurn(() => renderer3d.Z()), 80, "P");
    buttons.AddButton("Y'", () => CubeTurn(() => renderer3d.Yi()), 65, "A");
    buttons.AddButton("D", () => FaceTurn(() => renderer3d.D()), 83, "S");
    buttons.AddButton("L", () => FaceTurn(() => renderer3d.L()), 68, "D");
    buttons.AddButton("U'", () => FaceTurn(() => renderer3d.Ui()), 70, "F");
    buttons.AddButton("F'", () => FaceTurn(() => renderer3d.Fi()), 71, "G");
    buttons.AddButton("F", () => FaceTurn(() => renderer3d.F()), 72, "H");
    buttons.AddButton("U", () => FaceTurn(() => renderer3d.U()), 74, "J");
    buttons.AddButton("R'", () => FaceTurn(() => renderer3d.Ri()), 75, "K");
    buttons.AddButton("D'", () => FaceTurn(() => renderer3d.Di()), 76, "L");
    buttons.AddButton("Y", () => CubeTurn(() => renderer3d.Y()), 186, ";");
    buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttons.AddButton("", () => { }, -1, "X");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => FaceTurn(() => renderer3d.I()), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => CubeTurn(() => renderer3d.Xi()), 78, "N");
    buttons.AddButton("r'", () => FaceTurn(() => renderer3d.ri()), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");
    buttons.AddButton("", () => { }, 190, ".");
    buttons.AddButton("🎲", () => Scramble(renderer3d), 191, "/", "Scramble");

    renderer3d.AddAnimationCompletedListener(() => {
        if (scrambling && !renderer3d.IsAnimating()) {
            scrambling = false;
            StartTimer();
        }
        if (cube.IsSolved()) {
            timerUpdating = false;
        }
    });

    function StartTimer() {
        timerUpdating = true;
        stopwatch.Start();
        requestAnimationFrame(UpdateTimer);
    }

    function UpdateTimer() {
        if (!timerUpdating)
            return;

        var elapsed = stopwatch.GetElapsed();
        if (!solving) {
            if (elapsed < 15000) {
                timer.innerHTML = "-" + (15 - Math.floor(elapsed / 1000));
            }
            else {
                solving = true;
                stopwatch.Start();
            }
        }
        else {
            timer.innerHTML = (Math.floor(elapsed / 10) / 100).toFixed(2);
        }

        requestAnimationFrame(UpdateTimer);
    }

    function CubeTurn(move) {
        if (scrambling)
            return;

        move();
    }

    function FaceTurn(move) {
        if (scrambling)
            return;

        if (!solving) {
            stopwatch.Start();
            solving = true;
        }
        move();
    }

    function Scramble(r) {
        if (scrambling)
            return;

        timer.innerHTML = "&nbsp;";
        timerUpdating = false;
        solving = false;
        scrambling = true;

        var moves = []
        moves.push([() => r.U(), () => r.Ui(), () => { r.U(); r.U(); }]);
        moves.push([() => r.D(), () => r.Di(), () => { r.D(); r.D(); }]);
        moves.push([() => r.L(), () => r.Li(), () => { r.L(); r.L(); }]);
        moves.push([() => r.R(), () => r.Ri(), () => { r.R(); r.R(); }]);
        moves.push([() => r.F(), () => r.Fi(), () => { r.F(); r.F(); }]);
        moves.push([() => r.B(), () => r.Bi(), () => { r.B(); r.B(); }]);

        for (var i = 0; i < 30; i++) {
            var idx = Math.floor(Math.random() * (moves.length - 1));
            var move = moves[idx];
            moves.splice(idx, 1);
            move[Math.floor(Math.random() * move.length)]();
            moves.push(move);
        }
    }
};
