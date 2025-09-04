import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Tool, ToolCategory, PricingType } from '../../types';

interface ToolsState {
  tools: Tool[];
  currentTool: Tool | null;
  loading: boolean;
  error: string | null;
  filters: {
    category: ToolCategory | null;
    pricing: PricingType | null;
    rating: number | null;
    searchQuery: string;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const initialState: ToolsState = {
  tools: [],
  currentTool: null,
  loading: false,
  error: null,
  filters: {
    category: null,
    pricing: null,
    rating: null,
    searchQuery: '',
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  },
};

const toolsSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    fetchToolsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchToolsSuccess: (state, action: PayloadAction<{
      tools: Tool[];
      pagination: { page: number; limit: number; total: number; totalPages: number };
    }>) => {
      state.loading = false;
      state.tools = action.payload.tools;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    fetchToolsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<Tool>) => {
      state.currentTool = action.payload;
    },
    clearCurrentTool: (state) => {
      state.currentTool = null;
    },
    updateToolRating: (state, action: PayloadAction<{
      toolId: string;
      averageRating: number;
      totalVotes: number;
    }>) => {
      const tool = state.tools.find(t => t.id === action.payload.toolId);
      if (tool) {
        tool.averageRating = action.payload.averageRating;
        tool.totalVotes = action.payload.totalVotes;
      }
      if (state.currentTool?.id === action.payload.toolId) {
        state.currentTool.averageRating = action.payload.averageRating;
        state.currentTool.totalVotes = action.payload.totalVotes;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<ToolsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchToolsStart,
  fetchToolsSuccess,
  fetchToolsFailure,
  setCurrentTool,
  clearCurrentTool,
  updateToolRating,
  setFilters,
  clearFilters,
  setPage,
  clearError,
} = toolsSlice.actions;

export default toolsSlice.reducer;