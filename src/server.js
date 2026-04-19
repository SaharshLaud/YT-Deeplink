const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "../public")));

// Extract YouTube video ID from any YT URL format
function extractVideoId(url) {
  try {
    const u = new URL(url);
    // youtu.be/ID
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    // youtube.com/watch?v=ID
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    // youtube.com/shorts/ID  or  /embed/ID  or  /live/ID
    const match = u.pathname.match(/\/(shorts|embed|live|v)\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[2];
  } catch {}
  return null;
}

// /go?v=VIDEO_ID or /go?url=FULL_YT_URL
app.get("/go", (req, res) => {
  const { v, url } = req.query;
  let videoId = v || (url ? extractVideoId(url) : null);

  if (!videoId) {
    return res.redirect("/?error=invalid");
  }

  const ua = req.headers["user-agent"] || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    // iOS YouTube deep link — opens app directly
    return res.redirect(`vnd.youtube://${videoId}`);
  }

  if (isAndroid) {
    // Android intent URL — opens YouTube app, falls back to browser
    const intent = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
    return res.redirect(intent);
  }

  // Desktop / unknown — go straight to YouTube
  return res.redirect(`https://www.youtube.com/watch?v=${videoId}`);
});

// Shorthand: /v/VIDEO_ID
app.get("/v/:id", (req, res) => {
  res.redirect(`/go?v=${req.params.id}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`YT Deep Link running on port ${PORT}`);
});
