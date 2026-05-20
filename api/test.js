const stores = [

  {
    id: "coverchord",

    type: "shopify",

    baseUrl:
      "https://coverchord.com",

    collectionUrl:
      "https://coverchord.com/collections/"
  },

  {
    id: "arknets",

    type: "shopify",

    baseUrl:
      "https://www.arknets.co.jp",

    collectionUrl:
      "https://www.arknets.co.jp/goods_list/"
  },

  {
    id: "ciacura",

    type: "search",

    baseUrl:
      "https://shop.ciacura.jp",

    searchUrl:
      "https://shop.ciacura.jp/search?q="
  },

  {
    id: "digitalmountain",

    type: "html",

    baseUrl:
      "https://digital-mountain.net"
  }

];

export default async function handler(req, res) {

  try {

    const brand =
      req.query.brand || "comoli";

    const storeId =
      req.query.store || "coverchord";

    const store =
      stores.find(
        s => s.id === storeId
      );

    if(!store){

      return res.status(404).json({

        success: false,

        error: "store not found"

      });

    }

    if(store.id === "coverchord"){

      const url =

        `${store.collectionUrl}${brand}/products.json?limit=20`;

      const response =
        await fetch(url);

      const data =
        await response.json();

      const products =
        data.products.map(product => ({

          id:
            product.id,

          title:
            product.title,

          handle:
            product.handle,

          vendor:
            product.vendor,

          type:
            product.product_type,

          tags:
            product.tags,

          price:
            product.variants?.[0]?.price,

          image:
            product.images?.[0]?.src,

          variants:
            product.variants.map(v => ({

              id:
                v.id,

              title:
                v.title,

              sku:
                v.sku,

              available:
                v.available

            })),

          store:
            store.id

        }));

      return res.status(200).json({

        success: true,

        brand,

        store:
          store.id,

        type:
          store.type,

        count:
          products.length,

        products

      });

    }

    if(store.id === "arknets"){

      return res.status(200).json({

        success: true,

        store:
          store.id,

        type:
          store.type,

        message:
          "arknets prepared"

      });

    }

    if(store.type === "search"){

      return res.status(200).json({

        success: true,

        store:
          store.id,

        type:
          store.type,

        message:
          "search type store",

        searchUrl:
          `${store.searchUrl}${brand}`

      });

    }

    if(store.type === "html"){

      return res.status(200).json({

        success: true,

        store:
          store.id,

        type:
          store.type,

        message:
          "html scraping store"

      });

    }

  } catch (error) {

    res.status(500).json({

      success: false,

      error:
        error.message

    });

  }

}
