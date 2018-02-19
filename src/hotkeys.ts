export class MenuOption {
    public key: string;
    public text: string;
    public callback: () => void;

    public constructor(key: string, text: string, callback: () => void) {
        this.key = key;
        this.text = text;
        this.callback = callback;
    }

    public toString(): string {
        return this.key + ": " + this.text;
    }
}

export class Hotkeys {
    private rootElement: HTMLDivElement;
    private actions: { [key: string]: () => void } = {};
    private elements: { [key: string]: HTMLDivElement } = {};

    public constructor(element: HTMLDivElement) {
        this.rootElement = element;
        this.initialize(element);
        window.addEventListener("keydown", (ev) => this.keyHandler(ev));
    }

    public setupButton(key: string, text: string, action: () => void): void {
        let k = key.toLowerCase();
        this.actions[k] = action;
        if (this.elements[k]) {
            this.elements[k].textContent = text;
        }
    }

    public reset(): void {
        Object.keys(this.elements).forEach(key => this.elements[key].textContent = "");
        this.actions = {};
    }

    public showMenu(prompt: string, options: MenuOption[]): Promise<MenuOption> {
        let oldActions = this.actions;
        this.actions = {};

        let menu = document.getElementById("menu") as HTMLDivElement;
        let rows = this.rootElement.getElementsByClassName("tr") as HTMLCollectionOf<HTMLDivElement>;

        menu.innerHTML = null;
        menu.classList.remove("hidden");
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.add("hidden");
        }

        return new Promise<MenuOption>((resolve: (MenuOption) => void, reject) => {

            let menuHeader = document.createElement("div") as HTMLDivElement;
            menuHeader.classList.add("menuheader");
            menuHeader.textContent = prompt;
            menu.appendChild(menuHeader);
            options.forEach(option => {
                let menuoption = document.createElement("div") as HTMLDivElement;
                menuoption.classList.add("menuitem");
                menuoption.textContent = option.key + ": " + option.text;
                menu.appendChild(menuoption);
                this.actions[option.key.toLowerCase()] = () => resolve(option);
            });
        }).then((option) => {
            this.actions = oldActions;
            option.callback();
            menu.classList.add("hidden");
            for (let i = 0; i < rows.length; i++) {
                rows[i].classList.remove("hidden");
            }
            return option;
        });
    }

    private keyHandler(ev: KeyboardEvent) {
        let action = this.actions[ev.key];
        if (!ev.repeat && action !== undefined) {
            action();
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

        this.elements[keytext.toLowerCase()] = textDiv;
    }
}