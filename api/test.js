export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://coverchord.com/collections/comoli"
    );

    const html = await response.text();

    const matches = [
      ...html.matchAll(/"title":"(.*?)"/g)
    ];

    const products = matches
      .slice(0, 20)
      .map(item => item[1]);

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
