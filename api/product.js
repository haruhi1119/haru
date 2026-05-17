export default async function handler(req, res) {

  try {

    const handle = req.query.handle;

    const response = await fetch(
      `https://coverchord.com/products/${handle}.js`
    );

    const product = await response.json();

    const sizes = product.variants.map(variant => {

      return {
        title: variant.title,
        available: variant.available
      };

    });

    res.status(200).json({
      success: true,
      title: product.title,
      sizes
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }

}
