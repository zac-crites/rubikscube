function Stopwatch(_display) {

    var _countdownDuration = 15000;
    var _countdownStartTime;
    var _solveStartTime;
    var _solveFinishTime;
    var _ticking = false;
    var _solving = false;

    var DurationAsString = (duration) => {
        var minutes = Math.floor(duration / 60000);
        var seconds = (duration % 60000) / 1000;
        return (minutes > 0 ? (minutes + ":" + (seconds < 10 ? "0" : "")) : "") + seconds.toFixed(2);
    }

    var UpdateDisplay = () => {
        if (!_ticking)
            return;
        requestAnimationFrame(UpdateDisplay);

        if (!_solving) {
            var elapsed = new Date().getTime() - _countdownStartTime;
            if (elapsed < _countdownDuration) {
                _display.innerHTML = "-" + (_countdownDuration / 1000 - Math.floor(elapsed / 1000));
            }
            else {
                this.SolveStart(_countdownStartTime + _countdownDuration);
            }
        }
        else {
            _display.innerHTML = DurationAsString(new Date().getTime() - _solveStartTime);
        }
    }

    this.Start = () => {
        _countdownStartTime = new Date().getTime();
        _ticking = true;
        _solving = false;
        requestAnimationFrame(UpdateDisplay);
    }

    this.SolveStart = (solveStart) => {
        if( !_ticking || _solving )
            return;
        _solving = true;
        _solveStartTime = solveStart !== undefined ? solveStart : new Date().getTime();
    }

    this.Stop = () => {
        _solveFinishTime = new Date().getTime();

        if (_solving)
            _display.innerHTML = DurationAsString(_solveFinishTime - _solveStartTime);

        _ticking = false;
        _solving = false;
    }

    this.Reset = () => {
        _display.innerHTML = "&nbsp;"
        _ticking = false;
        _solving = false;
    }

    this.GetTimestamp = () => _ticking ? new Date().getTime() - _countdownStartTime : 0;

    this.IsTicking = () => _ticking;
    this.IsSolving = () => _solving;
}