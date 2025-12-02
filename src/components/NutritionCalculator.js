import React, { useState, useRef, useEffect } from 'react';
import './NutritionCalculator.css';

const NutritionCalculator = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState('piece');
  const [totalNutrition, setTotalNutrition] = useState(null);
  const [foodHistory, setFoodHistory] = useState([]);
  const [convertedWeight, setConvertedWeight] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const inputRef = useRef(null);

  // Nutrition database with common foods (per 100g)
  const nutritionDatabase = {
    'rice': { carbs: 28, protein: 2.7, fat: 0.3, calories: 130 },
    'chicken breast': { carbs: 0, protein: 31, fat: 3.6, calories: 165 },
    'beef': { carbs: 0, protein: 26, fat: 15, calories: 250 },
    'egg': { carbs: 0.6, protein: 13, fat: 11, calories: 155 },
    'bread': { carbs: 49, protein: 9, fat: 3.2, calories: 265 },
    'pasta': { carbs: 25, protein: 5, fat: 1.1, calories: 131 },
    'banana': { carbs: 23, protein: 1.1, fat: 0.3, calories: 89 },
    'apple': { carbs: 14, protein: 0.3, fat: 0.2, calories: 52 },
    'broccoli': { carbs: 7, protein: 2.8, fat: 0.4, calories: 34 },
    'potato': { carbs: 17, protein: 2, fat: 0.1, calories: 77 },
    'sweet potato': { carbs: 20, protein: 1.6, fat: 0.1, calories: 86 },
    'oats': { carbs: 66, protein: 17, fat: 7, calories: 389 },
    'milk': { carbs: 5, protein: 3.4, fat: 3.6, calories: 42 },
    'yogurt': { carbs: 4.7, protein: 10, fat: 0.4, calories: 59 },
    'cheese': { carbs: 1.3, protein: 25, fat: 33, calories: 402 },
    'salmon': { carbs: 0, protein: 20, fat: 13, calories: 208 },
    'tuna': { carbs: 0, protein: 30, fat: 1, calories: 132 },
    'avocado': { carbs: 9, protein: 2, fat: 15, calories: 160 },
    'nuts': { carbs: 21, protein: 15, fat: 64, calories: 607 },
    'peanut butter': { carbs: 14, protein: 25, fat: 50, calories: 588 }
  };

  const commonFoods = Object.keys(nutritionDatabase);

  // Disable food filtering, only support tag selection
  useEffect(() => {
    setFilteredFoods([]);
    setShowSuggestions(false);
  }, []);

  const handleFoodSelect = (selectedFood) => {
    setFoodName(selectedFood);
    setShowSuggestions(false);
    setFilteredFoods([]);
    
    // Trigger real-time calculation for unit conversion when unit is 'quantity'
    if (unit === 'piece' && quantity) {
      const foodKey = selectedFood.toLowerCase().trim();
      const pieceWeights = {
        'egg': 50,           // Large egg ~50g
        'banana': 120,        // Medium banana ~120g
        'apple': 150,         // Medium apple ~150g
        'avocado': 200,       // Medium avocado ~200g
        'potato': 170,       // Medium potato ~170g
        'sweet potato': 130,   // Medium sweet potato ~130g
        'bread': 25,         // 1 slice of bread ~25g
        'salmon': 170,       // Salmon fillet ~170g
        'chicken breast': 120, // Chicken breast fillet ~120g
        'beef': 225           // Beef steak ~225g
      };
      const pieceWeight = pieceWeights[foodKey] || 100;
      const currentQuantity = parseFloat(quantity) || 100; // Default to 100 if quantity is empty
      setConvertedWeight(currentQuantity * pieceWeight);
    } else {
      setConvertedWeight(null);
    }
    
    // Trigger calculation after food selection
    calculateNutrition(selectedFood, null, unit);
  };

  const calculateNutrition = (foodOverride = null, quantityOverride = null, unitOverride = null) => {
    const foodToUse = foodOverride || foodName;
    const qtyToUse = quantityOverride || quantity || 100;
    const unitToUse = unitOverride || unit;
    
    if (!foodToUse) return;

    const foodKey = foodToUse.toLowerCase().trim();
    const nutrition = nutritionDatabase[foodKey];
    
    const qty = parseFloat(qtyToUse);
    let multiplier = 1;

    // Convert to grams for calculation
    switch (unitToUse) {
      case 'g':
        multiplier = qty / 100;
        break;
      case 'oz':
        multiplier = (qty * 28.35) / 100;
        break;
      case 'lb':
        multiplier = (qty * 453.59) / 100;
        break;
      case 'cup':
        multiplier = (qty * 236.59) / 100;
        break;
      case 'piece':
        // More accurate piece weights for common foods
        const pieceWeights = {
          'egg': 50,           // Large egg ~50g
          'banana': 120,        // Medium banana ~120g
          'apple': 150,         // Medium apple ~150g
          'avocado': 200,       // Medium avocado ~200g
          'potato': 170,       // Medium potato ~170g
          'sweet potato': 130,   // Medium sweet potato ~130g
          'bread': 25,         // 1 slice of bread ~25g
          'salmon': 170,       // Salmon fillet ~170g
          'chicken breast': 120, // Chicken breast fillet ~120g
          'beef': 225           // Beef steak ~225g
        };
        
        const foodKey = foodToUse.toLowerCase().trim();
        const pieceWeight = pieceWeights[foodKey] || 100; // Default to 100g if not found
        multiplier = (qty * pieceWeight) / 100;
        
        // Set converted weight for display when unit is quantity
        if (unitToUse === 'piece') {
          setConvertedWeight(qty * pieceWeight);
        } else {
          setConvertedWeight(null);
        }
        break;
      default:
        multiplier = qty / 100;
    }

    const total = {
      carbs: Math.round(nutrition.carbs * multiplier * 10) / 10,
      protein: Math.round(nutrition.protein * multiplier * 10) / 10,
      fat: Math.round(nutrition.fat * multiplier * 10) / 10,
      calories: Math.round(nutrition.calories * multiplier)
    };

    setTotalNutrition(total);
  };

  const addToFoodLog = () => {
    if (!foodName || !quantity || !totalNutrition) {
      alert('Please calculate nutrition first');
      return;
    }

    // Add to history
    const historyItem = {
      food: foodName,
      quantity: parseFloat(quantity),
      unit: unit,
      nutrition: totalNutrition,
      timestamp: new Date()
    };
    setFoodHistory([historyItem, ...foodHistory.slice(0, 9)]);
  };

  const resetCalculator = () => {
    setFoodName('');
    setQuantity('');
    setUnit('g');
    setTotalNutrition(null);
    setConvertedWeight(null);
  };

  const clearHistory = () => {
    setFoodHistory([]);
  };

  

  return (
    <div className="nutrition-calculator">
      <div className="nutrition-header">
        <h2>🥗 Nutrition Calculator</h2>
        <p>Calculate macronutrients for your food items</p>
      </div>

      <div className="nutrition-input-section">
        <div className="input-group">
            <label htmlFor="food-name">Food Name</label>
            <div className="food-display">
              {foodName || <span className="food-placeholder">Select a food</span>}
            </div>
          </div>

          {/* Food Tags */}
          <div className="food-tags-container">
            <div className="food-tags-title">Popular Foods:</div>
            <div className="food-tags">
              {commonFoods.map(food => (
                <div
                  key={food}
                  className="food-tag"
                  onClick={() => handleFoodSelect(food)}
                >
                  {food}
                </div>
              ))}
            </div>
          </div>

        <div className="input-row">
          <div className="input-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                const newQuantity = e.target.value;
                setQuantity(newQuantity);
                
                // Real-time calculation for unit conversion when unit is 'quantity'
                if (unit === 'piece' && newQuantity && foodName) {
                  const foodKey = foodName.toLowerCase().trim();
                  const pieceWeights = {
                    'egg': 50,           // Large egg ~50g
                    'banana': 120,        // Medium banana ~120g
                    'apple': 150,         // Medium apple ~150g
                    'avocado': 200,       // Medium avocado ~200g
                    'potato': 170,       // Medium potato ~170g
                    'sweet potato': 130,   // Medium sweet potato ~130g
                    'bread': 25,         // 1 slice of bread ~25g
                    'salmon': 170,       // Salmon fillet ~170g
                    'chicken breast': 120, // Chicken breast fillet ~120g
                    'beef': 225           // Beef steak ~225g
                  };
                  const pieceWeight = pieceWeights[foodKey] || 100;
                  setConvertedWeight(parseFloat(newQuantity) * pieceWeight);
                } else {
                  setConvertedWeight(null);
                }
                
                // Auto calculate nutrition
                calculateNutrition(null, newQuantity, unit);
              }}
              step="1"
              min="1"
            />
          </div>

          <div className="input-group">
            <label htmlFor="unit">Unit</label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => {
                const newUnit = e.target.value;
                setUnit(newUnit);
                
                // Real-time calculation for unit conversion when new unit is 'quantity'
                if (newUnit === 'piece' && quantity && foodName) {
                  const foodKey = foodName.toLowerCase().trim();
                  const pieceWeights = {
                    'egg': 50,           // Large egg ~50g
                    'banana': 120,        // Medium banana ~120g
                    'apple': 150,         // Medium apple ~150g
                    'avocado': 200,       // Medium avocado ~200g
                    'potato': 170,       // Medium potato ~170g
                    'sweet potato': 130,   // Medium sweet potato ~130g
                    'bread': 25,         // 1 slice of bread ~25g
                    'salmon': 170,       // Salmon fillet ~170g
                    'chicken breast': 120, // Chicken breast fillet ~120g
                    'beef': 225           // Beef steak ~225g
                  };
                  const pieceWeight = pieceWeights[foodKey] || 100;
                  setConvertedWeight(parseFloat(quantity) * pieceWeight);
                } else {
                  setConvertedWeight(null);
                }
                
                // Auto calculate nutrition
                calculateNutrition(null, quantity, unit);
              }}
            >
              <option value="g">grams (g)</option>
              <option value="oz">ounces (oz)</option>
              <option value="lb">pounds (lb)</option>
              <option value="cup">cups</option>
              <option value="piece">quantity</option>
            </select>
          </div>
        </div>

        <div className="button-group">
          <button 
            className="calculate-btn" 
            onClick={addToFoodLog}
            disabled={!foodName || !quantity || !totalNutrition}
          >
            Confirm & Add to Log
          </button>
          <button className="reset-btn" onClick={resetCalculator}>
            Reset
          </button>
        </div>
      </div>

      {convertedWeight && unit === 'piece' && (
        <div className="converted-weight">
          <span className="weight-label">Equivalent weight:</span>
          <span className="weight-value">{convertedWeight}g</span>
        </div>
      )}

      {totalNutrition && (
        <div className="nutrition-results">
          <h3>Nutrition Information</h3>
          <div className="nutrition-grid">
            <div className="nutrition-item carbs">
              <div className="nutrition-value">{totalNutrition.carbs}g</div>
              <div className="nutrition-label">Carbohydrates</div>
            </div>
            <div className="nutrition-item protein">
              <div className="nutrition-value">{totalNutrition.protein}g</div>
              <div className="nutrition-label">Protein</div>
            </div>
            <div className="nutrition-item fat">
              <div className="nutrition-value">{totalNutrition.fat}g</div>
              <div className="nutrition-label">Fat</div>
            </div>
            <div className="nutrition-item calories">
              <div className="nutrition-value">{totalNutrition.calories}</div>
              <div className="nutrition-label">Calories</div>
            </div>
          </div>
        </div>
      )}

      {foodHistory.length > 0 && (
        <div className="nutrition-history">
          <div className="history-header">
            <h3>Today's Food Log</h3>
            <button className="clear-history-btn" onClick={clearHistory}>
              Clear All
            </button>
          </div>
          
          <div className="history-items">
            {foodHistory.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-food">
                  <span className="food-name">{item.food}</span>
                  <span className="food-quantity">{item.quantity} {item.unit}</span>
                </div>
                <div className="history-nutrition">
                  <span className="nutrition-chip carbs">C: {item.nutrition.carbs}g</span>
                  <span className="nutrition-chip protein">P: {item.nutrition.protein}g</span>
                  <span className="nutrition-chip fat">F: {item.nutrition.fat}g</span>
                  <span className="nutrition-chip calories">{item.nutrition.calories} cal</span>
                </div>
              </div>
            ))}
            
            {/* Daily Totals */}
            <div className="history-item" style={{backgroundColor: '#ddd'}}>
              <div className="history-food">
                <span className="food-name total-label">Total</span>
              </div>
              <div className="history-nutrition">
                <span className="nutrition-chip carbs-total" style={{backgroundColor: '#ff6a88', padding: '6px 12px'}}>C: {Math.round(foodHistory.reduce((sum, item) => sum + item.nutrition.carbs, 0) * 10) / 10}g</span>
                <span className="nutrition-chip protein-total" style={{backgroundColor: '#764ba2', padding: '6px 12px'}}>P: {Math.round(foodHistory.reduce((sum, item) => sum + item.nutrition.protein, 0) * 10) / 10}g</span>
                <span className="nutrition-chip fat-total" style={{backgroundColor: '#f5576c', padding: '6px 12px'}}>F: {Math.round(foodHistory.reduce((sum, item) => sum + item.nutrition.fat, 0) * 10) / 10}g</span>
                <span className="nutrition-chip calories-total" style={{backgroundColor: '#00f2fe', padding: '6px 12px'}}>{Math.round(foodHistory.reduce((sum, item) => sum + item.nutrition.calories, 0) * 10) / 10} cal</span>
              </div>
            </div>
          </div>

          
        </div>
      )}

      <div className="nutrition-tips">
        <h3>📌 Nutrition Tips</h3>
        
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">🍳</span>
              <span className="tip-title tip-title-bold">Available Foods</span>
            </div>
            <div className="tip-content">
              <span className="tip-text">{commonFoods.join(', ')}</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">⚖️</span>
              <span className="tip-title tip-title-bold">Unit Conversions</span>
            </div>
            <div className="tip-content">
              <span className="tip-text">1 oz = 28.35g, 1 lb = 453.59g, 1 cup ≈ 236.59g</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">📏</span>
              <span className="tip-title tip-title-bold">Quantity Weights</span>
            </div>
            <div className="tip-content">
              <span className="tip-text">Egg ~50g, Banana ~120g, Apple ~150g, Avocado ~200g, Potato ~170g, Bread slice ~25g, Chicken breast ~120g, Beef steak ~225g</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">🥗</span>
              <span className="tip-title tip-title-bold">Daily Recommendations</span>
            </div>
            <div className="tip-content">
              <span className="tip-text highlight">Carbs:</span> <span className="tip-text">45-65%</span> calories, <span className="tip-text">Protein:</span> <span className="tip-text">10-35%</span>, <span className="tip-text">Fat:</span> <span className="tip-text">20-35%</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">🏃</span>
              <span className="tip-title tip-title-bold">Athletes</span>
            </div>
            <div className="tip-content">
              <span className="tip-text">Higher protein intake:</span> <span className="tip-text important">1.2-2.0g</span> per kg body weight
              <span className="tip-text">Protein timing:</span> <span className="tip-text">30 min post-workout</span>
            </div>
          </div>
          
          <div className="tip-card">
            <div className="tip-header">
              <span className="tip-icon">📋</span>
              <span className="tip-title tip-title-bold">Accuracy</span>
            </div>
            <div className="tip-content">
              <span className="tip-text">Values are approximate. Actual nutrition may vary by preparation method and specific varieties.</span>
              <span className="tip-text">Cooking method affects:</span> <span className="tip-text">Raw vs cooked vs food brands</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionCalculator;
