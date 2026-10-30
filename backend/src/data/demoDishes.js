// Original seed dishes, independent of the client-side visual preview catalog.
const photo=id=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`;
const rows=[
  [
    "Truffle Mushroom Pizza",
    "Stone-baked crust, garlic confit, mozzarella, wild mushrooms",
    "Pizza",
    18.9,
    "photo-1574071318508-1cdbab80d002",
    true,
    true
  ],
  [
    "Hot Honey Pepperoni",
    "Signature pepperoni, basil, hot honey and slow-rise dough",
    "Pizza",
    19.5,
    "photo-1565299624946-b28f40a0ae38",
    true,
    false
  ],
  [
    "Margherita Classica",
    "San Marzano tomato, buffalo mozzarella and fresh basil",
    "Pizza",
    15.9,
    "photo-1579751626657-72bc17010498",
    false,
    true
  ],
  [
    "Smoky BBQ Chicken",
    "Charred chicken, smoked barbecue sauce, sweet onions",
    "Pizza",
    20.9,
    "photo-1513104890138-7c749659a591",
    false,
    false
  ],
  [
    "The Smash Classic",
    "Double beef patty, melting cheddar, house sauce, pickles",
    "Burgers",
    14.5,
    "photo-1568901346375-23c9450c58cd",
    true,
    false
  ],
  [
    "Crispy Chicken Deluxe",
    "Buttermilk fried chicken, slaw and spicy mayo",
    "Burgers",
    13.9,
    "photo-1606755962773-d324e0a13086",
    true,
    false
  ],
  [
    "Garden Green Burger",
    "Chickpea patty, creamy herb sauce, tomato and lettuce",
    "Burgers",
    13.5,
    "photo-1520072959219-c595dc870360",
    false,
    true
  ],
  [
    "Teriyaki Salmon Bowl",
    "Sesame rice, salmon, crisp cucumber and ginger dressing",
    "Bowls",
    17.9,
    "photo-1467003909585-2f8a72700288",
    true,
    false
  ],
  [
    "Mediterranean Grain Bowl",
    "Lemon quinoa, hummus, roasted vegetables and feta",
    "Bowls",
    15.9,
    "photo-1512621776951-a57141f2eefd",
    true,
    true
  ],
  [
    "Spicy Chicken Rice Bowl",
    "Chili garlic chicken, steamed rice and pickled slaw",
    "Bowls",
    16.4,
    "photo-1546069901-ba9599a7e63c",
    false,
    false
  ],
  [
    "Creamy Pesto Penne",
    "Basil pesto, parmesan, cherry tomato and toasted pine nuts",
    "Pasta",
    16.5,
    "photo-1473093295043-cdd812d0e601",
    true,
    true
  ],
  [
    "Spicy Arrabbiata",
    "Rigatoni in fiery tomato sauce, basil and parmesan",
    "Pasta",
    15.9,
    "photo-1563379926898-05f4575a45d8",
    false,
    true
  ],
  [
    "Golden Parmesan Fries",
    "Skin-on golden fries with parmesan and herbs",
    "Sides",
    5.9,
    "photo-1573080496219-bb080dd4f877",
    true,
    true
  ],
  [
    "Loaded Nachos",
    "Crispy tortilla chips, cheese, fresh salsa and jalapenos",
    "Sides",
    8.9,
    "photo-1513456852971-30c0b8199d4d",
    false,
    true
  ],
  [
    "Molten Chocolate Cake",
    "Warm dark chocolate center with vanilla cream",
    "Desserts",
    8.5,
    "photo-1606313564200-e75d5e30476c",
    true,
    true
  ],
  [
    "Strawberry Cheesecake",
    "Creamy baked cheesecake and berry compote",
    "Desserts",
    8.9,
    "photo-1533134242443-d4fd215305ad",
    false,
    true
  ],
  [
    "Iced Matcha Latte",
    "Earthy Japanese matcha blended over ice",
    "Drinks",
    5.9,
    "photo-1515823064-d6e0c04616a7",
    false,
    true
  ],
  [
    "Fresh Citrus Cooler",
    "Hand-squeezed citrus, mint and sparkling soda",
    "Drinks",
    5.5,
    "photo-1544145945-f90425340c7e",
    true,
    true
  ]
];
export const demoDishes=rows.map(([name,description,category,price,img,popular,vegetarian],index)=>({
  name,description,category,price,image:photo(img),popular,vegetarian,active:true,rating:Number((4.5+index%5*.1).toFixed(1))
}));
