import { z } from "zod";

export const User = z.object({
    firstname: z.string({
        required_error: "Firstname is required",
        invalid_type_error: "Name must be a string",
      }),
    lastname: z.string({
        required_error: "Lastname is required",
        invalid_type_error: "Name must be a string",
      }),
    email: z.string().email({message: "invalid email adress"}),
    password: z.string().min(8, { message: "Password must be 8 or more characters long" })
  });

export const emailSchema = z.string().email('invalid email adress');

export const task = z.object({

})