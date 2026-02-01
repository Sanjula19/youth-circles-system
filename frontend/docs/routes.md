# Routes & Ownership (Deployed Paths)

This system is a Micro-Frontend workspace with **5 independent React apps** served by **Nginx path routing** (no module federation required).

## Final Deployed Paths
- `/` → **shell-app**
- `/auth` → **auth-app**
- `/profile` → **profile-app**
- `/survey` → **survey-app**
- `/admin` → **admin-app**

## App Ownership (What each app owns)

### shell-app (Host)
Owns:
- Global layout (header/sidebar/container)
- Navigation links to other apps
- Top-level routing links (to `/auth`, `/profile`, `/survey`, `/admin`)
- UI role gating at the shell level (basic access control display)

Does NOT own:
- Auth forms, profiles, surveys, admin management UI

### auth-app
Owns:
- Login
- Register
- Reset password

### profile-app
Owns:
- Youth profile view/edit
- Agent profile view/edit
- Display of assigned Youth Circle(s) (read-only)

### survey-app
Owns:
- Survey list (available surveys)
- Survey fill/submit flow
- View submitted surveys (history)

### admin-app
Owns:
- Admin dashboard UI
- User management UI (list/view/activate/deactivate)
- Youth Circle management views (grouping/stats UI)
- Survey management UI (create/edit/activate/deactivate, monitoring UI)

## Notes
- Each app must run alone and build alone.
- Nginx must be configured to serve each app under its base path with SPA fallback.
