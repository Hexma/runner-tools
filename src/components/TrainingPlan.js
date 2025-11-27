import React, { useState } from 'react';
import './TrainingPlan.css';

const TrainingPlan = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [lactateThresholdHR, setLactateThresholdHR] = useState(165);
  const [maxHR, setMaxHR] = useState(182);
  const [lactateThresholdPace, setLactateThresholdPace] = useState('4:11');

  // Optimized Marathon Training Plan - 12 Weeks (80-83km weekly volume)
  // Designed for efficiency and maximum marathon performance
  const trainingWeeks = {
    1: {
      phase: 'Base Phase - Week 1',
      goal: 'Build Aerobic Foundation',
      totalKM: 73,
      longRunDistance: 16,
      workouts: [
        { day: 'Monday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest, optimize recovery' },
        { day: 'Tuesday', name: 'Long Tempo Run', zone: 'T', duration: 65, distance: 14, pace: '4:55/km', heartRate: '150-165 bpm', description: 'Warmup 5min + Main 38min + Cool 5min' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Active recovery, very relaxed' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M/T', duration: 70, distance: 13, pace: '5:15/km', heartRate: '140-155 bpm', description: 'Sustained marathon pace, build specific fitness' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare body for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 145, distance: 16, pace: '5:45/km', heartRate: '120-140 bpm', description: 'Build endurance at marathon pace, focus on nutrition' },
        { day: 'Sunday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Active recovery, maintain steady pace' }
      ]
    },
    2: {
      phase: 'Base Phase - Week 2',
      goal: 'Increase Lactate Threshold Capacity',
      totalKM: 77,
      longRunDistance: 18,
      workouts: [
        { day: 'Monday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest, optimize recovery' },
        { day: 'Tuesday', name: 'Tempo Run Plus', zone: 'T', duration: 70, distance: 15, pace: '4:50/km', heartRate: '150-165 bpm', description: 'Warmup 5min + Main 42min + Cool 5min' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Recovery with steady cadence' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M/T', duration: 75, distance: 14, pace: '5:10/km', heartRate: '140-155 bpm', description: 'Extended marathon pace, mental preparation' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 160, distance: 18, pace: '5:40/km', heartRate: '120-140 bpm', description: 'Significant mileage, practice fueling strategy' },
        { day: 'Sunday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Active recovery, maintain steady pace' }
      ]
    },
    3: {
      phase: 'Base Phase - Week 3',
      goal: 'Develop VO2Max and Speed Endurance',
      totalKM: 77,
      longRunDistance: 19,
      workouts: [
        { day: 'Monday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest, optimize recovery' },
        { day: 'Tuesday', name: 'VO2Max Intervals', zone: 'V', duration: 70, distance: 13, pace: '4:35/km', heartRate: '165-180 bpm', description: 'Warmup 5min + 8x4min intervals (2min recovery) + Cool' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Active recovery' },
        { day: 'Thursday', name: 'Marathon Tempo Fartlek', zone: 'M/T', duration: 80, distance: 15, pace: '5:05/km', heartRate: '145-160 bpm', description: 'Mix of marathon pace and threshold pace' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 170, distance: 19, pace: '5:35/km', heartRate: '120-140 bpm', description: 'Peak endurance building' },
        { day: 'Sunday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Active recovery, maintain steady pace' }
      ]
    },
    4: {
      phase: 'Base Phase - Week 4 (Deload)',
      goal: 'Strategic Recovery for Adaptation',
      totalKM: 62,
      longRunDistance: 12,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:15/km', heartRate: '110-130 bpm', description: 'Light easy run' },
        { day: 'Tuesday', name: 'Marathon Pace Run', zone: 'M', duration: 65, distance: 12, pace: '5:35/km', heartRate: '135-150 bpm', description: 'Maintain fitness with reduced volume' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:30/km', heartRate: '110-130 bpm', description: 'Light recovery' },
        { day: 'Thursday', name: 'Tempo Run', zone: 'T', duration: 60, distance: 11, pace: '5:15/km', heartRate: '145-160 bpm', description: 'Moderate intensity' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 45, distance: 7, pace: '6:45/km', heartRate: '110-130 bpm', description: 'Very light' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 100, distance: 12, pace: '6:15/km', heartRate: '120-140 bpm', description: 'Deload long run, maintain feeling' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    5: {
      phase: 'Build Phase - Week 5',
      goal: 'Increase Pace and Volume',
      totalKM: 80,
      longRunDistance: 20,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Recovery run' },
        { day: 'Tuesday', name: 'Long Tempo Run', zone: 'T', duration: 70, distance: 15, pace: '4:45/km', heartRate: '150-165 bpm', description: 'Warmup 5min + Main 42min + Cool 5min' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Light recovery' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M/T', duration: 80, distance: 15, pace: '5:05/km', heartRate: '140-155 bpm', description: 'Extended marathon pace work' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 175, distance: 20, pace: '5:30/km', heartRate: '120-140 bpm', description: 'Build toward peak mileage' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    6: {
      phase: 'Build Phase - Week 6',
      goal: 'Peak Volume and Fitness',
      totalKM: 80,
      longRunDistance: 22,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Tuesday', name: 'VO2Max Intervals', zone: 'V', duration: 70, distance: 13, pace: '4:30/km', heartRate: '170-180 bpm', description: 'Warmup 5min + 10x3min intervals + Cool' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Recovery with rhythm' },
        { day: 'Thursday', name: 'Marathon Tempo Fartlek', zone: 'M/T', duration: 80, distance: 15, pace: '5:00/km', heartRate: '145-160 bpm', description: 'Varied intensity at marathon fitness' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for race-distance run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 190, distance: 22, pace: '5:25/km', heartRate: '120-140 bpm', description: 'Peak long run - race simulation' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    7: {
      phase: 'Build Phase - Week 7',
      goal: 'Maximize Marathon Fitness',
      totalKM: 83,
      longRunDistance: 23,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Tuesday', name: 'Long Tempo Run', zone: 'T', duration: 70, distance: 15, pace: '4:40/km', heartRate: '150-165 bpm', description: 'Warmup 5min + Main 42min + Cool 5min' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Active recovery' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M/T', duration: 80, distance: 15, pace: '4:55/km', heartRate: '140-155 bpm', description: 'Sustained marathon pace work' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 195, distance: 23, pace: '5:20/km', heartRate: '120-140 bpm', description: 'Beyond race distance - practice nutrition' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    8: {
      phase: 'Build Phase - Week 8 (Deload)',
      goal: 'Consolidate Fitness Through Recovery',
      totalKM: 65,
      longRunDistance: 14,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:15/km', heartRate: '110-130 bpm', description: 'Light recovery' },
        { day: 'Tuesday', name: 'Marathon Pace Run', zone: 'M', duration: 70, distance: 13, pace: '5:30/km', heartRate: '135-150 bpm', description: 'Maintain fitness' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:30/km', heartRate: '110-130 bpm', description: 'Light' },
        { day: 'Thursday', name: 'Tempo Run', zone: 'T', duration: 65, distance: 12, pace: '5:20/km', heartRate: '145-160 bpm', description: 'Moderate intensity' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 45, distance: 7, pace: '6:45/km', heartRate: '110-130 bpm', description: 'Very light' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 110, distance: 14, pace: '6:20/km', heartRate: '120-140 bpm', description: 'Deload long run' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    9: {
      phase: 'Peak Phase - Week 9',
      goal: 'Race Pace Optimization',
      totalKM: 77,
      longRunDistance: 21,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Tuesday', name: 'Race Pace Intervals', zone: 'V', duration: 70, distance: 12, pace: '4:50/km', heartRate: '160-175 bpm', description: 'Warmup 5min + 5x6min at race pace + Cool' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Thursday', name: 'Marathon Tempo Fartlek', zone: 'M/T', duration: 75, distance: 14, pace: '5:00/km', heartRate: '145-160 bpm', description: 'Varied marathon-pace work' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 185, distance: 21, pace: '5:25/km', heartRate: '120-140 bpm', description: 'Maintain peak mileage' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    10: {
      phase: 'Peak Phase - Week 10',
      goal: 'Maintain Peak Fitness',
      totalKM: 79,
      longRunDistance: 20,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 70, distance: 11, pace: '6:00/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Tuesday', name: 'Long Tempo Run', zone: 'T', duration: 70, distance: 15, pace: '4:45/km', heartRate: '150-165 bpm', description: 'Warmup 5min + Main 42min + Cool 5min' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:20/km', heartRate: '110-130 bpm', description: 'Recovery' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M/T', duration: 75, distance: 14, pace: '5:05/km', heartRate: '140-155 bpm', description: 'Strong marathon pace work' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 50, distance: 8, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Prepare for long run' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 180, distance: 20, pace: '5:30/km', heartRate: '120-140 bpm', description: 'Maintain endurance' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    11: {
      phase: 'Peak Phase - Week 11 (Deload)',
      goal: 'Final Taper Preparation',
      totalKM: 58,
      longRunDistance: 12,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 55, distance: 9, pace: '6:15/km', heartRate: '110-130 bpm', description: 'Light recovery' },
        { day: 'Tuesday', name: 'Race Pace Run', zone: 'V', duration: 65, distance: 11, pace: '5:00/km', heartRate: '160-170 bpm', description: 'Warmup 5min + 3x5min race pace + Cool' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 45, distance: 7, pace: '6:35/km', heartRate: '110-130 bpm', description: 'Light' },
        { day: 'Thursday', name: 'Marathon Pace Run', zone: 'M', duration: 60, distance: 11, pace: '5:25/km', heartRate: '135-150 bpm', description: 'Maintain fitness' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 40, distance: 6, pace: '6:45/km', heartRate: '110-130 bpm', description: 'Very light' },
        { day: 'Saturday', name: 'Long Run', zone: 'E', duration: 110, distance: 12, pace: '6:30/km', heartRate: '120-140 bpm', description: 'Final taper long run' },
        { day: 'Sunday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest' }
      ]
    },
    12: {
      phase: 'Race Week - Week 12',
      goal: 'Execute Optimized Training Taper',
      totalKM: 77,
      longRunDistance: 0,
      workouts: [
        { day: 'Monday', name: 'Easy Run', zone: 'E', duration: 45, distance: 7, pace: '6:30/km', heartRate: '110-130 bpm', description: 'Very light recovery' },
        { day: 'Tuesday', name: 'Short Tempo', zone: 'M', duration: 50, distance: 9, pace: '5:40/km', heartRate: '140-150 bpm', description: 'Light tempo, maintain fitness' },
        { day: 'Wednesday', name: 'Easy Run', zone: 'E', duration: 35, distance: 6, pace: '6:50/km', heartRate: '110-130 bpm', description: 'Easy jogging' },
        { day: 'Thursday', name: 'Easy Run', zone: 'E', duration: 35, distance: 5, pace: '7:00/km', heartRate: '110-130 bpm', description: 'Very light' },
        { day: 'Friday', name: 'Easy Shakeout', zone: 'E', duration: 30, distance: 4, pace: '7:15/km', heartRate: '110-130 bpm', description: 'Keep legs loose and fresh' },
        { day: 'Saturday', name: 'Race Day', zone: '-', duration: 180, distance: 42.195, pace: 'Target pace', heartRate: 'Target HR', description: 'Execute race strategy - start conservative, finish strong!' },
        { day: 'Sunday', name: 'Recovery Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest, celebrate success!' }
      ]
    }
  };

  const zoneInfo = {
    'E': { color: '#4CAF50', description: 'Easy Run (60-70% max HR) - 5:45-6:15/km' },
    'M': { color: '#2196F3', description: 'Moderate Intensity (70-80% max HR) - 5:15-5:40/km' },
    'M/T': { color: '#1976D2', description: 'Marathon Pace (75-85% max HR) - 5:05-5:35/km' },
    'T': { color: '#FF9800', description: 'Lactate Threshold (80-90% max HR) - 4:11-4:50/km' },
    'V': { color: '#F44336', description: 'VO2Max (90-95% max HR) - 3:50-4:15/km' },
    'I': { color: '#9C27B0', description: 'Sprint Intensity (95-100% max HR) - <3:50/km' }
  };

  const currentWeek = trainingWeeks[selectedWeek];

  return (
    <div className="training-plan">
      <div className="plan-header">
        <h2>🏃 Marathon 12-Week Optimized Training Plan</h2>
        <p>Designed for 80-83km Weekly Volume - Maximum Efficiency & Performance</p>
      </div>

      <div className="plan-highlights">
        <div className="highlight-card">
          <span className="highlight-icon">📊</span>
          <div className="highlight-content">
            <h4>Optimized Volume Distribution</h4>
            <p>Peak 80-83km weeks alternating with 58-65km deload weeks for maximum recovery</p>
          </div>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">⚡</span>
          <div className="highlight-content">
            <h4>Strategic Intensity</h4>
            <p>Two high-intensity sessions per week with proper recovery between efforts</p>
          </div>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">🎯</span>
          <div className="highlight-content">
            <h4>Race Pace Emphasis</h4>
            <p>Regular marathon pace training builds specific race fitness</p>
          </div>
        </div>
      </div>

      <div className="plan-parameters">
        <div className="param-item">
          <label>Max Heart Rate (bpm)</label>
          <input 
            type="number" 
            value={maxHR} 
            onChange={(e) => setMaxHR(parseInt(e.target.value))}
            min="150"
            max="220"
          />
        </div>
        <div className="param-item">
          <label>Lactate Threshold HR (bpm)</label>
          <input 
            type="number" 
            value={lactateThresholdHR} 
            onChange={(e) => setLactateThresholdHR(parseInt(e.target.value))}
            min="120"
            max="200"
          />
        </div>
        <div className="param-item">
          <label>Lactate Threshold Pace (min:sec/km)</label>
          <input 
            type="text" 
            value={lactateThresholdPace} 
            onChange={(e) => setLactateThresholdPace(e.target.value)}
            placeholder="4:11"
          />
        </div>
      </div>

      <div className="week-selector">
        <h3>Select Training Week</h3>
        <div className="week-buttons">
          {Object.keys(trainingWeeks).map(week => (
            <button
              key={week}
              className={`week-btn ${selectedWeek === parseInt(week) ? 'active' : ''}`}
              onClick={() => setSelectedWeek(parseInt(week))}
            >
              Week {week}
            </button>
          ))}
        </div>
      </div>

      <div className="current-week-info">
        <div className="week-header">
          <h3>{currentWeek.phase}</h3>
          <div className="week-stats">
            <div className="stat">
              <span className="label">Weekly Goal</span>
              <span className="value">{currentWeek.goal}</span>
            </div>
            <div className="stat">
              <span className="label">Total Weekly KM</span>
              <span className="value">{currentWeek.totalKM} km</span>
            </div>
            <div className="stat">
              <span className="label">Long Run Distance</span>
              <span className="value">{currentWeek.longRunDistance} km</span>
            </div>
          </div>
        </div>

        <div className="workouts-grid">
          {currentWeek.workouts.map((workout, index) => (
            <div key={index} className="workout-card">
              <div className="workout-day">{workout.day}</div>
              <div className="workout-body">
                <div className="workout-name">{workout.name}</div>
                {workout.zone !== '-' && (
                  <div className="zone-badge" style={{ backgroundColor: zoneInfo[workout.zone]?.color }}>
                    {zoneInfo[workout.zone]?.description || workout.zone}
                  </div>
                )}
                <div className="workout-details">
                  {workout.duration > 0 && (
                    <div className="detail-item">
                      <span className="label">Duration:</span>
                      <span className="value">{workout.duration} min</span>
                    </div>
                  )}
                  {workout.distance > 0 && (
                    <div className="detail-item">
                      <span className="label">Distance:</span>
                      <span className="value">{workout.distance} km</span>
                    </div>
                  )}
                  {workout.heartRate !== '-' && (
                    <div className="detail-item">
                      <span className="label">Heart Rate:</span>
                      <span className="value">{workout.heartRate}</span>
                    </div>
                  )}
                </div>
                <div className="workout-description">{workout.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="zone-legend">
        <h3>Training Zone Guide</h3>
        <div className="zone-items">
          {Object.entries(zoneInfo).map(([zone, info]) => (
            <div key={zone} className="zone-item">
              <div className="zone-color" style={{ backgroundColor: info.color }}></div>
              <span>{info.description}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="training-tips">
        <h3>📌 Training Optimization Tips</h3>
        <ul>
          <li><strong>Your Lactate Threshold Pace:</strong> {lactateThresholdPace}/km at {lactateThresholdHR} bpm - use this as reference for T-zone training</li>
          <li><strong>Threshold Training Intensity:</strong> T-zone runs should be at {lactateThresholdPace}/km or slightly faster, typically 5-10 sec/km faster than easy pace</li>
          <li><strong>Marathon Pace Reference:</strong> Goal marathon pace should be 25-40 sec/km slower than your lactate threshold pace ({lactateThresholdPace}/km)</li>
          <li><strong>Volume Strategy:</strong> Alternate between 80-83km peak weeks and 58-65km recovery weeks for optimal adaptation</li>
          <li><strong>Long Run Progression:</strong> Increases from 16km to 23km, then tapers for racing</li>
          <li><strong>Intensity Distribution:</strong> Two high-intensity sessions per week: one threshold/tempo, one VO2Max or race-pace intervals</li>
          <li><strong>Easy Run Role:</strong> 45-50% of weekly volume at easy pace (5:45-6:15/km) for recovery and base building</li>
          <li><strong>Deload Weeks:</strong> Every 4th week reduces volume by 20-25% - critical for preventing injury and promoting adaptation</li>
          <li><strong>Nutrition Strategy:</strong> Practice race-day fueling on long runs, especially runs over 90 minutes</li>
          <li><strong>Recovery Priority:</strong> Sleep (8-9 hours) and active recovery are as important as the workouts themselves</li>
        </ul>
      </div>
    </div>
  );
};

export default TrainingPlan;
