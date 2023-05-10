# Ngantri v2

## Installing

1. clone repo
2. open folder in vscode
3. in vscode terminal run `npm i`
4. install vscode extension: Prettier
5. run `npm i -g prettier`
6. create file `.env`, copy from `.env.example`
7. open terminal, run `openssl rand -base64 32`
8. copy the result to `.env` -> `NEXTAUTH_SECRET`
9. run `npm run pushdb`
10. start app `npm run dev`, open in browser localhost:3000

## Development

- start app `npm run dev`, open in browser localhost:3000
- for formatting and linting use `npm run format` (please run before commit)
- for linting without formatting use `npm run lint`
- database dashboard `npm run db`
- schema update `npm run pushdb`

## Note

- styling tailwind example here [Flowbite](https://flowbite.com/docs/components/forms/)
- commit sebanyak2nya
- pull request sedikit2nya
- test qr https://qrplanet.com/#text

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

7. **Make sure** on the right branch

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105677059692437575/image.png"/>
</p>

8. Code

9. Run `npm run lint` or `npm run format` and make sure all code no error

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105679437992820877/image.png"/>
</p>

10. Stage changed file

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105678091365384302/image.png"/>
</p>

11. Write descriptive commit message and commit

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105678687547961344/image.png"/>
</p>

12. Push commit, **make sure on the right branch**

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105679087453863988/image.png"/>
</p>

13. Github, open pull request

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105681236057407568/image.png"/>
</p>

14. Name: branch name, Write description, Reviewers: (minimal notwatermango), Assignees: you

<p align="center">
  <img src="https://cdn.discordapp.com/attachments/874108293218455565/1105682101761740891/image.png"/>
</p>

### read more:

- https://docs.github.com/en/get-started/quickstart/github-flow
- https://www.freecodecamp.org/news/how-to-use-git-and-github-in-a-team-like-a-pro/
