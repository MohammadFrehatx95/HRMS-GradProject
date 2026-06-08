export function getFriendlyErrorMessage(
  err: any,
  fallback: string = 'An unexpected error occurred. Please try again.',
): string {
  const status: number = err?.status ?? 0;

  if (status === 0 || (err?.name === 'HttpErrorResponse' && !navigator.onLine)) {
    return 'No internet connection. Please check your network.';
  }

  if (status === 401) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 403) {
    return 'You do not have permission for this action.';
  }

  if (status === 404) {
    return 'The requested information was not found.';
  }

  if (status === 400) {
    return 'Invalid input. Please ensure all fields are filled correctly.';
  }

  if (status >= 500) {
    return 'A server error occurred. Please try again later.';
  }

  const rawMessage: string = err?.error?.message || err?.error?.title || err?.message || '';
  if (rawMessage && rawMessage.length < 80 && !looksLikeTechError(rawMessage) && rawMessage !== 'One or more validation errors occurred.') {
    return rawMessage;
  }

  return fallback;
}

function looksLikeTechError(msg: string): boolean {
  const techPatterns = [
    'XX',
    'PGRST',
    'EADDR',
    'ECONN',
    'stack trace',
    'NullReferenceException',
    'SqlException',
    'DbUpdateException',
    'System.',
    'Microsoft.',
    'allow_list',
    'tenant',
    'Object reference',
    'Unhandled exception',
    'at System',
    'at Microsoft',
  ];
  return techPatterns.some((p) => msg.includes(p));
}
