export interface Employee {
  id: string;
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

export interface SingleEmployeeResponse {
  success: boolean;
  message: string;
  data: Employee;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export const DEPARTMENTS: DropdownOption[] = [
  { value: '', label: 'Select Department' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Design', label: 'Design' },
  { value: 'Quality Assurance', label: 'Quality Assurance' },
  { value: 'DevOps', label: 'DevOps' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'IT Support', label: 'IT Support' },
  { value: 'Human Resources', label: 'Human Resources' },
  { value: 'Marketing', label: 'Marketing' },
  { value: 'Sales', label: 'Sales' },
  { value: 'Customer Support', label: 'Customer Support' }
];

export const DESIGNATIONS: DropdownOption[] = [
  { value: '', label: 'Select Designation' },
  { value: 'Chief Technology Officer', label: 'Chief Technology Officer (CTO)' },
  { value: 'VP of Engineering', label: 'VP of Engineering' },
  { value: 'Engineering Manager', label: 'Engineering Manager' },
  { value: 'Tech Lead', label: 'Tech Lead' },
  { value: 'Senior Software Engineer', label: 'Senior Software Engineer' },
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Junior Software Engineer', label: 'Junior Software Engineer' },
  { value: 'Frontend Developer', label: 'Frontend Developer' },
  { value: 'Backend Developer', label: 'Backend Developer' },
  { value: 'Full Stack Developer', label: 'Full Stack Developer' },
  { value: 'DevOps Engineer', label: 'DevOps Engineer' },
  { value: 'QA Engineer', label: 'QA Engineer' },
  { value: 'UI/UX Designer', label: 'UI/UX Designer' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Scrum Master', label: 'Scrum Master' },
  { value: 'Data Engineer', label: 'Data Engineer' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Intern', label: 'Intern' }
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
  { value: 'Dhaka', label: 'Dhaka Office' },
  { value: 'Chittagong', label: 'Chittagong Office' },
  { value: 'Sylhet', label: 'Sylhet Office' },
  { value: 'Rajshahi', label: 'Rajshahi Office' },
  { value: 'Khulna', label: 'Khulna Office' },
  { value: 'Barisal', label: 'Barisal Office' },
  { value: 'Rangpur', label: 'Rangpur Office' },
  { value: 'Mymensingh', label: 'Mymensingh Office' },
  { value: 'Comilla', label: 'Comilla Office' },
  { value: 'Remote', label: 'Remote (Work from Home)' }
];

export const BRANCHES: DropdownOption[] = [
  { value: '', label: 'Select Branch' },
  { value: 'Head Office', label: 'Head Office' },
  { value: 'Development Center', label: 'Development Center' },
  { value: 'Research Lab', label: 'Research Lab' },
  { value: 'Co-working Space', label: 'Co-working Space' },
  { value: 'Remote', label: 'Remote' }
];

export const ORGANIZATIONS: DropdownOption[] = [
  { value: '', label: 'Select Organization' },
  { value: 'Tech Solutions Ltd', label: 'Tech Solutions Ltd' },
  { value: 'Digital Innovations', label: 'Digital Innovations' },
  { value: 'Software House BD', label: 'Software House BD' },
  { value: 'Cloud Services', label: 'Cloud Services' },
  { value: 'Startup Hub', label: 'Startup Hub' }
];
