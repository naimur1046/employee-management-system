export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  role: 'Admin' | 'User' | 'Manager' | 'Viewer';
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    users: User[];
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface SingleUserResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export const ROLES: DropdownOption[] = [
  { value: '', label: 'Select Role' },
  { value: 'Admin', label: 'Admin' },
  { value: 'Manager', label: 'Manager' },
  { value: 'User', label: 'User' },
  { value: 'Viewer', label: 'Viewer' }
];

export const USER_STATUS: DropdownOption[] = [
  { value: '', label: 'Select Status' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
];
