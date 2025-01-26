import api from '../api';

export interface Harvest {
  id: string;
  year: string;
  farm: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedHarvestResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Harvest[];
}

interface HarvestFilters {
  year?: string;
  farm?: string;
  page_size?: number;
  page?: number;
}

interface GetHarvestsParams {
  token: string;
  filters?: HarvestFilters;
  ordering?: string;
}

interface DeleteHarvestParams {
  id: string;
  token: string;
}

export interface HarvestCreateParams {
  year: string;
  farm: string;
}

export const HarvestService = {
  async getHarvests({ token, filters, ordering }: GetHarvestsParams): Promise<PaginatedHarvestResponse | null> {
    try {
      const params: Record<string, string | undefined> = {};
      if (filters?.year) params.year = filters.year;
      if (filters?.farm) params.farm = filters.farm;
      if (filters?.page_size) params.page_size = filters.page_size.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (ordering) params.ordering = ordering;

      const { data } = await api.get<PaginatedHarvestResponse>('/producer/harvests/', {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching harvests with filters:", error);
      return null;
    }
  },

  async deleteHarvest({ token, id }: DeleteHarvestParams): Promise<boolean> {
    try {
      await api.delete(`/producer/harvests/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting harvest with id ${id}:`, error);
      return false;
    }
  },

  async getHarvest({ token, id }: DeleteHarvestParams): Promise<Harvest | null> {
    try {
      const { data } = await api.get(`/producer/harvests/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching harvest with id ${id}:`, error);
      return null;
    }
  },

  async updateHarvest({ token, id, harvest }: { token: string; id: string; harvest: HarvestCreateParams }): Promise<Harvest | null> {
    try {
      const { data } = await api.put(`/producer/harvests/${id}/`, harvest, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error updating harvest:", error);
      throw new Error("Erro ao atualizar a colheita.");
    }
  },

  async createHarvest({ token, harvest }: { token: string; harvest: HarvestCreateParams }): Promise<Harvest | null> {
    try {
      const { data } = await api.post(`/producer/harvests/`, harvest, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error creating harvest:", error);
      throw new Error("Erro ao criar a colheita.");
    }
  },
};