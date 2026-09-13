export type WorkExperience = {
  company: string;
  company_site: string | null;
  role: string;
  location: string;
  dates: string;
  logo: string | null;
  highlights?: string[];
};

export type Project = {
  name: string;
  description: string | null;
  topics: string[];
  link: string;
};

export type OSSContribution = {
  repository: string;
  pr_number: string;
  link: string;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
};
