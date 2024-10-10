const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  console.log("RESPONSE STATUS:", res.status);
  console.log("RESPONSE OK:", res.ok);
  if (res.ok) {
    return res.json();
  } else {
    return res.json().then((data) => {
      console.error("Response Body:", data);
    throw new Error("Bad Response");
  });
}
};

export default class ExternalServices {
  constructor(category) {
  //   this.category = category;
  //   this.path = `../json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(baseURL + `products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    // const products = await this.getData();
    // return products.find((item) => item.Id === id);
    const response = await fetch(baseURL + `product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(baseURL + "checkout/", options).then(convertToJson);
  }
}