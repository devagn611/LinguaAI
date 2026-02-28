# Deployment Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Set environment variables:**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

## Vercel Deployment

### Option 1: Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Set the environment variable `NEXT_PUBLIC_API_URL` in the Vercel dashboard
4. Deploy!

### Option 2: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

3. Set environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   ```

4. Deploy to production:
   ```bash
   vercel --prod
   ```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | Yes |

## Build Commands

```bash
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run linter
npm run type-check  # TypeScript checking
```

## Production Checklist

- [ ] Set `NEXT_PUBLIC_API_URL` environment variable
- [ ] Verify backend API is accessible
- [ ] Test translation functionality
- [ ] Check mobile responsiveness
- [ ] Verify error handling works
- [ ] Test loading states
- [ ] Check accessibility (keyboard navigation, screen readers)

## Troubleshooting

### Build Errors

If you encounter build errors:
1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check TypeScript errors: `npm run type-check`

### API Connection Issues

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Verify backend is running and accessible
- Check browser console for errors

### Performance Issues

- Enable Next.js production optimizations
- Check bundle size with `npm run build`
- Use Next.js Image component for any images
- Enable compression in `next.config.js`
