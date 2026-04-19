function extractVideoId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1).split("?")[0];
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const match = u.pathname.match(/\/(shorts|embed|live|v)\/([a-zA-Z0-9_-]{11})/);
    if (match) return match[2];
  } catch {}
  return null;
}

export default function handler(req, res) {
  const { v, url } = req.query;
  const videoId = v || (url ? extractVideoId(url) : null);

  if (!videoId) {
    return res.redirect("/?error=invalid");
  }

  const ua = req.headers["user-agent"] || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  if (isIOS) {
    return res.redirect(`vnd.youtube://${videoId}`);
  }

  if (isAndroid) {
    const intent = `intent://www.youtube.com/watch?v=${videoId}#Intent;package=com.google.android.youtube;scheme=https;end`;
    return res.redirect(intent);
  }

  return res.redirect(`https://www.youtube.com/watch?v=${videoId}`);
}
