# Ngantri v2

## Installing

1. clone repo
2. open repo in vscode
3. run `npm i`
4. install vscode extension: Prettier
5. run `npm i -g prettier`
6. run `npm run pushdb`
7. create file `.env`, copy from `.env.example`
8. open terminal, run `openssl rand -base64 32`
9. copy the result to `.env` -> `NEXTAUTH_SECRET`

## Development

- start app `npm run dev`, open in browser localhost:3000
- for formatting and linting use `npm run format` (please run before commit)
- for linting without formatting use `npm run lint`
- database dashboard `npm run db`
- schema update `npm run pushdb`

## How to contribute

- https://docs.github.com/en/get-started/quickstart/github-flow
- https://www.freecodecamp.org/news/how-to-use-git-and-github-in-a-team-like-a-pro/

## Styling

- tailwind example here [Flowbite](https://flowbite.com/docs/components/forms/)

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
