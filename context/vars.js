export const points = [20, 40, 60, 80, 100];

export const routes = [
  { name: "Profile", route: "/profile" },
  { name: "History", route: "/history" },
  { name: "Offers", route: "/offers" },
  { name: "Sign Out", route: "/offers" },
  /**
   * {
    name: 'History', route: '/history',
    list: [
      { name: 'Uploads', route: '/history' },
      { name: 'Coupons', route: '/history' },
    ]
  },
   */
];

export const recyclables = [
  {
    name: "soda bottle",
    value: "1p/pc",
    points: 1,
    back: "pink",
    recycleCat: "plastic",
  },
  {
    name: "cooking oil bottle",
    value: "1p/pc",
    points: 1,
    back: "yellow",
    recycleCat: "plastic",
  },

  {
    name: "wine",
    value: "2p/pc",
    points: 2,
    back: "pink",
    recycleCat: "glass",
  },
  {
    name: "beer bottle",
    value: "2p/pc",
    points: 2,
    back: "yellow",
    recycleCat: "glass",
  },

  {
    name: "phone",
    value: "50p/pc",
    points: 50,
    back: "green",
    recycleCat: "electronics",
  },
  {
    name: "computer",
    value: "20p/pc",
    points: 20,
    back: "yellow",
    recycleCat: "electronics",
  },
  {
    name: "screens",
    value: "10p/pc",
    points: 10,
    back: "blue",
    recycleCat: "electronics",
  },
];

export const prodCategories = [
  {
    name: "soda bottle",
    sizes: ["500ml", "1 Litre", "2 litre"],
  },
  {
    name: "cooking oil bottle",
    sizes: ["1 Litre", "5 Litre", "10 Litre"],
  },
  {
    name: "beer bottle",
    sizes: ["330ml", "500ml"],
  },
  {
    name: "wine",
    sizes: ["750ml", "1 Litre"],
  },
  {
    name: "phone",
    sizes: ["Kabambe", "Smartphone"],
  },
  {
    name: "computer",
    sizes: ["Laptop", "Desktop (PC)"],
  },
  {
    name: "screens",
    sizes: ["Monitor", "Television"],
  },
];

export const prodPhotos = [
  {
    name: "soda bottle",
    image: "soda.webp",
  },
  {
    name: "cooking oil bottle",
    image: "oil.png",
  },
  {
    name: "wine",
    image: "wine.webp",
  },
  {
    name: "beer bottle",
    image: "beer.webp",
  },
  {
    name: "phone",
    image: "smartphone.png",
  },
  {
    name: "computer",
    image: "laptop.png",
  },
  {
    name: "screens",
    image: "screens.webp",
  },
];
