import api from '../api';

export interface PlantedCrop {
  id: string;
  harvest: string;
  crop: string;
  crop_name: string;
  harvest_year: string;
  farm_name: string;
  created_at: string;
  updated_at: string;
}

export interface PaginatedPlantedCropResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlantedCrop[];
}

interface PlantedCropFilters {
  harvest?: string;
  crop?: string;
  page_size?: number;
  page?: number;
}

interface GetPlantedCropsParams {
  token: string;
  filters?: PlantedCropFilters;
  ordering?: string;
}

interface DeletePlantedCropParams {
  id: string;
  token: string;
}

export interface PlantedCropCreateParams {
  harvest: string;
  crop: string;
}

export interface PlantedCropUpdateParams {
  token: string;
  id: string;
  plantedCrop: PlantedCropCreateParams;
}

export const PlantedCropService = {
  async getPlantedCrops({ token, filters, ordering }: GetPlantedCropsParams): Promise<PaginatedPlantedCropResponse | null> {
    try {
      const params: Record<string, string | undefined> = {};
      if (filters?.harvest) params.harvest = filters.harvest;
      if (filters?.crop) params.crop = filters.crop;
      if (filters?.page_size) params.page_size = filters.page_size.toString();
      if (filters?.page) params.page = filters.page.toString();
      if (ordering) params.ordering = ordering;

      const { data } = await api.get<PaginatedPlantedCropResponse>('/producer/planted-crops/', {
        params,
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error("Error fetching planted crops with filters:", error);
      return null;
    }
  },

  async deletePlantedCrop({ token, id }: DeletePlantedCropParams): Promise<boolean> {
    try {
      await api.delete(`/producer/planted-crops/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error(`Error deleting planted crop with id ${id}:`, error);
      return false;
    }
  },

  async getPlantedCrop({ token, id }: DeletePlantedCropParams): Promise<PlantedCrop | null> {
    try {
      const { data } = await api.get(`/producer/planted-crops/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error) {
      console.error(`Error fetching planted crop with id ${id}:`, error);
      return null;
    }
  },

  async createPlantedCrop({ token, plantedCrop }: { token: string; plantedCrop: PlantedCropCreateParams }): Promise<PlantedCrop | null> {
    try {
      const { data } = await api.post(`/producer/planted-crops/`, plantedCrop, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error("Error creating planted crop:", error);
      throw new Error("Erro ao criar cultura plantada.");
    }
  },

  async updatePlantedCrop({ token, id, plantedCrop }: PlantedCropUpdateParams): Promise<PlantedCrop | null> {
    try {
      const { data } = await api.put(`/producer/planted-crops/${id}/`, plantedCrop, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      return data;
    } catch (error: any) {
      if (error.response && error.response.data?.non_field_errors) {
        throw new Error(error.response.data.non_field_errors[0]);
      }
      console.error(`Error updating planted crop with id ${id}:`, error);
      throw new Error("Erro ao atualizar cultura plantada.");
    }
  },
};