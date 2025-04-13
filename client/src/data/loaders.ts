import qs from "qs";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { fetchAPI } from "@/utils/fetch-api";

const BASE_URL = getStrapiURL();

export async function getProductBySlug(slug: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      image: {
        fields: "url",
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getCategories(path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    populate: {
      image: {
        fields: "url",
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getProductsFilterByCategory(
  category: string,
  path: string
) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      category: {
        $eq: category,
      },
    },
    populate: {
      image: {
        fields: "url",
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function getProducts(path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    populate: {
      image: {
        fields: "url",
      },
    },
  });

  return fetchAPI(url.href, { method: "GET" });
}

export async function fetchCart(userId: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      userId: {
        $eq: userId,
      },
    },
    populate: {
      product: {
        fields: ["name", "price", "isPreOrder"],
        populate: {
          image: {
            fields: ["url"],
          },
        },
      },
    },
  });
  return fetchAPI(url.href, { method: "GET" });
}

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number,
  path: string
) {
  const url = new URL(path, BASE_URL);
  return fetchAPI(url.href, {
    method: "POST",
    body: {
      data: {
        userId: userId,
        product: productId,
        quantity: quantity,
      },
    },
  });
}

export async function updateCart(
  cartId: string,
  quantity: number,
  path: string
) {
  const url = new URL(`${path}/${cartId}`, BASE_URL);
  return fetchAPI(url.href, {
    method: "PUT",
    body: {
      data: {
        quantity: quantity,
      },
    },
  });
}

export async function removeFromCart(cartId: string, path: string) {
  const url = new URL(`${path}/${cartId}`, BASE_URL);
  return fetchAPI(url.href, {
    method: "DELETE",
  });
}
