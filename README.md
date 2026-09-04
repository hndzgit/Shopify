<div align="center">

# Lumina Luxury Storefront & Admin

### A premium headless Shopify experience with commerce management and interactive 3D visuals

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Lumina-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://shopify-zeta-nine.vercel.app)
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![Shopify](https://img.shields.io/badge/Shopify-7AB55C?style=flat-square&logo=shopify&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat-square&logo=threedotjs&logoColor=white)

</div>

## Overview

**Lumina** is a high-end headless Shopify storefront paired with a built-in administration experience. It combines modern commerce workflows, a cinematic interface, and interactive 3D product presentation in one Next.js application.

## Highlights

- Headless Shopify storefront powered by the Storefront API.
- Built-in admin dashboard using Shopify Admin API integrations.
- Interactive 3D product experiences with React Three Fiber.
- Product browsing, cart state, and commerce-focused user flows.
- Responsive premium UI with motion and visual depth.
- Authentication support for protected administration routes.
- Typed GraphQL communication and centralized state management.

## Tech Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Commerce | Shopify Storefront API, Shopify Admin API, GraphQL |
| 3D | Three.js, React Three Fiber, Drei |
| UI | Tailwind CSS 4, Framer Motion |
| State | Zustand |
| Authentication | NextAuth |

## Getting Started

### Prerequisites

- Node.js 20 or newer
- A Shopify store with the required API access
- Storefront and Admin API credentials

### Installation

~~~bash
git clone https://github.com/hndzgit/Shopify.git
cd Shopify
npm install
cp .env.example .env.local
~~~

Configure <code>.env.local</code>:

| Variable | Purpose | Visibility |
|---|---|---|
| <code>SHOPIFY_STORE_DOMAIN</code> | Shopify store domain | Server |
| <code>SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> | Storefront API access | Server |
| <code>PUBLIC_STOREFRONT_API_VERSION</code> | Shopify API version | App config |
| <code>SHOPIFY_ADMIN_ACCESS_TOKEN</code> | Admin API access | Secret |
| <code>AUTH_SECRET</code> | Authentication signing secret | Secret |
| <code>ADMIN_USERNAME</code> | Admin sign-in username | Secret |
| <code>ADMIN_PASSWORD</code> | Admin sign-in password | Secret |
| <code>APP_URL</code> | Server-side application URL | Server |
| <code>NEXT_PUBLIC_APP_URL</code> | Public application URL | Public |

Run the application:

~~~bash
npm run dev
~~~

Visit <http://localhost:3000>.

## Scripts

| Command | Description |
|---|---|
| <code>npm run dev</code> | Start the development server |
| <code>npm run build</code> | Build the production application |
| <code>npm run start</code> | Start the production server |
| <code>npm run lint</code> | Run the configured lint command |

## Security Notes

Shopify Admin credentials, authentication secrets, and administrator passwords must only be stored in environment variables. Never expose them in client-side code or commit them to the repository.

## Live Demo

Explore the deployed storefront at **[shopify-zeta-nine.vercel.app](https://shopify-zeta-nine.vercel.app)**.

---

<div align="center">
Designed and developed by <a href="https://github.com/hndzgit">Nam Hoai</a>
</div>
