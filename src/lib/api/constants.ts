// API Base URL - update this to match your backend
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_SERVER_HOST || 'http://localhost:3000';
export const statusColors = {
  pending: 'bg-[#E3A00833] text-[#E3A008]',
  approved: 'bg-[#00A42E33] text-[#00A42E]',
  rejected: 'bg-[#C81E1E33] text-[#C81E1E]'
};

export const dropdownList = [
  'All',
  'pending',
  'approved',
  'rejected',
  'estimator',
  'contractor'
];