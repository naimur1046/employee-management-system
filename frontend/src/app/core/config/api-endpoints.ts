import { environment } from "../../../environments/environment";


const API_BASE = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE}/auth/login`,
    REGISTER: `${API_BASE}/auth/register`,
    LOGOUT: `${API_BASE}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE}/auth/refresh-token`,
    FORGOT_PASSWORD: `${API_BASE}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE}/auth/reset-password`
  },
  
  EMPLOYEES: {
    BASE: `${API_BASE}/employee`,
    BY_ID: (id: string) => `${API_BASE}/employee/${id}`,
    SEARCH: `${API_BASE}/employees/search`,
    BY_DEPARTMENT: (departmentId: number) => `${API_BASE}/employees/department/${departmentId}`,
    UPLOAD_PHOTO: (id: string) => `${API_BASE}/employees/${id}/upload-photo`
  },
  
  DEPARTMENTS: {
    BASE: `${API_BASE}/departments`,
    BY_ID: (id: number) => `${API_BASE}/departments/${id}`,
    WITH_EMPLOYEES: (id: number) => `${API_BASE}/departments/${id}/employees`
  },
  
  ORGANIZATIONS: {
    BASE: `${API_BASE}/organizations`,
    BY_ID: (id: number) => `${API_BASE}/organizations/${id}`,
    BRANCHES: (id: number) => `${API_BASE}/organizations/${id}/branches`,
    CAMPUSES: (id: number) => `${API_BASE}/organizations/${id}/campuses`
  },
  
  BRANCHES: {
    BASE: `${API_BASE}/branches`,
    BY_ID: (id: number) => `${API_BASE}/branches/${id}`
  },
  
  CAMPUSES: {
    BASE: `${API_BASE}/campuses`,
    BY_ID: (id: number) => `${API_BASE}/campuses/${id}`
  },
  
  DESIGNATIONS: {
    BASE: `${API_BASE}/designations`,
    BY_ID: (id: number) => `${API_BASE}/designations/${id}`
  },
  
  REPORTS: {
    BASE: `${API_BASE}/reports`,
    EMPLOYEE_SUMMARY: `${API_BASE}/reports/employee-summary`,
    DEPARTMENT_WISE: `${API_BASE}/reports/department-wise`,
    MONTHLY: `${API_BASE}/reports/monthly`
  },
  
  SETTINGS: {
    BASE: `${API_BASE}/settings`,
    BY_KEY: (key: string) => `${API_BASE}/settings/${key}`
  },
  
  COMMON: {
    UPLOAD: `${API_BASE}/upload`,
    DOWNLOAD: `${API_BASE}/download`,
    HEALTH_CHECK: `${API_BASE}/health`
  }
} as const;
