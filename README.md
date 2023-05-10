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

## Styling

- tailwind example here [Flowbite](https://flowbite.com/docs/components/forms/)

## Stack

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## How to contribute (vscode)

1. Go to issues
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105673222227238912/image.png"/>
</p>

2. Create/select issue
3. Assign yourself
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105674779618455592/image.png"/>
</p>

![]()

4. Create branch
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105673446265999402/image.png"/>
</p>
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105673580123004960/image.png"/>
</p>

5. VSCode -> Source Control -> Fetch
<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105676094079770735/image.png"/>
</p>

6. Checkout branch

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105676322178613359/image.png"/>
</p>

7. **Make sure** on the right branch before commits

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105677059692437575/image.png"/>
</p>

8. Stage changed file

9. Write descriptive commit message and commit
10.

### read more:

- https://docs.github.com/en/get-started/quickstart/github-flow
- https://www.freecodecamp.org/news/how-to-use-git-and-github-in-a-team-like-a-pro/
