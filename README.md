# Philips Heartprint PWA

A web app that connects a Philips web user to the **Careplix HealthHub** mobile app. The user is walked through downloading the app, giving consent, and receiving a connection code that links their web account to the mobile app via a deep link.

---

## Repo Structure

```
src/
├── components/
│   ├── PreConsentView/       # Page 1 — app download instructions + proceed button
│   ├── ConsentView/          # Page 2 — terms & conditions + connection code generation
│   └── SuccessView/          # Page 3 — displays connection code + triggers deep link
│
├── context/
│   └── FlowContext.tsx       # Holds shared state (consent status, connection data)
│                               Persisted in sessionStorage so refreshes don't reset the flow
│
├── hooks/
│   └── useDeviceOs.ts        # Detects whether the user is on iOS, Android, or desktop
│                               Used to show the right app store button
│
├── service/
│   ├── connectionService.ts  # Calls the backend to generate a mobile connection code
│   │                           Currently mocked — replace with real API call
│   └── flowStorage.ts        # Reads and writes flow state to sessionStorage
│
├── styles/
│   ├── _variables.scss       # Shared SCSS variables (colours, spacing, etc.)
│   └── global.scss           # Global base styles
│
└── types/
    └── index.ts              # Shared TypeScript types (ConnectionData, FlowState, WebUser)
```

---

## Page Architecture

The app has three pages, navigated in a strict linear order using React Router.

### Page 1 — Pre-Consent (`/`)
- Shown first to every user.
- Displays store buttons (App Store / Google Play) based on the user's detected OS.
- Has a "I have the app — Proceed to Consent" button that moves to Page 2.

### Page 2 — Consent (`/consent`)
- Shows the Terms & Conditions.
- User must tick a checkbox to agree before the button activates.
- On clicking **Generate Connection Code**, calls the connection service and moves to Page 3.
- Cannot be accessed directly by URL without coming from Page 1.

### Page 3 — Success (`/connect`)
- Displays the generated connection code (`nativeUserId` + `clientId`).
- Automatically attempts to open the mobile app via a deep link (`cphhub://exchange?...`).
- If the deep link fails (app not installed), falls back to showing the app store link.
- Cannot be accessed without consent being accepted and a connection code being generated.

### Route Guards
Navigating directly to `/consent` or `/connect` without completing the prior steps redirects the user back to `/`. This is enforced in `App.tsx`.

---

## Running Locally

```bash
npm install
npm run dev
```

App runs at `http://localhost:5173`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

