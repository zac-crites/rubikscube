function KeyboardControls() {
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