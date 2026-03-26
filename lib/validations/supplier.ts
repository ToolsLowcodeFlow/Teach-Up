import { z } from "zod";

export const supplierServiceSchema = z.object({
  service_type: z.string().min(1, "Service type is required"),
  service_name: z.string().min(1, "Service name is required"),
  description: z.string().optional(),
  image_url: z.string().optional(),
});

export const supplierRegistrationSchema = z.object({
  area_of_activity: z.string().min(1, "Area of activity is required"),
  contact_name: z.string().min(1, "Contact name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email address"),
  age_group: z.string().optional(),
  services: z.array(supplierServiceSchema).min(1, "At least one service is required"),
});

export type SupplierServiceFormData = z.infer<typeof supplierServiceSchema>;
export type SupplierRegistrationFormData = z.infer<typeof supplierRegistrationSchema>;
