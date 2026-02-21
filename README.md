# Drug Analysis Platform

A MERN stack application for analyzing drug effectiveness based on patient reviews.

## Features

- 🔍 Search drugs by name and medical condition
- 📊 View drug ratings and effectiveness scores
- 📈 Interactive dashboards and visualizations
- 💊 Top drugs recommendations by condition
- 📝 Patient review analysis

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Styling**: Traditional CSS with responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB installed and running
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies  
cd ../frontend
npm install
```

3. Make sure MongoDB is running on `mongodb://localhost:27017`

4. Start the development servers:

```bash
# Start backend (in terminal 1)
cd backend
npm run dev

# Start frontend (in terminal 2) 
cd frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

- `GET /api/drugs` - Get paginated list of drugs with search and filtering
- `GET /api/drugs/conditions` - Get all medical conditions with counts
- `GET /api/drugs/top` - Get top drugs by condition

## Project Structure

```
drug-analysis-app/
├── backend/
│   ├── server.js          # Express server
│   ├── .env              # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js   # Main page component
│   │   │   └── page.css  # Styles
│   │   └── ...
│   └── package.json
└── README.md
```

## Data

The application uses a dataset of 161,297 drug reviews covering:
- 3,436 unique drugs
- 884 medical conditions
- Reviews from 2008-2017

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
