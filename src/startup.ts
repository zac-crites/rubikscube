import { Turnable } from "./turnable";
import { Cube } from "./cube";
import { Hotkeys } from "./hotkeys";
import { Scrambler } from "./scrambler";
import { StateContext } from "./states/state";
import { SandboxState } from "./states/sandbox";

declare var CubeRenderer;

export class Startup {
    public run(): number {

        let cube = new Cube();
        let scrambler = new Scrambler();

        let renderer3d = new CubeRenderer(cube);

        scrambler.scramble(renderer3d);

        let buttons = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));

        let stateContext = new StateContext(new SandboxState(renderer3d, buttons));

        return 0;
    }
}