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
https://your-domain.vercel.app/go?v=VIDEO_ID
https://your-domain.vercel.app/go?url=https://youtu.be/VIDEO_ID
https://your-domain.vercel.app/v/VIDEO_ID
```

Supports all YouTube URL formats: `youtu.be/`, `youtube.com/watch?v=`, `/shorts/`, `/live/`, `/embed/`.

## Deploy

### Vercel (recommended — free forever, no credit card)

1. Fork this repo on GitHub
2. Go to [vercel.com](https://vercel.com) → Sign up with GitHub (free)
3. Click **Add New Project** → import your fork
4. Leave all settings as default → click **Deploy**
5. Done. Your URL is in the Vercel dashboard (e.g. `yt-deeplink.vercel.app`)

Vercel's free Hobby plan has no time limit and no shutdown. Serverless functions only run on-demand so you stay well within free limits even with high traffic.

### Render / Fly.io / any Node host

```bash
npm install
npm start
```

Set `PORT` env var if needed (defaults to 3000).

### Self-host (VPS)

```bash
git clone https://github.com/YOUR_USERNAME/YT-Deeplink
cd YT-Deeplink
npm install
node src/server.js
```

## Project structure

```
YT-Deeplink/
├── api/
│   └── go.js          ← serverless redirect function (Vercel)
├── public/
│   └── index.html     ← the website frontend
├── vercel.json        ← Vercel routing config
├── package.json
└── README.md
```

## Local development

```bash
npm install
npm run dev   # uses node --watch, no nodemon needed
```

Then open http://localhost:3000

## License

MIT — free to use, fork, and self-host.
