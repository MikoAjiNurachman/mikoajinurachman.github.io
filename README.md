# Portfolio Website - Miko Aji Nurachman

A modern 3D portfolio website built with Next.js, React Three Fiber, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16
- **3D Graphics:** React Three Fiber + Three.js
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/mikoajinurachman/mikoajinurachman.github.io.git
   cd mikoajinurachman.github.io
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open browser:** Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

\`\`\`
├── app/
│   ├── globals.css       # Global styles & design tokens
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page component
├── components/
│   ├── about-section.tsx
│   ├── certificates-section.tsx
│   ├── contact-section.tsx
│   ├── experience-section.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navbar.tsx
│   ├── projects-section.tsx
│   ├── scroll-to-top.tsx
│   └── skills-section.tsx
├── public/
│   ├── favicon.svg       # Site favicon
│   ├── profile.jpg       # Your profile photo (add this!)
│   └── robots.txt
└── .github/
    └── workflows/
        └── deploy.yml    # GitHub Actions for deployment
\`\`\`

## Customization

### 1. Update Personal Info

Edit the following files to add your information:

- **`components/hero-section.tsx`** - Name, title, social links
- **`components/about-section.tsx`** - Bio and description
- **`components/experience-section.tsx`** - Work experience
- **`components/skills-section.tsx`** - Technical skills
- **`components/projects-section.tsx`** - Your projects
- **`components/certificates-section.tsx`** - Certifications
- **`components/contact-section.tsx`** - Contact info

### 2. Add Profile Photo

Replace placeholder with your photo:
\`\`\`
public/profile.jpg
\`\`\`

### 3. Update Metadata

Edit `app/layout.tsx` to update SEO metadata.

## Deploy to GitHub Pages

### Option 1: Automatic (Recommended)

1. **Create GitHub repository:**
   - For user site: `yourusername.github.io`
   - For project site: any repo name

2. **Push code to GitHub:**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   \`\`\`

3. **Enable GitHub Pages:**
   - Go to repo Settings > Pages
   - Source: **GitHub Actions**

4. **Done!** The site will auto-deploy on every push to `main`.

### Option 2: Manual Build

1. **Build the project:**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Output folder:** `out/` contains static files

3. **Deploy** the `out/` folder to any static hosting.

### For Project Sites (Not username.github.io)

If your repo is NOT `username.github.io`, uncomment basePath in `next.config.mjs`:

\`\`\`js
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/your-repo-name", // Uncomment and change this
}
\`\`\`

## Assets to Add

Before deploying, add these files to `/public`:

| File | Description |
|------|-------------|
| `profile.jpg` | Your profile photo (recommended: 400x400px) |
| `favicon.ico` | Browser tab icon |
| `apple-icon.png` | Apple touch icon (180x180px) |

## Build Commands

\`\`\`bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
\`\`\`

## License

MIT License - Feel free to use this template for your own portfolio!

---

Built with Next.js and React Three Fiber
