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
                            !meal.name.toLowerCase().includes("cod") &&
                            !meal.name.toLowerCase().includes("pork") &&
                            !meal.name.toLowerCase().includes("lamb") &&
                            !meal.name.toLowerCase().includes("goat") &&
                            !meal.name.toLowerCase().includes("katsu") &&
                            !meal.name.toLowerCase().includes("sashimi") &&
                            !meal.name.toLowerCase().includes("tandoori");
        
        // Determine if meal is vegan (no animal products)
        meal.isVegan = meal.isVegetarian && 
                      !meal.name.toLowerCase().includes("cheese") && 
                      !meal.name.toLowerCase().includes("yogurt") && 
                      !meal.name.toLowerCase().includes("milk") && 
                      !meal.name.toLowerCase().includes("egg") && 
                      !meal.name.toLowerCase().includes("honey") && 
                      !meal.name.toLowerCase().includes("butter");

        // Determine if meal is a liquid (soup, smoothie, etc.)
        meal.isLiquid = meal.name.toLowerCase().includes("soup") || 
                        meal.name.toLowerCase().includes("smoothie") ||
                        meal.name.toLowerCase().includes("juice") ||
                        meal.name.toLowerCase().includes("shake");

        // Determine cuisine type based on ingredients and name
        meal.isAmerican = meal.name.toLowerCase().includes("burger") || 
                         meal.name.toLowerCase().includes("sandwich") ||
                         meal.name.toLowerCase().includes("toast") ||
                         meal.name.toLowerCase().includes("pancake");
                     
        meal.isAsian = meal.name.toLowerCase().includes("stir fry") || 
                      meal.name.toLowerCase().includes("curry") ||
                      meal.name.toLowerCase().includes("soy sauce") ||
                      meal.name.toLowerCase().includes("rice") ||
                      meal.name.toLowerCase().includes("noodle");
                  
        meal.isChinese = meal.name.toLowerCase().includes("stir fry") || 
                        meal.name.toLowerCase().includes("fried rice") ||
                        meal.name.toLowerCase().includes("soy sauce") ||
                        meal.name.toLowerCase().includes("noodle");
                    
        // Indian cuisine detection - enhanced
        meal.isIndian = meal.name.toLowerCase().includes("curry") || 
                       meal.name.toLowerCase().includes("masala") ||
                       meal.name.toLowerCase().includes("tikka") ||
                       meal.name.toLowerCase().includes("lentil") ||
                       meal.name.toLowerCase().includes("chutney") ||
                       meal.name.toLowerCase().includes("paneer") ||
                       meal.name.toLowerCase().includes("biryani") ||
                       meal.name.toLowerCase().includes("naan") ||
                       meal.name.toLowerCase().includes("dal") ||
                       meal.name.toLowerCase().includes("aloo") ||
                       meal.name.toLowerCase().includes("samosa") ||
                       meal.name.toLowerCase().includes("tandoori") ||
                       meal.name.toLowerCase().includes("rogan josh") ||
                       meal.name.toLowerCase().includes("malai kofta") ||
                       meal.name.toLowerCase().includes("baingan bharta") ||
                       meal.name.toLowerCase().includes("dhokla") ||
                       meal.name.toLowerCase().includes("pav bhaji");
                  
        // Japanese cuisine detection - enhanced
        meal.isJapanese = meal.name.toLowerCase().includes("sushi") || 
                         meal.name.toLowerCase().includes("miso") ||
                         meal.name.toLowerCase().includes("teriyaki") ||
                         meal.name.toLowerCase().includes("ramen") ||
                         meal.name.toLowerCase().includes("tempura") ||
                         meal.name.toLowerCase().includes("soba") ||
                         meal.name.toLowerCase().includes("okonomiyaki") ||
                         meal.name.toLowerCase().includes("onigiri") ||
                         meal.name.toLowerCase().includes("katsu") ||
                         meal.name.toLowerCase().includes("chirashi") ||
                         meal.name.toLowerCase().includes("sashimi") ||
                         meal.name.toLowerCase().includes("bonito") ||
                         meal.name.toLowerCase().includes("tonkatsu") ||
                         meal.name.toLowerCase().includes("oyakodon") ||
                         meal.name.toLowerCase().includes("udon") ||
                         meal.name.toLowerCase().includes("tamagoyaki") ||
                         meal.name.toLowerCase().includes("yakitori") ||
                         meal.name.toLowerCase().includes("dashi");
                         
        // Mediterranean cuisine detection - enhanced
        meal.isMediterranean = meal.name.toLowerCase().includes("olive oil") || 
                              meal.name.toLowerCase().includes("feta") ||
                              meal.name.toLowerCase().includes("hummus") ||
                              meal.name.toLowerCase().includes("greek") ||
                              meal.name.toLowerCase().includes("tabbouleh") ||
                              meal.name.toLowerCase().includes("falafel") ||
                              meal.name.toLowerCase().includes("halloumi") ||
                              meal.name.toLowerCase().includes("shakshuka") ||
                              meal.name.toLowerCase().includes("spanakopita") ||
                              meal.name.toLowerCase().includes("moussaka") ||
                              meal.name.toLowerCase().includes("mezze") ||
                              meal.name.toLowerCase().includes("baba ganoush") ||
                              meal.name.toLowerCase().includes("olives") ||
                              meal.name.toLowerCase().includes("dolmas") ||
                              meal.name.toLowerCase().includes("pastitsio") ||
                              meal.name.toLowerCase().includes("souvlaki") ||
                              meal.name.toLowerCase().includes("avgolemono") ||
                              meal.name.toLowerCase().includes("imam bayildi");
                          
        meal.isMexican = meal.name.toLowerCase().includes("taco") || 
                        meal.name.toLowerCase().includes("burrito") ||
                        meal.name.toLowerCase().includes("salsa") ||
                        meal.name.toLowerCase().includes("cilantro");
                    
        meal.isItalian = meal.name.toLowerCase().includes("pasta") || 
                        meal.name.toLowerCase().includes("pizza") ||
                        meal.name.toLowerCase().includes("parmesan") ||
                        meal.name.toLowerCase().includes("mozzarella");

        meal.isJapanese = meal.name.toLowerCase().includes("sushi") || 
                         meal.name.toLowerCase().includes("miso") ||
                         meal.name.toLowerCase().includes("teriyaki") ||
                         meal.name.toLowerCase().includes("ramen");
    });

    // Add filter event listeners
    document.getElementById('allMealsFilter').addEventListener('change', filterMeals);
    document.getElementById('vegetarianFilter').addEventListener('change', filterMeals);
    document.getElementById('nonVegetarianFilter').addEventListener('change', filterMeals);
    document.getElementById('veganFilter').addEventListener('change', filterMeals);
    document.getElementById('liquidFilter').addEventListener('change', filterMeals);

    // Add cuisine filter event listeners
    document.getElementById('allCuisinesFilter').addEventListener('change', filterMeals);
    document.getElementById('americanFilter').addEventListener('change', filterMeals);
    document.getElementById('asianFilter').addEventListener('change', filterMeals);
    document.getElementById('chineseFilter').addEventListener('change', filterMeals);
    document.getElementById('indianFilter').addEventListener('change', filterMeals);
    document.getElementById('italianFilter').addEventListener('change', filterMeals);
    document.getElementById('japaneseFilter').addEventListener('change', filterMeals);
    document.getElementById('mediterraneanFilter').addEventListener('change', filterMeals);
    document.getElementById('mexicanFilter').addEventListener('change', filterMeals);

    // Function to filter meals based on selected filter
    function filterMeals() {
        // Get current diet filter state
        const showAll = document.getElementById('allMealsFilter').checked;
        const showVegetarian = document.getElementById('vegetarianFilter').checked;
        const showNonVegetarian = document.getElementById('nonVegetarianFilter').checked;
        const showVegan = document.getElementById('veganFilter').checked;
        const showLiquid = document.getElementById('liquidFilter').checked;
        
        // Get current cuisine filter state
        const showAllCuisines = document.getElementById('allCuisinesFilter').checked;
        const showAmerican = document.getElementById('americanFilter').checked;
        const showAsian = document.getElementById('asianFilter').checked;
        const showChinese = document.getElementById('chineseFilter').checked;
        const showIndian = document.getElementById('indianFilter').checked;
        const showItalian = document.getElementById('italianFilter').checked;
        const showJapanese = document.getElementById('japaneseFilter').checked;
        const showMediterranean = document.getElementById('mediterraneanFilter').checked;
        const showMexican = document.getElementById('mexicanFilter').checked;
        
        // Filter the meals by diet type
        let filteredMeals = suggestedMeals;
        
        if (!showAll) {
            if (showVegetarian) {
                filteredMeals = filteredMeals.filter(meal => meal.isVegetarian && !meal.isVegan);
            } else if (showNonVegetarian) {
                filteredMeals = filteredMeals.filter(meal => !meal.isVegetarian);
            } else if (showVegan) {
                filteredMeals = filteredMeals.filter(meal => meal.isVegan);
            } else if (showLiquid) {
                filteredMeals = filteredMeals.filter(meal => meal.isLiquid);
            }
        }
        
        // Further filter by cuisine type
        if (!showAllCuisines) {
            if (showAmerican) {
                filteredMeals = filteredMeals.filter(meal => meal.isAmerican);
            } else if (showAsian) {
                filteredMeals = filteredMeals.filter(meal => meal.isAsian);
            } else if (showChinese) {
                filteredMeals = filteredMeals.filter(meal => meal.isChinese);
            } else if (showIndian) {
                filteredMeals = filteredMeals.filter(meal => meal.isIndian);
            } else if (showItalian) {
                filteredMeals = filteredMeals.filter(meal => meal.isItalian);
            } else if (showJapanese) {
                filteredMeals = filteredMeals.filter(meal => meal.isJapanese);
            } else if (showMediterranean) {
                filteredMeals = filteredMeals.filter(meal => meal.isMediterranean);
            } else if (showMexican) {
                filteredMeals = filteredMeals.filter(meal => meal.isMexican);
            }
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
    document.getElementById('allCuisinesFilter').checked = true;

    // Display the meals
    displayMeals(suggestedMeals);
});

// Enhanced meal combination suggestion function
function suggestMealCombinations(meal) {
    // Get complementary meals with more sophisticated criteria
    const complementaryMeals = meals.filter(otherMeal => {
        // Don't suggest the same meal
        if (otherMeal.name === meal.name) return false;
        
        // Nutritional balance criteria
        const needsMoreProtein = meal.protein < 10 && otherMeal.protein > 15;
        const needsMoreFiber = meal.fiber < 4 && otherMeal.fiber > 6;
        const balancedCalories = meal.calories + otherMeal.calories < 600; // Keep total calories reasonable
        const complementaryFat = meal.fat > 10 ? otherMeal.fat < 8 : otherMeal.fat > 5; // Balance fat content
        const vitaminBoost = meal.vitamins < 30 && otherMeal.vitamins > 40; // Boost vitamin content
        
        // Meal type complementary criteria
        const liquidWithSolid = meal.isLiquid && !otherMeal.isLiquid; // Pair liquid with solid
        const veganWithProtein = meal.isVegan && otherMeal.protein > 20 && !otherMeal.isVegan; // Balance vegan meals with protein
        
        // Cuisine variety - don't pair same cuisine
        const differentCuisine = 
            (meal.isAsian && !otherMeal.isAsian) ||
            (meal.isAmerican && !otherMeal.isAmerican) ||
            (meal.isItalian && !otherMeal.isItalian) ||
            (meal.isMediterranean && !otherMeal.isMediterranean) ||
            (meal.isIndian && !otherMeal.isIndian) ||
            (meal.isMexican && !otherMeal.isMexican) ||
            (meal.isJapanese && !otherMeal.isJapanese) ||
            (meal.isChinese && !otherMeal.isChinese);
            
        // Calculate a "complementary score" based on multiple factors
        let score = 0;
        if (needsMoreProtein) score += 2;
        if (needsMoreFiber) score += 2;
        if (balancedCalories) score += 1;
        if (complementaryFat) score += 1;
        if (vitaminBoost) score += 2;
        if (liquidWithSolid) score += 3;
        if (veganWithProtein) score += 3;
        if (differentCuisine) score += 2;
        
        // Only suggest meals with a good complementary score
        otherMeal.complementaryScore = score;
        return score >= 3;
    });
    
    // Sort by complementary score
    complementaryMeals.sort((a, b) => b.complementaryScore - a.complementaryScore);
    
    // Return top suggestions
    return complementaryMeals.slice(0, 3);
}

// Enhanced function to show suggestions with different reasons
function showSuggestions(button, mealName) {
    const suggestionsContainer = button.nextElementSibling;
    
    // Toggle display
    if (suggestionsContainer.style.display === 'none') {
        // Find the meal
        const selectedMeal = meals.find(meal => meal.name === mealName);
        if (!selectedMeal) return;
        
        // Get suggestions
        const suggestions = suggestMealCombinations(selectedMeal);
        
        // Display suggestions
        if (suggestions.length === 0) {
            suggestionsContainer.innerHTML = '<p>No complementary meals found.</p>';
        } else {
            let suggestionsHTML = '<h4>Suggested Combinations:</h4><ul class="suggestions-list">';
            
            // Track used reasons to avoid repetition
            const usedReasons = new Set();
            
            suggestions.forEach((suggestion, index) => {
                // Generate all possible reasons for this suggestion
                const possibleReasons = [];
                
                if (selectedMeal.protein < 10 && suggestion.protein > 15) {
                    possibleReasons.push("adds protein");
                }
                if (selectedMeal.fiber < 4 && suggestion.fiber > 6) {
                    possibleReasons.push("adds fiber");
                }
                if (selectedMeal.isLiquid && !suggestion.isLiquid) {
                    possibleReasons.push("pairs liquid with solid");
                }
                if (selectedMeal.vitamins < 30 && suggestion.vitamins > 40) {
                    possibleReasons.push("boosts vitamins");
                }
                if (selectedMeal.isVegan && suggestion.protein > 20 && !suggestion.isVegan) {
                    possibleReasons.push("complements vegan meal with protein");
                }
                if (selectedMeal.fat > 10 && suggestion.fat < 8) {
                    possibleReasons.push("balances fat content");
                }
                if (selectedMeal.calories + suggestion.calories < 500) {
                    possibleReasons.push("keeps total calories in check");
                }
                if (selectedMeal.sugar > 10 && suggestion.sugar < 5) {
                    possibleReasons.push("balances sugar content");
                }
                
                // If no specific reasons, add a generic one
                if (possibleReasons.length === 0) {
                    possibleReasons.push("balances overall nutrition");
                }
                
                // Find a reason that hasn't been used yet
                let reason = "balances nutrition";
                for (const possibleReason of possibleReasons) {
                    if (!usedReasons.has(possibleReason)) {
                        reason = possibleReason;
                        usedReasons.add(possibleReason);
                        break;
                    }
                }
                
                // If all reasons have been used, just use the first one
                if (reason === "balances nutrition" && possibleReasons.length > 0) {
                    reason = possibleReasons[0];
                }
                
                suggestionsHTML += `<li>${suggestion.name} 
                    <span class="suggestion-reason">(${reason})</span>
                </li>`;
            });
            
            suggestionsHTML += '</ul>';
            suggestionsContainer.innerHTML = suggestionsHTML;
        }
        
        suggestionsContainer.style.display = 'block';
        button.textContent = 'Hide Suggestions';
    } else {
        suggestionsContainer.style.display = 'none';
        button.textContent = 'Suggest Combinations';
    }
}
