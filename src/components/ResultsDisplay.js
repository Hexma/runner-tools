import React from 'react';
import './ResultsDisplay.css';

const ResultsDisplay = ({ results, onReset }) => {
  if (!results) return null;

  const {
    maxHeartRate,
    restingHeartRate,
    heartRateReserve,
    zones,
    lactateThresholdHR,
    lactateThresholdZones
  } = results;

  return (
    <div className="results-display">
      <div className="results-header">
        <h2>Heart Rate Training Zones</h2>
        <button className="back-btn" onClick={onReset}>
          Back to Calculator
        </button>
      </div>

      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-label">Max Heart Rate：</span>
          <span className="stat-value">{maxHeartRate} bpm</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Resting Heart Rate：</span>
          <span className="stat-value">{restingHeartRate} bpm</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Heart Rate Reserve：</span>
          <span className="stat-value">{heartRateReserve} bpm</span>
        </div>
      </div>

      <div className="zones-comparison-container">
        <h3>Training Heart Rate Zones Comparison</h3>

        <div className="zones-comparison-row">
          {/* Heart Rate Reserve Method - Left Column */}
          <div className="zones-method-column">
            <div className="method-header">
              <h4>Heart Rate Reserve Method (HRR)</h4>
              <p>Based on resting heart rate</p>
            </div>
            <div className="zones-grid">
              {Object.entries(zones).map(([key, zone]) => (
                <div key={key} className="zone-card" style={{ borderLeftColor: zone.color }}>
                  <div className="zone-header">
                    <div className="zone-header-left">
                      <h4 className="zone-name">{zone.name}</h4>
                    </div>
                    <div className="zone-header-right">
                      <div className="zone-range" style={{ color: zone.color }}>
                        {zone.range}
                      </div>
                    </div>
                  </div>
                  <p className="zone-description">{zone.description}</p>
                  <div className="zone-intensity">
                    Intensity: {Math.round(zone.min * 100)}% - {Math.round(zone.max * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lactate Threshold Method - Right Column */}
          {lactateThresholdZones && (
            <div className="zones-method-column">
              <div className="method-header">
                <h4>Lactate Threshold Method (LT)</h4>
                <p>Based on lactate threshold heart rate: <strong>{lactateThresholdHR} bpm</strong></p>
              </div>
              <div className="zones-grid">
                {Object.entries(lactateThresholdZones.zones).map(([key, zone]) => (
                  <div key={key} className="zone-card" style={{ borderLeftColor: zone.color }}>
                    <div className="zone-header">
                      <div className="zone-header-left">
                        <h4 className="zone-name">{zone.name}</h4>
                      </div>
                      <div className="zone-header-right">
                        <div className="zone-range" style={{ color: zone.color }}>
                          {zone.minHR} - {zone.maxHR} bpm
                        </div>
                      </div>
                    </div>
                    <p className="zone-description">{zone.description}</p>
                    <div className="zone-intensity">
                      Intensity: {Math.round(zone.min * 100)}% - {Math.round(zone.max * 100)}% of LT
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="usage-tips">
        <h3>Training Tips</h3>
        <div className="tips-row">
          <div className="tip-item">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4>Base Building</h4>
              <p>Spend 70-80% of training time in E and M zones to build aerobic base</p>
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-icon">🏃️‍♂️</div>
            <div className="tip-content">
              <h4>Threshold Training</h4>
              <p>Include T zone workouts (1-2 times per week) to raise your lactate threshold</p>
            </div>
          </div>
          <div className="tip-item">
            <div className="tip-icon">⚡</div>
            <div className="tip-content">
              <h4>Interval Training</h4>
              <p>Add I zone intervals (400m repeats) to improve speed and VO2max</p>
            </div>
          </div>
        </div>
      </div>

      <div className="disclaimer">
        <p>
          <strong>Important:</strong> These are estimates based on standard formulas.
          Individual variations may apply. Always listen to your body and
          consult with a certified coach for personalized training plans.
        </p>
      </div>
    </div>
  );
};

export default ResultsDisplay;
