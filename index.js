function ButtonGrid(buttonPressed) {
    var buttonContainer = document.getElementById("buttons");
    var currentRow = null;
    var keybinds = new Map();

    function KeyPress(event) {
        console.log(event.keyCode);
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

    var renderer3d = new CubeRenderer3d();
    var cube = new Cube();

    renderer3d.Initialize(cube);

    var buttonGrid = new ButtonGrid(() => {
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

    buttonGrid.AddButton("📹", () => renderer3d.ResetCamera(), 90, "Z");
    buttonGrid.AddButton("", () => { }, -1, "X");
    buttonGrid.AddButton("", () => { }, -1, "C");
    buttonGrid.AddButton("I", () => cube.I(), 86, "V");
    buttonGrid.AddButton("", () => { }, -1, "B");
    buttonGrid.AddButton("X'", () => cube.Xi(), 78, "N");
    buttonGrid.AddButton("r'", () => cube.ri(), 77, "M");
    buttonGrid.AddButton("", () => { }, -1, ",");

    function Scramble() {
        if( renderer3d.IsAnimating() )
            return;

        var moves = []
        moves.push(() => renderer3d.B());
        moves.push(() => renderer3d.Bi());
        moves.push(() => renderer3d.U());
        moves.push(() => renderer3d.Ui());
        moves.push(() => renderer3d.R());
        moves.push(() => renderer3d.Ri());
        moves.push(() => renderer3d.L());
        moves.push(() => renderer3d.Li());
        moves.push(() => renderer3d.D());
        moves.push(() => renderer3d.Di());
        moves.push(() => renderer3d.F());
        moves.push(() => renderer3d.Fi());

        for( var i = 0; i < 40; i ++ )
            moves[Math.floor(Math.random() * moves.length)]();
    }

    buttonGrid.AddButton("", () => {}, 190, ".");
    buttonGrid.AddButton("🎲", () => Scramble(), 191, "/");

    buttonGrid.NewRow();

    buttonGrid.AddButton("aZ", () => renderer3d.Z(), -1, "");
    buttonGrid.AddButton("aZi", () => renderer3d.Zi(), -1, "");
    buttonGrid.AddButton("aY", () => renderer3d.Y(), -1, "");
    buttonGrid.AddButton("aYi", () => renderer3d.Yi(), -1, "");
    buttonGrid.AddButton("aX", () => renderer3d.X(), -1, "");
    buttonGrid.AddButton("aXi", () => renderer3d.Xi(), -1, "");
    buttonGrid.AddButton("aU", () => renderer3d.U(), -1, "");
    buttonGrid.AddButton("aUi", () => renderer3d.Ui(), -1, "");
    buttonGrid.AddButton("aR", () => renderer3d.R(), -1, "");
    buttonGrid.AddButton("aRi", () => renderer3d.Ri(), -1, "");

    buttonGrid.NewRow();

    buttonGrid.AddButton("aF", () => renderer3d.F(), -1, "");
    buttonGrid.AddButton("aFi", () => renderer3d.Fi(), -1, "");
    buttonGrid.AddButton("aL", () => renderer3d.L(), -1, "");
    buttonGrid.AddButton("aLi", () => renderer3d.Li(), -1, "");
    buttonGrid.AddButton("aB", () => renderer3d.B(), -1, "");
    buttonGrid.AddButton("aBi", () => renderer3d.Bi(), -1, "");
    buttonGrid.AddButton("aD", () => renderer3d.D(), -1, "");
    buttonGrid.AddButton("aDi", () => renderer3d.Di(), -1, "");
};