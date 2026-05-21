export default async function handler(req, res) {

  const {
    brand = "comoli",
    store = "coverchord"
  } = req.query;

  const stores = {

    coverchord: {
      type: "shopify",
      url:
        "https://coverchord.com/products.json?limit=250"
    },

    ciacura: {
      type: "search",
      searchUrl:
        `https://shop.ciacura.jp/search?q=${brand}`
    },

    arknets: {
      type: "shop",
      searchUrl:
        "https://www.arknets.co.jp/"
    }

  };

  const targetStore =
    stores[store];

  if(!targetStore){

    return res.status(404).json({
      error: "store not found"
    });

  }

  if(targetStore.type !== "shopify"){

    return res.status(200).json({

      success: true,

      store,

      type: targetStore.type,

      searchUrl:
        targetStore.searchUrl

    });

  }

  try{

    const response =
      await fetch(
        targetStore.url
      );

    const data =
      await response.json();

    const products =
      data.products.filter(product => {

        const text = [

          product.title,

          product.vendor,

          ...(product.tags || [])

        ]
        .join(" ")
        .toLowerCase();

        return text.includes(
          brand.toLowerCase()
        );

      });

    return res.status(200).json({

      success: true,

      store,

      type: "shopify",

      count: products.length,

      products

    });

  }catch(error){

    return res.status(500).json({

      error: error.message

    });

  }

}
