# Roles & UI Access Rules

Roles:
- `YOUTH`
- `AGENT`
- `ADMIN`

**Important:** UI access rules are **frontend gating only**. Backend must still enforce authorization.

## Global Rules (All Apps)
- Unauthenticated users should only access: **auth-app**.
- Authenticated users should only see pages permitted by their role.
- `ADMIN` can access admin UI; non-admin users must not see admin navigation links.

## Access by App

### shell-app (Host Navigation + Layout)
- All authenticated roles (`YOUTH`, `AGENT`, `ADMIN`) can access the shell layout and common navigation.
- Shell must hide links the user cannot access:
  - Hide `/admin` link unless role is `ADMIN`.

### auth-app
- Accessible to everyone:
  - Unauthenticated: Login/Register/Reset
  - Authenticated: may still view auth pages if needed (optional), but primary use is unauthenticated access.

### profile-app
- `YOUTH`: Access youth profile pages
- `AGENT`: Access agent profile pages
- `ADMIN`: Optional access if needed for viewing profiles (UI only), but admin profile editing is not required by plan

### survey-app
- `YOUTH`: Can view available surveys, fill surveys, view submitted surveys
- `AGENT`: Can view available surveys, fill surveys, view submitted surveys (if enabled by backend)
- `ADMIN`: Access depends on admin needs; primary admin survey management lives in `admin-app`

### admin-app
- `ADMIN`: Full access to all admin UI modules
- `YOUTH`, `AGENT`: No access (must be blocked/hidden in UI)

## UI Gating Behavior
- If a user tries to open a restricted app/path:
  - Show a simple **“Access Denied”** UI (no extra features beyond the plan)
  - Provide a link back to shell home or allowed area
