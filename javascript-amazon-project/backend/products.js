class Products {
  id;
  image;
  name;
  rating;
  priceCents;

  constructor(productDatails) {
    this.id = productDatails.id;
    this.image = productDatails.image;
    this.name = productDatails.name;
    this.rating = productDatails.rating;
    this.priceCents = productDatails.priceCents;
  }
}

const product1 = new Products({
  id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  image: "images/products/athletic-cotton-socks-6-pairs.jpg",
  name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
  rating: {
    stars: 4.5,
    count: 87
  },
  priceCents: 1090,
  keywords: [
    "socks",
    "sports",
    "apparel"
  ]
});
console.log(product1);