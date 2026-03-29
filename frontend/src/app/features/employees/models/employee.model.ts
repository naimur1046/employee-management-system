export interface Employee {
  id: string | number;
  department: string;
  fullName: string;
  contactNumber: string;
  organization: string;
  branch: string;
  campus: string;
  bloodGroup: string;
  officeEmail: string;
  pin: string;
  name: string;
  designation: string;
}

export interface EmployeeResponse {
  success: boolean;
  message: string;
  data: {
    employees: Employee[];
    totalCount: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface DropdownOption {
  value: string;
  label: string;
}

export const DEPARTMENTS: DropdownOption[] = [
  { value: '', label: 'Select Department' },
  { value: 'Computer Science', label: 'Computer Science' },
  { value: 'Electrical Engineering', label: 'Electrical Engineering' },
  { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
  { value: 'Civil Engineering', label: 'Civil Engineering' },
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Physics', label: 'Physics' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Biology', label: 'Biology' },
  { value: 'English', label: 'English' },
  { value: 'Management', label: 'Management' },
  { value: 'Economics', label: 'Economics' }
];

export const DESIGNATIONS: DropdownOption[] = [
  { value: '', label: 'Select Designation' },
  { value: 'Professor', label: 'Professor' },
  { value: 'Associate Professor', label: 'Associate Professor' },
  { value: 'Assistant Professor', label: 'Assistant Professor' },
  { value: 'Senior Lecturer', label: 'Senior Lecturer' },
  { value: 'Lecturer', label: 'Lecturer' },
  { value: 'Lab Engineer', label: 'Lab Engineer' },
  { value: 'Researcher', label: 'Researcher' },
  { value: 'Admin Staff', label: 'Admin Staff' }
];

export const BLOOD_GROUPS: DropdownOption[] = [
  { value: '', label: 'Select Blood Group' },
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' }
];

export const CAMPUSES: DropdownOption[] = [
  { value: '', label: 'Select Campus' },
  { value: 'North', label: 'North Campus' },
  { value: 'South', label: 'South Campus' },
  { value: 'East', label: 'East Campus' },
  { value: 'West', label: 'West Campus' },
  { value: 'Central', label: 'Central Campus' }
];

export const BRANCHES: DropdownOption[] = [
  { value: '', label: 'Select Branch' },
  { value: 'Main Campus', label: 'Main Campus' },
  { value: 'City Center', label: 'City Center' },
  { value: 'Suburban', label: 'Suburban' },
  { value: 'Online', label: 'Online' }
];

export const ORGANIZATIONS: DropdownOption[] = [
  { value: '', label: 'Select Organization' },
  { value: 'Tech University', label: 'Tech University' },
  { value: 'State College', label: 'State College' },
  { value: 'Private Institute', label: 'Private Institute' },
  { value: 'Research Center', label: 'Research Center' }
];
