function ButtonGrid() {
    var buttonContainer = document.getElementById("buttons");
    var currentRow = null;
    var keybinds = new Map();

    function KeyPress(event) {
        if (keybinds.has(event.keyCode))
            keybinds.get(event.keyCode)();
    }
    window.onkeydown = KeyPress;

    this.NewRow = function () {
        currentRow = document.createElement("div");
        currentRow.classList.add("tr");
        buttons.appendChild(currentRow);
    }

    this.AddButton = function (text, cubecommand, keycode, keytext, tooltip) {
        var button = document.createElement("div");
        button.classList.add("movebutton");
        button.classList.add("td");
        if (tooltip !== undefined) {
            button.title = tooltip;
        }

        var keyDiv = document.createElement("div");
        keyDiv.classList.add("keybind");
        keyDiv.textContent = keytext;

        var textDiv = document.createElement("div");
        textDiv.classList.add("buttontext");
        textDiv.textContent = text;

        button.appendChild(keyDiv);
        button.appendChild(textDiv);

        button.onclick = function () {
            cubecommand();
        }
        if (keycode > 0)
            keybinds.set(keycode, button.onclick);
        currentRow.appendChild(button);
    }

    this.NewRow();
}

window.onload = function () {

    var cube = new Cube();
    var renderer3d = new CubeRenderer3d( cube );

    var buttonGrid = new ButtonGrid();

    buttonGrid.AddButton("Z'", () => renderer3d.Zi(), 81, "Q");
    buttonGrid.AddButton("B", () => renderer3d.B(), 87, "W");
    buttonGrid.AddButton("L'", () => renderer3d.Li(), 69, "E");
    buttonGrid.AddButton("I'", () => renderer3d.Ii(), 82, "R");
    buttonGrid.AddButton("", () => { }, 84, "T");
    buttonGrid.AddButton("X", () => renderer3d.X(), 89, "Y");
    buttonGrid.AddButton("r", () => renderer3d.r(), 85, "U");
    buttonGrid.AddButton("R", () => renderer3d.R(), 73, "I");
    buttonGrid.AddButton("B'", () => renderer3d.Bi(), 79, "O");
    buttonGrid.AddButton("Z", () => renderer3d.Z(), 80, "P");

    buttonGrid.NewRow();

    buttonGrid.AddButton("Y'", () => renderer3d.Yi(), 65, "A");
    buttonGrid.AddButton("D", () => renderer3d.D(), 83, "S");
    buttonGrid.AddButton("L", () => renderer3d.L(), 68, "D");
    buttonGrid.AddButton("U'", () => renderer3d.Ui(), 70, "F");
    buttonGrid.AddButton("F'", () => renderer3d.Fi(), 71, "G");
    buttonGrid.AddButton("F", () => renderer3d.F(), 72, "H");
    buttonGrid.AddButton("U", () => renderer3d.U(), 74, "J");
    buttonGrid.AddButton("R'", () => renderer3d.Ri(), 75, "K");
    buttonGrid.AddButton("D'", () => renderer3d.Di(), 76, "L");
    buttonGrid.AddButton("Y", () => renderer3d.Y(), 186, ";");

    buttonGrid.NewRow();

    buttonGrid.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z", "Reset camera");
    buttonGrid.AddButton("", () => { }, -1, "X");
    buttonGrid.AddButton("", () => { }, -1, "C");
    buttonGrid.AddButton("I", () => renderer3d.I(), 86, "V");
    buttonGrid.AddButton("", () => { }, -1, "B");
    buttonGrid.AddButton("X'", () => renderer3d.Xi(), 78, "N");
    buttonGrid.AddButton("r'", () => renderer3d.ri(), 77, "M");
    buttonGrid.AddButton("", () => { }, -1, ",");

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

    buttonGrid.AddButton("", () => { }, 190, ".");
    buttonGrid.AddButton("🎲", () => Scramble(), 191, "/", "Scramble");
};