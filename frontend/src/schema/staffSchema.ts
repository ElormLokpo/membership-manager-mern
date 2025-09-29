import z from "zod";

export const staffSchema = z.object({
  fullname: z.string().min(1, { message: "Fullname is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password field is required" }),
  position: z.string(),
  employmentType: z.string(),
  shift: z.string(),
});


export type staffType = z.infer<typeof staffSchema>;