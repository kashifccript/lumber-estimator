'use server';
import { post } from '@/lib/api/client';

export async function forgotPassword(data: { email: string | null }) {
  try {
    const res = await post({
      endpoint: `/auth/forgot-password`,
      body: JSON.stringify(data)
    });

    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : 'Failed to set password',
      data: null
    };
  }
}

export async function verifyOTP(data: { email: string | null; otp: string }) {
  try {
    const res = await post({
      endpoint: `/auth/verify-otp`,
      body: JSON.stringify(data)
    });

    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify otp',
      data: null
    };
  }
}

export async function resetPassword(data: {
  email: string | null;
  confirm_password: string;
  new_password: string;
}) {
  try {
    const res = await post({
      endpoint: `/auth/reset-password`,
      body: JSON.stringify(data)
    });

    return {
      success: res.success,
      message: res.message,
      data: res.data
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to verify otp',
      data: null
    };
  }
}
