export function Toast({
  message,
  type = 'info',
}: {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}) {
  const bgColor = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-primary-600',
    warning: 'bg-yellow-600',
  }[type];

  return (
    <div
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50`}
    >
      <span>{message}</span>
    </div>
  );
}
