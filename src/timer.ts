declare var Promise: any;

export class Timer {
    private element: HTMLDivElement;
    private startTime: Date;
    private interval: number = 0;

    public constructor(element?: HTMLDivElement) {
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
        this.startTime = new Date();
        this.startTime.setTime(this.startTime.getTime() + duration);

        return new Promise(resolve => {
            this.interval = window.setInterval(() => {
                this.update();
                if (new Date().getTime() > this.startTime.getTime()) {
                    this.stop();
                    resolve();
                }
            }, 16);
        });
    }

    public stop() {
        if (this.interval !== 0) {
            this.update();
            window.clearInterval(this.interval);
            this.interval = 0;
        }
    }

    public reset() {
        this.stop();
        this.element.innerHTML = "&nbsp;";
    }

    private update() {
        let diff = new Date().getTime() - this.startTime.getTime();
        this.element.innerHTML = this.displayDuration(diff);
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