declare var Promise: any;

export class Timer {
    private element: HTMLDivElement;
    private startTime: Date | null;
    private endTime: Date | null;
    private interval: number = 0;

    public constructor(element?: HTMLDivElement) {
        this.startTime = new Date();
        this.element = element || document.createElement("div") as HTMLDivElement;
        this.element.innerHTML = "&nbsp;";
    }

    public start() {
        if (this.interval === 0) {
            this.startTime = new Date();
            this.interval = window.setInterval(() => this.update(), 16);
        }
    }

    public countdown(duration: number): Promise<void> {
        let startTime = this.startTime = new Date();
        this.startTime.setTime(this.startTime.getTime() + duration);

        return new Promise(resolve => {
            this.interval = window.setInterval(() => {
                this.update();
                if (new Date().getTime() > startTime.getTime()) {
                    this.stop();
                    resolve();
                }
            }, 16);
        });
    }

    public stop() {
        if (this.interval !== 0) {
            this.endTime = new Date();
            this.update();
            window.clearInterval(this.interval);
            this.interval = 0;
        }
    }

    public reset() {
        this.stop();
        this.startTime = null;
        this.endTime = null;
        this.element.innerHTML = "&nbsp;";
    }

    public getTime(): number {
        return this.startTime !== null ? (this.endTime || new Date()).getTime() - this.startTime.getTime() : 0;
    }

    public isStarted(): boolean {
        return this.interval !== 0;
    }

    private update() {
        if( this.startTime )
        {
            let diff = new Date().getTime() - this.startTime.getTime();
            this.element.innerHTML = this.displayDuration(diff);
        }
    }

    private displayDuration(duration: number): string {
        if (duration < 0) {
            return Math.floor(duration / 1000).toString();
        }
        var minutes = Math.floor(duration / 60000);
        var seconds = (duration % 60000) / 1000;
        return (minutes > 0 ? (minutes + ":" + (seconds < 10 ? "0" : "")) : "") + seconds.toFixed(2);
    }
}