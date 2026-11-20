import * as z from 'zod';


export const loginSchema = z.object({
  email: z.string().min(1, 'this field is required').email('not valid email'),
  password: z.string().min(1, 'this field is required').regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#!@$%^*$-]).{8,}$/, 'not valid password'),

})

export type loginSchemaForm =z.infer<typeof loginSchema>