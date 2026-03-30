export interface Department {
  id: string;
  name: string;
  code: string;
  description: string;
  managerName: string;
  managerEmail: string;
  employeeCount: number;
  location: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentResponse {
  success: boolean;
  message: string;
  data: {
    departments: Department[];
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleDepartmentResponse {
  success: boolean;
  message: string;
  data: Department;
}
