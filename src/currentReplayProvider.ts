import { IMoveData, IReplay, Replay } from "./replay";
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
        if (localStorage.replayLog !== null) {
            const moveData = JSON.parse(localStorage.replayLog || "[]") as IMoveData[][];
            this.replayLog = moveData.map((moves) => new Replay(moves));
        }

        const parseIndex = window.location.href.indexOf("?");
        this.replay = parseIndex > 0
            ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
            : this.replayLog.length > 0 ? this.replayLog[this.replayLog.length - 1] : null;
    }

    public get currentReplay(): IReplay | null {
        return this.replay;
    }

    public set currentReplay(v: IReplay | null) {
        this.replay = v;
        window.history.replaceState("", "", (v != null) ? "?" + new ReplayConverter().replayToString(v) : "");
        if (v && this.replayLog.indexOf(v) < 0) {
            this.replayLog.push(v);
            localStorage.replayLog = JSON.stringify(this.replayLog.map((log) => log.moves));
        }
    }

    public getLog(): IReplay[] {
        return this.replayLog;
    }
}
