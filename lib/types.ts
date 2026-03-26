export type UserRole = "admin" | "seeker" | "institution" | "supplier";

export type Gender = "male" | "female" | "unspecified";

export type EmploymentType = "full_time" | "part_time" | "contract";

export type DealerStatus = "no" | "licensed_dealer" | "exempt_dealer" | "limited_company";

export type SubscriptionStatus = "none" | "active" | "expired" | "cancelled";

export type JobStatus = "active" | "filled" | "blocked" | "deleted";

export type SupplierStatus = "active" | "inactive" | "blocked";

export type BannerLocation = "home" | "ad";

export type BillingCycle = "monthly" | "yearly";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_blocked: boolean;
  blocked_at: string | null;
  blocked_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Institution {
  id: string;
  profile_id: string;
  company_name: string;
  company_logo_url: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  address: string | null;
  description: string | null;
  website: string | null;
  social_media_links: string[] | null;
  number_of_employees: string | null;
  employer_type: string | null;
  route_id: string | null;
  subscription_status: SubscriptionStatus;
  subscription_start: string | null;
  subscription_end: string | null;
  jobs_posted_count: number;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  institution_id: string;
  title: string;
  description: string;
  location: string | null;
  salary_min: number | null;
  salary_max: number | null;
  employment_type: EmploymentType | null;
  scope: string | null;
  languages_required: string[];
  experience_required: number | null;
  status: JobStatus;
  is_hot_job: boolean;
  bounce_priority: number;
  applicant_count: number;
  posted_at: string;
  created_at: string;
  updated_at: string;
}

export interface Supplier {
  id: string;
  profile_id: string;
  company_name: string;
  company_logo_url: string | null;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  area_of_activity: string | null;
  age_group: string | null;
  service_type: string | null;
  provider_type: string | null;
  address: string | null;
  description: string | null;
  status: SupplierStatus;
  route_id: string | null;
  subscription_status: string;
  created_at: string;
  updated_at: string;
}

export interface SupplierService {
  id: string;
  supplier_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Route {
  id: string;
  name: string;
  price: number;
  billing_cycle: BillingCycle;
  features: string[];
  job_posting_limit: number | null;
  database_search_access: boolean;
  is_popular: boolean;
  is_hidden: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Banner {
  id: string;
  name: string;
  content: string | null;
  cta_text: string | null;
  cta_link: string | null;
  button_style_keyword: string | null;
  location: BannerLocation;
  background_image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
