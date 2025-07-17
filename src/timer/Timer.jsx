/* eslint-disable no-debugger */
import { useState, useRef, useEffect, useMemo } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Header from "../components/Header";

const Timer = () => {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isStoped, setIsStoped] = useState(false)
  const [elapsedTime, setElapsed] = useState(0)
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!hasStarted || isStoped) return;

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 100);

    return () => clearInterval(intervalRef.current);
  }, [hasStarted, isStoped]);


  const handleStart = () => {
    debugger;

    setHasStarted(true);
    setIsStoped(false);
    setStartTime(Date.now());
    setNow(Date.now());
  }

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsStoped(true);

    if (startTime !== null && now !== null) {
      setElapsed(now - startTime);
    }
  }

  const handleResume = () => {
    setIsStoped(false);
    const start = Date.now() - elapsedTime;
    setStartTime(start);
    setNow(Date.now());
  }

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setHasStarted(false);
    setIsStoped(false);
    setStartTime(null);
    setNow(null);
    setElapsed(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (startTime && now) {
      const lapTime = ((now - startTime) / 1000).toFixed(3);
      setLaps((prevLaps) => [...prevLaps, lapTime]);
    }
  };

  let secondsPassed = useMemo(() => {
    if (startTime != null && now != null) {
      return (now - startTime) / 1000;
    }
    return 0;
  },[startTime, now])

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Timer
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Time passed: {secondsPassed.toFixed(3)} seconds
        </Typography>
        <Stack spacing={2} direction="row">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              if (!hasStarted) {
                handleStart();     // Start
              } else if (!isStoped) {
                handleLap();       // Lap
              } else {
                handleReset();     // Reset
              }
            }}
            size="large"
          >
            {!hasStarted ? 'Start' : !isStoped ? 'Lap' : 'Reset'}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={isStoped != false ? handleResume : handleStop}
            size="large"
            disabled={!startTime}
          >
            {isStoped != false ? 'Resume' : 'Stop'}
          </Button>
        </Stack>
        {laps.length > 0 && (
          <Box sx={{ mt: 4, width: '100%', maxWidth: 300, textAlign: "center" }}>
            <Typography variant="h6">Laps</Typography>
            {laps.map((lap, index) => (
              <Typography key={index}>
                Lap {index + 1}: {lap} sec
              </Typography>
            ))}
          </Box>
        )}
      </Box>


    </>
  )
}

export default Timer;