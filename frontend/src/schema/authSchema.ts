import z from "zod";

export const RegisterSchema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password should be at least 6 characters" }),
});


export const LoginSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type RegisterType = z.infer<typeof RegisterSchema>;
