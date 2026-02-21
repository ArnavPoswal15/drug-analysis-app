# Drug Analysis Dashboard

A comprehensive web application for analyzing patient drug reviews and effectiveness ratings. Built with Next.js, TypeScript, and Tailwind CSS, this platform provides insights into medication performance based on real patient experiences.

## 🚀 Features

### 📊 Analytics Dashboard
- **Real-time Statistics**: Total reviews, conditions count, average ratings
- **Top Performing Drugs**: Effectiveness rankings with visual charts
- **Condition Analysis**: Review counts by medical conditions
- **Interactive Charts**: Bar charts for drug effectiveness and condition popularity

### 🔍 Advanced Search & Filtering
- **Drug Search**: Find medications by name or condition
- **Condition Filtering**: Filter results by specific medical conditions
- **Pagination**: Navigate through large datasets efficiently
- **Real-time Updates**: Instant results as you type

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Modern UI**: Clean, intuitive interface with gradient designs
- **Dark Mode Support**: Automatic theme switching
- **Smooth Animations**: Hover effects and transitions

### 🎨 UI Components
- **Custom Cards**: Gradient-styled stat cards with hover effects
- **Interactive Tables**: Sortable drug performance data
- **Select Dropdowns**: Styled condition filters
- **Loading States**: Skeleton loaders for better UX

## 🛠 Tech Stack

### Frontend
- **Next.js 16.1.6** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Radix UI** - Accessible component primitives

### Backend Integration
- **RESTful API** - Connects to Node.js/Express backend
- **MongoDB** - NoSQL database for drug and review data
- **API Client** - Centralized API client with error handling (`src/lib/api.ts`)
- **Environment Variables** - Secure API configuration

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── dashboard/          # Dashboard page
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── lib/
│   │   └── api.ts             # API client with error handling
│   └── components/
│       └── ui/                # Reusable UI components
├── public/                    # Static assets
├── .env                       # Environment variables
├── .env.production            # Production environment variables
├── next.config.ts            # Next.js configuration
└── tailwind.config.js        # Tailwind configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database (local or cloud)
- Backend API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd drug-analysis-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API URL
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001

# For Production
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
```

### Backend Setup
Ensure your backend server is running on the configured port (default: 5001) with the following endpoints:
- `/api/drugs` - Get drugs with pagination and filtering
- `/api/drugs/conditions` - Get all available conditions
- `/api/drugs/top` - Get top drugs by effectiveness

## 📊 API Integration

### API Client Usage
The project uses a centralized API client (`src/lib/api.ts`) for all backend communications:

```typescript
import apiClient from '@/lib/api';

// Get drugs with filtering
const drugs = await apiClient.getDrugs({
  page: 1,
  limit: 20,
  condition: 'Depression',
  search: 'Prozac'
});

// Get all conditions
const conditions = await apiClient.getConditions();

// Get top drugs by effectiveness
const topDrugs = await apiClient.getTopDrugs('Depression');
```

### Data Models
```typescript
interface Drug {
  uniqueID: number;
  drugName: string;
  condition: string;
  avgRating: number;
  totalReviews: number;
  totalUseful: number;
  effectiveness: number;
}

interface Condition {
  _id: string;
  count: number;
}
```

### API Endpoints Used
- `GET /api/drugs` - Fetch drugs with filters
- `GET /api/drugs/conditions` - Fetch condition list
- `GET /api/drugs/top` - Fetch top performing drugs

## 🎨 Customization

### Styling
- **Colors**: Modify gradient colors in `dashboard.css`
- **Typography**: Font settings in `layout.tsx`
- **Components**: Update UI components in `components/ui/`

### Adding New Features
1. Create new components in `src/components/`
2. Add pages in `src/app/`
3. Update types in TypeScript interfaces
4. Modify API calls as needed

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Build with `npm run build`
- **AWS**: Use AWS Amplify or EC2
- **DigitalOcean**: App Platform

📖 **See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions**

## 🔍 Key Features Explained

### Dashboard Statistics
- **Total Reviews**: Cumulative count of all patient reviews
- **Conditions**: Number of unique medical conditions
- **Average Rating**: Mean effectiveness score across all drugs
- **Top Condition**: Most reviewed medical condition

### Drug Performance Metrics
- **Effectiveness Score**: Calculated based on patient ratings
- **Review Count**: Total number of patient reviews
- **Usefulness Count**: Helpful votes from other patients
- **Average Rating**: Mean star rating (1-10 scale)

### Search & Filter System
- **Real-time Search**: Instant results as you type
- **Condition Filter**: Narrow by specific medical conditions
- **Pagination**: Handle large datasets efficiently
- **Error Handling**: Graceful fallbacks for API failures

## 🐛 Troubleshooting

### Common Issues
1. **API Connection Failed**: Check backend server and environment variables
2. **Styling Issues**: Ensure Tailwind CSS is properly configured
3. **Build Errors**: Verify all dependencies are installed
4. **CORS Errors**: Update backend CORS configuration

### Development Tips
- Use `npm run build` to test production builds
- Check browser console for API errors
- Verify environment variables are correctly set
- Ensure backend API is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Live Demo](#) (add when deployed)
- [Backend Repository](#) (link to backend repo)
- [API Documentation](#) (add API docs link)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
