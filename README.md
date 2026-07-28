# Anas Portfolio

Muhammad Anas — AI Engineer Portfolio with Integrated Gemini Assistant

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Google Gemini API (gemini-2.0-flash)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set your Gemini API key in `.env.local`:
   ```
   GEMINI_API=your_key_here
   ```

3. Run dev server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Updating Content

All content is in `content.json` — no code changes needed for:
- Personal info, bio, tagline
- Skills and technologies
- Project details, tech stacks, GitHub links
- Experience and education

## Adding Your Resume

Place your PDF at: `public/resume.pdf`

It will be downloadable from the About section automatically.

## Deploying to Vercel

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add `GEMINI_API` environment variable in Vercel dashboard
4. Deploy — done!
