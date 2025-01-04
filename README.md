# The Gallery
![image_2025-01-04_23-13-18](https://github.com/user-attachments/assets/c1b3f06f-6fc8-499f-a143-acf7d35142dc)

A modern, responsive image gallery application built with Next.js 15.

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Image Upload**: [UploadThing](https://uploadthing.com/)
- **Database**:
  - [Vercel Postgres](https://vercel.com/storage/postgres)
  - [Drizzle ORM](https://orm.drizzle.team/)
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Heroicons](https://heroicons.com/)
- **UI**:
  - [Framer Motion](https://www.framer.com/motion/) for animations
  - [Sonner](https://sonner.emilkowal.ski/) for toast notifications
  - [React Masonry CSS](https://www.npmjs.com/package/react-masonry-css) for grid layout

## Features

- **Routing & Navigation**:
  - Parallel routing for modal views
  - Server-side rendering
  - Dynamic image routes
  - Not Found page
  - Error boundary handling
- **Image Management**:
  - Secure image uploads using UploadThing
  - Ability to edit and delete images
  - Responsive masonry grid layout
- **User Experience**:
  - Dark/Light mode support
  - Smooth animations and transitions
  - Toast notifications for user feedback
- **Security & Performance**:
  - Secure authentication using Clerk
  - Server actions for data mutations
  - Type-safe API routes

## Getting Started

#### Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)
- [Vercel Postgres](https://vercel.com/storage/postgres) database
- [Clerk](https://clerk.com/) account for authentication
- [UploadThing](https://uploadthing.com/) account for image uploads

#### Running Locally
1. Clone the repository

```bash
git clone https://github.com/ytraddan/TheGallery
```

2. Install dependencies

```bash
pnpm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
# Database
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

4. Set up the database

```bash
pnpm db:push
```

5. Start the development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:push` - Push database schema changes
- `pnpm db:studio` - Open Drizzle Studio
