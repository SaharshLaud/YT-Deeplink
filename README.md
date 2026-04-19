# YT Deep Link

Open YouTube links directly in the YouTube app — built for Instagram story creators.

No login. No ads. No cooldown. Just paste and share.

## How it works

When someone taps your link:
- **iOS** → fires `vnd.youtube://VIDEO_ID` (opens YouTube app instantly)
- **Android** → fires an `intent://` URL that launches the YouTube app
- **Desktop** → redirects to `youtube.com` normally

## Usage

**Generate a link on the website:**
Paste your YouTube URL → copy the generated link → drop it in your Insta story sticker.

**Direct link format** (for power users):
```
https://your-domain.com/go?v=VIDEO_ID
https://your-domain.com/go?url=https://youtu.be/VIDEO_ID
https://your-domain.com/v/VIDEO_ID
```

Supports all YouTube URL formats: `youtu.be/`, `youtube.com/watch?v=`, `/shorts/`, `/live/`, `/embed/`.

## Deploy

### Railway (recommended — free tier available)
1. Fork this repo on GitHub
2. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
3. Select your fork — Railway auto-detects Node.js and deploys
4. Done. Your URL is in the Railway dashboard.

### Vercel
```bash
npm i -g vercel
vercel
```

### Render / Fly.io / any Node host
```bash
npm install
npm start
```

Set `PORT` env var if needed (defaults to 3000).

### Self-host (VPS)
```bash
git clone https://github.com/YOUR_USERNAME/yt-deeplink
cd yt-deeplink
npm install
node src/server.js
```

## Local development
```bash
npm install
npm run dev   # uses node --watch, no nodemon needed
```
Then open http://localhost:3000

## License
MIT — free to use, fork, and self-host.
