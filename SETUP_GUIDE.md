# Anas Portfolio Website - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 18+ installed
- GitHub account
- Vercel account (free)
- Claude API key (for Anas Assistant)

---

## Step 1: Create a Next.js Project

```bash
npx create-next-app@latest anas-portfolio --typescript --tailwind
cd anas-portfolio
```

Select these options:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: Yes
- App Router: Yes

---

## Step 2: Install Dependencies

```bash
npm install lucide-react framer-motion
```

---

## Step 3: Add Portfolio Files

### 3a. Copy the Portfolio Component

Replace `app/page.tsx` with the portfolio website code from `portfolio-website.jsx` (convert JSX to TSX if needed):

```bash
# Copy the portfolio-website.jsx content into app/page.tsx
```

### 3b. Add Content Management

Create `public/content.json` with the portfolio data:

```bash
# Copy content.json into the public/ directory
```

The JSON file will be automatically served and can be updated anytime.

### 3c. Update Global Styles

In `app/globals.css`, ensure Tailwind is set up:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Optional: Add custom animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

---

## Step 4: Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CLAUDE_API_KEY=your_claude_api_key_here
```

**Get your Claude API key:**
1. Go to https://console.anthropic.com/
2. Log in or create account
3. Go to "API Keys" section
4. Create new API key
5. Copy and paste into `.env.local`

---

## Step 5: Update the Chat Assistant (Optional - Enhanced Version)

For real Claude integration instead of hardcoded responses, update the chat handler in `app/page.tsx`:

```typescript
const handleSendMessage = async (text: string) => {
  // ... existing code ...

  // Call Claude API
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.NEXT_PUBLIC_CLAUDE_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-opus-4-1',
      max_tokens: 1024,
      system: `You are Anas Assistant, representing Muhammad Anas - an AI Engineer. 
      ${JSON.stringify(portfolioData.assistantKnowledge)}
      Be helpful, professional, and direct. Answer questions about projects, skills, and collaboration.`,
      messages: [
        { role: 'user', content: text }
      ]
    })
  });

  const data = await response.json();
  const assistantMessage = {
    id: messages.length + 1,
    text: data.content[0].text,
    sender: 'assistant',
    timestamp: new Date()
  };
  // ... rest of code ...
};
```

---

## Step 6: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see:
- Beautiful gradient hero section
- Projects showcase
- Skills section
- Chat assistant (floating button)
- About & contact sections

---

## Step 7: Deploy to Vercel

### Option A: Using GitHub (Recommended)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial portfolio setup"
git branch -M main
git remote add origin https://github.com/your-username/anas-portfolio.git
git push -u origin main
```

2. **Connect to Vercel**
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repo
   - Click "Import"

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_CLAUDE_API_KEY` = `your_api_key`
   - Redeploy

### Option B: Using Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts, it's intuitive!
```

---

## Step 8: Custom Domain (Optional)

In Vercel dashboard:
1. Go to your project settings
2. Domains section
3. Add custom domain (or connect from Namecheap/GoDaddy)
4. Follow DNS setup instructions

---

## 📝 How to Update Your Portfolio

### Update Personal Info
1. Open `public/content.json`
2. Modify `personal` section:
```json
"personal": {
  "name": "Muhammad Anas",
  "bio": "Your new bio here"
}
```
3. Save and redeploy

### Add a New Project
1. Open `public/content.json`
2. Add to `projects` array:
```json
{
  "id": "new-project",
  "title": "Project Name",
  "subtitle": "Brief description",
  "description": "...",
  "duration": "Dates",
  "techStack": ["Tech1", "Tech2"],
  "achievements": ["Achievement 1", "Achievement 2"],
  "impact": "Real-world impact",
  "github": "https://github.com/..."
}
```
3. Save and redeploy

### Update Skills
```json
"skills": {
  "languages": ["Python", "SQL", "NewLanguage"],
  "ml_ai": ["PyTorch", "NewFramework"],
  // ... etc
}
```

### Redeploy After Changes
```bash
git add public/content.json
git commit -m "Update portfolio: add new project"
git push origin main
# Vercel auto-deploys!
```

---

## 🎨 Customization

### Change Color Scheme

Edit color variables in the component (search for `from-cyan-400`, `to-pink-500`):

```typescript
// Change Cyan to Purple
from-cyan-400 → from-purple-400
to-pink-500 → to-indigo-500
```

Or use Tailwind's default colors: `slate`, `gray`, `blue`, `purple`, `pink`, `red`, etc.

### Change Chat Assistant Responses

Edit the `responses` object in `handleSendMessage`:

```typescript
const responses = {
  'findify': 'Your custom response here...',
  'skills': 'New skills response...',
  'default': 'Fallback response...'
};
```

### Modify Hero Section

Edit the hero content in the JSX:

```typescript
<h1>Your headline here</h1>
<p>Your tagline here</p>
```

---

## 🔒 Security Notes

1. **Never commit API keys**—always use environment variables
2. **Rate-limit the Claude API** to avoid unexpected charges
3. **Validate user input** in production chat (implement on backend)
4. **Consider backend proxy** for sensitive operations

---

## 📊 Analytics (Optional)

Add Vercel Analytics:

```bash
npm install @vercel/analytics
```

In `app/page.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function Portfolio() {
  return (
    <>
      {/* Your content */}
      <Analytics />
    </>
  );
}
```

---

## ✅ Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] `content.json` pushed to GitHub
- [ ] Website live and working
- [ ] Chat assistant responds
- [ ] Mobile view looks good
- [ ] All links work (GitHub, LinkedIn, email)
- [ ] Custom domain set (if using)
- [ ] Analytics enabled (optional)

---

## 🆘 Troubleshooting

### Chat not working?
- Check `NEXT_PUBLIC_CLAUDE_API_KEY` is set in Vercel
- Verify API key is valid at https://console.anthropic.com/
- Check browser console for errors

### Images not loading?
- Ensure images are in `public/` directory
- Use relative paths like `/images/filename.png`

### Styling looks off?
- Run `npm run build` locally to catch Tailwind errors
- Clear browser cache (Ctrl+Shift+Del)

### Deployment fails?
- Check Vercel logs for build errors
- Ensure all dependencies are in `package.json`
- Try `npm install` and `npm run build` locally first

---

## 📞 Support

**For Vercel issues:** https://vercel.com/docs  
**For Next.js help:** https://nextjs.org/docs  
**For Claude API:** https://docs.anthropic.com/  

---

## 🎉 You're Done!

Your portfolio is live and fully customizable without touching code. Every time you update `content.json` and push to GitHub, Vercel automatically redeploys.

**Update your portfolio, showcase your work, and let the Anas Assistant impress visitors. Good luck! 🚀**
