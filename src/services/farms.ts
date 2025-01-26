import api from '../api';

export interface Farm {
  id: string;
  name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  producer: string; // Producer ID
  created_at: string;
  updated_at: string;
}

export interface PaginatedFarmResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Farm[];
}

interface FarmFilters {
  name?: string;
  city?: string;
  state?: string;
  producer?: string;
  page_size?: number;
  page?: number;
}

interface GetFarmsParams {
  token: string;
  filters?: FarmFilters;
  ordering?: string;
}

interface DeleteFarmParams {
  id: string;
  token: string;
}

export interface FarmCreateParams {
  name: string;
  city: string;
  state: string;
  total_area: number;
  arable_area: number;
  vegetation_area: number;
  producer: string;
}

export const FarmService = {
  async getFarms({ token, filters, ordering }: GetFarmsParams): Promise<PaginatedFarmResponse | null> {
    try {
      const params: Record<string, string | undefined> = {};
      if (filters?.name) params.name = filters.name;
      if (filters?.city) params.city = filters.city;
      if (filters?.state) params.state = filters.state;
      if (filters?.producer) params.producer = filters.producer;
      if (filters?.page_size) params.page_size = filters.page_size.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (ordering) params.ordering = ordering;

      const { data } = await api.get<PaginatedFarmResponse>('/producer/farm/', {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching farms with filters:", error);
      return null;
    }
  },

  async deleteFarm({ token, id }: DeleteFarmParams): Promise<boolean> {
    try {
      await api.delete(`/producer/farm/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting farm with id ${id}:`, error);
      return false;
    }
  },

  async getFarm({ token, id }: DeleteFarmParams): Promise<Farm | null> {
    try {
      const { data } = await api.get(`/producer/farm/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching farm with id ${id}:`, error);
      return null;
    }
  },

  async updateFarm({ token, id, farm }: { token: string; id: string; farm: FarmCreateParams }): Promise<Farm | null> {
    try {
      const { data } = await api.put(`/producer/farm/${id}/`, farm, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error updating farm:", error);
      throw new Error("Erro ao atualizar a fazenda.");
    }
  },

  async createFarm({ token, farm }: { token: string; farm: FarmCreateParams }): Promise<Farm | null> {
    try {
      const { data } = await api.post(`/producer/farm/`, farm, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error creating farm:", error);
      throw new Error("Erro ao criar a fazenda.");
    }
  },
};