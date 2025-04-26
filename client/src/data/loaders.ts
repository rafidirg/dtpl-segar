import qs from "qs";
import { getStrapiURL } from "@/utils/get-strapi-url";
import { fetchAPI } from "@/utils/fetch-api";

const BASE_URL = getStrapiURL();

export async function login(email: string, password: string) {
  const url = `${getStrapiURL()}/api/auth/local`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? "Invalid email or password");
  }

  localStorage.setItem("userEmail", email);

  return response.json();
}

export async function registerUser({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) {
  const url = `${getStrapiURL()}/api/auth/local/register`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      username: username,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? "Registration failed");
  }

  return response.json();
}

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
        fields: ["name", "price", "isPreOrder", "cold_storage"],
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

export async function fetchOrder(userId: string, path: string) {
  const url = new URL(path, BASE_URL);
  url.search = qs.stringify({
    filters: {
      userId: {
        $eq: userId,
      },
    },
  });
  return fetchAPI(url.href, { method: "GET" });
}

export async function addOrder(
  userId: string,
  alamat: string,
  lat: number,
  long: number,
  status_order: string,
  path: string
) {
  const url = new URL(path, BASE_URL);
  return fetchAPI(url.href, {
    method: "POST",
    body: {
      data: {
        userId: userId,
        alamat: alamat,
        lat: lat,
        long: long,
        status_order: status_order,
      },
    },
  });
}
