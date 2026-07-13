# CLAUDE.md — PaginaPersonal

Codebase reference for AI-assisted development. Keep this file up to date as the project evolves.

---

## Project Overview

**PaginaPersonal** is a full-stack React SPA with two distinct purposes:

1. **Portfolio Homepage** — public marketing site for Fernando Cueto (Full Stack Developer)
2. **Clients Portal** — private enterprise task/incident management system for clients

Both live in the same repo and are served from the same Vite build. The portal is accessible under `/clients/*` and protected by Firebase Authentication.

---

## Tech Stack

| Category | Technology | Version |
|---|---|---|
| Frontend | React | 19.1.1 |
| Language | TypeScript | ~5.8.3 |
| Build | Vite | 7.3.2 |
| Styling | Tailwind CSS v4 | 4.1.12 |
| UI Components | shadcn/ui (Radix UI + Tailwind) | — |
| Routing | React Router DOM | 7.14.1 |
| Animation | Framer Motion | 12.23.12 |
| i18n | i18next + react-i18next | 25.3.6 / 15.6.1 |
| Backend/Auth/DB | Firebase (Auth + Firestore + Analytics) | 12.4.0 |
| File Storage | AWS S3 (@aws-sdk/client-s3) | ^3.1032.0 |
| Email | Brevo (transactional) + EmailJS (contact form) | — |
| Server State | TanStack Query | 5.85.3 |
| Form Validation | Zod | 4.1.12 |
| Charts | Recharts | 2.15.4 |
| Carousel | Embla Carousel | 8.6.0 |
| Notifications | Sonner (toasts) | 2.0.7 |
| Theme | next-themes | 0.4.6 |
| Icons | Lucide React | 0.539.0 |
| Testing | Vitest + React Testing Library | 3.2.4 / 16.3.0 |
| Linting | ESLint 9 | 9.33.0 |

---

## Directory Structure

```
PaginaPersonal/
├── src/
│   ├── main.tsx                          # React entry point
│   ├── App.tsx                           # Root routing + providers
│   ├── index.css                         # Global styles
│   │
│   ├── pages/
│   │   ├── Index.tsx                     # Portfolio homepage
│   │   └── NotFound.tsx                  # 404 page
│   │
│   ├── components/                       # Public homepage components
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx
│   │   ├── LanguageToggle.tsx
│   │   ├── sections/                     # Homepage sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── data/                     # Static JSON data
│   │   │       ├── skills.json
│   │   │       ├── experience.json
│   │   │       ├── projects.json
│   │   │       └── testimonials.json
│   │   ├── ui/                           # shadcn/ui primitives
│   │   └── custom-ui/                    # App-specific UI atoms
│   │
│   ├── lib/
│   │   ├── i18n.ts                       # i18next config (EN/ES inline resources)
│   │   └── utils.ts                      # cn() helper (clsx + tailwind-merge)
│   │
│   └── clients-portal/                   # Private portal (all protected)
│       ├── auth/
│       │   ├── AuthContext.tsx           # Context type definitions
│       │   ├── AuthProvider.tsx          # Firebase auth wrapper
│       │   ├── RequireAuth.tsx           # Protected route component
│       │   └── useAuth.ts               # Custom hook
│       ├── types/
│       │   ├── user.ts                   # UserProfile, UserRole
│       │   ├── task.ts                   # Task, TaskComment, TaskStatus
│       │   └── client.ts                # ClientProfile
│       ├── integrations/
│       │   ├── firebase/
│       │   │   ├── client.ts            # Firebase SDK init + analytics
│       │   │   ├── firestoreService.ts  # User/client CRUD
│       │   │   ├── taskService.ts       # Task CRUD + queries
│       │   │   └── counterService.ts    # Per-client task numbering
│       │   ├── aws/
│       │   │   ├── client.ts            # S3 client config
│       │   │   └── storage.ts           # File upload service
│       │   └── brevo/
│       │       └── emailService.ts      # Transactional email notifications
│       ├── views/                        # Page-level components
│       │   ├── Login.tsx
│       │   ├── Register.tsx
│       │   ├── HomePage.tsx             # Shell layout (sidebar + <Outlet>)
│       │   ├── Dashboard.tsx            # Analytics + KPI charts
│       │   ├── Tasks.tsx                # Task list, search, pagination
│       │   ├── TaskView.tsx             # Task create/edit form + comments
│       │   ├── Profile.tsx              # User profile editor
│       │   └── Users.tsx               # Admin-only user management
│       ├── components/
│       │   ├── Task.tsx                 # Task detail card
│       │   ├── TaskComments.tsx         # Comment thread + file attachments
│       │   └── FileItem.tsx             # File attachment display
│       └── utils/
│           └── toastOptions.ts
│
├── test/                                 # Vitest test suite
│   ├── setup.ts
│   ├── App.test.tsx
│   ├── components/                       # Component smoke tests
│   └── data/                            # Data shape validation
│
├── public/
│   ├── images/
│   └── .htaccess
│
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vitest.config.ts
├── eslint.config.js
├── .prettierrc
├── build-production.js                  # Validates env vars before build
└── package.json
```

---

## Routing

Defined in `src/App.tsx`. React Router v7 with nested routes.

```
/                         → Index (Portfolio homepage)
/clients/login            → Login (public)
/clients/*                → RequireAuth wrapper
  /clients/home           → Dashboard
  /clients/tasks          → Task list
  /clients/tasks/new      → Create task
  /clients/tasks/:taskId  → Edit/view task
  /clients/users          → User admin (admin role only)
  /clients/profile        → User profile
  /clients/register       → Register (accessible inside auth)
*                         → NotFound
```

`RequireAuth` wraps a `HomePage` layout which renders `<Outlet>` for nested views.

---

## State Management

| Scope | Tool |
|---|---|
| Auth state (user, client_id, loading) | React Context (`AuthProvider`) |
| Server/async data (tasks, users) | TanStack Query |
| UI/component state | `useState` |

No Redux or Zustand — keep it that way unless complexity demands it.

---

## Authentication

- **Provider**: Firebase Authentication (email/password)
- **Flow**: `Login` → `signInWithEmailAndPassword` → `onAuthStateChanged` → `AuthContext` populated → `RequireAuth` passes
- **Roles**: `admin` | `user` | `guest` — stored in Firestore `users` collection
- **Session**: Firebase SDK handles persistence automatically
- **Guard**: `RequireAuth` redirects to `/clients/login` if no user

---

## Database (Firestore)

Collections and their key fields:

| Collection | Key Fields |
|---|---|
| `users` | uid, email, name, city, role, phone, client_id[], createdAt, updatedAt |
| `clients` | uid, name, description, contact_info |
| `tasks` | uid, taskNumber, user_id, client_id, title, description, status, files[], comments[], filesCompleted[], createdAt, updatedAt, completedAt |
| `counters` | Per-client task sequence counter |

**Task statuses**: `pending` | `in_progress` | `completed` | `cancelled` | `on_hold`

Users belong to multiple clients via `client_id: string[]`. Queries use `array-contains-any`.

---

## File Storage (AWS S3)

- S3 path pattern: `{BUCKET_FOLDER}/{taskId}/{type}/{timestamp}_{filename}`
- Types: `original` (initial attachments) | `comment` (comment files) | `completed` (proof of completion)
- Files stored as public-read; URLs saved in Firestore task document
- Service: `src/clients-portal/integrations/aws/storage.ts`

---

## Email Notifications (Brevo)

Three automatic transactional emails via `emailService.ts`:

| Trigger | Recipient | Event |
|---|---|---|
| Task created | Admin | `taskService.createTask()` |
| Comment added | Admin + Task creator | `taskService.addComment()` |
| Task completed | Task creator | `taskService.updateTask()` with `status='completed'` |

Homepage contact form uses **EmailJS** (client-side, no backend needed).

---

## Internationalization

- Config: `src/lib/i18n.ts` — inline resources, no separate JSON locale files
- Languages: `en` (default), `es`
- Hook: `useTranslation()` throughout components
- Persisted in localStorage

---

## Environment Variables

All variables prefixed with `VITE_` (exposed to browser via Vite). Validated in `build-production.js` before production builds.

```
VITE_APP_ENV                          # "dev" | "production"
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
VITE_APP_FIREBASE_API_KEY
VITE_APP_FIREBASE_AUTH_DOMAIN
VITE_APP_FIREBASE_PROJECT_ID
VITE_APP_FIREBASE_STORAGE_BUCKET
VITE_APP_FIREBASE_MESSAGING_SENDER_ID
VITE_APP_FIREBASE_APP_ID
VITE_APP_MEASUREMENT_ID
VITE_AWS_ACCESS_KEY_ID
VITE_AWS_SECRET_ACCESS_KEY
VITE_AWS_BUCKET
VITE_AWS_BUCKET_FOLDER
VITE_AWS_REGION
VITE_AWS_PATH
VITE_BREVO_API_KEY
VITE_ADMIN_NAME
VITE_APP_NAME
VITE_ADMIN_EMAIL
VITE_ADMIN_EMAIL_FROM
```

---

## Common Commands

```bash
npm run dev              # Start dev server (Vite)
npm run build            # TypeScript check + Vite build
npm run build:production # Validate env vars + production build
npm run preview          # Preview production build locally
npm run test             # Run test suite (Vitest)
npm run test:watch       # Watch mode
npm run lint             # ESLint
```

---

## Key Patterns

### Protected Routes
`RequireAuth` uses `useAuth()` context. If `user` is null and auth is done loading, it redirects to `/clients/login`.

### Component Imports
Path alias `@/` maps to `src/`. Use it everywhere (`import X from '@/clients-portal/...'`).

### Styling
- Tailwind CSS v4 utility classes
- `cn()` helper from `src/lib/utils.ts` for conditional class merging
- shadcn/ui components live in `src/components/ui/` — do not edit them directly; extend via wrapper components
- Dark mode via `next-themes` and Tailwind `dark:` variants

### Form Validation
Use Zod schemas. Validate client-side before calling Firebase/services.

### Firebase Analytics
Only logs in production (`VITE_APP_ENV === 'production'`). Guard all `logEvent()` calls with `isProduction`.

### Task Numbering
Tasks get a sequential number per client via `counterService.ts` — not global sequential. Do not use Firestore auto-IDs as the display number.

---

## Testing

- Framework: Vitest + React Testing Library + jsdom
- Config: `vitest.config.ts`
- Setup: `test/setup.ts` (jest-dom matchers)
- Tests cover: component rendering smoke tests, utility functions, data shape validation
- Run: `npm run test`

---

## Deployment Notes

- Output: `dist/` (static files)
- `.htaccess` in `public/` handles SPA routing on Apache servers
- Firebase Analytics only activates in production environment
- All secrets are environment variables — never commit `.env.local`
