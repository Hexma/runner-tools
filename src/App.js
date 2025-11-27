import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import PaceCalculator from './components/PaceCalculator';
import TrainingPlan from './components/TrainingPlan';
import { calculateHeartRateZones, calculateLactateThresholdZones } from './utils/heartRateCalculator';
import './App.css';

function App() {
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('calculator');

  const handleCalculate = (maxHR, restingHR, lactateThresholdHR = null) => {
    const calculatedResults = calculateHeartRateZones(maxHR, restingHR);

    // If lactate threshold HR is provided, also calculate LT-based zones
    if (lactateThresholdHR) {
      const ltResults = calculateLactateThresholdZones(lactateThresholdHR);
      calculatedResults.lactateThresholdHR = lactateThresholdHR;
      calculatedResults.lactateThresholdZones = ltResults;
    }

    setResults(calculatedResults);
  };

  const handleReset = () => {
    setResults(null);
  };

  const tabs = [
    { id: 'calculator', label: 'Heart Rate Calculator', icon: '💓' },
    { id: 'pace', label: 'Pace Calculator', icon: '⏱️' },
    { id: 'training-plan', label: 'Training Plan', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'calculator':
        return (
          <div className="tab-content">
            {!results ? (
              <InputForm onCalculate={handleCalculate} />
            ) : (
              <ResultsDisplay results={results} onReset={handleReset} />
            )}
          </div>
        );
      case 'pace':
        return (
          <div className="tab-content">
            <PaceCalculator />
          </div>
        );
      case 'training-plan':
        return (
          <div className="tab-content">
            <TrainingPlan />
          </div>
        );
      case 'settings':
        return (
          <div className="tab-content">
            <div className="placeholder-content">
              <h2>Settings</h2>
              <p>Here you can set personal information, unit preferences, etc.</p>
              <div className="feature-coming-soon">
                <span>⚙️</span>
                <p>Feature under development, coming soon...</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>Runner's Toolbox</h1>
          <p>Based on Heart Rate Reserve method (E M T A I zones), scientifically guide your running training</p>
        </header>

        <div className="tab-container">
          <div className="tab-navigation">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <main className="app-main">
            {renderTabContent()}
          </main>
        </div>

        <footer className="app-footer">
          <p>© 2024 Heart Rate Zone Calculator | Make Running More Scientific</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
