import { User } from '../types/user';

export const sampleUsers: User[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: 'contractor',
    first_name: 'John',
    last_name: 'Doe',
    company_name: 'Doe Construction',
    business_license: 'LIC12345',
    status: 'pending',
    created_at: '2023-10-01T10:00:00Z'
  } as User,
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    role: 'estimator',
    first_name: 'Jane',
    last_name: 'Smith',
    company_name: 'Smith Estimations',
    business_license: 'LIC67890',
    status: 'approved',
    created_at: '2023-09-15T14:30:00Z',
    updated_at: '2023-09-20T09:15:00Z'
  } as User,
  {
    id: 3,
    username: 'bob_johnson',
    email: 'bob.j@example.com',
    role: 'contractor',
    first_name: 'Bob',
    last_name: 'Johnson',
    company_name: 'Johnson Builders',
    business_license: 'LIC54321',
    status: 'rejected',
    created_at: '2023-10-05T11:20:00Z',
    updated_at: '2023-10-10T16:45:00Z'
  } as User,
  {
    id: 4,
    username: 'alice_williams',
    email: 'alice.w@example.com',
    role: 'estimator',
    first_name: 'Alice',
    last_name: 'Williams',
    company_name: 'Williams Estimation Co.',
    business_license: 'LIC98765',
    status: 'pending',
    created_at: '2023-10-10T08:45:00Z'
  } as User,
  {
    id: 5,
    username: 'mike_brown',
    email: 'mike.b@example.com',
    role: 'admin',
    first_name: 'Mike',
    last_name: 'Brown',
    company_name: 'Brown Constructions',
    business_license: 'LIC45678',
    status: 'approved',
    created_at: '2023-08-20T13:10:00Z',
    updated_at: '2023-08-25T10:30:00Z'
  } as User
];

export const pendingUser: User[] = [
  {
    id: 1,
    username: 'john_doe',
    email: 'john.doe@example.com',
    role: 'contractor',
    first_name: 'John',
    last_name: 'Doe',
    company_name: 'Doe Construction',
    business_license: 'LIC12345',
    status: 'pending',
    created_at: '2023-10-01T10:00:00Z'
  } as User,
  {
    id: 2,
    username: 'jane_smith',
    email: 'jane.smith@example.com',
    role: 'estimator',
    first_name: 'Jane',
    last_name: 'Smith',
    company_name: 'Smith Estimations',
    business_license: 'LIC67890',
    status: 'pending',
    created_at: '2023-09-15T14:30:00Z',
    updated_at: '2023-09-20T09:15:00Z'
  } as User,
  {
    id: 3,
    username: 'bob_johnson',
    email: 'bob.j@example.com',
    role: 'contractor',
    first_name: 'Bob',
    last_name: 'Johnson',
    company_name: 'Johnson Builders',
    business_license: 'LIC54321',
    status: 'pending',
    created_at: '2023-10-05T11:20:00Z',
    updated_at: '2023-10-10T16:45:00Z'
  } as User,
  {
    id: 4,
    username: 'alice_williams',
    email: 'alice.w@example.com',
    role: 'estimator',
    first_name: 'Alice',
    last_name: 'Williams',
    company_name: 'Williams Estimation Co.',
    business_license: 'LIC98765',
    status: 'pending',
    created_at: '2023-10-10T08:45:00Z'
  } as User,
  {
    id: 5,
    username: 'mike_brown',
    email: 'mike.b@example.com',
    role: 'admin',
    first_name: 'Mike',
    last_name: 'Brown',
    company_name: 'Brown Constructions',
    business_license: 'LIC45678',
    status: 'pending',
    created_at: '2023-08-20T13:10:00Z',
    updated_at: '2023-08-25T10:30:00Z'
  } as User
];
