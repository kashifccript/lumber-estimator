export function formatDate(
  date: Date | string | number | undefined,
  opts: Intl.DateTimeFormatOptions = {}
) {
  if (!date) return '';

  try {
    return new Intl.DateTimeFormat('en-US', {
      month: opts.month ?? 'long',
      day: opts.day ?? 'numeric',
      year: opts.year ?? 'numeric',
      ...opts
    }).format(new Date(date));
  } catch (_err) {
    return '';
  }
}

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate(); // 20
  const month = date.toLocaleString('en-US', { month: 'short' }); // Dec
  const year = date.getFullYear(); // 2025

  const time = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }); // 10:30 PM

  return `${day}, ${month} ${year} / ${time}`;
};

// Example
