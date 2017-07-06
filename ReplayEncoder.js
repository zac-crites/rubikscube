function ReplayEncoder() {

    var _encodedTimeResolution = 150;

    var _encodingData = [];
    _encodingData.push(new Encoding("U", cube => cube.U()));
    _encodingData.push(new Encoding("U'", cube => cube.Ui()));
    _encodingData.push(new Encoding("U2", cube => cube.U2()));
    _encodingData.push(new Encoding("L", cube => cube.L()));
    _encodingData.push(new Encoding("L'", cube => cube.Li()));
    _encodingData.push(new Encoding("L2", cube => cube.L2()));
    _encodingData.push(new Encoding("F", cube => cube.F()));
    _encodingData.push(new Encoding("F'", cube => cube.Fi()));
    _encodingData.push(new Encoding("F2", cube => cube.F2()));
    _encodingData.push(new Encoding("R", cube => cube.R()));
    _encodingData.push(new Encoding("R'", cube => cube.Ri()));
    _encodingData.push(new Encoding("R2", cube => cube.R2()));
    _encodingData.push(new Encoding("B", cube => cube.B()));
    _encodingData.push(new Encoding("B'", cube => cube.Bi()));
    _encodingData.push(new Encoding("B2", cube => cube.B2()));
    _encodingData.push(new Encoding("D", cube => cube.D()));
    _encodingData.push(new Encoding("D'", cube => cube.Di()));
    _encodingData.push(new Encoding("D2", cube => cube.D2()));
    _encodingData.push(new Encoding("X", cube => cube.X(), true));
    _encodingData.push(new Encoding("X'", cube => cube.Xi(), true));
    _encodingData.push(new Encoding("Z", cube => cube.Z(), true));
    _encodingData.push(new Encoding("Z'", cube => cube.Zi(), true));
    _encodingData.push(new Encoding("Y", cube => cube.Y(), true));
    _encodingData.push(new Encoding("Y'", cube => cube.Yi(), true));
    _encodingData.push(new Encoding("I", cube => cube.I()));
    _encodingData.push(new Encoding("I'", cube => cube.Ii()));
    _encodingData.push(new Encoding("r", cube => cube.r()));
    _encodingData.push(new Encoding("r'", cube => cube.ri()));
    _encodingData.push(new Encoding("TimerSignal", ToggleTimerAction));

    if (_encodingData.length > 31)
        throw "Can't encode id >= 31";

    function Encoding(opcode, execute, clean) {
        this.opcode = opcode;
        this.clean = (clean !== undefined) && clean;
        this.execute = execute;
    }

    function ToggleTimerAction(cube, stopwatch) {
        cube.AddQueuedAnimationsCompletedListener(() => {
            if (!stopwatch.IsTicking()) {
                stopwatch.Start();
            }
            else {
                stopwatch.Stop();
            }
        });
    }

    this.GetOperationData = operation => _encodingData.find(d => d.opcode === operation);

    this.EncodeMoveList = moveList => {

        var bytes = [];
        var lastTimestamp = 0;
        var msPerTick = _encodedTimeResolution;

        moveList.forEach(move => {
            if (move.data.opcode !== undefined) {
                var id = _encodingData.findIndex(d => d.opcode === move.data.opcode);
                if (id >= 0 && id < 32) {
                    id = id << 3;

                    if (move.timestamp > lastTimestamp) {
                        var offset = move.timestamp - lastTimestamp;
                        var ticks = Math.floor(offset / msPerTick);
                        lastTimestamp += ticks * msPerTick;
                        while (ticks >= 8) {
                            bytes.push(_encodingData.length << 3);
                            ticks -= 8;
                        }
                        id += ticks;
                    }

                    bytes.push(id);
                } else {
                    console.log("opcode error - " + move.data.opcode)
                }
            }
            else {
                console.log(move);
            }
        });

        var i = 0;
        var arr = new Uint8Array(bytes.length);
        bytes.forEach(byte => arr[i++] = byte);

        var result = btoa(String.fromCharCode.apply(null, arr));

        console.log("(" + result.length + ") " + result);
        return result;
    }

    this.DecodeMoveListString = encodedMoveString => {
        var newMoveList = [];
        var decodedMovesAsStr = atob(encodedMoveString);
        var currentTimestamp = 0;

        Array.prototype.forEach.call(decodedMovesAsStr, function (char) {
            var i = char.charCodeAt(0) >> 3;
            var t = char.charCodeAt(0) % 8;

            currentTimestamp += _encodedTimeResolution * t;

            if (i >= _encodingData.length) {
                currentTimestamp += _encodedTimeResolution * 8;
            } else {
                newMoveList.push({
                    timestamp: currentTimestamp,
                    data: _encodingData[i]
                });
            }
        });

        return newMoveList;
    }
}