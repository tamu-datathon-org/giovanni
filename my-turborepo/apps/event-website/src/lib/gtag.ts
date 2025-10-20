export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

/**
 * Send a custom event to Google Analytics (gtag)
 * action: string name of the event
 * params: optional payload
 */
export const event = (action: string, params?: Record<string, any>) => {
  if (!GA_ID) return;
  try {
    (window as any).gtag?.('event', action, params || {});
  } catch (e) {
    // ignore in non-browser environments or if gtag isn't loaded yet
  }
};