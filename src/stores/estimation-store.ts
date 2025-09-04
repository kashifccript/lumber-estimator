import {
  EstimationApiData,
  UploadProgress
} from '@/features/estimation-details/types/estimation';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type EstimationState = {
  // The main data we want to persist
  currentEstimationData: EstimationApiData | null;

  // Temporary states (won't be persisted)
  isUploading: boolean;
  uploadProgress: {
    loaded: number;
    total: number;
    percentage: number;
  } | null;
  error: string | null;
};

export type EstimationActions = {
  // Main data actions
  setEstimationData: (data: any) => void;
  clearEstimationData: () => void;

  // Upload progress actions
  setUploadProgress: (progress: UploadProgress) => void;
  setUploading: (isUploading: boolean) => void;
  clearUploadProgress: () => void;

  // Error actions
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useEstimationStore = create(
  persist(
    (set) => ({
      // initial state
      currentEstimationData: null,
      isUploading: false,
      uploadProgress: null,
      error: null,

      // actions
      setEstimationData: (data: any) => {
        set({
          currentEstimationData: data,
          error: null
        });
      },
      clearEstimationData: () => {
        set({
          currentEstimationData: null,
          error: null
        });
      },
      setUploadProgress: (progress: UploadProgress) =>
        set({ uploadProgress: progress }),
      setUploading: (isUploading: boolean) => set({ isUploading }),
      clearUploadProgress: () => set({ uploadProgress: null }),
      setError: (error: string | null) => set({ error }),
      clearError: () => set({ error: null })
    }),
    {
      name: 'estimation-store',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: any) => ({
        currentEstimationData: state.currentEstimationData
      })
    }
  )
);
