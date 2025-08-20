interface StatusBadgeProps {
  status: 'approved' | 'pending' | 'rejected' | 'quotation-needed';
  children: React.ReactNode;
}

const statusStyles = {
  approved: 'bg-green-100 text-green-600',
  pending: 'bg-yellow-100 text-yellow-600',
  rejected: 'bg-red-100 text-red-600',
  'quotation-needed': 'bg-blue-100 text-blue-600'
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-medium ${statusStyles[status]}`}
    >
      {children}
    </div>
  );
}
