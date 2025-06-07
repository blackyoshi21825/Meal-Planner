document.getElementById('nutrientForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get user input values
    const fiber = parseFloat(document.getElementById('fiber').value);
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value);
    const sugar = parseFloat(document.getElementById('sugar').value);
    const fat = parseFloat(document.getElementById('fat').value);
    const vitamins = parseFloat(document.getElementById('vitamins').value);

    // Add dietary properties to each meal
    meals.forEach(meal => {
        // Determine if meal is vegetarian based on name
        meal.isVegetarian = !meal.name.toLowerCase().includes("chicken") && 
                            !meal.name.toLowerCase().includes("beef") && 
                            !meal.name.toLowerCase().includes("turkey") && 
                            !meal.name.toLowerCase().includes("salmon") && 
                            !meal.name.toLowerCase().includes("tuna") && 
                            !meal.name.toLowerCase().includes("shrimp") && 
                            !meal.name.toLowerCase().includes("cod");
        
        // Determine if meal is vegan (no animal products)
        meal.isVegan = meal.isVegetarian && 
                      !meal.name.toLowerCase().includes("cheese") && 
                      !meal.name.toLowerCase().includes("yogurt") && 
                      !meal.name.toLowerCase().includes("milk") && 
                      !meal.name.toLowerCase().includes("egg") && 
                      !meal.name.toLowerCase().includes("honey") && 
                      !meal.name.toLowerCase().includes("butter") &&
                      !meal.name.toLowerCase().includes("parmesan") &&
                      !meal.name.toLowerCase().includes("mozzarella") &&
                      !meal.name.toLowerCase().includes("feta") &&
                      !meal.name.toLowerCase().includes("cottage cheese") &&
                      !meal.name.toLowerCase().includes("mayonnaise") &&
                      !meal.name.toLowerCase().includes("cream") &&
                      !meal.name.toLowerCase().includes("whey");

        // Better approach: check ingredients instead of just name
        for (let ingredient in meal.ingredients) {
            const ingredientLower = ingredient.toLowerCase();
            if (ingredientLower.includes("cheese") || 
                ingredientLower.includes("milk") || 
                ingredientLower.includes("yogurt") || 
                ingredientLower.includes("egg") || 
                ingredientLower.includes("honey") || 
                ingredientLower.includes("butter") ||
                ingredientLower.includes("cream") ||
                ingredientLower.includes("mayonnaise") ||
                ingredientLower.includes("whey")) {
                meal.isVegan = false;
                break;
            }
        }

        // Determine if meal is a liquid (soup, smoothie, etc.)
        meal.isLiquid = meal.name.toLowerCase().includes("soup") || 
                        meal.name.toLowerCase().includes("smoothie") ||
                        meal.name.toLowerCase().includes("juice") ||
                        meal.name.toLowerCase().includes("shake") ||
                        meal.name.toLowerCase().includes("beverage") ||
                        meal.name.toLowerCase().includes("drink");
    });

    // Add filter event listeners
    document.getElementById('allMealsFilter').addEventListener('change', filterMeals);
    document.getElementById('vegetarianFilter').addEventListener('change', filterMeals);
    document.getElementById('nonVegetarianFilter').addEventListener('change', filterMeals);
    document.getElementById('veganFilter').addEventListener('change', filterMeals);
    document.getElementById('liquidFilter').addEventListener('change', filterMeals);

    // Function to filter meals based on selected filter
    function filterMeals() {
        // Get current filter state
        const showAll = document.getElementById('allMealsFilter').checked;
        const showVegetarian = document.getElementById('vegetarianFilter').checked;
        const showNonVegetarian = document.getElementById('nonVegetarianFilter').checked;
        const showVegan = document.getElementById('veganFilter').checked;
        const showLiquid = document.getElementById('liquidFilter').checked;
        
        // Filter the meals
        let filteredMeals = suggestedMeals;
        
        if (showVegetarian) {
            filteredMeals = suggestedMeals.filter(meal => meal.isVegetarian && !meal.isVegan);
        } else if (showNonVegetarian) {
            filteredMeals = suggestedMeals.filter(meal => !meal.isVegetarian);
        } else if (showVegan) {
            filteredMeals = suggestedMeals.filter(meal => meal.isVegan);
        } else if (showLiquid) {
            filteredMeals = suggestedMeals.filter(meal => meal.isLiquid);
        }
        
        // Display the filtered meals
        displayMeals(filteredMeals);
    }

    // Function to display meals in a simpler list layout
    function displayMeals(mealsToDisplay) {
        const mealList = document.getElementById('mealList');
        mealList.innerHTML = "";
        
        if (mealsToDisplay.length === 0) {
            mealList.innerHTML = "<p>No meals match your criteria. Try adjusting your filters.</p>";
            return;
        }
        
        // Create a container for the meals
        const mealContainer = document.createElement('div');
        mealContainer.classList.add('meal-container');
        
        // Add each meal as a card
        mealsToDisplay.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.classList.add('meal-card');
            
            // Create meal content
            let mealHTML = `<h3>${meal.name}`;
            
            // Add dietary badges
            if (meal.isVegan) {
                mealHTML += ` <span class="vegan-badge">Vegan</span>`;
            } else if (meal.isVegetarian) {
                mealHTML += ` <span class="veg-badge">Veg</span>`;
            } else {
                mealHTML += ` <span class="non-veg-badge">Non-Veg</span>`;
            }
            
            if (meal.isLiquid) {
                mealHTML += ` <span class="liquid-badge">Liquid</span>`;
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
            
            mealCard.innerHTML = mealHTML;
            mealContainer.appendChild(mealCard);
        });
        
        mealList.appendChild(mealContainer);
    }

    // Add CSS for the new layout
    const style = document.createElement('style');
    style.textContent = `
    .meal-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }

    .meal-card {
        background-color: #ecf0f1;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        width: 300px;
        transition: transform 0.2s, box-shadow 0.2s;
    }

    .meal-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

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
    .vegan-badge {
        background-color: #ff9900;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7em;
        vertical-align: middle;
        margin-left: 5px;
    }
    .liquid-badge {
        background-color: #2196F3;
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7em;
        vertical-align: middle;
        margin-left: 5px;
    }
    `;
    document.head.appendChild(style);

    // Improved matching function with ±50% tolerance
    function isWithinTolerance(value, target) {
        if (isNaN(value) || isNaN(target)) return false;
        if (target === 0) return value === 0;
        
        const tolerance = 0.50; // 50% tolerance
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
