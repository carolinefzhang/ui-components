# UI Components

A collection of interactive React components and games built with Chakra UI, featuring a responsive design and modern user interface.

## Features

- **Interactive Components**: Timer, checkout simulator, drawing canvas
- **Games**: Sudoku solver, Tenzies dice game, Assembly Endgame word game
- **Utilities**: Meme generator, AI recipe generator
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Toggle between light and dark themes

## Tech Stack

### Frontend
- React 18 with TypeScript
- Chakra UI for components
- Vite for build tooling
- React Router for navigation

### Backend
- Python Flask API
- Sudoku solver algorithm
- AWS Lambda deployment

## Getting Started

### Frontend Development

1. **Navigate to frontend directory**:
   ```bash
   cd frontendui
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser** to `http://localhost:5173`

### Backend Development

1. **Navigate to backend directory**:
   ```bash
   cd backend/sudoku-api
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Run local server**:
   ```bash
   python app.py
   ```

## Components

- **Count Down** - Circular progress timer
- **Checkout** - Queue management simulator
- **Sudoku** - Interactive puzzle solver
- **Interactive Box** - Drawing canvas with undo/redo
- **Recipe Generator** - AI-powered recipe creation
- **Meme Generator** - Custom meme creation tool
- **Tenzies** - Dice matching game
- **Assembly Endgame** - Word guessing game
- **Stock** - AI-powered stock prediction

## Deployment

### Automatic Deployment
- **Frontend**: Deploys to AWS Amplify on master branch commits
- **Backend**: Deploys to AWS Lambda on backend changes

### Required Secrets
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `LAMBDA_FUNCTION_NAME`
- `VITE_API_URL`

## Environment Variables

Create `.env` file in `frontendui/` directory:
```env
VITE_API_URL=your_api_gateway_url
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_POLYGON_API_KEY=your_polygon_api_key
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build