export default async function handler(req, res) {

  const keyword = req.query.keyword || "";

  try {

    const url =
      `https://www.arknets.co.jp/goods_list/?keyword=${encodeURIComponent(keyword)}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0"
      }
    });

    const html = await response.text();

    return res.status(200).send(html);

  } catch (error) {

    return res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
