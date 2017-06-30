function Stopwatch(_display) {

    var _countdownDuration = 15000;
    var _countdownStartTime;
    var _solveStartTime;
    var _solveFinishTime;
    var _ticking = false;
    var _solving = false;

    var UpdateDisplay = () => {
        if (!_ticking)
            return;
        requestAnimationFrame(UpdateDisplay);

        if (!_solving) {
            var elapsed = new Date().getTime() - _countdownStartTime;
            if (elapsed < _countdownDuration) {
                _display.innerHTML = "-" + (_countdownDuration/1000 - Math.floor(elapsed / 1000));
            }
            else {
                this.SolveStart(_countdownStartTime + _countdownDuration);
            }
        }
        else {
            _display.innerHTML = (Math.floor(new Date().getTime() - _solveStartTime ) / 1000).toFixed(2);
        }
    }

    this.Start = () => {
        _countdownStartTime = new Date().getTime();
        _ticking = true;
        _solving = false;
        requestAnimationFrame(UpdateDisplay);
    }

    this.SolveStart = (solveStart) => {
        _ticking || this.Start();
        _solving = true;
        _solveStartTime = solveStart !== undefined ? solveStart : new Date().getTime();
    }

    this.Stop = () => {
        _solveFinishTime = new Date().getTime();
        
        if( _solving )
            _display.innerHTML = (Math.floor(_solveFinishTime - _solveStartTime ) / 1000).toFixed(2);

        _ticking = false;
        _solving = false;
    }

    this.Reset = () => {
        _display.innerHTML = "&nbsp;"
        _ticking = false;
        _solving = false;
    }

    this.IsTicking = () => _ticking;
    this.IsSolving = () => _solving;
}