import { descriptionFormat, nameFormat, slugFormat } from "@/lib/regex";
import { z, ZodType } from "zod";
import { Tasks } from "./global";

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

  export const TeamSchema = z.object({
    name: z.string().regex(nameFormat, {
      message: "team must have a name, format: min 4 and max 60 characters",
    }),
    description: z.string().regex(descriptionFormat, {
      message: "team description format:min 4 and max 500 characters",
    }).optional().nullable(),
  });

export const ProjectSchema = z.object({
  name: z.string().regex(nameFormat, {
    message: "project must have a name, format: no special (&/,), min 4 and max 60 characters",
  }),
  start_date: z.date({
    required_error: "start date are required",
  }),
  deadline: z.date({
    required_error: "deadline are required",
  }),
  state: z.enum(["not started", "paused",'in progress','done','canceled',]),
  priority: z.enum(['high', 'low', 'meduim']),
});

export const TaskSchema = z.object({
  name: z.string().regex(nameFormat, {
    message: "task must have a name, format: no special (&/,), min 4 and max 60 characters",
  }),
  start_date: z.date({
    required_error: "start date are required",
  }),
  deadline: z.date({
    required_error: "deadline are required",
  }),
  state: z.enum(["not started", "paused",'in progress','done','canceled',]),
  priority: z.enum(['high', 'low', 'medim']),
});


export const emailSchema = z.string().email('invalid email adress');

export const task = z.object({

})