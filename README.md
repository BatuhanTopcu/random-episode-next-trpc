## Deploy

Web: [https://random-episode.vercel.app/](https://random-episode.vercel.app/)

Github: https://github.com/BatuhanTopcu/random-episode-next-trpc

## Stack

- NextJS
- tRPC
- Prisma
- NextAuth

## Environment Variables

- **DATABASE_URL**
  PlanetScale mysql:// url
- **SHADOW_DATABASE_URL**
  New branch for main table, needed for PlanetScale → prisma connection
- **GOOGLE_CLIENT_SECRET**
- **GOOGLE_CLIENT_ID**
- **NEXTAUTH_SECRET**
  Needed for cashing user emails
- **NEXTAUTH_URL**
  Not needed if you deploy on Vercel
- **TMDB_API_KEY**
- **TMDB_API_URL**
  Idk why I made it env var, set it to [https://api.themoviedb.org/3](https://api.themoviedb.org/3)

## Todo

- [x] Port App to T3 Stack
- [x] Deploy on Vercel
- [x] Deploy db on PlanetScale
- [x] Auth + DB logic
- [x] Google login
- [x] Sync between local storage and db
- [x] Write Github Readme
- [ ] Clear DB if user not logged in for certain days
- [ ] Add watched episodes logic for logged users
      Needs redesign for episode cards
