# Ngantri‑Web 🚀

A simple queue-management web app for customers and merchants, built with modern technologies and a serverless-first approach.

## About

**Ngantri v2** aims to streamline the queuing process in businesses by providing:

- Customers with an easy way to **join and check queue status**
- Merchants with tools to **manage queues and serve customers**
- A lightweight, fast-reacting **web interface focused on productivity**

## Features

- User authentication (via email, social login, or OTP)
- Two distinct roles: **Merchant** & **Customer**
- Real-time queue management (tRPC + WebSockets)
- Cancel, pause, or mark queue entries as completed
- Mobile-first UI—works great on small screens with Tailwind CSS

## Tech Stack

**Frontend:** Next.js, React, Tailwind CSS  
**Backend:** tRPC, Prisma ORM, Node.js  
**Auth:** NextAuth.js (JWT / OAuth)  
**Database:** PostgreSQL / MySQL / SQLite via Prisma  
**Deployment:** Vercel  
**Form Handling:** react-hook-form + Zod

## Demo

Live demo: 

![live demo merchant](https://youtube.com/shorts/z7jiacSWwbY?feature=share)
![live demo customer](https://youtube.com/shorts/-zdLR_DmMnA?feature=share)
Screenshot preview:
![ng1](https://github.com/user-attachments/assets/add8ad70-7850-469c-b7bb-8aa32a37753d)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js v18+ (or latest LTS)
- npm v9+ or Yarn v1.22+
- PostgreSQL / MySQL (or use SQLite locally)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/notwatermango/ngantri-web.git
   cd ngantri-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Then, edit `.env` to configure:

   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - Any OAuth credentials (optional)

4. **Apply Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## Usage

- **Merchants** can sign in, create business profiles, open queues, and serve customers in order.
- **Customers** can sign in, join queues at a selected business, and get real-time updates on their queue status.
