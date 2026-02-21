// Shared TypeScript interfaces for the application

export interface Condition {
  _id: string;
  count: number;
}

export interface DashboardDrug {
  _id?: string;
  drugName: string;
  condition: string;
  avgRating: number;
  totalReviews: number;
  totalUseful: number;
  effectiveness: number;
}

export interface SearchDrug {
  uniqueID: number;
  drugName: string;
  condition: string;
  review: string;
  rating: number;
  usefulCount: number;
}

export interface DrugResponse {
  drugs: SearchDrug[];
  totalPages: number;
  currentPage: number;
  total: number;
}

export interface HealthResponse {
  status: string;
  timestamp: string;
}
