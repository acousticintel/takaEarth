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
    cat: "plastic",
    types: [
      {
        name: "soda bottle",
        value: "10p/pc",
        back: "pink",
      },
      {
        name: "cooking oil bottle",
        value: "20p/pc",
        back: "yellow",
      },
    ],
  },
  {
    cat: "glass",
    types: [
      {
        name: "wine",
        value: "10p/pc",
        back: "green",
      },
      {
        name: "beer bottle",
        value: "20p/pc",
        back: "yellow",
      },
    ],
  },
  {
    cat: "electronics",
    types: [
      {
        name: "phone",
        value: "100p/pc",
        back: "green",
      },
      {
        name: "laptop",
        value: "500p/pc",
        back: "yellow",
      },
    ],
  },
];

export const prodSizes = [
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
    sizes: ["750ml","1 Litre"],
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
    name: "laptop",
    image: "laptop.png",
  },
];
