import { z } from 'zod';

// Schema that matches the FastAPI registration endpoint

export const signUpSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores'
    ),

  email: z.string().email('Invalid email address'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),

  role: z.enum(['estimator', 'admin', 'contractor'], {
    required_error: 'Role is required'
  }),

  first_name: z
    .string()
    .min(1, 'First name is required')
    .regex(/^[A-Za-z]+$/, 'First name must only contain letters'),

  last_name: z
    .string()
    .min(1, 'Last name is required')
    .regex(/^[A-Za-z]+$/, 'Last name must only contain letters'),

  phone: z
    .string()
    .regex(/^[0-9]{10,15}$/, 'Phone number must be 10–15 digits'),

  company_name: z.string().min(1, 'Company name is required'),

  business_license: z.string().optional(),

  address: z.string().min(1, 'Address is required'),

  city: z.string().min(1, 'City is required'),

  state: z
    .string()
    .min(2, 'State is required')
    .regex(/^[A-Za-z\s]+$/, 'State must only contain letters'),

  zip_code: z.string().regex(/^[0-9]{5,10}$/, 'ZIP code must be 5–10 digits')
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
