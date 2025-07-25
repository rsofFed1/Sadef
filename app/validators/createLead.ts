import { z } from 'zod';

export const leadSchema = z.object({
  fullName: z.string({ required_error: "Full name is required." }).min(2, "Full name must be at least 2 characters."),
  email: z.string({ required_error: "Email is required." }).email("Invalid email address."),
  phone: z.string({ required_error: "Phone is required." }).min(7, "Phone must be at least 7 digits."),
  message: z.string({ required_error: "Message is required." }).min(5, "Message must be at least 5 characters."),
  propertyId: z.number({ required_error: "Property ID is required." }),
});

export type leadForm = z.infer<typeof leadSchema>