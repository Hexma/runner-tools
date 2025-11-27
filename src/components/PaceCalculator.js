import React, { useState, useEffect } from 'react';
import './PaceCalculator.css';

const PaceCalculator = () => {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [cadence, setCadence] = useState('180'); // steps per minute, default 180
  const [strideLength, setStrideLength] = useState(''); // meters
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatMarathonTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate stride length from pace and cadence
  const calculateStrideFromPaceCadence = (paceSeconds, cadenceValue) => {
    if (!paceSeconds || !cadenceValue) return '';
    const speedMeterPerSecond = 1000 / paceSeconds; // m/s
    const strideLengthMeters = (speedMeterPerSecond * 60) / cadenceValue; // meters
    return (strideLengthMeters * 100).toFixed(1); // convert to cm and round to 1 decimal
  };

  // Calculate cadence from pace and stride length
  const calculateCadenceFromPaceStride = (paceSeconds, strideLengthCm) => {
    if (!paceSeconds || !strideLengthCm) return '';
    const speedMeterPerSecond = 1000 / paceSeconds; // m/s
    const strideLengthMeters = strideLengthCm / 100; // convert cm to meters
    const cadenceValue = (speedMeterPerSecond * 60) / strideLengthMeters; // steps per minute
    return Math.round(cadenceValue);
  };

  // Calculate pace from cadence and stride length
  const calculatePaceFromCadenceStride = (cadenceValue, strideLengthCm) => {
    if (!cadenceValue || !strideLengthCm) return { minutes: '', seconds: '' };
    const strideLengthMeters = strideLengthCm / 100; // convert cm to meters
    const speedMeterPerSecond = (cadenceValue * strideLengthMeters) / 60; // m/s
    const paceSeconds = 1000 / speedMeterPerSecond; // seconds per km
    const minutes = Math.floor(paceSeconds / 60);
    const seconds = Math.round(paceSeconds % 60);
    return { minutes: minutes.toString(), seconds: seconds.toString() };
  };


  // Handle blur events for calculations
  const handlePaceBlur = () => {
    if (minutes !== '' && seconds !== '' && cadence !== '') {
      const totalSecondsPerKm = parseInt(minutes) * 60 + parseInt(seconds);
      const calculatedStride = calculateStrideFromPaceCadence(totalSecondsPerKm, parseInt(cadence));
      if (calculatedStride && calculatedStride !== strideLength) {
        setStrideLength(calculatedStride);
      }
    }
  };

  const handleCadenceBlur = () => {
    if (minutes !== '' && seconds !== '' && cadence !== '') {
      const totalSecondsPerKm = parseInt(minutes) * 60 + parseInt(seconds);
      const calculatedStride = calculateStrideFromPaceCadence(totalSecondsPerKm, parseInt(cadence));
      if (calculatedStride && calculatedStride !== strideLength) {
        setStrideLength(calculatedStride);
      }
    } else if (cadence !== '' && strideLength !== '') {
      const calculatedPace = calculatePaceFromCadenceStride(parseInt(cadence), parseFloat(strideLength));
      if (calculatedPace.minutes !== '' && calculatedPace.seconds !== '') {
        setMinutes(calculatedPace.minutes);
        setSeconds(calculatedPace.seconds);
      }
    }
  };

  const handleStrideLengthBlur = () => {
    if (minutes !== '' && seconds !== '' && strideLength !== '') {
      const totalSecondsPerKm = parseInt(minutes) * 60 + parseInt(seconds);
      const calculatedCadence = calculateCadenceFromPaceStride(totalSecondsPerKm, parseFloat(strideLength));
      if (calculatedCadence && calculatedCadence.toString() !== cadence) {
        setCadence(calculatedCadence.toString());
      }
    } else if (cadence !== '' && strideLength !== '') {
      const calculatedPace = calculatePaceFromCadenceStride(parseInt(cadence), parseFloat(strideLength));
      if (calculatedPace.minutes !== '' && calculatedPace.seconds !== '') {
        setMinutes(calculatedPace.minutes);
        setSeconds(calculatedPace.seconds);
      }
    }
  };

  // Calculate split times whenever input changes
  useEffect(() => {
    if (minutes !== '' && seconds !== '') {
      const min = parseInt(minutes);
      const sec = parseInt(seconds);

      // Validation
      const newErrors = {};

      if (minutes === '' || isNaN(min) || min < 0 || min > 20) {
        newErrors.minutes = 'Please enter valid minutes (0-20)';
      }

      if (seconds === '' || isNaN(sec) || sec < 0 || sec >= 60) {
        newErrors.seconds = 'Please enter valid seconds (0-59)';
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setResults(null);
        return;
      }

      setErrors({});

      // Convert 1km pace to total seconds
      const totalSecondsPerKm = min * 60 + sec;

      // Calculate split times (proportional to distance)
      const splits = {
        '200m': {
          distance: 200,
          totalSeconds: (totalSecondsPerKm * 200) / 1000,
          pace: formatTime((totalSecondsPerKm * 200) / 1000)
        },
        '300m': {
          distance: 300,
          totalSeconds: (totalSecondsPerKm * 300) / 1000,
          pace: formatTime((totalSecondsPerKm * 300) / 1000)
        },
        '400m': {
          distance: 400,
          totalSeconds: (totalSecondsPerKm * 400) / 1000,
          pace: formatTime((totalSecondsPerKm * 400) / 1000)
        },
        '600m': {
          distance: 600,
          totalSeconds: (totalSecondsPerKm * 600) / 1000,
          pace: formatTime((totalSecondsPerKm * 600) / 1000)
        },
        '800m': {
          distance: 800,
          totalSeconds: (totalSecondsPerKm * 800) / 1000,
          pace: formatTime((totalSecondsPerKm * 800) / 1000)
        }
      };

      // Calculate race distances
      const marathonTimes = {
        fiveK: {
          distance: 5,
          totalSeconds: totalSecondsPerKm * 5,
          time: formatTime(totalSecondsPerKm * 5)
        },
        tenK: {
          distance: 10,
          totalSeconds: totalSecondsPerKm * 10,
          time: formatMarathonTime(totalSecondsPerKm * 10)
        },
        halfMarathon: {
          distance: 21.1,
          totalSeconds: totalSecondsPerKm * 21.1,
          time: formatMarathonTime(totalSecondsPerKm * 21.1)
        },
        marathon: {
          distance: 42.2,
          totalSeconds: totalSecondsPerKm * 42.2,
          time: formatMarathonTime(totalSecondsPerKm * 42.2)
        }
      };

      setResults({
        inputPace: `${min}:${sec.toString().padStart(2, '0')}`,
        totalSecondsPerKm,
        splits,
        marathonTimes
      });
    } else {
      setResults(null);
      setErrors({});
    }
  }, [minutes, seconds]);

  const handleReset = () => {
    setMinutes('');
    setSeconds('');
    setCadence('180');
    setStrideLength('');
    setResults(null);
    setErrors({});
  };

  return (
    <div className="pace-calculator">
      <div className="pace-header">
        <h2>Pace Calculator</h2>
        <p>Enter your 1km pace time to calculate split times for shorter distances</p>
        <small className="example-text">Example: 4 minutes 30 seconds for a 4:30/km pace</small>
      </div>

      <div className="pace-input-section">
        <h3>1 Kilometer Pace</h3>
        <div className="pace-input-group">
          <div className="time-input">
            <label htmlFor="minutes">Minutes</label>
            <input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              onBlur={handlePaceBlur}
              placeholder="0"
              min="0"
              max="20"
              className={errors.minutes ? 'error' : ''}
            />
            {errors.minutes && <span className="error-message">{errors.minutes}</span>}
          </div>

          <div className="time-separator">:</div>

          <div className="time-input">
            <label htmlFor="seconds">Seconds</label>
            <input
              type="number"
              id="seconds"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              onBlur={handlePaceBlur}
              placeholder="00"
              min="0"
              max="59"
              className={errors.seconds ? 'error' : ''}
            />
            {errors.seconds && <span className="error-message">{errors.seconds}</span>}
          </div>
        </div>

        <div className="pace-actions">
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>

        <div className="cadence-stride-section">
          <h3>Running Technique</h3>
          <div className="pace-input-group">
            <div className="time-input technique-input">
              <label htmlFor="cadence">Cadence (steps/min)</label>
              <input
                type="number"
                id="cadence"
                value={cadence}
                onChange={(e) => setCadence(e.target.value)}
                onBlur={handleCadenceBlur}
                placeholder="180"
                min="120"
                max="220"
                className={errors.cadence ? 'error' : ''}
              />
              {errors.cadence && <span className="error-message">{errors.cadence}</span>}
            </div>

            <div className="time-separator">×</div>

            <div className="time-input technique-input">
              <label htmlFor="strideLength">Stride Length (cm)</label>
              <input
                type="number"
                id="strideLength"
                value={strideLength}
                onChange={(e) => setStrideLength(e.target.value)}
                onBlur={handleStrideLengthBlur}
                placeholder="Auto"
                min="50"
                max="200"
                step="0.1"
                className={errors.strideLength ? 'error' : ''}
              />
              {errors.strideLength && <span className="error-message">{errors.strideLength}</span>}
            </div>
          </div>

        <div className="technique-help">
          <small className="help-text">
            💡 Optimal cadence is typically 170-190 steps per minute. Stride length is automatically calculated based on pace and cadence.
          </small>
        </div>
      </div>

      {results && (
        <div className="pace-results">
          <div className="results-header">
            <h3>Split Times</h3>
            <div className="input-pace-display">
              1km Pace: <strong>{results.inputPace}</strong>
            </div>
          </div>

          <div className="splits-grid">
            {Object.entries(results.splits).map(([distance, data]) => (
              <div key={distance} className="split-card">
                <div className="split-distance">{distance}</div>
                <div className="split-time">{data.pace}</div>
                <div className="split-description">
                  {distance === '200m' && 'Sprint distance'}
                  {distance === '300m' && 'Middle sprint'}
                  {distance === '400m' && 'Quarter mile'}
                  {distance === '600m' && 'Middle distance'}
                  {distance === '800m' && 'Half mile'}
                </div>
              </div>
            ))}
          </div>

          <div className="marathon-times">
            <h3>Race Finish Times</h3>
            <div className="marathon-grid">
              <div className="marathon-card">
                <div className="marathon-distance">5K</div>
                <div className="marathon-time">{results.marathonTimes.fiveK.time}</div>
                <div className="marathon-description">5.0 km</div>
              </div>
              <div className="marathon-card">
                <div className="marathon-distance">10K</div>
                <div className="marathon-time">{results.marathonTimes.tenK.time}</div>
                <div className="marathon-description">10.0 km</div>
              </div>
              <div className="marathon-card">
                <div className="marathon-distance">Half Marathon</div>
                <div className="marathon-time">{results.marathonTimes.halfMarathon.time}</div>
                <div className="marathon-description">21.1 km</div>
              </div>
              <div className="marathon-card">
                <div className="marathon-distance">Full Marathon</div>
                <div className="marathon-time">{results.marathonTimes.marathon.time}</div>
                <div className="marathon-description">42.2 km</div>
              </div>
            </div>
          </div>

          <div className="pace-info">
            <h4>How to Use These Split Times</h4>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">🏃‍♂️</div>
                <div className="info-content">
                  <h5>Track Training</h5>
                  <p>Use these times as targets for interval training on a standard track</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">⏱️</div>
                <div className="info-content">
                  <h5>Pacing Strategy</h5>
                  <p>Practice maintaining consistent pace across different distances</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">📊</div>
                <div className="info-content">
                  <h5>Progress Tracking</h5>
                  <p>Monitor improvement by comparing actual times to calculated targets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaceCalculator;
