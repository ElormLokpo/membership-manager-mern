import z from "zod";

export const GeneralInfoSchema = z.object({
  name: z.string().min(1, { message: "Establishment name is required" }),
  franchiseName: z.string(),
  type: z.string(),
});

export const ContactInfoSchema = z.object({
  contactInfo: z.object({
    email: z.email(),
    phone: z.string(),
    website: z.string().optional(),
  }),
  locationInfo: z.object({
    country: z.string(),
    city: z.string(),
    address: z.string(),
    landmark: z.string(),
  }),
});

export const OperationInfoSchema = z.object({
  operatingHours: z.string(),
  capacityMetrics: z.object({
    maxMembers: z.string(),
    maxDailyVisitors: z.string(),
  }),
});

export const FullEstablishmentFormSchema = GeneralInfoSchema.extend(
  ContactInfoSchema.shape
).extend(OperationInfoSchema.shape);

export type FullEstablishmentType = z.infer<typeof FullEstablishmentFormSchema>;

export type GeneralInfoType = z.infer<typeof GeneralInfoSchema>;
export type ContactInfoType = z.infer<typeof ContactInfoSchema>;
export type OperationInfoType = z.infer<typeof OperationInfoSchema>;
