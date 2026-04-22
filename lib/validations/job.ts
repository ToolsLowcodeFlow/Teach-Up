import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  description: z.string().min(1, "Job description is required"),
  hours_of_operation: z.string().optional(),
  start_date: z.string().optional(),
  field_of_knowledge: z.string().optional(),
  role: z.string().optional(),
  years_of_experience: z.string().optional(),
  area: z.string().optional(),
  training: z.string().optional(),
  scope_of_work: z.string().optional(),
  languages: z.string().optional(),
  salary_range: z.string().optional(),
  transaction_type: z.string().optional(),
  education_stage: z.string().optional(),
  screening_questions: z.array(z.string()).optional(),
  files: z.array(z.string()).optional(),
  is_anonymous: z.boolean().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;
