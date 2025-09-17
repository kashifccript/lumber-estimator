import { z } from 'zod';

// Schema that matches the FastAPI registration endpoint
export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .regex(/^\S+$/, 'Invalid input'),

  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['estimator', 'admin', 'contractor'], {
    required_error: 'Role is required'
  }),
  first_name: z
    .string()
    .min(1, 'First name is required')
    .regex(/^\S+$/, 'Invalid input'),
  last_name: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^\S+$/, 'Invalid input'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 characters')
    .regex(/^\S+$/, 'Invalid input'),
  company_name: z.string().min(1, 'Company name is required'),
  business_license: z.string().optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required').regex(/^\S+$/, 'Invalid input'),
  zip_code: z
    .string()
    .min(5, 'ZIP code must be at least 5 characters')
    .regex(/^\S+$/, 'Invalid input')
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const signUpUser = async (data: SignUpFormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/register`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );

  const response = await res.json();

  return {
    body: response.message || response.detail || 'Registration completed',
    success: res.ok,
    data: response
  };
};
