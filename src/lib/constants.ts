export const CONTACT_EMAIL = "victoria.ai.agency@gmail.com";
export const UPWORK_PROFILE_URL = "https://www.upwork.com/freelancers/~0119e315098b8b8559";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/esomovie-rita-virtual-assistant-project-management-expert";
export const CALENDAR_URL = "https://calendar.app.google/6neTruBhh8ZXCJGf8";

export const openLeadModal = () => {
  window.dispatchEvent(new CustomEvent("open-lead-modal"));
};

export const openChatbot = () => {
  window.dispatchEvent(new CustomEvent("open-chatbot"));
};
