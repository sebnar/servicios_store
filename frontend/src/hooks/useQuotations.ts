import { useState, useEffect } from 'react';
import { Quotation, QuotationRequest } from '../services/api';
import { apiService } from '../services/api';

interface UseQuotationsOptions {
  status?: string;
  clientEmail?: string;
  limit?: number;
  page?: number;
  autoLoad?: boolean;
}

interface UseQuotationsReturn {
  quotations: Quotation[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null;
  refetch: () => Promise<void>;
  createQuotation: (quotationData: QuotationRequest) => Promise<Quotation>;
  updateQuotation: (id: string, updateData: Partial<Quotation>) => Promise<Quotation>;
  deleteQuotation: (id: string) => Promise<void>;
}

export function useQuotations(options: UseQuotationsOptions = {}): UseQuotationsReturn {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null>(null);

  const {
    status,
    clientEmail,
    limit = 20,
    page = 1,
    autoLoad = true
  } = options;

  const loadQuotations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getQuotations({
        status,
        clientEmail,
        limit,
        page
      });
      
      setQuotations(response.quotations);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando cotizaciones');
      console.error('Error loading quotations:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await loadQuotations();
  };

  const createQuotation = async (quotationData: QuotationRequest): Promise<Quotation> => {
    try {
      const response = await apiService.createQuotation(quotationData);
      await refetch(); // Recargar la lista
      return response.quotation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateQuotation = async (id: string, updateData: Partial<Quotation>): Promise<Quotation> => {
    try {
      const response = await apiService.updateQuotation(id, updateData);
      await refetch(); // Recargar la lista
      return response.quotation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error actualizando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteQuotation = async (id: string): Promise<void> => {
    try {
      await apiService.deleteQuotation(id);
      await refetch(); // Recargar la lista
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error eliminando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadQuotations();
    }
  }, [status, clientEmail, limit, page, autoLoad]);

  return {
    quotations,
    loading,
    error,
    pagination,
    refetch,
    createQuotation,
    updateQuotation,
    deleteQuotation
  };
}

// Hook para admin quotations
interface UseAdminQuotationsOptions {
  status?: string;
  assignedTo?: string;
  clientEmail?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  page?: number;
  autoLoad?: boolean;
}

export function useAdminQuotations(options: UseAdminQuotationsOptions = {}): UseQuotationsReturn {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  } | null>(null);

  const {
    status,
    assignedTo,
    clientEmail,
    dateFrom,
    dateTo,
    limit = 20,
    page = 1,
    autoLoad = true
  } = options;

  const loadQuotations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getAdminQuotations({
        status,
        assignedTo,
        clientEmail,
        dateFrom,
        dateTo,
        limit,
        page
      });
      
      setQuotations(response.quotations);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando cotizaciones');
      console.error('Error loading admin quotations:', err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await loadQuotations();
  };

  const createQuotation = async (quotationData: QuotationRequest): Promise<Quotation> => {
    try {
      const response = await apiService.createQuotation(quotationData);
      await refetch();
      return response.quotation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const updateQuotation = async (id: string, updateData: Partial<Quotation>): Promise<Quotation> => {
    try {
      const response = await apiService.updateQuotation(id, updateData);
      await refetch();
      return response.quotation;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error actualizando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const deleteQuotation = async (id: string): Promise<void> => {
    try {
      await apiService.deleteQuotation(id);
      await refetch();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error eliminando cotización';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  useEffect(() => {
    if (autoLoad) {
      loadQuotations();
    }
  }, [status, assignedTo, clientEmail, dateFrom, dateTo, limit, page, autoLoad]);

  return {
    quotations,
    loading,
    error,
    pagination,
    refetch,
    createQuotation,
    updateQuotation,
    deleteQuotation
  };
}
