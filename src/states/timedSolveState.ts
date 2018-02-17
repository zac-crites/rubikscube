import { State, StateContext } from "./state";
import { Turnable } from "../turnable";
import { Hotkeys } from "../hotkeys";
import { CameraControls } from "../CameraControls";
import { Scrambler } from "../scrambler";
import { ScramblingState } from "./scramblingState";
import { Timer } from "../timer";
import { StandardControls } from "../standardControls";

export class TimedSolveState implements State {
    private context: StateContext;
    private cube: Turnable;
    private controls: StandardControls;
    private camera: CameraControls;
    private timer: Timer;

    public constructor(context: StateContext, cube: Turnable, controls: Hotkeys, camera: CameraControls, timer: Timer) {
        this.context = context;
        this.cube = cube;
        this.controls = new StandardControls( controls );
        this.camera = camera;
        this.timer = timer;
    }

    public enter(): void {
        let cube = this.cube;
        let camera = this.camera;

        camera.refreshFacelets();

        this.controls.register( cube, camera );
        this.timer.start();
    }

    public exit(): void {
        this.timer.reset();
        this.controls.reset();
    }
}