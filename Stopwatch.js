function Stopwatch() {
    var _startTime;
    var _stopTime;
    var _ticking = false;

    this.Start = () => {
        _startTime = new Date().getTime();
        _ticking = true;
    }

    this.Stop = () => {
        _stopTime = new Date().getTime();
        _ticking = false;
    }

    this.GetElapsed = () => {
        if( _startTime === undefined )
            return -1;
        return _ticking ? new Date().getTime() - _startTime : _stopTime - _startTime; 
    }  
}