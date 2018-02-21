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
        const k = key.toLowerCase();
        this.actions[k] = action;
        if (this.elements[k]) {
            this.elements[k].textContent = text;
        }
    }

    public reset(): void {
        Object.keys(this.elements).forEach((key) => this.elements[key].textContent = "");
        this.actions = {};
    }

    public showMenu(prompt: string, options: MenuOption[]): Promise<MenuOption> {
        const oldActions = this.actions;
        this.actions = {};

        const menu = document.getElementById("menu") as HTMLDivElement;
        const rows = this.rootElement.getElementsByClassName("tr") as NodeListOf<HTMLDivElement>;

        menu.innerHTML = "";
        menu.classList.remove("hidden");
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < rows.length; i++) {
            rows[i].classList.add("hidden");
        }

        return new Promise<MenuOption>((resolve: (o: MenuOption) => void) => {

            const menuHeader = document.createElement("div") as HTMLDivElement;
            menuHeader.classList.add("menuheader");
            menuHeader.textContent = prompt;
            menu.appendChild(menuHeader);
            options.forEach((option) => {
                const menuoption = document.createElement("div") as HTMLDivElement;
                menuoption.classList.add("menuitem");
                menuoption.textContent = option.key + ": " + option.text;
                menu.appendChild(menuoption);
                this.actions[option.key.toLowerCase()] = () => resolve(option);
            });
        }).then((option) => {
            this.actions = oldActions;
            menu.classList.add("hidden");
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < rows.length; i++) {
                rows[i].classList.remove("hidden");
            }
            option.callback();
            return option;
        });
    }

    private keyHandler(ev: KeyboardEvent) {
        const action = this.actions[ev.key];
        if (!ev.repeat && action !== undefined) {
            action();
        }
    }

    private initialize(rootElement: HTMLDivElement) {
        const keys = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
            ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
        ];

        for (const row of keys) {
            this.addRow(rootElement, row);
        }
    }

    private addRow(rootElement: HTMLDivElement, buttons: string[]) {
        const currentRow = (document.createElement("div")) as HTMLDivElement;
        currentRow.classList.add("tr");
        rootElement.appendChild(currentRow);

        for (const button of buttons) {
            this.addButton(currentRow, button, "");
        }
    }

    private addButton(row: HTMLDivElement, keytext: string, text: string) {

        const keyDiv = document.createElement("div");
        keyDiv.classList.add("keybind");
        keyDiv.textContent = keytext;

        const textDiv = document.createElement("div");
        textDiv.classList.add("buttontext");
        textDiv.textContent = text;

        const button = document.createElement("div");
        button.classList.add("movebutton");
        button.classList.add("td");

        button.appendChild(keyDiv);
        button.appendChild(textDiv);

        row.appendChild(button);

        this.elements[keytext.toLowerCase()] = textDiv;
    }
}
