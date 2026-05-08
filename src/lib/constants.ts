export const CONTACT_EMAIL = "victoria.ai.agency@gmail.com";
export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0119e315098b8b8559";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/esomovie-rita-virtual-assistant-project-management-expert";
// TODO: Replace with the real booking link (Calendly / Cal.com / etc.)
export const CALENDAR_URL = "https://calendly.com/victoria-ai-agency/strategy-call";

export const openLeadModal = () => {
  window.dispatchEvent(new CustomEvent("open-lead-modal"));
};
