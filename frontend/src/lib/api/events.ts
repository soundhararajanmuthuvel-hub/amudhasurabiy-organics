export interface CustomerEvent {
  event: 
    | "visitor_session"
    | "page_view"
    | "product_view"
    | "search_query"
    | "category_view"
    | "add_to_cart"
    | "remove_from_cart"
    | "checkout_started"
    | "checkout_completed"
    | "payment_success"
    | "payment_failed"
    | "wishlist_toggle"
    | "coupon_applied"
    | "login"
    | "logout";
  customerId?: string;
  sessionId: string;
  timestamp: string;
  productId?: string;
  quantity?: number;
  source?: string;
  device?: string;
  metadata?: Record<string, any>;
}

// Generate or retrieve persistent Session ID
export const getSessionId = (): string => {
  if (typeof window === "undefined") return "session_server";
  let sid = window.sessionStorage.getItem("blovit_session_id");
  if (!sid) {
    sid = `sid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    window.sessionStorage.setItem("blovit_session_id", sid);
  }
  return sid;
};

// Dispatch standardized event
export const trackCustomerEvent = (
  event: CustomerEvent["event"],
  data: Partial<Omit<CustomerEvent, "event" | "sessionId" | "timestamp">> = {}
): CustomerEvent => {
  const payload: CustomerEvent = {
    event,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
    device: typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop",
    ...data,
  };

  if (typeof window !== "undefined") {
    try {
      const existingLogs = JSON.parse(window.localStorage.getItem("blovit_crm_events") || "[]");
      existingLogs.push(payload);
      // Keep recent 200 events locally
      if (existingLogs.length > 200) existingLogs.shift();
      window.localStorage.setItem("blovit_crm_events", JSON.stringify(existingLogs));
      
      // Console log event dispatch in development
      console.log("[AO ERP CRM Event Logged]:", payload.event, payload);
    } catch (e) {
      console.error("Failed logging event", e);
    }
  }

  return payload;
};

// Retrieve event history for CRM analytics dashboard
export const getCustomerEventLogs = (): CustomerEvent[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem("blovit_crm_events") || "[]");
  } catch (e) {
    return [];
  }
};
