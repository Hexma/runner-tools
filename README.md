# Runner's Heart Rate Zone Calculator

A React application based on the Heart Rate Reserve method to help runners calculate personalized training heart rate zones.

## Features

- 🏃‍♂️ **Scientific Calculation**: Uses Heart Rate Reserve method, more accurate than traditional formulas
- 📊 **Five Zones**: Provides complete heart rate training zone divisions
- 💡 **Training Guidance**: Detailed training recommendations for each zone
- 📱 **Responsive Design**: Supports mobile, tablet, and desktop devices
- 🎨 **Modern Interface**: Beautiful user interface and smooth interactive experience

## Heart Rate Zone Descriptions

### 1. Recovery Zone (50%-60%)
- **Purpose**: Easy recovery runs, promotes blood circulation
- **Characteristics**: Very easy, can maintain normal conversation

### 2. Aerobic Base Zone (60%-70%)
- **Purpose**: Aerobic base training, improves cardiovascular function
- **Characteristics**: Comfortable running pace, 80% of training time should be in this zone

### 3. Tempo Zone (70%-80%)
- **Purpose**: Tempo run training, improves lactate threshold
- **Characteristics**: Slightly challenging but sustainable intensity

### 4. Lactate Threshold Zone (80%-90%)
- **Purpose**: High-intensity interval training
- **Characteristics**: High intensity, requires interval training

### 5. Neuromuscular Zone (90%-100%)
- **Purpose**: Maximum intensity training, improves speed
- **Characteristics**: Highest intensity, short-duration sprints

## Heart Rate Reserve Method

**Formula**: Target Heart Rate = (Maximum Heart Rate - Resting Heart Rate) × Training Intensity% + Resting Heart Rate

**Maximum Heart Rate Calculation**: 208 - (0.7 × Age)

This method considers individual differences in resting heart rate and provides more personalized and accurate training intensity guidance.

## How to Use

1. Enter your age
2. Enter your resting heart rate (recommended to measure upon waking in the morning)
3. Click "Calculate Heart Rate Zones"
4. View your personalized heart rate zones and training recommendations

## Tech Stack

- React 18
- CSS3 (Grid & Flexbox)
- Modern JavaScript (ES6+)

## Development and Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build production version
npm run build
```

## Disclaimer

This calculation result is for reference only. Please consult a professional coach or doctor for specific training plans. If you have heart disease or other health issues, please exercise under medical supervision.

## License

MIT License