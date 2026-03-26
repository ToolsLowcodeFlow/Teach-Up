import { z } from "zod";

export const companyDetailsSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  phone: z.string().min(1, "Phone number is required"),
  number_of_employees: z.string().min(1, "Number of employees is required"),
  employer_type: z.string().min(1, "Employer type is required"),
  privacy_accepted: z.literal(true, "You must accept the privacy policy"),
});

export const moreInfoSchema = z.object({
  company_logo_url: z.string().optional(),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  social_media_links: z.array(z.string()).optional(),
  description: z.string().optional(),
});

export type CompanyDetailsFormData = z.infer<typeof companyDetailsSchema>;
export type MoreInfoFormData = z.infer<typeof moreInfoSchema>;
