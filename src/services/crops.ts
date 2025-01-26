import api from '../api';

export interface Crop {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedCropResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Crop[];
}

interface CropFilters {
  name?: string;
  page_size?: number;
  page?: number;
}

interface GetCropsParams {
  token: string;
  filters?: CropFilters;
  ordering?: string;
}

interface DeleteCropParams {
  id: string;
  token: string;
}

export interface CropCreateParams {
  name: string;
}

export const CropService = {
  async getCrops({ token, filters, ordering }: GetCropsParams): Promise<PaginatedCropResponse | null> {
    try {
      const params: Record<string, string | undefined> = {};
      if (filters?.name) params.name = filters.name;
      if (filters?.page_size) params.page_size = filters.page_size.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (ordering) params.ordering = ordering;

      const { data } = await api.get<PaginatedCropResponse>('/producer/crops/', {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching crops with filters:", error);
      return null;
    }
  },

  async deleteCrop({ token, id }: DeleteCropParams): Promise<boolean> {
    try {
      await api.delete(`/producer/crops/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting crop with id ${id}:`, error);
      return false;
    }
  },

  async getCrop({ token, id }: DeleteCropParams): Promise<Crop | null> {
    try {
      const { data } = await api.get(`/producer/crops/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching crop with id ${id}:`, error);
      return null;
    }
  },

  async updateCrop({ token, id, crop }: { token: string; id: string; crop: CropCreateParams }): Promise<Crop | null> {
    try {
      const { data } = await api.put(`/producer/crops/${id}/`, crop, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error updating crop:", error);
      throw new Error("Erro ao atualizar a cultura.");
    }
  },

  async createCrop({ token, crop }: { token: string; crop: CropCreateParams }): Promise<Crop | null> {
    try {
      const { data } = await api.post(`/producer/crops/`, crop, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error creating crop:", error);
      throw new Error("Erro ao criar a cultura.");
    }
  },
};