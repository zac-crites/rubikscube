class KeyData {
    element: HTMLDivElement;
    action: () => void;

    public constructor(element?: HTMLDivElement) {
        this.element = element || (<HTMLDivElement>(document.createElement('div')));
    }
}

export class Hotkeys {
    private keyMap: { [key: string]: KeyData } = {};

    public constructor(element: HTMLDivElement) {
        this.initialize(element);
        window.addEventListener("keydown", (ev) => this.keyHandler(ev));
    }

    public setupButton(key: string, text: string, action: () => void) {
        this.keyMap[key.toLowerCase()].element.textContent = text;
        this.keyMap[key.toLowerCase()].action = action;
    }

    public reset() {
        Object.keys(this.keyMap).forEach(key => {
            this.keyMap[key].action = undefined;
            this.keyMap[key].element.innerText = null;
        });
    }

    private keyHandler(ev: KeyboardEvent) {
        let data = this.keyMap[ev.key];
        if (data !== undefined && data.action !== undefined) {
            data.action();
        }
    }

    private initialize(rootElement: HTMLDivElement) {
        let keys = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
            ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"]
        ];

        for (let row of keys) {
            this.addRow(rootElement, row);
        }

        this.keyMap[" "] = new KeyData();
    }

    private addRow(rootElement: HTMLDivElement, buttons: string[]) {
        let currentRow = <HTMLDivElement>(document.createElement('div'));
        currentRow.classList.add("tr");
        rootElement.appendChild(currentRow);

        for (let i = 0; i < buttons.length; i++) {
            this.addButton(currentRow, buttons[i], "");
        }
    }

    private addButton(row: HTMLDivElement, keytext: string, text: string) {

        let keyDiv = <HTMLDivElement>(document.createElement('div'));
        keyDiv.classList.add("keybind");
        keyDiv.textContent = keytext;

        let textDiv = <HTMLDivElement>(document.createElement('div'));
        textDiv.classList.add("buttontext");
        textDiv.textContent = text;

        let button = <HTMLDivElement>(document.createElement('div'));
        button.classList.add("movebutton");
        button.classList.add("td");

        button.appendChild(keyDiv);
        button.appendChild(textDiv);

        row.appendChild(button);

        this.keyMap[keytext.toLowerCase()] = new KeyData(textDiv);
    }
}