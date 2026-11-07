export type Diet = "vegetarian" | "gluten-free" | "vegan";

export interface MenuItem {
  name: string;
  description: string;
  /** Small print after the description. */
  note?: string;
  diets?: Diet[];
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface Meal {
  /** Matches the meal's event id in Schedule/schedule.json, which supplies its day, name and time. */
  id: string;
  sections: MenuSection[];
}

export const DIETS: { id: Diet; label: string }[] = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "gluten-free", label: "Gluten-Free" },
  { id: "vegan", label: "Vegan" },
];

export const MEALS: Meal[] = [
  {
    id: "lunch-sat",
    sections: [
      {
        title: "Entrées",
        items: [
          {
            name: "Classic Mac Tray",
            description: "Choice of Regular/Vegan/Gluten-Free Cheddar Mac & Cheese + Garlic Bread",
            note: "(Not GF/Vegan)",
            diets: ["vegetarian", "vegan", "gluten-free"],
          },
          {
            name: "Texas BBQ Tray",
            description:
              "Pepper Jack Mac & Cheese, Pulled Pork, Brisket, Onions, Jalapenos, BBQ Sauce + Garlic Bread",
          },
          {
            name: "Buffalo Chicken Tray",
            description: "Cheddar Mac & Cheese w/ Grilled Chicken, Onions, Buffalo Sauce + Garlic Bread",
          },
          {
            name: "Hot Stuff Tray",
            description:
              "Pepper Jack Mac & Cheese, Grilled Chicken, Jalapenos, Breadcrumbs, Hot Honey Sauce + Garlic Bread",
          },
          {
            name: "Chicken Bacon Ranch Tray",
            description: "Cheddar Mac & Cheese w/ Grilled Chicken, Bacon, Tomatoes, Ranch + Garlic Bread",
          },
          {
            name: "Veggie Tray",
            description:
              "Cheddar Mac & Cheese w/ Onions, Jalapenos, Tomatoes, Bell Peppers, Mushrooms, Grated Parmesan + Garlic Bread",
            diets: ["vegetarian"],
          },
          {
            name: "Hawaiian Tray",
            description: "Cheddar Mac & Cheese w/ Ham, Pineapple, BBQ Sauce + Garlic Bread",
          },
          {
            name: "Forest Tray",
            description:
              "Cheddar Mac & Cheese w/ Onions, Jalapenos, Tomatoes, Bell Peppers, Mushrooms, Grated Parmesan + Garlic Bread",
            diets: ["vegetarian"],
          },
        ],
      },
    ],
  },
  {
    id: "dinner-sat",
    sections: [
      {
        title: "Entrées",
        items: [
          {
            name: "Manicotti",
            description: "Egg noodle filled w/ Ricotta, Mozzarella, Spinach, topped Cheesy Marinara Sauce",
            diets: ["vegetarian"],
          },
          {
            name: "Lasagna",
            description: "Tomato Sauce, Ricotta cheese, Creamy white sauce, topped w/ Mozzarella",
            diets: ["vegetarian"],
          },
          {
            name: "Beef Cannelloni",
            description: "Egg noodle filled w/ Ground Beef, Spinach, Mozzarella, topped Cheesy Marinara Sauce",
          },
          {
            name: "Chicken Fettuccine Alfredo",
            description: "Fettuccine w/ Chicken Breast Slices, topped Creamy White Sauce",
          },
          {
            name: "Chicken Parmesan",
            description: "Pan-Fried Chicken Breast, topped w/ Mozzarella and Spaghetti Marinara",
          },
          {
            name: "Caponata",
            description: "Stewed Eggplant and Mixed Vegetables",
            diets: ["vegan", "gluten-free"],
          },
        ],
      },
      {
        title: "Sides",
        items: [
          { name: "Pizza Rolls", description: "Marinara, Mozzarella, topped w/ Pepperoni" },
          { name: "Dinner Rolls", description: "Soft Yeast Bread" },
        ],
      },
    ],
  },
  {
    id: "breakfast-sun",
    sections: [
      {
        title: "Entrées",
        items: [
          {
            name: "Drop Biscuits",
            description: "Scratch-made Biscuits. Options: Cinnamon, Lemon Blueberry, Cheddar & Chive",
            diets: ["vegetarian"],
          },
          {
            name: "Choco Chip Banana Bread",
            description: "Banana Bread with Chocolate Chips",
            diets: ["vegetarian"],
          },
          {
            name: "Gluten Free Choco Chip Banana Bread",
            description: "Gluten Free Banana Bread with Chocolate Chips",
            diets: ["vegetarian", "gluten-free"],
          },
          {
            name: "Frittata Egg Cups",
            description: "Muffin Sized Quiche Cups with Bacon, Cheese, and Green Onions",
          },
        ],
      },
    ],
  },
  {
    id: "lunch-sun",
    sections: [
      {
        title: "Entrées",
        items: [
          { name: "Chicken Tenders", description: "Chicken" },
          {
            name: "Brew House Tray",
            description:
              "Roasted Cauliflower, Quinoa, Brown Rice, Black Beans, Corn, Red Pepper Succotash, Cucumbers, Red Onions, Guacamole, and Cilantro",
            diets: ["vegan"],
          },
          {
            name: "GF Brew House Tray",
            description:
              "Roasted Cauliflower, Quinoa, Brown Rice, Black Beans, Corn, Red Pepper Succotash, Cucumbers, Red Onions, Pico de Gallo, Feta Cheese, Guacamole, Creme, and Cilantro",
            diets: ["gluten-free"],
          },
          {
            name: "Chicken Club Sandwich",
            description: "Chicken, Swiss Cheese, Lettuce, Tomatoes, Guacamole, and Garlic Aioli",
          },
          {
            name: "Ham and Cheese Sandwich",
            description: "Smoked Ham, Swiss Cheese, Onions, Garlic Aioli, Lettuce, and Dill Pickles",
          },
          {
            name: "Italian Roast Beef Sandwich",
            description: "Beef, Swiss Cheese, Onions, Veggies, and Garlic Aioli",
          },
        ],
      },
      {
        title: "Sides",
        items: [{ name: "Chips and Dips", description: "Housemade Guacamole, Fire-Roasted Salsa and Chips" }],
      },
    ],
  },
];
