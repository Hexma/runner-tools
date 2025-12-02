import React, { useState } from 'react';
import './TrainingPlan.css';

const TrainingPlan = () => {
  const [lactateThresholdHR, setLactateThresholdHR] = useState(165);
  const [maxHR, setMaxHR] = useState(182);
  const [lactateThresholdPace, setLactateThresholdPace] = useState('4:11');

  // 根据训练日和强度计算营养摄入建议
  const getNutritionIntake = (day, zone) => {
    const nutritionMap = {
      'Monday': { carbs: '60-80g', protein: '20-30g', fat: '15-20g' }, // 休息日，基础需求
      'Tuesday': { carbs: '80-100g', protein: '25-35g', fat: '10-15g' }, // 有氧跑，糖原为主
      'Wednesday': { carbs: '90-110g', protein: '30-40g', fat: '12-18g' }, // 乳酸阈值，高强度
      'Thursday': { carbs: '50-70g', protein: '18-25g', fat: '20-30g' }, // 轻松跑，脂肪为主
      'Friday': { carbs: '50-70g', protein: '18-25g', fat: '20-30g' }, // 轻松恢复
      'Saturday': { carbs: '100-130g', protein: '35-45g', fat: '15-25g' }, // 长距离有氧
      'Sunday': { carbs: '120-160g', protein: '40-55g', fat: '20-35g' }  // 长距离训练
    };
    
    return nutritionMap[day] || {};
  };

  // Weekly Fixed Training Plan - 7-Day Cycle
  const weeklyTraining = {
    1: {
      phase: 'Weekly Training Plan',
      goal: 'Improve Running Performance and Fitness',
      totalKM: 92,
      longRunDistance: 32,
      workouts: [
        { day: 'Monday', name: 'Rest Day', zone: '-', duration: 0, distance: 0, pace: '-', heartRate: '-', description: 'Complete rest, promote recovery' },
        { day: 'Tuesday', name: 'Aerobic Run', zone: 'AE', duration: 70, distance: 12, pace: '5:05-4:25/km', heartRate: '140-160 bpm', description: 'Moderate intensity aerobic training, improve cardiovascular function' },
        { day: 'Wednesday', name: 'Lactate Threshold Run', zone: 'T', duration: 65, distance: 10, pace: '4:25-3:55/km (fast) / 5:25-4:55/km (slow)', heartRate: '165-180 bpm (fast) / 140-155 bpm (slow)', description: 'Warmup 5min, then alternate 1km fast (4:25-3:55) and 1km slow (5:25-4:55) for 5 sets, cooldown 5min' },
        { day: 'Thursday', name: 'Easy Run', zone: 'E', duration: 60, distance: 10, pace: '6:25-4:55/km', heartRate: '120-140 bpm', description: 'Easy recovery run, maintain body activity' },
        { day: 'Friday', name: 'Easy Run', zone: 'E', duration: 60, distance: 10, pace: '6:25-4:55/km', heartRate: '120-140 bpm', description: 'Easy recovery run, prepare for long distance training' },
        { day: 'Saturday', name: 'Aerobic Run', zone: 'AE', duration: 90, distance: 16, pace: '5:05-4:25/km', heartRate: '140-160 bpm', description: 'Long duration aerobic training, improve endurance level' },
        { day: 'Sunday', name: 'Long Distance Training', zone: 'LD', duration: 180, distance: 32, pace: 'Segmented pace: 5:00-4:50 / 4:50-4:40 / 4:40-4:30', heartRate: '140-165 bpm', description: 'First 11km pace 5:00-4:50, second 11km pace 4:50-4:40, final 10km pace 4:40-4:30' }
      ]
    }
  };

  const zoneInfo = {
    'E': { color: '#4CAF50', description: 'Easy Run (60-70% max HR) - 6:25-4:55/km' },
    'AE': { color: '#00BCD4', description: 'Aerobic Run (70-80% max HR) - 5:05-4:25/km' },
    'M': { color: '#2196F3', description: 'Moderate Intensity (70-80% max HR) - 5:15-5:40/km' },
    'LD': { color: '#2196F3', description: 'Long Distance (70-80% max HR) - 5:00-4:30/km' },
    'M/T': { color: '#1976D2', description: 'Marathon Pace (75-85% max HR) - 5:05-5:35/km' },
    'T': { color: '#FF9800', description: 'Lactate Threshold (80-90% max HR) - 4:25-3:55/km (fast) / 5:25-4:55/km (slow)' },
    'V': { color: '#F44336', description: 'VO2Max (90-95% max HR) - 3:50-4:15/km' },
    'I': { color: '#9C27B0', description: 'Sprint Intensity (95-100% max HR) - <3:50/km' }
  };

  const currentWeek = weeklyTraining[1];

  return (
    <div className="training-plan">
      <div className="plan-header">
        <h2>🏃 Weekly Periodic Training Plan</h2>
        <p>7-Day Fixed Cycle - Scientific Training Arrangement, Improve Running Performance</p>
      </div>

      <div className="plan-highlights">
        <div className="highlight-card">
          <span className="highlight-icon">📅</span>
          <div className="highlight-content">
            <h4>Periodic Training</h4>
            <p>7-day fixed training content weekly, cyclic execution, establish stable training habits</p>
          </div>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">⚡</span>
          <div className="highlight-content">
            <h4>Scientific Pacing</h4>
            <p>Set reasonable pace zones according to different training goals, improve training effectiveness</p>
          </div>
        </div>
        <div className="highlight-card">
          <span className="highlight-icon">🎯</span>
          <div className="highlight-content">
            <h4>Comprehensive Improvement</h4>
            <p>Full development of aerobic capacity, lactate threshold, and long-distance endurance</p>
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

      <div className="current-week-info">
        <div className="week-header">
          <h3>{currentWeek.phase}</h3>
          <div className="week-stats">
            <div className="stat">
              <span className="label">Training Goal</span>
              <span className="value">{currentWeek.goal}</span>
            </div>
            <div className="stat">
              <span className="label">Weekly Total Distance</span>
              <span className="value">{currentWeek.totalKM} km</span>
            </div>
            <div className="stat">
              <span className="label">Long Distance Training</span>
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
                
                {/* 根据训练内容添加营养摄入建议 */}
                {getNutritionIntake(workout.day, workout.zone) && (
                  <div className="nutrition-intake-card">
                    <div className="intake-title">Nutrition Intake (62kg)</div>
                    <div className="intake-nutrients">
                      <div className="intake-item">
                        <span className="nutrient-label">Carbs</span>
                        <span className="intake-nutrient carbs">{getNutritionIntake(workout.day, workout.zone).carbs}</span>
                      </div>
                      <div className="intake-item">
                        <span className="nutrient-label">Protein</span>
                        <span className="intake-nutrient protein">{getNutritionIntake(workout.day, workout.zone).protein}</span>
                      </div>
                      <div className="intake-item">
                        <span className="nutrient-label">Fat</span>
                        <span className="intake-nutrient fat">{getNutritionIntake(workout.day, workout.zone).fat}</span>
                      </div>
                    </div>
                  </div>
                )}
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
        <h3>📌 Periodic Training Key Points</h3>
        <ul>
          <li><strong>Lactate Threshold Pace Reference:</strong> {lactateThresholdPace}/km, HR {lactateThresholdHR} bpm - Use as reference for T-zone training</li>
          <li><strong>Threshold Training Intensity:</strong> T-zone training should follow lactate threshold pace {lactateThresholdPace}/km or slightly faster, typically 5-10 sec/km faster than easy pace</li>
          <li><strong>Pacing Strategy:</strong> Tuesday and Saturday aerobic runs control within 5:20-4:25 min/km range, adjust according to daily body condition</li>
          <li><strong>Wednesday Lactate Threshold Run:</strong> Strictly execute 1km fast-slow alternation, fast segment 4:25-3:55 min/km, slow segment 5:25-4:55 min/km, total 5 sets</li>
          <li><strong>Easy Run Purpose:</strong> Thursday and Friday easy runs mainly for active recovery, pace 6:25-5:25 min/km, don't go too fast</li>
          <li><strong>Long Distance Training Pace:</strong> Sunday 32km segmented execution: first 11km pace 5:00-4:50, second 11km pace 4:50-4:40, final 10km pace 4:40-4:30</li>
          <li><strong>Nutrition Strategy:</strong> Long distance training (over 90 minutes) should practice race day fueling plan, supplement energy every 45 minutes</li>
          <li><strong>Recovery Priority:</strong> Monday complete rest, ensure 8-9 hours sleep, active recovery is as important as training itself</li>
          <li><strong>Periodic Execution:</strong> Repeat the same training content weekly to form stable training rhythm and habits</li>
          <li><strong>Flexible Adjustment:</strong> Adjust pace appropriately according to body condition, weather and recovery status, but maintain training framework unchanged</li>
        </ul>
      </div>
    </div>
  );
};

export default TrainingPlan;
