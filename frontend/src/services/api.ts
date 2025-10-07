/**
 * Servicio de API para comunicación con el backend
 * Maneja todas las peticiones HTTP y autenticación
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Interfaces para autenticación y usuarios
 */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  images: string[];
  features: string[];
  duration?: string;
  availability: {
    isAvailable: boolean;
    schedule?: string;
    maxBookings?: number;
  };
  isActive: boolean;
  isFeatured: boolean;
  order: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ServicesResponse {
  services: Service[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface CategoriesResponse {
  categories: string[];
}

export interface Quotation {
  _id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  requestedServices: {
    serviceId: string;
    serviceName: string;
    quantity?: number;
    notes?: string;
  }[];
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  estimatedBudget?: number;
  finalBudget?: number;
  currency: string;
  requestedDate: string;
  estimatedDelivery?: string;
  completedDate?: string;
  clientNotes?: string;
  adminNotes?: string;
  createdBy?: {
    _id: string;
    username: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface QuotationRequest {
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  clientCompany?: string;
  requestedServices: {
    serviceId: string;
    quantity?: number;
    notes?: string;
  }[];
  estimatedBudget?: number;
  currency?: string;
  clientNotes?: string;
  estimatedDelivery?: string;
}

export interface QuotationsResponse {
  quotations: Quotation[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el login');
    }

    const data = await response.json();
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en el registro');
    }

    const data = await response.json();
    
    // Guardar token en localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    return data;
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo perfil');
    }

    return response.json();
  }

  async verifyToken(): Promise<{ valid: boolean; userId: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Token inválido');
    }

    return response.json();
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Servicios API
  async getServices(params?: {
    category?: string;
    featured?: boolean;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<ServicesResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.category) queryParams.append('category', params.category);
    if (params?.featured !== undefined) queryParams.append('featured', params.featured.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const url = `${API_BASE_URL}/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo servicios');
    }

    return response.json();
  }

  async getServiceById(id: string): Promise<{ service: Service }> {
    const response = await fetch(`${API_BASE_URL}/services/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo servicio');
    }

    return response.json();
  }

  async getServicesByCategory(category: string, params?: {
    limit?: number;
    page?: number;
  }): Promise<ServicesResponse & { category: string }> {
    const queryParams = new URLSearchParams();
    
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const url = `${API_BASE_URL}/services/category/${encodeURIComponent(category)}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo servicios por categoría');
    }

    return response.json();
  }

  async getCategories(): Promise<CategoriesResponse> {
    const response = await fetch(`${API_BASE_URL}/services/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo categorías');
    }

    return response.json();
  }

  // Cotizaciones API
  async createQuotation(quotationData: QuotationRequest): Promise<{ message: string; quotation: Quotation }> {
    const response = await fetch(`${API_BASE_URL}/quotations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quotationData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creando cotización');
    }

    return response.json();
  }

  async getQuotations(params?: {
    status?: string;
    clientEmail?: string;
    limit?: number;
    page?: number;
  }): Promise<QuotationsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.clientEmail) queryParams.append('clientEmail', params.clientEmail);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const url = `${API_BASE_URL}/quotations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo cotizaciones');
    }

    return response.json();
  }

  async getQuotationById(id: string): Promise<{ quotation: Quotation }> {
    const response = await fetch(`${API_BASE_URL}/quotations/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo cotización');
    }

    return response.json();
  }

  async updateQuotation(id: string, updateData: Partial<Quotation>): Promise<{ message: string; quotation: Quotation }> {
    const response = await fetch(`${API_BASE_URL}/quotations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando cotización');
    }

    return response.json();
  }

  async deleteQuotation(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/quotations/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error eliminando cotización');
    }

    return response.json();
  }

  // Admin Quotations API
  async getAdminQuotations(params?: {
    status?: string;
    assignedTo?: string;
    clientEmail?: string;
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
    page?: number;
  }): Promise<QuotationsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.assignedTo) queryParams.append('assignedTo', params.assignedTo);
    if (params?.clientEmail) queryParams.append('clientEmail', params.clientEmail);
    if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom);
    if (params?.dateTo) queryParams.append('dateTo', params.dateTo);
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.page) queryParams.append('page', params.page.toString());

    const url = `${API_BASE_URL}/admin/quotations${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo cotizaciones (admin)');
    }

    return response.json();
  }

  async updateQuotationStatus(id: string, statusData: {
    status: string;
    adminNotes?: string;
    assignedTo?: string;
    finalBudget?: number;
    estimatedDelivery?: string;
  }): Promise<{ message: string; quotation: Quotation }> {
    const response = await fetch(`${API_BASE_URL}/admin/quotations/${id}/status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(statusData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando estado de cotización');
    }

    return response.json();
  }

  async assignQuotation(id: string, assignedTo: string): Promise<{ message: string; quotation: Quotation }> {
    const response = await fetch(`${API_BASE_URL}/admin/quotations/${id}/assign`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ assignedTo }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error asignando cotización');
    }

    return response.json();
  }

  async getQuotationStats(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/admin/quotations/stats/overview`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo estadísticas de cotizaciones');
    }

    return response.json();
  }
}

export const apiService = new ApiService();
