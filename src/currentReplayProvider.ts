import { IMoveData, IReplay, Replay } from "./replay";
import { ReplayConverter } from "./replayConverter";

export interface IReplayData {
    replay: IReplay;
    time: number;
}

export interface IReplayLog {
    currentReplay: IReplay | null;
    getLog(): IReplay[];
    pushReplay(replay: IReplay): number;
}

export class CurrentReplayProvider implements IReplayLog {

    public  currentReplay: IReplay | null = null;
    private replayLog: IReplay[] = [];
    private replayConverter = new ReplayConverter();

    public constructor() {
        if (localStorage.replayLog !== null) {
            const moveData = JSON.parse(localStorage.replayLog || "[]") as IMoveData[][];
            this.replayLog = moveData.map((moves) => new Replay(moves));
        }

        const parseIndex = window.location.href.indexOf("?");
        this.currentReplay = parseIndex > 0
            ? this.replayConverter.stringToReplay(window.location.href.substring(parseIndex + 1))
            : null;
    }

    public pushReplay(replay: IReplay): number {
        this.currentReplay = replay;
        window.history.replaceState("", "", (replay != null) ? "?" + new ReplayConverter().replayToString(replay) : "");
        const index = this.replayLog.indexOf(replay);
        if (replay && index < 0) {
            this.replayLog.push(replay);
            localStorage.replayLog = JSON.stringify(this.replayLog.map((log) => log.moves));
            return this.replayLog.length - 1;
        } else {
            return index;
        }
    }

    public getLog(): IReplay[] {
        return this.replayLog;
    }
}
