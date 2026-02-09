## ADR-0009: Admin App Uses Shared Auth Contract Keys
**Date:** 2026-02-09  
**Decision:** admin-app reads `localStorage` keys `auth.token` and `auth.role` for guards.  
**Why:** All micro-frontends must follow the same auth contract; prevents mismatched access behavior.  
**Notes:** If token missing → redirect to `/auth`. If role not ADMIN → show AccessDenied UI.
