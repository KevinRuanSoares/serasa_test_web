import api from '../api';

export interface Producer {
  id: string;
  cpf_cnpj: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedProducerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Producer[];
}

interface ProducerFilters {
  name?: string;
  cpf_cnpj?: string;
  page_size?: number;
  page?: number;
}

interface GetProducersParams {
  token: string;
  filters?: ProducerFilters;
  ordering?: string;
}

interface DeleteProducerParams {
  id: string;
  token: string;
}

export interface ProducerCreateParams {
  cpf_cnpj: string;
  name: string;
}

interface DashboardDataResponse {
  farms_by_state: { state: string; count: number }[];
  crops_distribution: { crop: string; count: number }[];
  land_use: {
    total_area: number;
    arable_area: number;
    vegetation_area: number;
  };
}

export const ProducerService = {
  async getProducers({ token, filters, ordering }: GetProducersParams): Promise<PaginatedProducerResponse | null> {
    try {
      const params: Record<string, string | undefined> = {};
      if (filters?.name) params.name = filters.name;
      if (filters?.cpf_cnpj) params.cpf_cnpj = filters.cpf_cnpj;
      if (filters?.page_size) params.page_size = filters.page_size.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (ordering) params.ordering = ordering;

      const { data } = await api.get<PaginatedProducerResponse>('/producer/', {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching producers with filters:", error);
      return null;
    }
  },

  async deleteProducer({ token, id }: DeleteProducerParams): Promise<boolean> {
    try {
      await api.delete(`/producer/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting producer with id ${id}:`, error);
      return false;
    }
  },

  async getProducer({ token, id }: DeleteProducerParams): Promise<Producer | null> {
    try {
      const { data } = await api.get(`/producer/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching producer with id ${id}:`, error);
      return null;
    }
  },

  async updateProducer({ token, id, producer }: { token: string; id: string; producer: ProducerCreateParams }): Promise<Producer | null> {
    try {
      const { data } = await api.put(`/producer/${id}/`, producer, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      // Handle specific validation error for CPF/CNPJ
      if (error.response && error.response.data?.cpf_cnpj) {
        throw new Error(error.response.data.cpf_cnpj[0]);
      }
      console.error("Error creating producer:", error);
      throw new Error("Erro ao criar o produtor.");
    }
  },

  async createProducer({ token, producer }: { token: string; producer: ProducerCreateParams }): Promise<Producer | null> {
    try {
      const { data } = await api.post(`/producer/`, producer, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      // Handle specific validation error for CPF/CNPJ
      if (error.response && error.response.data?.cpf_cnpj) {
        throw new Error(error.response.data.cpf_cnpj[0]);
      }
      console.error("Error creating producer:", error);
      throw new Error("Erro ao criar o produtor.");
    }
  },

  async getDashboardData(token: string): Promise<DashboardDataResponse | null> {
    try {
      const { data } = await api.get<DashboardDataResponse>('/producer/dashboard/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return null;
    }
  }
};