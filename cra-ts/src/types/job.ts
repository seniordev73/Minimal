// ----------------------------------------------------------------------

export type IJobFilterValue = string | string[];

export type IJobFilters = {
  roles: string[];
  experience: string;
  locations: string[];
  benefits: string[];
  employmentTypes: string[];
};

// ----------------------------------------------------------------------

export type IJobCandidate = {
  id: string;
  name: string;
  avatarUrl: string;
  role: string;
};

export type IJobCompany = {
  name: string;
  logo: string;
  phoneNumber: string;
  fullAddress: string;
};

export type IJobSalary = {
  type: string;
  price: number;
  negotiable: boolean;
};

export type IJobItem = {
  id: string;
  role: string;
  totalViews: number;
  title: string;
  content: string;
  publish: string;
  skills: string[];
  experience: string;
  locations: string[];
  salary: IJobSalary;
  benefits: string[];
  company: IJobCompany;
  employmentTypes: string[];
  workingSchedule: string[];
  candidates: IJobCandidate[];
  createdAt: Date | string | number;
  expiredDate: Date | string | number | null;
};
