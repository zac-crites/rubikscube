import { Turnable } from "./turnable";
import { Cube } from "./cube";
import { Hotkeys } from "./hotkeys";
import { Scrambler } from "./scrambler";
import { StateContext } from "./states/state";
import { SandboxState } from "./states/sandbox";
import { ScramblingState } from "./states/scramblingState";

declare var CubeRenderer;

export class Startup {
    public run(): number {
        let cube = new Cube();
        let renderer3d = new CubeRenderer(cube);
        let controls = new Hotkeys(<HTMLDivElement>(document.getElementById("buttons")));

        let stateContext = new StateContext();

        let scramble = new ScramblingState(stateContext, renderer3d);
        scramble.setNextState( new SandboxState( renderer3d, controls, renderer3d) );

        stateContext.setState( scramble );

        return 0;
    }
}