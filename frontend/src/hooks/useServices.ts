import { useState, useEffect } from 'react';
import { apiService, Service, ServicesResponse } from '../services/api';

interface UseServicesOptions {
  category?: string;
  featured?: boolean;
  search?: string;
  limit?: number;
  page?: number;
  autoFetch?: boolean;
}

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  pagination: ServicesResponse['pagination'] | null;
  refetch: () => Promise<void>;
  setOptions: (options: UseServicesOptions) => void;
}

export const useServices = (initialOptions: UseServicesOptions = {}) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<ServicesResponse['pagination'] | null>(null);
  const [options, setOptions] = useState<UseServicesOptions>({
    autoFetch: true,
    limit: 20,
    page: 1,
    ...initialOptions
  });

  const fetchServices = async () => {
    if (!options.autoFetch) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getServices(options);
      setServices(response.services);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicios');
      setServices([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchServices();
  };

  useEffect(() => {
    fetchServices();
  }, [options.category, options.featured, options.search, options.limit, options.page]);

  return {
    services,
    loading,
    error,
    pagination,
    refetch,
    setOptions: (newOptions: UseServicesOptions) => {
      setOptions(prev => ({ ...prev, ...newOptions }));
    }
  };
};

// Hook para un servicio específico
interface UseServiceReturn {
  service: Service | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useService = (id: string | null): UseServiceReturn => {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchService = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.getServiceById(id);
      setService(response.service);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar servicio');
      setService(null);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchService();
  };

  useEffect(() => {
    fetchService();
  }, [id]);

  return {
    service,
    loading,
    error,
    refetch
  };
};
