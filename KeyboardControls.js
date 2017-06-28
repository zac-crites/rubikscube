function KeyboardControls() {
    var _buttonContainer = document.getElementById("buttons");
    var _currentRow = null;
    var _keybinds = new Map();
    var _columns = 10;
    var _currentRow = NewRow();

    window.onkeydown = (event) => !_keybinds.has(event.keyCode) || _keybinds.get(event.keyCode)();

    this.AddButton = function (text, command, keycode, keytext, tooltip) {

        var keyDiv = document.createElement("div");
        keyDiv.classList.add("keybind");
        keyDiv.textContent = keytext;

        var textDiv = document.createElement("div");
        textDiv.classList.add("buttontext");
        textDiv.textContent = text;

        var button = document.createElement("div");
        button.classList.add("movebutton");
        button.classList.add("td");

        if (tooltip !== undefined) {
            button.title = tooltip;
        }

        button.appendChild(keyDiv);
        button.appendChild(textDiv);

        button.onclick = command;
        if (keycode >= 0) {
            _keybinds.set(keycode, command);
        }

        if (_currentRow.childNodes.length >= _columns) {
            _currentRow = NewRow();
        }
        _currentRow.appendChild(button);
    }

    function NewRow() {
        var row = document.createElement("div");
        row.classList.add("tr");
        _buttonContainer.appendChild(row);
        return row;
    }
}