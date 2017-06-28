window.onload = function () {

    var cube = new Cube();
    var renderer3d = new CubeRenderer( cube );

    var buttons = new KeyboardControls();

    buttons.AddButton("Z'", () => renderer3d.Zi(), 81, "Q");
    buttons.AddButton("B", () => renderer3d.B(), 87, "W");
    buttons.AddButton("L'", () => renderer3d.Li(), 69, "E");
    buttons.AddButton("I'", () => renderer3d.Ii(), 82, "R");
    buttons.AddButton("", () => { }, 84, "T");
    buttons.AddButton("X", () => renderer3d.X(), 89, "Y");
    buttons.AddButton("r", () => renderer3d.r(), 85, "U");
    buttons.AddButton("R", () => renderer3d.R(), 73, "I");
    buttons.AddButton("B'", () => renderer3d.Bi(), 79, "O");
    buttons.AddButton("Z", () => renderer3d.Z(), 80, "P");

    buttons.NewRow();

    buttons.AddButton("Y'", () => renderer3d.Yi(), 65, "A");
    buttons.AddButton("D", () => renderer3d.D(), 83, "S");
    buttons.AddButton("L", () => renderer3d.L(), 68, "D");
    buttons.AddButton("U'", () => renderer3d.Ui(), 70, "F");
    buttons.AddButton("F'", () => renderer3d.Fi(), 71, "G");
    buttons.AddButton("F", () => renderer3d.F(), 72, "H");
    buttons.AddButton("U", () => renderer3d.U(), 74, "J");
    buttons.AddButton("R'", () => renderer3d.Ri(), 75, "K");
    buttons.AddButton("D'", () => renderer3d.Di(), 76, "L");
    buttons.AddButton("Y", () => renderer3d.Y(), 186, ";");

    buttons.NewRow();

    buttons.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttons.AddButton("", () => { }, -1, "X");
    buttons.AddButton("", () => { }, -1, "C");
    buttons.AddButton("I", () => renderer3d.I(), 86, "V");
    buttons.AddButton("", () => { }, -1, "B");
    buttons.AddButton("X'", () => renderer3d.Xi(), 78, "N");
    buttons.AddButton("r'", () => renderer3d.ri(), 77, "M");
    buttons.AddButton("", () => { }, -1, ",");

    function Scramble() {
        if (renderer3d.IsAnimating())
            return;

        var r = renderer3d;
        var moves = []
        moves.push([() => r.U(), () =>r.Ui(), () =>{ r.U(); r.U(); }]);
        moves.push([() => r.D(), () =>r.Di(), () =>{ r.D(); r.D(); }]);
        moves.push([() => r.L(), () =>r.Li(), () =>{ r.L(); r.L(); }]);
        moves.push([() => r.R(), () =>r.Ri(), () =>{ r.R(); r.R(); }]);
        moves.push([() => r.F(), () =>r.Fi(), () =>{ r.F(); r.F(); }]);
        moves.push([() => r.B(), () =>r.Bi(), () =>{ r.B(); r.B(); }]);

        for (var i = 0; i < 30; i++)
        {
            var idx = Math.floor(Math.random() * (moves.length - 1));
            var move = moves[idx];
            moves.splice( idx, 1);
            move[Math.floor(Math.random() * move.length )]();
            moves.push( move );
        }
    }

    buttons.AddButton("", () => { }, 190, ".");
    buttons.AddButton("🎲", () => Scramble(), 191, "/", "Scramble");
};