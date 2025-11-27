/**
 * Heart Rate Reserve method E M T A I heart rate zone definitions (based on Garmin standards)
 */
export const HR_ZONES = {
  EASY: {
    name: 'E Zone (Easy Run)',
    min: 0.59,
    max: 0.74,
    color: '#4CAF50',
    description: 'Easy recovery run, promotes blood circulation and fat burning',
    purpose: 'Foundation of daily training, 70-80% of total training volume'
  },
  MODERATE: {
    name: 'M Zone (Aerobic Run)',
    min: 0.74,
    max: 0.84,
    color: '#4CAF50',
    description: 'Aerobic base training, improves cardiovascular function and endurance',
    purpose: 'Marathon pace training, improves aerobic capacity'
  },
  THRESHOLD: {
    name: 'T Zone (Lactate Threshold)',
    min: 0.84,
    max: 0.88,
    color: '#2196F3',
    description: 'Lactate threshold training, improves sustained pace ability',
    purpose: 'Half marathon pace training, improves lactate clearance'
  },
  ANAEROBIC: {
    name: 'A Zone (Anaerobic Run)',
    min: 0.88,
    max: 0.95,
    color: '#FF9800',
    description: 'Anaerobic training, improves maximum oxygen uptake',
    purpose: '5K-10K pace training, improves VO2max'
  },
  INTERVAL: {
    name: 'I Zone (Interval Run)',
    min: 0.95,
    max: 1.0,
    color: '#F44336',
    description: 'High-intensity interval training, improves neuromuscular power',
    purpose: '1500m-3K pace training, improves speed and power'
  }
};

// Lactate Threshold based heart rate zone definitions
export const LT_ZONES = {
  ENDURANCE: {
    name: 'Aerobic Endurance Zone',
    min: 0.80,
    max: 0.90,
    color: '#4CAF50',
    description: 'Aerobic endurance training, improves endurance and fat utilization',
    purpose: 'Long distance training, builds aerobic base'
  },
  TEMPO: {
    name: 'Aerobic Power Zone',
    min: 0.90,
    max: 0.95,
    color: '#2196F3',
    description: 'Aerobic power training, improves lactate clearance ability more efficiently',
    purpose: 'Tempo runs and marathon pace training'
  },
  THRESHOLD: {
    name: 'Lactate Threshold Zone',
    min: 0.95,
    max: 1.03,
    color: '#FF9800',
    description: 'Lactate threshold training, raises your lactate threshold',
    purpose: 'Improves sustainable race pace and threshold'
  },
  VO2MAX: {
    name: 'Speed Endurance Zone',
    min: 1.03,
    max: 1.06,
    color: '#F44336',
    description: 'Maximum aerobic capacity training, improves VO2 max',
    purpose: 'High intensity intervals and speed endurance'
  },
  ANAEROBIC: {
    name: 'Sprint Zone',
    min: 1.06,
    max: 1.12,
    color: '#9C27B0',
    description: 'Anaerobic capacity training, builds final kick, improves neuromuscular power',
    purpose: 'Short sprints and neuromuscular power'
  }
};

/**
 * Calculate heart rate reserve
 * @param {number} maxHR - Maximum heart rate
 * @param {number} restingHR - Resting heart rate
 * @returns {number} Heart rate reserve
 */
export const calculateHeartRateReserve = (maxHR, restingHR) => {
  return maxHR - restingHR;
};

/**
 * Calculate target heart rate
 * @param {number} hrReserve - Heart rate reserve
 * @param {number} intensity - Training intensity (0-1)
 * @param {number} restingHR - Resting heart rate
 * @returns {number} Target heart rate
 */
export const calculateTargetHeartRate = (hrReserve, intensity, restingHR) => {
  return Math.round(hrReserve * intensity + restingHR);
};

/**
 * Calculate all heart rate zones
 * @param {number} maxHR - Maximum heart rate
 * @param {number} restingHR - Resting heart rate
 * @returns {Object} Object containing all heart rate zones
 */
export const calculateHeartRateZones = (maxHR, restingHR) => {
  const hrReserve = calculateHeartRateReserve(maxHR, restingHR);

  const zones = {};

  Object.entries(HR_ZONES).forEach(([key, zone]) => {
    const minHR = calculateTargetHeartRate(hrReserve, zone.min, restingHR);
    const maxHR_zone = calculateTargetHeartRate(hrReserve, zone.max, restingHR);

    zones[key] = {
      ...zone,
      minHR,
      maxHR: maxHR_zone,
      range: `${minHR} - ${maxHR_zone} bpm`
    };
  });

  return {
    maxHeartRate: maxHR,
    restingHeartRate: restingHR,
    heartRateReserve: hrReserve,
    zones
  };
};

/**
 * Calculate heart rate zones based on Lactate Threshold method
 * @param {number} lactateThresholdHR - Lactate threshold heart rate
 * @returns {Object} Object containing all heart rate zones based on LT method
 */
export const calculateLactateThresholdZones = (lactateThresholdHR) => {
  const zones = {};

  Object.entries(LT_ZONES).forEach(([key, zone]) => {
    
    const minHR = Math.floor(lactateThresholdHR * zone.min);
    const maxHR = Math.floor(lactateThresholdHR * zone.max);
      
    zones[key] = {
      ...zone,
      minHR,
      maxHR,
      range: `${minHR} - ${maxHR} bpm`
    };
  });

  return {
    lactateThresholdHR: lactateThresholdHR,
    zones
  };
};

/**
 * Validate input parameters including lactate threshold
 * @param {number} maxHR - Maximum heart rate
 * @param {number} restingHR - Resting heart rate
 * @param {number} lactateThresholdHR - Lactate threshold heart rate (optional)
 * @returns {Object} Validation result
 */
export const validateInputs = (maxHR, restingHR, lactateThresholdHR = null) => {
  const errors = {};

  if (!maxHR || maxHR < 120 || maxHR > 220) {
    errors.maxHR = 'Please enter a valid maximum heart rate (120-220 bpm)';
  }

  if (!restingHR || restingHR < 30 || restingHR > 100) {
    errors.restingHR = 'Please enter a valid resting heart rate (30-100 bpm)';
  }

  if (maxHR && restingHR && restingHR >= maxHR) {
    errors.restingHR = 'Resting heart rate cannot be greater than or equal to maximum heart rate';
  }

  if (maxHR && restingHR && (maxHR - restingHR) < 50) {
    errors.maxHR = 'The difference between maximum and resting heart rate is too small, please check the values';
  }

  if (lactateThresholdHR) {
    if (lactateThresholdHR < 120 || lactateThresholdHR > 200) {
      errors.lactateThresholdHR = 'Please enter a valid lactate threshold heart rate (120-200 bpm)';
    }

    if (maxHR && lactateThresholdHR >= maxHR) {
      errors.lactateThresholdHR = 'Lactate threshold heart rate cannot be greater than or equal to maximum heart rate';
    }

    if (restingHR && lactateThresholdHR <= restingHR) {
      errors.lactateThresholdHR = 'Lactate threshold heart rate must be greater than resting heart rate';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
