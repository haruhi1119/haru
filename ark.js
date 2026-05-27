export default async function handler(req, res) {

  const keyword = req.query.keyword || "";

  try {

    const searchUrl =
      `https://www.google.com/search?q=${encodeURIComponent(
        `site:arknets.co.jp ${keyword}`
      )}`;

    const response = await fetch(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0"
      }
    });

    const html = await response.text();

    const match =
      html.match(/https:\/\/www\.arknets\.co\.jp\/goods\/detail\/[^\"]+/);

    if (!match) {

      return res.status(200).json({
        success: false,
        url: null
      });

    }

    return res.status(200).json({
      success: true,
      url: match[0]
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
