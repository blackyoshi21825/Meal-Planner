document.getElementById('nutrientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input values
    const fiber = parseFloat(document.getElementById('fiber').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const sugar = parseFloat(document.getElementById('sugar').value);
    const fat = parseFloat(document.getElementById('fat').value);
    const vitamins = parseFloat(document.getElementById('vitamins').value);

    // Meal database with nutritional values and required ingredients
    const meals = [
        { name: "Oatmeal with Banana", fiber: 4, calories: 150, protein: 5, sugar: 12, fat: 3, vitamins: 10, ingredients: { "Oats (g)": 50, "Banana (g)": 100 }},
        { name: "Chicken Salad", fiber: 6, calories: 300, protein: 25, sugar: 3, fat: 15, vitamins: 20, ingredients: { "Chicken Breast (g)": 150, "Lettuce (g)": 100, "Tomatoes (g)": 50 }},
        { name: "Grilled Salmon with Veggies", fiber: 5, calories: 350, protein: 35, sugar: 2, fat: 20, vitamins: 25, ingredients: { "Salmon (g)": 200, "Broccoli (g)": 100, "Carrots (g)": 50 }},
        { name: "Vegetable Stir Fry", fiber: 7, calories: 200, protein: 5, sugar: 8, fat: 10, vitamins: 18, ingredients: { "Mixed Vegetables (g)": 150, "Soy Sauce (g)": 20, "Olive Oil (g)": 10 }},
        { name: "Avocado Toast", fiber: 5, calories: 250, protein: 8, sugar: 2, fat: 15, vitamins: 30, ingredients: { "Whole Wheat Bread (g)": 50, "Avocado (g)": 100 }},
        { name: "Egg White Omelette", fiber: 1, calories: 120, protein: 15, sugar: 2, fat: 4, vitamins: 15, ingredients: { "Egg Whites (g)": 150, "Spinach (g)": 50, "Olive Oil (g)": 10 }},
        { name: "Greek Yogurt with Berries", fiber: 4, calories: 180, protein: 15, sugar: 14, fat: 5, vitamins: 12, ingredients: { "Greek Yogurt (g)": 150, "Mixed Berries (g)": 100 }},
        { name: "Quinoa Salad", fiber: 8, calories: 350, protein: 12, sugar: 6, fat: 10, vitamins: 20, ingredients: { "Quinoa (g)": 100, "Chickpeas (g)": 50, "Cucumber (g)": 50 }},
        { name: "Smoothie Bowl", fiber: 6, calories: 250, protein: 5, sugar: 18, fat: 8, vitamins: 35, ingredients: { "Banana (g)": 100, "Spinach (g)": 50, "Almond Milk (g)": 200 }},
        { name: "Tuna Salad", fiber: 4, calories: 300, protein: 35, sugar: 3, fat: 15, vitamins: 10, ingredients: { "Canned Tuna (g)": 150, "Lettuce (g)": 50, "Olive Oil (g)": 10 }},
        { name: "Pasta Primavera", fiber: 7, calories: 400, protein: 12, sugar: 8, fat: 15, vitamins: 25, ingredients: { "Whole Wheat Pasta (g)": 100, "Mixed Vegetables (g)": 150, "Parmesan Cheese (g)": 20 }},
        { name: "Cottage Cheese with Fruit", fiber: 3, calories: 180, protein: 15, sugar: 12, fat: 4, vitamins: 10, ingredients: { "Cottage Cheese (g)": 150, "Apple (g)": 100 }},
        { name: "Turkey and Avocado Wrap", fiber: 5, calories: 350, protein: 30, sugar: 4, fat: 18, vitamins: 20, ingredients: { "Whole Wheat Wrap (g)": 50, "Turkey Breast (g)": 100, "Avocado (g)": 50 }},
        { name: "Beef Stir Fry", fiber: 4, calories: 400, protein: 30, sugar: 3, fat: 20, vitamins: 15, ingredients: { "Beef (g)": 150, "Bell Peppers (g)": 100, "Soy Sauce (g)": 20 }},
        { name: "Chicken Tacos", fiber: 6, calories: 350, protein: 30, sugar: 2, fat: 12, vitamins: 20, ingredients: { "Chicken (g)": 150, "Corn Tortillas (g)": 50, "Lettuce (g)": 50 }},
        { name: "Chickpea Curry", fiber: 9, calories: 300, protein: 15, sugar: 8, fat: 10, vitamins: 30, ingredients: { "Chickpeas (g)": 150, "Tomato Sauce (g)": 100, "Spinach (g)": 50 }},
        { name: "Grilled Chicken with Asparagus", fiber: 5, calories: 350, protein: 40, sugar: 3, fat: 10, vitamins: 15, ingredients: { "Chicken Breast (g)": 200, "Asparagus (g)": 100 }},
        { name: "Sweet Potato and Black Bean Bowl", fiber: 8, calories: 350, protein: 12, sugar: 4, fat: 8, vitamins: 25, ingredients: { "Sweet Potato (g)": 150, "Black Beans (g)": 100, "Avocado (g)": 50 }},
        { name: "Mango Chicken Salad", fiber: 6, calories: 280, protein: 25, sugar: 12, fat: 15, vitamins: 30, ingredients: { "Chicken (g)": 150, "Mango (g)": 100, "Lettuce (g)": 50 }},
        { name: "Lentil Soup", fiber: 8, calories: 300, protein: 18, sugar: 5, fat: 6, vitamins: 20, ingredients: { "Lentils (g)": 150, "Carrots (g)": 100, "Tomato Sauce (g)": 50 }},
        { name: "Spaghetti with Marinara", fiber: 5, calories: 350, protein: 10, sugar: 8, fat: 12, vitamins: 18, ingredients: { "Whole Wheat Spaghetti (g)": 100, "Tomato Sauce (g)": 150, "Garlic (g)": 10 }},
        { name: "Eggplant Parmesan", fiber: 6, calories: 280, protein: 12, sugar: 8, fat: 14, vitamins: 20, ingredients: { "Eggplant (g)": 150, "Tomato Sauce (g)": 100, "Mozzarella Cheese (g)": 50 }},
        { name: "Chicken Fried Rice", fiber: 4, calories: 400, protein: 25, sugar: 6, fat: 18, vitamins: 25, ingredients: { "Chicken (g)": 150, "Brown Rice (g)": 100, "Mixed Vegetables (g)": 50 }},
        { name: "Salmon Tacos", fiber: 5, calories: 350, protein: 30, sugar: 3, fat: 15, vitamins: 20, ingredients: { "Salmon (g)": 150, "Corn Tortillas (g)": 50, "Cabbage (g)": 50 }},
        { name: "Zucchini Noodles with Pesto", fiber: 6, calories: 250, protein: 7, sugar: 4, fat: 15, vitamins: 25, ingredients: { "Zucchini (g)": 200, "Pesto Sauce (g)": 50, "Parmesan Cheese (g)": 20 }},
        { name: "Poke Bowl", fiber: 7, calories: 400, protein: 30, sugar: 5, fat: 12, vitamins: 15, ingredients: { "Tuna (g)": 150, "Brown Rice (g)": 100, "Avocado (g)": 50 }},
        { name: "Chia Pudding", fiber: 10, calories: 200, protein: 5, sugar: 5, fat: 10, vitamins: 18, ingredients: { "Chia Seeds (g)": 30, "Almond Milk (g)": 150, "Berries (g)": 50 }},
        { name: "Cauliflower Rice Stir Fry", fiber: 6, calories: 250, protein: 10, sugar: 6, fat: 10, vitamins: 20, ingredients: { "Cauliflower (g)": 150, "Mixed Vegetables (g)": 100, "Soy Sauce (g)": 20 }},
        { name: "Shrimp Salad", fiber: 4, calories: 350, protein: 30, sugar: 2, fat: 15, vitamins: 30, ingredients: { "Shrimp (g)": 150, "Lettuce (g)": 50, "Cucumber (g)": 50 }},
        { name: "Vegetable Soup", fiber: 6, calories: 180, protein: 6, sugar: 10, fat: 5, vitamins: 25, ingredients: { "Mixed Vegetables (g)": 150, "Tomato Sauce (g)": 100, "Vegetable Broth (g)": 200 }},
        { name: "Green Flame Chicken", fiber: 4, calories: 320, protein: 35, sugar: 2, fat: 14, vitamins: 90, ingredients: { "Chicken breast (g)": 150, "Broccoli (g)": 100, "Olive oil (g)": 10 }},
        { name: "Morning Crunch Toast", fiber: 5, calories: 270, protein: 10, sugar: 1, fat: 17, vitamins: 30, ingredients: { "Whole grain bread (g)": 40, "Egg (g)": 60, "Avocado (g)": 70 }},
        { name: "Berry Cloud Parfait", fiber: 2, calories: 180, protein: 12, sugar: 14, fat: 5, vitamins: 50, ingredients: { "Greek yogurt (g)": 150, "Strawberries (g)": 80, "Honey (g)": 10 }},
        { name: "Citrus Coast Salmon", fiber: 2, calories: 280, protein: 30, sugar: 0, fat: 15, vitamins: 120, ingredients: { "Salmon (g)": 150, "Spinach (g)": 100, "Lemon juice (g)": 10 }},
        { name: "Island Fuel Bowl", fiber: 5, calories: 270, protein: 8, sugar: 9, fat: 9, vitamins: 15, ingredients: { "Rolled oats (g)": 40, "Banana (g)": 100, "Peanut butter (g)": 15 }},
        { name: "Harbor Light Salad", fiber: 6, calories: 290, protein: 25, sugar: 2, fat: 11, vitamins: 10, ingredients: { "Tuna (g)": 100, "Chickpeas (g)": 100, "Olive oil (g)": 10 }},
        { name: "Golden Garden Scramble", fiber: 1, calories: 280, protein: 18, sugar: 1, fat: 20, vitamins: 60, ingredients: { "Eggs (g)": 120, "Cheddar cheese (g)": 30, "Spinach (g)": 50 }},
        { name: "Fiesta Flame Potato", fiber: 8, calories: 250, protein: 10, sugar: 7, fat: 1.5, vitamins: 140, ingredients: { "Sweet potato (g)": 150, "Black beans (g)": 100, "Salsa (g)": 50 }},
        { name: "Cinnamon Orchard Bites", fiber: 4, calories: 210, protein: 4, sugar: 14, fat: 10, vitamins: 12, ingredients: { "Apple (g)": 150, "Almond butter (g)": 20, "Cinnamon (g)": 2 }},
        { name: "Coastal Stir Bowl", fiber: 3, calories: 260, protein: 22, sugar: 3, fat: 2, vitamins: 70, ingredients: { "Shrimp (g)": 100, "Brown rice (g)": 100, "Bell pepper (g)": 80 }},
        { name: "Spiced Chickpea Delight", fiber: 7, calories: 240, protein: 12, sugar: 4, fat: 6, vitamins: 40, ingredients: { "Chickpeas (g)": 120, "Tomato sauce (g)": 80, "Olive oil (g)": 10 }},
        { name: "Rustic Beef & Greens", fiber: 3, calories: 310, protein: 28, sugar: 2, fat: 18, vitamins: 35, ingredients: { "Lean beef (g)": 150, "Kale (g)": 80, "Olive oil (g)": 10 }},
        { name: "Tropical Quinoa Bowl", fiber: 6, calories: 260, protein: 9, sugar: 8, fat: 7, vitamins: 50, ingredients: { "Quinoa (g)": 70, "Mango (g)": 90, "Avocado (g)": 50 }},
        { name: "Savory Eggplant Stack", fiber: 5, calories: 220, protein: 7, sugar: 5, fat: 10, vitamins: 30, ingredients: { "Eggplant (g)": 150, "Mozzarella (g)": 50, "Tomato sauce (g)": 60 }},
        { name: "Lemon Garlic Shrimp", fiber: 1, calories: 210, protein: 25, sugar: 1, fat: 7, vitamins: 20, ingredients: { "Shrimp (g)": 120, "Garlic (g)": 10, "Lemon juice (g)": 10 }},
        { name: "Hearty Lentil Soup", fiber: 8, calories: 230, protein: 14, sugar: 3, fat: 4, vitamins: 45, ingredients: { "Lentils (g)": 100, "Carrot (g)": 70, "Onion (g)": 40 }},
        { name: "Zesty Turkey Wrap", fiber: 4, calories: 280, protein: 27, sugar: 2, fat: 9, vitamins: 25, ingredients: { "Turkey breast (g)": 120, "Whole wheat wrap (g)": 60, "Spinach (g)": 30 }},
        { name: "Creamy Avocado Pasta", fiber: 5, calories: 300, protein: 8, sugar: 3, fat: 15, vitamins: 40, ingredients: { "Pasta (g)": 100, "Avocado (g)": 70, "Parmesan (g)": 30 }},
        { name: "Sweet Potato Toasties", fiber: 6, calories: 240, protein: 6, sugar: 6, fat: 5, vitamins: 100, ingredients: { "Sweet potato (g)": 150, "Almond butter (g)": 20, "Chia seeds (g)": 15 }},
        { name: "Garlic Herb Chicken", fiber: 2, calories: 310, protein: 33, sugar: 1, fat: 14, vitamins: 25, ingredients: { "Chicken breast (g)": 150, "Garlic (g)": 10, "Rosemary (g)": 5 }},
        { name: "Spicy Turkey Skillet", fiber: 3, calories: 320, protein: 30, sugar: 2, fat: 16, vitamins: 35, ingredients: { "Ground turkey (g)": 150, "Bell pepper (g)": 100, "Olive oil (g)": 10 }},
        { name: "Mango Black Bean Salad", fiber: 7, calories: 250, protein: 8, sugar: 9, fat: 5, vitamins: 60, ingredients: { "Black beans (g)": 100, "Mango (g)": 90, "Cilantro (g)": 10 }},
        { name: "Cocoa Banana Smoothie", fiber: 4, calories: 220, protein: 6, sugar: 15, fat: 4, vitamins: 20, ingredients: { "Banana (g)": 100, "Cocoa powder (g)": 15, "Greek yogurt (g)": 120 }},
        { name: "Honey Mustard Chicken", fiber: 2, calories: 300, protein: 32, sugar: 5, fat: 12, vitamins: 30, ingredients: { "Chicken breast (g)": 150, "Honey (g)": 15, "Mustard (g)": 10 }},
        { name: "Tomato Basil Pasta", fiber: 5, calories: 280, protein: 9, sugar: 6, fat: 7, vitamins: 40, ingredients: { "Pasta (g)": 100, "Tomato sauce (g)": 80, "Basil (g)": 10 }},
        { name: "Lentil Spinach Curry", fiber: 8, calories: 240, protein: 14, sugar: 3, fat: 6, vitamins: 50, ingredients: { "Lentils (g)": 100, "Spinach (g)": 80, "Coconut milk (g)": 40 }},
        { name: "Peanut Butter Apple Bites", fiber: 4, calories: 210, protein: 5, sugar: 13, fat: 10, vitamins: 15, ingredients: { "Apple (g)": 150, "Peanut butter (g)": 20, "Cinnamon (g)": 2 }},
        { name: "Crispy Tofu Stir Fry", fiber: 6, calories: 260, protein: 20, sugar: 4, fat: 10, vitamins: 45, ingredients: { "Tofu (g)": 120, "Broccoli (g)": 100, "Soy sauce (g)": 15 }},
        { name: "Sweet Chili Shrimp", fiber: 1, calories: 230, protein: 25, sugar: 5, fat: 8, vitamins: 20, ingredients: { "Shrimp (g)": 120, "Sweet chili sauce (g)": 20, "Garlic (g)": 10 }},
        { name: "Avocado Egg Salad", fiber: 5, calories: 290, protein: 15, sugar: 1, fat: 22, vitamins: 35, ingredients: { "Eggs (g)": 120, "Avocado (g)": 70, "Mayonnaise (g)": 15 }},
        { name: "Quinoa Veggie Medley", fiber: 7, calories: 270, protein: 10, sugar: 5, fat: 8, vitamins: 55, ingredients: { "Quinoa (g)": 70, "Zucchini (g)": 80, "Red bell pepper (g)": 50 }},
        { name: "Garlic Lemon Salmon", fiber: 1, calories: 290, protein: 30, sugar: 0, fat: 16, vitamins: 25, ingredients: { "Salmon (g)": 150, "Garlic (g)": 10, "Lemon juice (g)": 10 }},
        { name: "Banana Oat Pancakes", fiber: 4, calories: 250, protein: 7, sugar: 8, fat: 6, vitamins: 15, ingredients: { "Banana (g)": 100, "Oats (g)": 60, "Egg (g)": 60 }},
        { name: "Spiced Chickpea Wrap", fiber: 6, calories: 280, protein: 13, sugar: 3, fat: 7, vitamins: 40, ingredients: { "Chickpeas (g)": 120, "Whole wheat wrap (g)": 60, "Cumin (g)": 5 }},
        { name: "Honey Garlic Tofu", fiber: 4, calories: 250, protein: 18, sugar: 10, fat: 10, vitamins: 35, ingredients: { "Tofu (g)": 120, "Honey (g)": 15, "Garlic (g)": 10 }},
        { name: "Peach Cottage Cheese", fiber: 2, calories: 180, protein: 15, sugar: 9, fat: 4, vitamins: 10, ingredients: { "Cottage cheese (g)": 150, "Peach (g)": 80, "Honey (g)": 10 }},
        { name: "Mediterranean Tuna Salad", fiber: 4, calories: 310, protein: 28, sugar: 3, fat: 14, vitamins: 35, ingredients: { "Tuna (g)": 120, "Cucumber (g)": 80, "Olive oil (g)": 10 }},
        { name: "Pumpkin Spice Smoothie", fiber: 5, calories: 220, protein: 6, sugar: 12, fat: 5, vitamins: 40, ingredients: { "Pumpkin puree (g)": 100, "Greek yogurt (g)": 120, "Cinnamon (g)": 3 }},
        { name: "Sweet Potato & Black Bean", fiber: 8, calories: 270, protein: 12, sugar: 6, fat: 5, vitamins: 120, ingredients: { "Sweet potato (g)": 150, "Black beans (g)": 100, "Cilantro (g)": 10 }},
        { name: "Coconut Mango Chia Pudding", fiber: 9, calories: 280, protein: 7, sugar: 11, fat: 12, vitamins: 50, ingredients: { "Chia seeds (g)": 30, "Coconut milk (g)": 100, "Mango (g)": 80 }},
        { name: "Herbed Chicken Breast", fiber: 2, calories: 310, protein: 33, sugar: 0, fat: 14, vitamins: 25, ingredients: { "Chicken breast (g)": 150, "Rosemary (g)": 5, "Olive oil (g)": 10 }},
        { name: "Berry Spinach Smoothie", fiber: 5, calories: 200, protein: 8, sugar: 15, fat: 3, vitamins: 70, ingredients: { "Spinach (g)": 50, "Mixed berries (g)": 100, "Greek yogurt (g)": 100 }},
        { name: "Lemon Dill Cod", fiber: 1, calories: 230, protein: 28, sugar: 0, fat: 7, vitamins: 20, ingredients: { "Cod (g)": 150, "Lemon juice (g)": 10, "Dill (g)": 5 }},
        { name: "Avocado Tomato Toast", fiber: 6, calories: 260, protein: 7, sugar: 4, fat: 15, vitamins: 35, ingredients: { "Whole grain bread (g)": 40, "Avocado (g)": 70, "Tomato (g)": 50 }},
        { name: "Zucchini Noodle Stir Fry", fiber: 5, calories: 230, protein: 15, sugar: 5, fat: 8, vitamins: 50, ingredients: { "Zucchini (g)": 150, "Tofu (g)": 100, "Soy sauce (g)": 15 }},
        { name: "Peanut Butter Energy Bites", fiber: 6, calories: 280, protein: 9, sugar: 10, fat: 15, vitamins: 15, ingredients: { "Peanut butter (g)": 50, "Oats (g)": 40, "Honey (g)": 15 }},
        { name: "Tomato Basil Omelette", fiber: 1, calories: 270, protein: 20, sugar: 3, fat: 18, vitamins: 30, ingredients: { "Eggs (g)": 120, "Tomato (g)": 50, "Basil (g)": 10 }},
        { name: "Sweet Corn Salad", fiber: 4, calories: 230, protein: 8, sugar: 6, fat: 8, vitamins: 40, ingredients: { "Corn (g)": 100, "Black beans (g)": 80, "Red onion (g)": 30 }},
        { name: "Banana Almond Smoothie", fiber: 5, calories: 250, protein: 7, sugar: 14, fat: 9, vitamins: 20, ingredients: { "Banana (g)": 100, "Almond milk (g)": 150, "Almond butter (g)": 20 }},
        { name: "Grilled Veggie Skewers", fiber: 6, calories: 220, protein: 8, sugar: 7, fat: 6, vitamins: 55, ingredients: { "Zucchini (g)": 100, "Bell pepper (g)": 80, "Mushrooms (g)": 80 }},
        { name: "Lentil Veggie Bowl", fiber: 9, calories: 280, protein: 15, sugar: 4, fat: 7, vitamins: 60, ingredients: { "Lentils (g)": 120, "Carrots (g)": 70, "Spinach (g)": 50 }},
        { name: "Honey Glazed Carrots", fiber: 3, calories: 180, protein: 3, sugar: 12, fat: 4, vitamins: 40, ingredients: { "Carrots (g)": 150, "Honey (g)": 20, "Butter (g)": 10 }},
        { name: "Spicy Black Bean Soup", fiber: 10, calories: 260, protein: 14, sugar: 3, fat: 5, vitamins: 50, ingredients: { "Black beans (g)": 150, "Tomato (g)": 80, "Chili powder (g)": 5 }},
        { name: "Mushroom Spinach Wrap", fiber: 5, calories: 240, protein: 10, sugar: 3, fat: 7, vitamins: 45, ingredients: { "Mushrooms (g)": 100, "Spinach (g)": 80, "Whole wheat wrap (g)": 60 }},
        { name: "Cucumber Avocado Salad", fiber: 6, calories: 210, protein: 4, sugar: 3, fat: 14, vitamins: 40, ingredients: { "Cucumber (g)": 120, "Avocado (g)": 70, "Lime juice (g)": 10 }},
        { name: "Carrot Ginger Soup", fiber: 5, calories: 200, protein: 5, sugar: 7, fat: 6, vitamins: 50, ingredients: { "Carrots (g)": 150, "Ginger (g)": 10, "Vegetable broth (g)": 100 }},
        { name: "Turkey Sweet Potato Mash", fiber: 6, calories: 300, protein: 30, sugar: 4, fat: 10, vitamins: 60, ingredients: { "Ground turkey (g)": 150, "Sweet potato (g)": 150, "Onion (g)": 40 }},
        { name: "Garlic Butter Cod", fiber: 1, calories: 270, protein: 30, sugar: 0, fat: 14, vitamins: 20, ingredients: { "Cod (g)": 150, "Butter (g)": 15, "Garlic (g)": 10 }},
        { name: "Spinach Feta Omelette", fiber: 2, calories: 280, protein: 22, sugar: 2, fat: 20, vitamins: 40, ingredients: { "Eggs (g)": 120, "Spinach (g)": 50, "Feta cheese (g)": 30 }},
        { name: "Apple Cinnamon Yogurt", fiber: 3, calories: 190, protein: 10, sugar: 13, fat: 4, vitamins: 15, ingredients: { "Apple (g)": 100, "Greek yogurt (g)": 150, "Cinnamon (g)": 2 }},
        { name: "Roasted Beet Salad", fiber: 6, calories: 230, protein: 7, sugar: 7, fat: 10, vitamins: 50, ingredients: { "Beets (g)": 150, "Goat cheese (g)": 40, "Walnuts (g)": 20 }},
        { name: "BBQ Chicken Bowl", fiber: 3, calories: 310, protein: 32, sugar: 6, fat: 15, vitamins: 25, ingredients: { "Chicken breast (g)": 150, "BBQ sauce (g)": 30, "Corn (g)": 80 }},
        { name: "Cauliflower Rice Stir Fry", fiber: 5, calories: 220, protein: 12, sugar: 4, fat: 8, vitamins: 45, ingredients: { "Cauliflower rice (g)": 150, "Carrots (g)": 70, "Peas (g)": 50 }},
        { name: "Peach Almond Salad", fiber: 4, calories: 240, protein: 8, sugar: 9, fat: 12, vitamins: 30, ingredients: { "Peach (g)": 100, "Almonds (g)": 30, "Spinach (g)": 50 }},
        { name: "Buffalo Cauliflower Bites", fiber: 5, calories: 210, protein: 6, sugar: 3, fat: 10, vitamins: 40, ingredients: { "Cauliflower (g)": 150, "Buffalo sauce (g)": 30, "Olive oil (g)": 10 }},
        { name: "Strawberry Spinach Salad", fiber: 5, calories: 200, protein: 5, sugar: 10, fat: 8, vitamins: 65, ingredients: { "Strawberries (g)": 100, "Spinach (g)": 80, "Walnuts (g)": 20 }},
        { name: "Turkey Avocado Wrap", fiber: 6, calories: 300, protein: 28, sugar: 2, fat: 15, vitamins: 30, ingredients: { "Turkey breast (g)": 120, "Avocado (g)": 70, "Whole wheat wrap (g)": 60 }},
        { name: "Eggplant Tomato Bake", fiber: 6, calories: 250, protein: 8, sugar: 6, fat: 10, vitamins: 45, ingredients: { "Eggplant (g)": 150, "Tomato sauce (g)": 80, "Mozzarella (g)": 40 }},
        { name: "Coconut Chia Smoothie", fiber: 8, calories: 270, protein: 7, sugar: 12, fat: 14, vitamins: 50, ingredients: { "Chia seeds (g)": 30, "Coconut milk (g)": 120, "Banana (g)": 100 }},
        { name: "Zesty Lime Chicken", fiber: 2, calories: 310, protein: 33, sugar: 1, fat: 13, vitamins: 25, ingredients: { "Chicken breast (g)": 150, "Lime juice (g)": 10, "Chili powder (g)": 5 }},
        { name: "Veggie Hummus Wrap", fiber: 7, calories: 280, protein: 9, sugar: 5, fat: 8, vitamins: 40, ingredients: { "Hummus (g)": 50, "Cucumber (g)": 80, "Whole wheat wrap (g)": 60 }},
        { name: "Beef Broccoli Stir Fry", fiber: 4, calories: 320, protein: 30, sugar: 3, fat: 16, vitamins: 35, ingredients: { "Lean beef (g)": 150, "Broccoli (g)": 100, "Soy sauce (g)": 15 }},
        { name: "Carrot Apple Salad", fiber: 5, calories: 220, protein: 4, sugar: 10, fat: 6, vitamins: 50, ingredients: { "Carrots (g)": 100, "Apple (g)": 100, "Walnuts (g)": 20 }},
        { name: "Creamy Avocado Toast", fiber: 6, calories: 270, protein: 7, sugar: 2, fat: 16, vitamins: 35, ingredients: { "Whole grain bread (g)": 40, "Avocado (g)": 80, "Lemon juice (g)": 10 }},
        { name: "Lentil Veggie Wrap", fiber: 8, calories: 290, protein: 15, sugar: 4, fat: 8, vitamins: 50, ingredients: { "Lentils (g)": 100, "Spinach (g)": 60, "Whole wheat wrap (g)": 60 }},
        { name: "Mango Black Bean Salsa", fiber: 7, calories: 260, protein: 9, sugar: 8, fat: 6, vitamins: 55, ingredients: { "Black beans (g)": 100, "Mango (g)": 90, "Red onion (g)": 40 }},
        { name: "Garlic Herb Roasted Chicken", fiber: 2, calories: 320, protein: 35, sugar: 1, fat: 15, vitamins: 30, ingredients: { "Chicken breast (g)": 150, "Garlic (g)": 10, "Rosemary (g)": 5 }},
        { name: "Chickpea Avocado Salad", fiber: 8, calories: 280, protein: 12, sugar: 4, fat: 14, vitamins: 50, ingredients: { "Chickpeas (g)": 120, "Avocado (g)": 70, "Lemon juice (g)": 10 }},
        { name: "Berry Oat Smoothie", fiber: 6, calories: 230, protein: 7, sugar: 14, fat: 4, vitamins: 60, ingredients: { "Mixed berries (g)": 100, "Oats (g)": 50, "Almond milk (g)": 150 }},
        { name: "Quinoa Black Bean Salad", fiber: 9, calories: 310, protein: 13, sugar: 3, fat: 8, vitamins: 55, ingredients: { "Quinoa (g)": 80, "Black beans (g)": 100, "Cilantro (g)": 10 }},
        { name: "Cinnamon Apple Pancakes", fiber: 5, calories: 270, protein: 8, sugar: 12, fat: 6, vitamins: 20, ingredients: { "Apple (g)": 80, "Oats (g)": 60, "Egg (g)": 60 }},
        { name: "Baked Salmon with Dill", fiber: 1, calories: 300, protein: 32, sugar: 0, fat: 16, vitamins: 25, ingredients: { "Salmon (g)": 150, "Dill (g)": 5, "Lemon juice (g)": 10 }},
        { name: "Sweet Potato and Kale Hash", fiber: 7, calories: 280, protein: 10, sugar: 5, fat: 9, vitamins: 70, ingredients: { "Sweet potato (g)": 150, "Kale (g)": 80, "Onion (g)": 40 }},
        { name: "Turkey Spinach Wrap", fiber: 6, calories: 290, protein: 28, sugar: 2, fat: 12, vitamins: 35, ingredients: { "Turkey breast (g)": 120, "Spinach (g)": 60, "Whole wheat wrap (g)": 60 }},
        { name: "Peanut Butter Banana Toast", fiber: 5, calories: 260, protein: 7, sugar: 15, fat: 12, vitamins: 20, ingredients: { "Whole grain bread (g)": 40, "Peanut butter (g)": 20, "Banana (g)": 100 }},
        { name: "Roasted Veggie Pasta", fiber: 6, calories: 300, protein: 10, sugar: 7, fat: 8, vitamins: 50, ingredients: { "Pasta (g)": 100, "Zucchini (g)": 80, "Bell pepper (g)": 80 }},
        { name: "Greek Yogurt with Honey & Nuts", fiber: 3, calories: 210, protein: 14, sugar: 10, fat: 8, vitamins: 15, ingredients: { "Greek yogurt (g)": 150, "Honey (g)": 15, "Walnuts (g)": 20 }},
        { name: "Cauliflower Tabbouleh Salad", fiber: 6, calories: 220, protein: 7, sugar: 4, fat: 7, vitamins: 40, ingredients: { "Cauliflower (g)": 150, "Parsley (g)": 30, "Tomato (g)": 50 }},
        { name: "Spicy Tofu Lettuce Wraps", fiber: 5, calories: 240, protein: 18, sugar: 3, fat: 10, vitamins: 45, ingredients: { "Tofu (g)": 120, "Lettuce (g)": 60, "Sriracha sauce (g)": 15 }},
        { name: "Lemon Garlic Shrimp", fiber: 1, calories: 220, protein: 25, sugar: 1, fat: 7, vitamins: 20, ingredients: { "Shrimp (g)": 120, "Lemon juice (g)": 10, "Garlic (g)": 10 }},
        { name: "Tomato Cucumber Salad", fiber: 4, calories: 180, protein: 5, sugar: 5, fat: 6, vitamins: 40, ingredients: { "Tomato (g)": 100, "Cucumber (g)": 100, "Olive oil (g)": 10 }},
        { name: "Black Bean and Corn Salsa", fiber: 7, calories: 260, protein: 9, sugar: 4, fat: 7, vitamins: 55, ingredients: { "Black beans (g)": 100, "Corn (g)": 100, "Red onion (g)": 30 }},
        { name: "Avocado Egg Breakfast Bowl", fiber: 6, calories: 300, protein: 18, sugar: 2, fat: 22, vitamins: 40, ingredients: { "Eggs (g)": 120, "Avocado (g)": 70, "Spinach (g)": 50 }},
        { name: "Pumpkin Spice Overnight Oats", fiber: 8, calories: 280, protein: 10, sugar: 12, fat: 8, vitamins: 50, ingredients: { "Oats (g)": 60, "Pumpkin puree (g)": 80, "Almond milk (g)": 150 }},
        { name: "Quinoa Veggie Stir Fry", fiber: 7, calories: 290, protein: 14, sugar: 5, fat: 7, vitamins: 55, ingredients: { "Quinoa (g)": 80, "Broccoli (g)": 100, "Carrot (g)": 70 }},
        { name: "Almond Butter Apple Slices", fiber: 5, calories: 220, protein: 6, sugar: 10, fat: 12, vitamins: 15, ingredients: { "Apple (g)": 150, "Almond butter (g)": 20 }},
        { name: "Garlic Lemon Chicken Thighs", fiber: 2, calories: 320, protein: 33, sugar: 1, fat: 16, vitamins: 30, ingredients: { "Chicken thighs (g)": 150, "Garlic (g)": 10, "Lemon juice (g)": 10 }},
        { name: "Berry Spinach Smoothie Bowl", fiber: 6, calories: 230, protein: 8, sugar: 15, fat: 5, vitamins: 70, ingredients: { "Mixed berries (g)": 100, "Spinach (g)": 50, "Greek yogurt (g)": 100 }},
        { name: "Sweet Potato Chickpea Curry", fiber: 8, calories: 290, protein: 14, sugar: 6, fat: 8, vitamins: 60, ingredients: { "Sweet potato (g)": 150, "Chickpeas (g)": 120, "Coconut milk (g)": 50 }},
        { name: "Cucumber Mint Salad", fiber: 4, calories: 180, protein: 4, sugar: 3, fat: 7, vitamins: 35, ingredients: { "Cucumber (g)": 120, "Mint (g)": 10, "Lime juice (g)": 10 }},
        { name: "Peach Cottage Cheese Bowl", fiber: 2, calories: 190, protein: 16, sugar: 9, fat: 5, vitamins: 15, ingredients: { "Cottage cheese (g)": 150, "Peach (g)": 80 }},
        { name: "Turkey Meatball Zucchini Noodles", fiber: 5, calories: 300, protein: 30, sugar: 4, fat: 12, vitamins: 40, ingredients: { "Ground turkey (g)": 150, "Zucchini (g)": 100, "Tomato sauce (g)": 80 }},
        { name: "Mango Spinach Smoothie", fiber: 5, calories: 220, protein: 6, sugar: 14, fat: 4, vitamins: 60, ingredients: { "Mango (g)": 100, "Spinach (g)": 50, "Greek yogurt (g)": 100 }},
        { name: "Roasted Cauliflower with Tahini", fiber: 6, calories: 250, protein: 8, sugar: 4, fat: 12, vitamins: 40, ingredients: { "Cauliflower (g)": 150, "Tahini (g)": 30, "Lemon juice (g)": 10 }},
        { name: "Banana Nut Oatmeal", fiber: 6, calories: 280, protein: 8, sugar: 12, fat: 10, vitamins: 20, ingredients: { "Oats (g)": 60, "Banana (g)": 100, "Walnuts (g)": 20 }},
        { name: "Spicy Lentil Soup", fiber: 9, calories: 270, protein: 15, sugar: 3, fat: 6, vitamins: 50, ingredients: { "Lentils (g)": 120, "Tomato (g)": 80, "Chili powder (g)": 5 }},
        { name: "Avocado Chickpea Toast", fiber: 7, calories: 280, protein: 10, sugar: 3, fat: 14, vitamins: 40, ingredients: { "Whole grain bread (g)": 40, "Avocado (g)": 70, "Chickpeas (g)": 100 }},
        { name: "Herb Grilled Shrimp", fiber: 1, calories: 220, protein: 25, sugar: 1, fat: 7, vitamins: 20, ingredients: { "Shrimp (g)": 120, "Rosemary (g)": 5, "Garlic (g)": 10 }},
        { name: "Tomato Basil Soup", fiber: 5, calories: 210, protein: 6, sugar: 7, fat: 6, vitamins: 45, ingredients: { "Tomato (g)": 150, "Basil (g)": 10, "Garlic (g)": 10 }},
        { name: "Peanut Butter Energy Bars", fiber: 6, calories: 280, protein: 9, sugar: 10, fat: 15, vitamins: 15, ingredients: { "Peanut butter (g)": 50, "Oats (g)": 40, "Honey (g)": 15 }},
        { name: "Grilled Veggie Skewers", fiber: 6, calories: 220, protein: 8, sugar: 7, fat: 6, vitamins: 55, ingredients: { "Zucchini (g)": 100, "Bell pepper (g)": 80, "Mushrooms (g)": 80 }},
        { name: "Eggplant Parmesan Bake", fiber: 6, calories: 270, protein: 12, sugar: 6, fat: 14, vitamins: 45, ingredients: { "Eggplant (g)": 150, "Tomato sauce (g)": 80, "Mozzarella (g)": 50 }},
        { name: "Coconut Mango Chia Pudding", fiber: 9, calories: 280, protein: 7, sugar: 11, fat: 12, vitamins: 50, ingredients: { "Chia seeds (g)": 30, "Coconut milk (g)": 100, "Mango (g)": 80 }},
        { name: "Lemon Herb Chicken Salad", fiber: 3, calories: 310, protein: 33, sugar: 1, fat: 14, vitamins: 35, ingredients: { "Chicken breast (g)": 150, "Lemon juice (g)": 10, "Parsley (g)": 5 }},
        { name: "Spinach Feta Wrap", fiber: 5, calories: 270, protein: 20, sugar: 3, fat: 16, vitamins: 40, ingredients: { "Spinach (g)": 60, "Feta cheese (g)": 40, "Whole wheat wrap (g)": 60 }},
        { name: "Carrot Ginger Smoothie", fiber: 5, calories: 200, protein: 6, sugar: 8, fat: 6, vitamins: 50, ingredients: { "Carrots (g)": 150, "Ginger (g)": 10, "Greek yogurt (g)": 100 }},
        { name: "Turkey Sweet Potato Bowl", fiber: 6, calories: 320, protein: 32, sugar: 4, fat: 11, vitamins: 60, ingredients: { "Ground turkey (g)": 150, "Sweet potato (g)": 150, "Onion (g)": 40 }}

    ];

    // Add vegetarian category to each meal
    meals.forEach(meal => {
        // Determine if meal is vegetarian based on name
        // No meat-related ingredients suggests vegetarian
        meal.isVegetarian = !meal.name.toLowerCase().includes("chicken") && 
                            !meal.name.toLowerCase().includes("beef") && 
                            !meal.name.toLowerCase().includes("turkey") && 
                            !meal.name.toLowerCase().includes("salmon") && 
                            !meal.name.toLowerCase().includes("tuna") && 
                            !meal.name.toLowerCase().includes("shrimp") && 
                            !meal.name.toLowerCase().includes("cod");
    });

    // Add filter event listeners
    document.getElementById('allMealsFilter').addEventListener('change', filterMeals);
    document.getElementById('vegetarianFilter').addEventListener('change', filterMeals);
    document.getElementById('nonVegetarianFilter').addEventListener('change', filterMeals);

    // Function to filter meals based on selected filter
    function filterMeals() {
        // Get current filter state
        const showAll = document.getElementById('allMealsFilter').checked;
        const showVegetarian = document.getElementById('vegetarianFilter').checked;
        const showNonVegetarian = document.getElementById('nonVegetarianFilter').checked;
        
        // Filter the meals
        let filteredMeals = suggestedMeals;
        
        if (showVegetarian) {
            filteredMeals = suggestedMeals.filter(meal => meal.isVegetarian);
        } else if (showNonVegetarian) {
            filteredMeals = suggestedMeals.filter(meal => !meal.isVegetarian);
        }
        
        // Display the filtered meals
        displayMeals(filteredMeals);
    }

    // Function to display meals
    function displayMeals(mealsToDisplay) {
        const mealList = document.getElementById('mealList');
        mealList.innerHTML = "";
        
        if (mealsToDisplay.length === 0) {
            mealList.innerHTML = "<p>No meals match your criteria. Try adjusting your filters.</p>";
        } else {
            mealsToDisplay.forEach(meal => {
                let mealItem = document.createElement('div');
                mealItem.classList.add('meal');
                
                // Add vegetarian or non-vegetarian badge
                let mealHTML = `<h3>${meal.name}`;
                if (meal.isVegetarian) {
                    mealHTML += ` <span class="veg-badge">Veg</span>`;
                } else {
                    mealHTML += ` <span class="non-veg-badge">Non-Veg</span>`;
                }
                mealHTML += `</h3>`;
                
                // Add nutritional info
                mealHTML += `<p class="nutrition-info">
                    Calories: ${meal.calories} | 
                    Protein: ${meal.protein}g | 
                    Fiber: ${meal.fiber}g | 
                    Sugar: ${meal.sugar}g | 
                    Fat: ${meal.fat}g
                </p>`;
                
                mealHTML += `<p><strong>Ingredients:</strong></p><ul>`;
                for (let ingredient in meal.ingredients) {
                    mealHTML += `<li>${ingredient}: ${meal.ingredients[ingredient]}g</li>`;
                }
                mealHTML += `</ul>`;
                mealItem.innerHTML = mealHTML;
                mealList.appendChild(mealItem);
            });
        }
    }

    // Add CSS for vegetarian and non-vegetarian badges
    const style = document.createElement('style');
    style.textContent = `
    .veg-badge {
        background-color: #4CAF50;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7em;
        vertical-align: middle;
        margin-left: 5px;
    }
    .non-veg-badge {
        background-color: #FF5722;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7em;
        vertical-align: middle;
        margin-left: 5px;
    }
    `;
    document.head.appendChild(style);

    // Improved matching function with ±100% tolerance
    function isWithinTolerance(value, target) {
        if (isNaN(value) || isNaN(target)) return false;
        if (target === 0) return value === 0;
        
        const tolerance = 0.50; // ±100% tolerance
        const lowerBound = target * (1 - tolerance);
        const upperBound = target * (1 + tolerance);
        
        return value >= lowerBound && value <= upperBound;
    }

    // Filter meals based on the user's input and approximate matching
    suggestedMeals = meals.filter(meal => {
        return isWithinTolerance(meal.fiber, fiber) &&
               isWithinTolerance(meal.calories, calories) &&
               isWithinTolerance(meal.protein, protein) &&
               isWithinTolerance(meal.sugar, sugar) &&
               isWithinTolerance(meal.fat, fat) &&
               isWithinTolerance(meal.vitamins, vitamins);
    });

    // Reset filter to "All Meals"
    document.getElementById('allMealsFilter').checked = true;

    // Display the meals
    displayMeals(suggestedMeals);
});
