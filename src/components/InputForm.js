import React, { useState } from 'react';
import './InputForm.css';

const InputForm = ({ onCalculate }) => {
  const [maxHR, setMaxHR] = useState('182');
  const [restingHR, setRestingHR] = useState('51');
  const [lactateThresholdHR, setLactateThresholdHR] = useState('165');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const maxHRNum = parseInt(maxHR);
    const restingHRNum = parseInt(restingHR);
    const lactateThresholdHRNum = lactateThresholdHR ? parseInt(lactateThresholdHR) : null;

    // Basic validation
    const newErrors = {};

    if (!maxHR || maxHRNum < 120 || maxHRNum > 220) {
      newErrors.maxHR = 'Please enter a valid maximum heart rate (120-220 bpm)';
    }

    if (!restingHR || restingHRNum < 30 || restingHRNum > 100) {
      newErrors.restingHR = 'Please enter a valid resting heart rate (30-100 bpm)';
    }

    if (maxHRNum && restingHRNum && restingHRNum >= maxHRNum) {
      newErrors.restingHR = 'Resting heart rate cannot be greater than or equal to maximum heart rate';
    }

    if (maxHRNum && restingHRNum && (maxHRNum - restingHRNum) < 50) {
      newErrors.maxHR = 'The difference between maximum and resting heart rate is too small, please check the values';
    }

    if (lactateThresholdHRNum) {
      if (lactateThresholdHRNum < 120 || lactateThresholdHRNum > 200) {
        newErrors.lactateThresholdHR = 'Please enter a valid lactate threshold heart rate (120-200 bpm)';
      }

      if (maxHRNum && lactateThresholdHRNum >= maxHRNum) {
        newErrors.lactateThresholdHR = 'Lactate threshold heart rate cannot be greater than or equal to maximum heart rate';
      }

      if (restingHRNum && lactateThresholdHRNum <= restingHRNum) {
        newErrors.lactateThresholdHR = 'Lactate threshold heart rate must be greater than resting heart rate';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCalculate(maxHRNum, restingHRNum, lactateThresholdHRNum);
  };

  const handleReset = () => {
    setMaxHR('');
    setRestingHR('');
    setLactateThresholdHR('');
    setErrors({});
  };

  return (
    <div className="input-form">
      <div className="form-header">
        <h2>Heart Rate Zone Calculator</h2>
        <p>Based on Heart Rate Reserve method (E M T A I zones), calculate your personalized training heart rate zones</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-row-three">
          <div className="form-group-third">
            <label htmlFor="maxHR">Maximum Heart Rate (bpm)</label>
            <input
              type="number"
              id="maxHR"
              value={maxHR}
              onChange={(e) => setMaxHR(e.target.value)}
              placeholder="Max HR"
              min="120"
              max="220"
              className={errors.maxHR ? 'error' : ''}
            />
            {errors.maxHR && <span className="error-message">{errors.maxHR}</span>}
          </div>

          <div className="form-group-third">
            <label htmlFor="restingHR">Resting Heart Rate (bpm)</label>
            <input
              type="number"
              id="restingHR"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              placeholder="Resting HR"
              min="30"
              max="100"
              className={errors.restingHR ? 'error' : ''}
            />
            {errors.restingHR && <span className="error-message">{errors.restingHR}</span>}
          </div>

          <div className="form-group-third">
            <label htmlFor="lactateThresholdHR">Lactate Threshold (bpm)</label>
            <input
              type="number"
              id="lactateThresholdHR"
              value={lactateThresholdHR}
              onChange={(e) => setLactateThresholdHR(e.target.value)}
              placeholder="LT HR (Optional)"
              min="120"
              max="200"
              className={errors.lactateThresholdHR ? 'error' : ''}
            />
            {errors.lactateThresholdHR && <span className="error-message">{errors.lactateThresholdHR}</span>}
          </div>
        </div>

        <div className="help-section">
          <small className="help-text">
            💡 Maximum heart rate can be obtained through actual testing, or measured using a heart rate monitor during high-intensity exercise
          </small>
          <small className="help-text">
            💡 Resting heart rate is usually measured when you wake up in the morning, normal range is 50-80 bpm
          </small>
          <small className="help-text">
            💡 Lactate threshold heart rate is the point where lactate begins to accumulate rapidly in blood, typically around 80-90% of max heart rate
          </small>
        </div>

        <div className="form-actions">
          <button type="submit" className="calculate-btn">
            Calculate Heart Rate Zones
          </button>
          <button type="button" onClick={handleReset} className="reset-btn">
            Reset
          </button>
        </div>
      </form>

      <div className="info-section">
        <h3>About Heart Rate Reserve Method</h3>
        <p>
          The Heart Rate Reserve method is currently the most accurate heart rate zone calculation method. It considers individual differences in resting heart rate and provides more personalized training intensity guidance.
        </p>
        <p>
          <strong>Formula:</strong> Target Heart Rate = (Maximum Heart Rate - Resting Heart Rate) × Training Intensity% + Resting Heart Rate
        </p>
        <p>
          <strong>E M T A I Zones:</strong> Easy → Moderate (Aerobic) → Threshold → Anaerobic → Interval
        </p>
      </div>
    </div>
  );
};

export default InputForm;
