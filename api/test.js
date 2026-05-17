export default async function handler(req, res) {

  try {

    const response = await fetch(
      "https://coverchord.com/collections/comoli/products.json?limit=20"
    );

    const data = await response.json();

    const products = data.products.map(product => ({
      title: product.title,
      handle: product.handle,
      price: product.variants?.[0]?.price,
      image: product.images?.[0]?.src
    }));

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
