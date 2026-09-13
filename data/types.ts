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

export type Story = {
  name: string;
  line: string;
  email: string;
  github: string;
  linkedin: string;
  paragraphs: string[];
};
