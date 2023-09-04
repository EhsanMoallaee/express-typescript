import { z } from 'zod';

export const createUserSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required'
        }),
        email: z.string({
            required_error: 'Email is required'
        }).email('Not a valid email'),
        password: z.string({
            required_error: 'Password is required'
        }).min(6, 'Password too short - should be 6 chars minimum'),
        confirmPassword: z.string({
            required_error: 'confirmPassword is required'
        }),        
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
})

// const inputSchema = createUserSchema.shape.body.omit({confirmPassword: true});

const CreateInputSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

export type CreateUserInput = z.TypeOf<typeof CreateInputSchema>;