function ButtonGrid(buttonPressed) {
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

    this.AddButton = function (text, cubecommand, keycode, keytext) {
        var button = document.createElement("div");
        button.classList.add("movebutton");
        button.classList.add("td");

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
            buttonPressed();
        }
        if (keycode > 0)
            keybinds.set(keycode, button.onclick);
        currentRow.appendChild(button);
    }

    this.NewRow();
}

window.onload = function () {

    var renderer2d = new CubeRenderer2d();
    var renderer3d = new CubeRenderer3d();
    var cube = new Cube();

    renderer3d.Initialize(cube);

    var buttonGrid = new ButtonGrid(() => {
        renderer2d.UpdateCubelets();
        renderer3d.UpdateCubelets();
    });

    buttonGrid.AddButton("Z'", () => cube.Zi(), 81, "Q");
    buttonGrid.AddButton("B", () => cube.B(), 87, "W");
    buttonGrid.AddButton("L'", () => cube.Li(), 69, "E");
    buttonGrid.AddButton("I'", () => cube.Ii(), 82, "R");
    buttonGrid.AddButton("", () => { }, 84, "T");
    buttonGrid.AddButton("X", () => cube.X(), 89, "Y");
    buttonGrid.AddButton("r", () => cube.r(), 85, "U");
    buttonGrid.AddButton("R", () => cube.R(), 73, "I");
    buttonGrid.AddButton("B'", () => cube.Bi(), 79, "O");
    buttonGrid.AddButton("Z", () => cube.Z(), 80, "P");

    buttonGrid.NewRow();

    buttonGrid.AddButton("Y", () => cube.Y(), 65, "A");
    buttonGrid.AddButton("D", () => cube.D(), 83, "S");
    buttonGrid.AddButton("L", () => cube.L(), 68, "D");
    buttonGrid.AddButton("U'", () => cube.Ui(), 70, "F");
    buttonGrid.AddButton("F'", () => cube.Fi(), 71, "G");
    buttonGrid.AddButton("F", () => cube.F(), 72, "H");
    buttonGrid.AddButton("U", () => cube.U(), 74, "J");
    buttonGrid.AddButton("R'", () => cube.Ri(), 75, "K");
    buttonGrid.AddButton("D'", () => cube.Di(), 76, "L");
    buttonGrid.AddButton("Y'", () => cube.Yi(), 186, ";");

    buttonGrid.NewRow();

    buttonGrid.AddButton("", () => { }, -1, "Z");
    buttonGrid.AddButton("", () => { }, -1, "X");
    buttonGrid.AddButton("", () => { }, -1, "C");
    buttonGrid.AddButton("I", () => cube.I(), 86, "V");
    buttonGrid.AddButton("", () => { }, -1, "B");
    buttonGrid.AddButton("X'", () => cube.Xi(), 78, "N");
    buttonGrid.AddButton("r'", () => cube.ri(), 77, "M");
    buttonGrid.AddButton("", () => { }, -1, ",");

    function Toggle2d() {
        if (renderer2d.IsInitialized()) {
            renderer2d.Reset();
        }
        else {
            renderer2d.Initialize(cube);
        }
    }

    function Scramble() {
        var moves = []
        moves.push(() => cube.B());
        moves.push(() => cube.Bi());
        moves.push(() => cube.U());
        moves.push(() => cube.Ui());
        moves.push(() => cube.R());
        moves.push(() => cube.Ri());
        moves.push(() => cube.L());
        moves.push(() => cube.Li());
        moves.push(() => cube.D());
        moves.push(() => cube.Di());
        moves.push(() => cube.F());
        moves.push(() => cube.Fi());

        var count = 40;
        function PickMove() {
            moves[Math.floor(Math.random() * moves.length)]();
            renderer2d.UpdateCubelets();
            renderer3d.UpdateCubelets();
            if (--count >= 0)
                setTimeout(PickMove, 50);
        }
        PickMove();
    }

    buttonGrid.AddButton("🔧", () => Toggle2d(), 190, ".");
    buttonGrid.AddButton("🎲", () => Scramble(), 191, "/");
};