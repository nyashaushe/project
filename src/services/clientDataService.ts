/**
 * Client-side data service for fetching static JSON files via HTTP
 * This is used when the code runs in the browser environment
 */

/**
 * Generic response format matching legacy API structure
 */
export interface ApiResponse<T> {
  data: T | T[];
  meta?: {
    pagination?: {
      total: number;
      page: number;
      pageSize: number;
    };
  };
  error?: string;
}

/**
 * Parameters for filtering and pagination
 */
export interface DataParams {
  pagination?: {
    page: number;
    pageSize: number;
  };
  sort?: string;
  filters?: Record<string, any>;
}

/**
 * Error class for data service operations
 */
export class DataServiceError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "DataServiceError";
  }
}

/**
 * Get static data from JSON files via HTTP with optional filtering and pagination
 * @param dataType - The type of data to fetch (matches JSON filename)
 * @param params - Optional parameters for filtering, sorting, and pagination
 * @returns Promise resolving to API response with data array
 */
export async function getStaticData<T>(
  dataType: string,
  params: DataParams = {}
): Promise<ApiResponse<T[]>> {
  try {
    const response = await fetch(`/data/${dataType}.json`);

    if (!response.ok) {
      throw new DataServiceError(
        `Failed to fetch ${dataType}.json: ${response.status} ${response.statusText}`,
        "FETCH_ERROR"
      );
    }

    let jsonData: ApiResponse<T[]>;
    try {
      jsonData = await response.json();
    } catch (parseError) {
      throw new DataServiceError(
        `Invalid JSON format in ${dataType}.json`,
        "INVALID_JSON"
      );
    }

    // Validate JSON structure
    if (!jsonData.data || !Array.isArray(jsonData.data)) {
      throw new DataServiceError(
        `Invalid data structure in ${dataType}.json - expected data array`,
        "INVALID_STRUCTURE"
      );
    }

    let filteredData = [...jsonData.data];

    // Apply filters if provided
    if (params.filters) {
      filteredData = applyFilters(filteredData, params.filters);
    }

    // Apply sorting if provided
    if (params.sort) {
      filteredData = applySorting(filteredData, params.sort);
    }

    // Apply pagination if provided
    const pagination = params.pagination || {
      page: 1,
      pageSize: filteredData.length,
    };
    const startIndex = (pagination.page - 1) * pagination.pageSize;
    const endIndex = startIndex + pagination.pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      meta: {
        pagination: {
          total: filteredData.length,
          page: pagination.page,
          pageSize: pagination.pageSize,
        },
      },
    };
  } catch (error) {
    if (error instanceof DataServiceError) {
      throw error;
    }

    throw new DataServiceError(
      `Failed to load data for ${dataType}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      "LOAD_ERROR"
    );
  }
}

/**
 * Get a single item from static data by ID
 * @param dataType - The type of data to fetch (matches JSON filename)
 * @param id - The ID of the item to retrieve
 * @returns Promise resolving to API response with single item
 */
export async function getStaticItem<T extends { id: number }>(
  dataType: string,
  id: number
): Promise<ApiResponse<T>> {
  try {
    const response = await getStaticData<T>(dataType);
    const item = response.data.find((item: T) => item.id === id);

    if (!item) {
      throw new DataServiceError(
        `Item with ID ${id} not found in ${dataType}`,
        "ITEM_NOT_FOUND"
      );
    }

    return {
      data: item,
      meta: response.meta,
    };
  } catch (error) {
    if (error instanceof DataServiceError) {
      throw error;
    }

    throw new DataServiceError(
      `Failed to load item ${id} from ${dataType}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`,
      "LOAD_ITEM_ERROR"
    );
  }
}

/**
 * Apply filters to data array
 * @param data - Array of data items
 * @param filters - Filter criteria
 * @returns Filtered data array
 */
function applyFilters<T>(data: T[], filters: Record<string, any>): T[] {
  return data.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (key === "$or") {
        // Handle OR conditions
        return value.some((orCondition: Record<string, any>) => {
          return Object.entries(orCondition).some(([orKey, orValue]) => {
            return matchesFilter(item, orKey, orValue);
          });
        });
      }

      return matchesFilter(item, key, value);
    });
  });
}

/**
 * Check if an item matches a filter condition
 * @param item - Data item to check
 * @param key - Property key to check
 * @param value - Filter value/condition
 * @returns Boolean indicating if item matches filter
 */
function matchesFilter<T>(item: T, key: string, value: any): boolean {
  const itemValue = (item as any)[key];

  if (typeof value === "object" && value !== null) {
  // Handle legacy-style filters like { $containsi: "search" }
    if (value.$containsi) {
      return String(itemValue)
        .toLowerCase()
        .includes(String(value.$containsi).toLowerCase());
    }
    if (value.$contains) {
      return String(itemValue).includes(String(value.$contains));
    }
    if (value.$eq) {
      return itemValue === value.$eq;
    }
    if (value.$ne) {
      return itemValue !== value.$ne;
    }
    if (value.$in && Array.isArray(value.$in)) {
      return value.$in.includes(itemValue);
    }
    if (value.$nin && Array.isArray(value.$nin)) {
      return !value.$nin.includes(itemValue);
    }
  }

  // Direct value comparison
  if (Array.isArray(itemValue)) {
    return itemValue.includes(value);
  }

  return itemValue === value;
}

/**
 * Apply sorting to data array
 * @param data - Array of data items
 * @param sortParam - Sort parameter (e.g., "title:asc", "publishedAt:desc")
 * @returns Sorted data array
 */
function applySorting<T>(data: T[], sortParam: string): T[] {
  const [field, direction = "asc"] = sortParam.split(":");

  return [...data].sort((a, b) => {
    const aValue = (a as any)[field];
    const bValue = (b as any)[field];

    let comparison = 0;

    if (aValue < bValue) {
      comparison = -1;
    } else if (aValue > bValue) {
      comparison = 1;
    }

    return direction === "desc" ? -comparison : comparison;
  });
}
