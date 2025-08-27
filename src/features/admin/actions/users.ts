import { PendingUser, UserApprovalResponse } from '../types/user';

export const getPendingApprovals = async (
  token: string
): Promise<PendingUser[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/pending-approvals`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch pending approvals');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    return [];
  }
};

export const approveUser = async (
  userId: number,
  token: string
): Promise<UserApprovalResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/approve/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const response = await res.json();

    return {
      success: res.ok,
      message:
        response.message || response.detail || 'User approved successfully',
      data: response
    };
  } catch (error) {
    console.error('Error approving user:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while approving user'
    };
  }
};

export const rejectUser = async (
  userId: number,
  token: string
): Promise<UserApprovalResponse> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/reject/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    );

    const response = await res.json();

    return {
      success: res.ok,
      message:
        response.message || response.detail || 'User rejected successfully',
      data: response
    };
  } catch (error) {
    console.error('Error rejecting user:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while rejecting user'
    };
  }
};
