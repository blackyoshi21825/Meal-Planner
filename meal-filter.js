// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("meal-filter.js loaded");
    
    // Set up the event listener for the Get Meals button
    const getMealsBtn = document.getElementById('getMealsBtn');
    if (getMealsBtn) {
        console.log("Get Meals button found, adding event listener");
        
        // Remove any existing event listeners by cloning and replacing the button
        const newButton = getMealsBtn.cloneNode(true);
        getMealsBtn.parentNode.replaceChild(newButton, getMealsBtn);
        
        // Add the new event listener
        newButton.addEventListener('click', function(event) {
            // Prevent default form submission
            event.preventDefault();
            console.log("Get Meals button clicked");
            
            // Get form values
            const fiber = parseFloat(document.getElementById('fiber').value);
            const calories = parseFloat(document.getElementById('calories').value);
            const protein = parseFloat(document.getElementById('protein').value);
            const sugar = parseFloat(document.getElementById('sugar').value);
            const fat = parseFloat(document.getElementById('fat').value);
            const vitamins = parseFloat(document.getElementById('vitamins').value);
            
            console.log("Input values:", { fiber, calories, protein, sugar, fat, vitamins });
            
            // Check if all fields are filled
            if (isNaN(fiber) || isNaN(calories) || isNaN(protein) || 
                isNaN(sugar) || isNaN(fat) || isNaN(vitamins)) {
                alert("Please fill in all fields with valid numbers");
                return;
            }
            
            // Call the processing function
            filterAndDisplayMeals(fiber, calories, protein, sugar, fat, vitamins);
        });
    } else {
        console.error("Get Meals button not found!");
    }
    
    // Function to check if a value is within tolerance of a target
    function isWithinTolerance(value, target) {
        if (isNaN(value) || isNaN(target)) return false;
        if (target === 0) return value === 0;
        
        const tolerance = 0.50; // 50% tolerance
        const lowerBound = target * (1 - tolerance);
        const upperBound = target * (1 + tolerance);
        
        return value >= lowerBound && value <= upperBound;
    }
    
    // Main function to filter and display meals
    function filterAndDisplayMeals(fiber, calories, protein, sugar, fat, vitamins) {
        console.log("filterAndDisplayMeals called");
        
        // Check if meals array exists
        if (typeof meals === 'undefined' || !Array.isArray(meals) || meals.length === 0) {
            console.error("Meals array is missing or empty!");
            alert("Error: Meal data not loaded properly. Please refresh the page.");
            return;
        }
        
        console.log("Found meals array with", meals.length, "items");
        
        // Process meals to add dietary and cuisine properties
        const processedMeals = meals.map(meal => {
            const processedMeal = {...meal};
            
            // Determine if meal is vegetarian
            processedMeal.isVegetarian = !meal.name.toLowerCase().includes("chicken") && 
                                !meal.name.toLowerCase().includes("beef") && 
                                !meal.name.toLowerCase().includes("turkey") && 
                                !meal.name.toLowerCase().includes("salmon") && 
                                !meal.name.toLowerCase().includes("tuna") && 
                                !meal.name.toLowerCase().includes("shrimp") && 
                                !meal.name.toLowerCase().includes("cod") &&
                                !meal.name.toLowerCase().includes("pork") &&
                                !meal.name.toLowerCase().includes("lamb") &&
                                !meal.name.toLowerCase().includes("goat") &&
                                !meal.name.toLowerCase().includes("katsu") &&
                                !meal.name.toLowerCase().includes("sashimi") &&
                                !meal.name.toLowerCase().includes("tandoori");
            
            // Determine if meal is vegan
            processedMeal.isVegan = processedMeal.isVegetarian && 
                          !meal.name.toLowerCase().includes("cheese") && 
                          !meal.name.toLowerCase().includes("yogurt") && 
                          !meal.name.toLowerCase().includes("milk") && 
                          !meal.name.toLowerCase().includes("egg") && 
                          !meal.name.toLowerCase().includes("honey") && 
                          !meal.name.toLowerCase().includes("butter");
            
            // Determine if meal is liquid
            processedMeal.isLiquid = meal.name.toLowerCase().includes("soup") || 
                            meal.name.toLowerCase().includes("smoothie") ||
                            meal.name.toLowerCase().includes("juice") ||
                            meal.name.toLowerCase().includes("shake");
            
            // Determine cuisine types
            processedMeal.isAmerican = meal.name.toLowerCase().includes("burger") || 
                             meal.name.toLowerCase().includes("sandwich") ||
                             meal.name.toLowerCase().includes("toast") ||
                             meal.name.toLowerCase().includes("pancake");
            
            processedMeal.isAsian = meal.name.toLowerCase().includes("stir fry") || 
                          meal.name.toLowerCase().includes("curry") ||
                          meal.name.toLowerCase().includes("soy sauce") ||
                          meal.name.toLowerCase().includes("rice") ||
                          meal.name.toLowerCase().includes("noodle");
            
            processedMeal.isChinese = meal.name.toLowerCase().includes("stir fry") || 
                            meal.name.toLowerCase().includes("fried rice") ||
                            meal.name.toLowerCase().includes("soy sauce") ||
                            meal.name.toLowerCase().includes("noodle");
            
            processedMeal.isIndian = meal.name.toLowerCase().includes("curry") || 
                           meal.name.toLowerCase().includes("masala") ||
                           meal.name.toLowerCase().includes("tikka") ||
                           meal.name.toLowerCase().includes("lentil") ||
                           meal.name.toLowerCase().includes("paneer") ||
                           meal.name.toLowerCase().includes("biryani");
            
            processedMeal.isJapanese = meal.name.toLowerCase().includes("sushi") || 
                             meal.name.toLowerCase().includes("miso") ||
                             meal.name.toLowerCase().includes("teriyaki") ||
                             meal.name.toLowerCase().includes("ramen") ||
                             meal.name.toLowerCase().includes("tempura");
            
            processedMeal.isMediterranean = meal.name.toLowerCase().includes("olive oil") || 
                                  meal.name.toLowerCase().includes("feta") ||
                                  meal.name.toLowerCase().includes("hummus") ||
                                  meal.name.toLowerCase().includes("greek") ||
                                  meal.name.toLowerCase().includes("falafel");
            
            processedMeal.isMexican = meal.name.toLowerCase().includes("taco") || 
                            meal.name.toLowerCase().includes("burrito") ||
                            meal.name.toLowerCase().includes("salsa") ||
                            meal.name.toLowerCase().includes("cilantro");
            
            processedMeal.isItalian = meal.name.toLowerCase().includes("pasta") || 
                            meal.name.toLowerCase().includes("pizza") ||
                            meal.name.toLowerCase().includes("parmesan") ||
                            meal.name.toLowerCase().includes("risotto");
            
            return processedMeal;
        });
        
        // Filter meals based on nutritional criteria
        const filteredMeals = processedMeals.filter(meal => {
            return isWithinTolerance(meal.fiber, fiber) &&
                   isWithinTolerance(meal.calories, calories) &&
                   isWithinTolerance(meal.protein, protein) &&
                   isWithinTolerance(meal.sugar, sugar) &&
                   isWithinTolerance(meal.fat, fat) &&
                   isWithinTolerance(meal.vitamins, vitamins);
        });
        
        console.log("Filtered meals:", filteredMeals.length);
        
        // Store filtered meals for later filtering
        window.filteredMeals = filteredMeals;
        
        // Set up filter event listeners
        setupFilterListeners();
        
        // Display the filtered meals
        displayMeals(filteredMeals);
    }
    
    // Set up filter event listeners
    function setupFilterListeners() {
        // Diet filters
        const dietFilters = ['allMealsFilter', 'vegetarianFilter', 'nonVegetarianFilter', 'veganFilter', 'liquidFilter'];
        dietFilters.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // Remove existing listeners by cloning
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                newElement.addEventListener('change', applyFilters);
            }
        });
        
        // Cuisine filters
        const cuisineFilters = ['allCuisinesFilter', 'americanFilter', 'asianFilter', 'chineseFilter', 
                               'indianFilter', 'italianFilter', 'japaneseFilter', 'mediterraneanFilter', 'mexicanFilter'];
        cuisineFilters.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                // Remove existing listeners by cloning
                const newElement = element.cloneNode(true);
                element.parentNode.replaceChild(newElement, element);
                newElement.addEventListener('change', applyFilters);
            }
        });
        
        // Set default filters
        document.getElementById('allMealsFilter').checked = true;
        document.getElementById('allCuisinesFilter').checked = true;
    }
    
    // Apply filters to the meals
    function applyFilters() {
        console.log("Applying filters");
        
        if (!window.filteredMeals || !Array.isArray(window.filteredMeals)) {
            console.error("No filtered meals available");
            return;
        }
        
        // Get diet filter state
        const showAll = document.getElementById('allMealsFilter').checked;
        const showVegetarian = document.getElementById('vegetarianFilter').checked;
        const showNonVegetarian = document.getElementById('nonVegetarianFilter').checked;
        const showVegan = document.getElementById('veganFilter').checked;
        const showLiquid = document.getElementById('liquidFilter').checked;
        
        // Get cuisine filter state
        const showAllCuisines = document.getElementById('allCuisinesFilter').checked;
        const showAmerican = document.getElementById('americanFilter').checked;
        const showAsian = document.getElementById('asianFilter').checked;
        const showChinese = document.getElementById('chineseFilter').checked;
        const showIndian = document.getElementById('indianFilter').checked;
        const showItalian = document.getElementById('italianFilter').checked;
        const showJapanese = document.getElementById('japaneseFilter').checked;
        const showMediterranean = document.getElementById('mediterraneanFilter').checked;
        const showMexican = document.getElementById('mexicanFilter').checked;
        
        // Start with all filtered meals
        let displayMeals = [...window.filteredMeals];
        
        // Apply diet filters
        if (!showAll) {
            if (showVegetarian) {
                displayMeals = displayMeals.filter(meal => meal.isVegetarian && !meal.isVegan);
            } else if (showNonVegetarian) {
                displayMeals = displayMeals.filter(meal => !meal.isVegetarian);
            } else if (showVegan) {
                displayMeals = displayMeals.filter(meal => meal.isVegan);
            } else if (showLiquid) {
                displayMeals = displayMeals.filter(meal => meal.isLiquid);
            }
        }
        
        // Apply cuisine filters
        if (!showAllCuisines) {
            if (showAmerican) {
                displayMeals = displayMeals.filter(meal => meal.isAmerican);
            } else if (showAsian) {
                displayMeals = displayMeals.filter(meal => meal.isAsian);
            } else if (showChinese) {
                displayMeals = displayMeals.filter(meal => meal.isChinese);
            } else if (showIndian) {
                displayMeals = displayMeals.filter(meal => meal.isIndian);
            } else if (showItalian) {
                displayMeals = displayMeals.filter(meal => meal.isItalian);
            } else if (showJapanese) {
                displayMeals = displayMeals.filter(meal => meal.isJapanese);
            } else if (showMediterranean) {
                displayMeals = displayMeals.filter(meal => meal.isMediterranean);
            } else if (showMexican) {
                displayMeals = displayMeals.filter(meal => meal.isMexican);
            }
        }
        
        // Display the filtered meals
        displayMeals(displayMeals);
    }
    
    // Display meals in a card layout
    function displayMeals(mealsToDisplay) {
        console.log("Displaying", mealsToDisplay.length, "meals");
        
        const mealList = document.getElementById('mealList');
        if (!mealList) {
            console.error("mealList element not found!");
            return;
        }
        
        mealList.innerHTML = "";
        
        if (mealsToDisplay.length === 0) {
            mealList.innerHTML = "<p>No meals match your criteria. Try adjusting your filters.</p>";
            return;
        }
        
        // Pagination variables
        const mealsPerPage = 8;
        let currentPage = 1;
        const totalPages = Math.ceil(mealsToDisplay.length / mealsPerPage);
        
        // Function to show meals for current page
        function showPage(page) {
            const start = (page - 1) * mealsPerPage;
            const end = start + mealsPerPage;
            const currentPageMeals = mealsToDisplay.slice(start, end);
            
            // Create meal container
            const mealContainer = document.createElement('div');
            mealContainer.classList.add('meal-container');
            
            // Add each meal as a card
            currentPageMeals.forEach(meal => {
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
                
                // Add cuisine badges
                if (meal.isAmerican) {
                    mealHTML += ` <span class="american-badge">American</span>`;
                }
                if (meal.isAsian && !meal.isChinese && !meal.isIndian && !meal.isJapanese) {
                    mealHTML += ` <span class="asian-badge">Asian</span>`;
                }
                if (meal.isChinese) {
                    mealHTML += ` <span class="chinese-badge">Chinese</span>`;
                }
                if (meal.isIndian) {
                    mealHTML += ` <span class="indian-badge">Indian</span>`;
                }
                if (meal.isItalian) {
                    mealHTML += ` <span class="italian-badge">Italian</span>`;
                }
                if (meal.isJapanese) {
                    mealHTML += ` <span class="japanese-badge">Japanese</span>`;
                }
                if (meal.isMediterranean) {
                    mealHTML += ` <span class="mediterranean-badge">Mediterranean</span>`;
                }
                if (meal.isMexican) {
                    mealHTML += ` <span class="mexican-badge">Mexican</span>`;
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
            
            // Add pagination controls
            renderPaginationControls();
        }
        
        // Create pagination controls
        function renderPaginationControls() {
            const paginationDiv = document.createElement('div');
            paginationDiv.classList.add('pagination');
            
            // Previous button
            const prevBtn = document.createElement('button');
            prevBtn.textContent = 'Previous';
            prevBtn.disabled = currentPage === 1;
            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    mealList.innerHTML = "";
                    showPage(currentPage);
                }
            });
            
            // Page indicator
            const pageIndicator = document.createElement('span');
            pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
            pageIndicator.classList.add('page-indicator');
            
            // Next button
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next';
            nextBtn.disabled = currentPage === totalPages;
            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    mealList.innerHTML = "";
                    showPage(currentPage);
                }
            });
            
            paginationDiv.appendChild(prevBtn);
            paginationDiv.appendChild(pageIndicator);
            paginationDiv.appendChild(nextBtn);
            mealList.appendChild(paginationDiv);
        }
        
        // Show first page initially
        showPage(currentPage);
    }
});