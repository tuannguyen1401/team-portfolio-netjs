const DEFAULT_TIMEOUT_MS = 15000;

class ApiError extends Error {
  constructor({ message, status, code, details, url }) {
    super(message);
    this.name = 'ApiError';
    this.status = status ?? 0;
    this.code = code ?? null;
    this.details = details ?? null;
    this.url = url ?? null;
  }
}

function startAbortTimer(ms, controller) {
  return setTimeout(() => controller.abort(), ms);
}

function safeJsonParse(text) {
  try {
    return JSON.parse(text);
  } catch (_err) {
    return { message: 'Invalid JSON response', raw: text };
  }
}

export async function fetchData(url, options = {}) {
  const {
    method = 'GET',
    headers = {},
    body,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const controller = new AbortController();
  const timer = startAbortTimer(timeoutMs, controller);

  try {
    const init = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...headers,
      },
      signal: controller.signal,
    };

    if (body !== undefined) {
      init.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    const res = await fetch(url, init);

    const contentType = res.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const rawText = await res.text();
    const payload = rawText ? (isJson ? safeJsonParse(rawText) : rawText) : null;

    if (!res.ok) {
      const message = (payload && payload.message) || `Request failed with status ${res.status}`;
      const error = new ApiError({
        message,
        status: res.status,
        code: payload && payload.code,
        details: payload,
        url,
      });
      return { data: null, error };
    }

    return { data: payload ?? null, error: null };
  } catch (err) {
    let error;
    if (err && err.name === 'AbortError') {
      error = new ApiError({ message: 'Request timed out', status: 0, code: 'TIMEOUT', url });
    } else if (err instanceof ApiError) {
      error = err;
    } else {
      error = new ApiError({
        message: 'Network error',
        status: 0,
        code: 'NETWORK_ERROR',
        details: { originalMessage: err && err.message },
        url,
      });
    }
    return { data: null, error };
  } finally {
    clearTimeout(timer);
  }
}

export { ApiError };


