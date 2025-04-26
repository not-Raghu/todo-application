import zod from 'zod';

const signinSchema = zod.object({
    email: zod.string().trim().toLowerCase().email(),
    password: zod.string().min(6, "Password is required"),
});

export default signinSchema;