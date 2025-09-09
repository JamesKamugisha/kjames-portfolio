const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export interface AvailabilityResponse {
  availableForWork: boolean;
  lastUpdated: string;
}

export interface UpdateAvailabilityRequest {
  availableForWork: boolean;
}

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // Don't make API calls if no API URL is configured
    if (!API_BASE_URL) {
      throw new Error('API not configured - no API_URL provided');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getAvailability(): Promise<AvailabilityResponse> {
    return this.request<AvailabilityResponse>('/availability');
  }

  async updateAvailability(availableForWork: boolean): Promise<AvailabilityResponse> {
    return this.request<AvailabilityResponse>('/availability', {
      method: 'PUT',
      body: JSON.stringify({ availableForWork }),
    });
  }

  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

export const apiService = new ApiService();
export default apiService;
