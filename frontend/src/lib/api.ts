import { Condition, DashboardDrug, DrugResponse, HealthResponse } from '@/types';

// API configuration with environment-based URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// API client with error handling
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Drug-related API calls
  async getDrugs(params: {
    page?: number;
    limit?: number;
    condition?: string;
    search?: string;
  }) {
    const searchParams = new URLSearchParams();
    
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.limit) searchParams.append('limit', params.limit.toString());
    if (params.condition) searchParams.append('condition', params.condition);
    if (params.search) searchParams.append('search', params.search);

    return this.request<DrugResponse>(`/api/drugs?${searchParams}`);
  }

  async getConditions() {
    return this.request<Condition[]>('/api/drugs/conditions');
  }

  async getTopDrugs(condition?: string) {
    const endpoint = condition 
      ? `/api/drugs/top?condition=${encodeURIComponent(condition)}`
      : '/api/drugs/top';
    return this.request<DashboardDrug[]>(endpoint);
  }

  // Health check
  async healthCheck() {
    return this.request<HealthResponse>('/health');
  }
}

export const apiClient = new ApiClient();
export default apiClient;
