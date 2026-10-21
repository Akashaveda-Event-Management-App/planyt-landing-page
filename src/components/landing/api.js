// Where planyt.in sends "Request access": the Planyt API (VITE_API_URL to point elsewhere, e.g. staging).
export const leadsUrl = () => `${(import.meta.env.VITE_API_URL || "https://backend.planyt.in/api").replace(/\/$/, "")}/v1/leads`;
// Is organizer self sign-up open (an admin marked a sign-up plan), and with which limits.
export const signupStatusUrl = () => `${(import.meta.env.VITE_API_URL || "https://backend.planyt.in/api").replace(/\/$/, "")}/v1/organizer/onboarding/self-signup`;
