export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://coverchord.com/collections/comoli"
    );

    const html = await response.text();

    res.status(200).json({
      success: true,
      length: html.length,
      preview: html.slice(0, 1000)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
