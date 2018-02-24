import { IReplay } from "./replay";
import { ReplayConverter } from "./replayConverter";

export interface IReplayData {
    replay: IReplay;
    time: number;
}

export class CurrentReplayProvider {

    private replayLog: IReplay[] = [];
    private replayConverter = new ReplayConverter();
    private replay: IReplay | null = null;

    public constructor() {
        const parseIndex = window.location.href.indexOf("?");
        this.currentReplay = parseIndex > 0
            ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
            : null;
    }

    public get currentReplay(): IReplay | null {
        return this.replay;
    }

    public set currentReplay(v: IReplay | null) {
        this.replay = v;
        window.history.replaceState("", "", (v != null) ? "?" + new ReplayConverter().replayToString(v) : "");
        if (v && this.replayLog.indexOf(v) < 0 ) {
            this.replayLog.push(v);
        }
    }

    public getLog(): IReplay[] {
        return this.replayLog;
    }
}
