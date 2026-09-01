const DEFAULT_CALLBACK_PATH = "/";

/** Normalize auth callback targets to same-origin path + search (no host). */
export function normalizeCallbackPath(
  callbackUrl?: string | null,
  fallback = DEFAULT_CALLBACK_PATH,
): string {
  if (!callbackUrl) {
    return fallback;
  }

  try {
    if (callbackUrl.startsWith("http://") || callbackUrl.startsWith("https://")) {
      const url = new URL(callbackUrl);
      return url.pathname + url.search || fallback;
    }

    if (callbackUrl.startsWith("//")) {
      const url = new URL(`https:${callbackUrl}`);
      return url.pathname + url.search || fallback;
    }

    if (callbackUrl.startsWith("/")) {
      return callbackUrl;
    }

    return fallback;
  } catch {
    return fallback;
  }
}
