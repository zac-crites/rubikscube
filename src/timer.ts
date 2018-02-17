export class Timer {
    private element: HTMLDivElement;
    private startTime: Date;
    private interval: number = 0;

    public constructor(element: HTMLDivElement) {
        this.element = element;
        element.innerText = "-.--";
    }

    public start(startTime?:Date) {
        this.startTime = startTime || new Date();
        this.interval = window.setInterval(() => this.update(), 16);
    }

    public stop() {
        this.update();
        if (this.interval !== 0) {
            window.clearInterval(this.interval);
            this.interval = 0;
        }
    }

    private update() {
        let diff = new Date().getTime() - this.startTime.getTime();
        this.element.innerHTML = this.displayDuration(diff);
    }

    private displayDuration(duration: number): string {
        if( duration < 0 )
        {
            return Math.floor(duration / 1000).toString();
        }
        var minutes = Math.floor(duration / 60000);
        var seconds = (duration % 60000) / 1000;
        return (minutes > 0 ? (minutes + ":" + (seconds < 10 ? "0" : "")) : "") + seconds.toFixed(2);
    }
}