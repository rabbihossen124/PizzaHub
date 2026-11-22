# PizzaHub — Artisanal Pizza Ordering & Delivery Platform

![PizzaHub Banner](/pizza-logo.png)

> **PizzaHub** is a production-grade, full-stack, role-based food ordering and restaurant delivery platform inspired by the premium **Caferio** fast-food aesthetic. It bridges local independent pizzerias with pizza lovers using authentic wood-fired ovens, 72-hour sourdough fermentation, real-time kitchen tracking, and Stripe-powered vendor subscriptions.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Live Deployments & Repositories](#-live-deployments--repositories)
- [Demo Credentials](#-demo-credentials)
- [Design Theme & Visual Identity](#-design-theme--visual-identity)
- [Key Features by Role](#-key-features-by-role)
  - [1. Public Experience & Marketplace](#1-public-experience--marketplace)
  - [2. Customer Portal & Kitchen Tracker](#2-customer-portal--kitchen-tracker)
  - [3. Vendor Studio & Kitchen Management](#3-vendor-studio--kitchen-management)
  - [4. Administrator Governance & Auditing](#4-administrator-governance--auditing)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Local Setup & Installation](#-local-setup--installation)
- [Environment Variables](#-environment-variables)
- [API Route Reference](#-api-route-reference)

---

## 🍕 Project Overview

PizzaHub solves the problem of generic fast-food platforms by creating an artisan-first ecosystem. Independent pizzerias can list their authentic creations, manage kitchen orders turn-by-turn, and upgrade to unlimited listings via Stripe, while customers enjoy real-time oven progress, customized delivery schedules, and printable restaurant receipts.

- **Assignment Category:** Category 009 — Pizza Ordering & Delivery Platform / Fast Food Restaurant
- **Client Commits:** 23+ meaningful commits
- **Server Commits:** 15+ meaningful commits
- **Strict Brand Guideline:** Strictly adheres to Caferio typography (`Oswald` display and `Plus Jakarta Sans` body), deep dark stone surfaces (`#0D0C0B` / `#161412`), warm pizza red (`#DC2626`), and cheese gold (`#F59E0B`).

---

## 🌐 Live Deployments & Repositories

| Component | URL / Repository |
| :--- | :--- |
| **Live Web Application** | [https://pizzahub-client.vercel.app](https://pizzahub-client.vercel.app) *(or your deployed Vercel link)* |
| **Client Source Code** | `c:\project\Assiment\Assiment-9\pizzaHub` |
| **Live Server API** | [https://pizzahub-server.onrender.com](https://pizzahub-server.onrender.com) *(or your deployed Render/Vercel link)* |
| **Server Source Code** | `c:\project\Assiment\Assiment-9\PizzaHub-Server` |

---

## 🔑 Demo Credentials

To experience all role-based dashboards immediately without manual registration, use the quick-fill demo buttons on the [Sign In Page](/signin) or sign in with:

| Role | Email | Password | Access Privileges |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@pizzahub.com` | `Password123!` | Full governance, user blocking/unblocking, menu approval/rejection, and immutable Stripe transaction auditing |
| **Pizzeria Vendor** | `woodfire@pizzahub.com` | `Password123!` | Menu item CRUD, ImgBB file uploads, 3-item limit validation, Stripe $29 Premium upgrade, and kitchen order Accept/Reject |
| **Customer** | `customer@pizzahub.com` | `Password123!` | Pizza ordering with date picker, duplicate order validation, kitchen timeline tracker, order cancellation, and printable receipts |

---

## 🎨 Design Theme & Visual Identity

- **Display Typography:** `Oswald` (Google Fonts) for bold pizzeria headers, buttons, and status metrics.
- **Body Typography:** `Plus Jakarta Sans` for maximum readability across menus and dashboards.
- **Color Palette:**
  - Dark Brick-Oven Stone: `#0D0C0B` / `#161412`
  - Artisan Pizza Red: `#DC2626`
  - Melted Mozzarella Gold: `#F59E0B`
  - Clean Contrast Whites & Light Mode support via `next-themes`
- **Logo Asset:** Custom transparent pizza slice with dripping cheese (`/pizza-logo.png`).

---

## 🔥 Key Features by Role

### 1. Public Experience & Marketplace
- **Hero Banner:** Actionable headline, live search input, quick category pills, and delivery guarantee badge.
- **Featured Menu Items:** Top-rated pizzas fetched dynamically from the database with direct order modal trigger.
- **6 Authentic Pizza Categories:** Neapolitan, New York-Style, Sicilian, Chicago Deep-Dish, Detroit-Style, and Artisan Flatbreads.
- **Why Choose PizzaHub:** Highlights 72-hour cold fermentation, 900°F volcanic stone ovens, San Marzano D.O.P. tomatoes, and local bakeries.
- **How It Works:** 4-step visual journey (Choose Slice, Artisan Baking, Real-Time Tracking, Doorstep Feast).
- **Public Browse Menu (`/menu`):**
  - Search by item name or pizzeria vendor name.
  - Category and Location dropdown filters.
  - **Challenge 1 (Price Sorting):** Low to High (`price_asc`) and High to Low (`price_desc`) with query parameter preservation.
- **Protected Item Details (`/menu/[id]`):**
  - High-resolution gallery and ingredient list.
  - Role restrictions: Vendors cannot order their own items; Administrators cannot place customer orders.

### 2. Customer Portal & Kitchen Tracker
- **Customer Overview (`/dashboard/customer`):** Real-time metrics for total orders, pending confirmations, baking pizzas, and cumulative dollars spent.
- **Interactive Order Placement Modal:**
  - Date picker with past-date rejection.
  - Delivery address input with validation.
  - Duplicate active order prevention (cannot place identical order for same item on same date).
- **Kitchen Progress Timeline Tracker (`/dashboard/customer/orders`):**
  - Visual 4-step status tracker: Placed → Vendor Review → Wood-Fire Baking → Delivery.
- **Order Cancellation:** Customers can cancel pending orders directly (`PATCH /api/orders/:id/cancel`).
- **Printable Official Receipt Modal:** Clean restaurant invoice view with order number, breakdown, and browser print (`window.print()`).

### 3. Vendor Studio & Kitchen Management
- **Vendor Overview (`/dashboard/vendor`):** Active menu items count, incoming orders count, revenue stats, and subscription tier status.
- **ImgBB Image Upload Integration (`/dashboard/vendor/add-item`):** Upload high-res pizza photography with live client card preview.
- **Free Tier 3-Item Limit Guard:** Enforces 3-item maximum for free accounts; prompts upgrade once limit is reached.
- **Stripe Checkout Subscription ($29.00 USD):**
  - One-click checkout session creation.
  - Verified return handler (`/payment/success`) with direct session verification fallback.
  - Cancellation notice (`/payment/cancel`) keeping account safely on Free tier.
  - Billing invoice history table on subscription page.
- **Incoming Orders Management (`/dashboard/vendor/orders`):**
  - Filter by status (`All`, `Pending`, `Accepted`, `Rejected`).
  - Search by customer name, email, or pizza item.
  - "Accept & Bake" one-click action.
  - "Reject Order" with confirmation modal.
  - Single-action permanent lock once accepted or rejected.
- **My Menu Items (`/dashboard/vendor/menu`):** Full CRUD with edit modal and delete confirmation.

### 4. Administrator Governance & Auditing
- **Command Center Overview (`/dashboard/admin`):** Platform cumulative revenue counter, user breakdown (vendors vs customers), menu approval backlog, and orders volume.
- **User Directory (`/dashboard/admin/users`):**
  - Search by name or email.
  - Filter by role (`Customer`, `Vendor`, `Admin`) and status (`Active`, `Suspended`).
  - Block and Unblock actions (`PATCH /api/admin/users/:id/block`).
  - Self-blocking prevention for the logged-in admin account.
- **Menu Quality Control Queue (`/dashboard/admin/menu`):**
  - Review submitted pizzas across all vendors.
  - One-click Approve or Reject.
  - Permanent item deletion for inappropriate submissions.
- **Platform Financial Ledger (`/dashboard/admin/transactions`):**
  - Read-only immutable transaction records audited directly from Stripe Checkout sessions.

### 5. Quality & Resilience
- **Global Loading State (`app/loading.tsx`):** Animated wood-fired oven spinning wheel with shimmer bar.
- **Global Error Boundary (`app/error.tsx`):** Graceful recovery screen with `reset()` action.
- **Custom 404 Not Found (`app/not-found.tsx`):** Giant bold `4 - 🍕 - 4` design with embedded search bar.
- **Brand Info Pages:** `/about` (The Wood-Fired Story) and `/contact` (24/7 hotline and contact form).

---

## 🛠️ Architecture & Tech Stack

```
pizzaHub (Monorepo Workspace)
├── pizzaHub/ (Next.js 16 Client)
│   ├── app/                      # App router pages (24 routes)
│   │   ├── (auth)                # Sign In & Sign Up pages
│   │   ├── dashboard/            # Role-guarded customer, vendor, admin dashboards
│   │   ├── menu/                 # Browse menu & protected item details
│   │   ├── payment/              # Stripe success & cancel return handlers
│   │   ├── about/, contact/      # Brand info & support pages
│   │   ├── error.tsx, loading.tsx# Global error boundary & oven loader
│   │   └── not-found.tsx         # Custom 404 page
│   ├── components/               # Caferio UI components, modals, navbar, footer
│   └── lib/                      # Better Auth client, JWT helpers, utilities
│
└── PizzaHub-Server/ (Express.js REST API)
    ├── routes/                   # Modular routes (auth, menu, orders, payment, admin, vendor)
    ├── middlewares/              # JWT verification & role authorization
    └── config/                   # MongoDB native driver client
```

### Technology Highlights:
- **Framework:** Next.js 16.4 (App Router & Turbopack)
- **Frontend Core:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, Lucide React
- **Notifications:** Sonner Toast Notifications
- **Backend API:** Node.js, Express.js (ES Modules)
- **Database:** MongoDB Atlas (Native MongoDB Node.js Driver)
- **Authentication:** Better Auth + Backend JWT Token Sync
- **Payments:** Stripe Checkout Sessions & Webhooks
- **Media Hosting:** ImgBB Multipart Upload API

---

## 🚀 Local Setup & Installation

### 1. Clone Repositories
```bash
git clone https://github.com/rabbihossen124/pizzaHub.git
cd pizzaHub
```

### 2. Configure Backend Server
```bash
cd ../PizzaHub-Server
npm install
```
Create a `.env` file in `PizzaHub-Server/`:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
DB_NAME=pizzaHubDB
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
CLIENT_URL=http://localhost:3000
```
Seed database with approved artisanal pizzas:
```bash
node seed.js
```
Start backend:
```bash
npm run dev
```

### 3. Configure Frontend Client
```bash
cd ../pizzaHub
npm install
```
Create a `.env` file in `pizzaHub/`:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_IMGBB_API_KEY=5f3cbbefddfa37f8e36209d997bb7615
```
Run Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Route Reference

| Method | Endpoint | Access | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/menu` | Public | Browse approved menu with search, category, location, and price sorting |
| `GET` | `/api/menu/featured` | Public | Retrieve top 6 featured menu items for homepage |
| `GET` | `/api/menu/:id` | Authenticated | Retrieve item details (enforces vendor/admin order restrictions) |
| `POST` | `/api/orders` | Customer | Place order with date validation and duplicate prevention |
| `GET` | `/api/orders/my-orders` | Customer | Retrieve customer order history with status metrics |
| `PATCH` | `/api/orders/:id/cancel`| Customer | Cancel pending order |
| `GET` | `/api/orders/vendor` | Vendor | Retrieve incoming kitchen orders |
| `PATCH`| `/api/orders/:id/status`| Vendor | Accept or reject pending order (single-action locked) |
| `POST` | `/api/payment/create-checkout-session` | Vendor | Create Stripe Checkout Session for $29 Premium plan |
| `POST` | `/api/payment/confirm-session` | Vendor | Immediate direct verification fallback for Stripe session |
| `GET` | `/api/admin/stats` | Admin | Platform overview metrics and cumulative revenue |
| `GET` | `/api/admin/users` | Admin | Search users and filter by role / block status |
| `PATCH`| `/api/admin/users/:id/block` | Admin | Block or unblock user account |
| `GET` | `/api/admin/menu` | Admin | Quality control queue for menu items |
| `PATCH`| `/api/admin/menu/:id/status` | Admin | Approve or reject submitted menu items |
| `GET` | `/api/admin/transactions` | Admin | Read-only immutable Stripe financial records |

---

## 📄 License & Assignment Verification

This project is submitted for **Programming Hero Assignment 9 (Category 009 — Pizza Ordering & Delivery Platform)**. Built with passion for culinary excellence and clean, production-grade code.
