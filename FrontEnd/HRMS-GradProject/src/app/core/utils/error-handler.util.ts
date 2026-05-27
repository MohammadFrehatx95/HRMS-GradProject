
export function getFriendlyErrorMessage(
  err: any,
  fallback: string = 'Something went wrong. Please try again later.',
): string {
  const status: number = err?.status ?? 0;
  const rawMessage: string =
    err?.error?.message || err?.error?.title || err?.message || '';

  if (
    status === 0 ||
    (err?.name === 'HttpErrorResponse' && !navigator.onLine)
  ) {
    return 'No internet connection. Please check your network and try again.';
  }

  if (
    rawMessage.includes('EADDRNOTALLOWED') ||
    rawMessage.includes('allow_list') ||
    rawMessage.includes('tenant') ||
    rawMessage.includes('XX000') ||
    rawMessage.includes('PGRST') ||
    rawMessage.includes('connection refused') ||
    rawMessage.includes('ECONNREFUSED')
  ) {
    return 'Unable to connect to the server. Please contact support or try again later.';
  }

  if (status === 401) {
    return 'Your session has expired. Please log in again.';
  }

  if (status === 403) {
    return 'You do not have permission to perform this action.';
  }

  if (status === 404) {
    return 'The requested resource was not found.';
  }

  if (status === 400) {

    if (Array.isArray(err?.error)) {
      const msgs = err.error.map((e: any) => e.description || e.errorMessage || e).filter((e: any) => typeof e === 'string');
      if (msgs.length > 0) return msgs.join('\n');
    }

    if (err?.error?.errors && typeof err.error.errors === 'object') {
      const errorMessages: string[] = [];
      for (const key in err.error.errors) {
        if (Object.prototype.hasOwnProperty.call(err.error.errors, key)) {
          const messages = err.error.errors[key];
          if (Array.isArray(messages)) {
            errorMessages.push(...messages);
          } else if (typeof messages === 'string') {
            errorMessages.push(messages);
          }
        }
      }
      if (errorMessages.length > 0) {
        return errorMessages.join('\n');
      }
    }

    if (
      rawMessage &&
      rawMessage.length < 150 &&
      !looksLikeTechError(rawMessage) &&
      rawMessage !== 'One or more validation errors occurred.'
    ) {
      return rawMessage;
    }
    return 'Invalid input. Please check the form and try again.';
  }

  if (status >= 500) {
    return 'A server error occurred. Please try again later.';
  }

  if (
    rawMessage &&
    rawMessage.length < 150 &&
    !looksLikeTechError(rawMessage)
  ) {
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
