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
            const mealName = meal.name.toLowerCase();
            
            // Determine if meal is vegetarian (no meat or fish)
            processedMeal.isVegetarian = !mealName.includes("chicken") && 
                                !mealName.includes("beef") && 
                                !mealName.includes("turkey") && 
                                !mealName.includes("salmon") && 
                                !mealName.includes("tuna") && 
                                !mealName.includes("shrimp") && 
                                !mealName.includes("cod") &&
                                !mealName.includes("pork") &&
                                !mealName.includes("lamb") &&
                                !mealName.includes("goat") &&
                                !mealName.includes("katsu") &&
                                !mealName.includes("sashimi") &&
                                !mealName.includes("tandoori") &&
                                !mealName.includes("meat");
            
            // Determine if meal is vegan (vegetarian + no animal products)
            processedMeal.isVegan = processedMeal.isVegetarian && 
                          !mealName.includes("cheese") && 
                          !mealName.includes("yogurt") && 
                          !mealName.includes("milk") && 
                          !mealName.includes("egg") && 
                          !mealName.includes("honey") && 
                          !mealName.includes("butter");
            
            // Determine if meal is liquid
            processedMeal.isLiquid = mealName.includes("soup") || 
                            mealName.includes("smoothie") ||
                            mealName.includes("juice") ||
                            mealName.includes("shake");
            
            // Determine cuisine types
            processedMeal.isAmerican = mealName.includes("burger") || 
                             mealName.includes("sandwich") ||
                             mealName.includes("toast") ||
                             mealName.includes("pancake");
            
            
            processedMeal.isChinese = mealName.includes("stir fry") || 
                            mealName.includes("fried rice") ||
                            mealName.includes("soy sauce") ||
                            mealName.includes("chow mein") ||
                            mealName.includes("wonton") ||
                            mealName.includes("dim sum") ||
                            mealName.includes("noodle");
            
            processedMeal.isIndian = mealName.includes("curry") || 
                           mealName.includes("masala") ||
                           mealName.includes("tikka") ||
                           mealName.includes("lentil") ||
                           mealName.includes("paneer") ||
                           mealName.includes("pav bhaji") ||
                           mealName.includes("malai kofta") ||
                           mealName.includes("biryani");
            
            processedMeal.isJapanese = mealName.includes("sushi") || 
                             mealName.includes("miso") ||
                             mealName.includes("teriyaki") ||
                             mealName.includes("ramen") ||
                             mealName.includes("udon") ||
                             mealName.includes("soba") ||
                             mealName.includes("gyoza") ||
                             mealName.includes("tempura");
            
            processedMeal.isMediterranean = mealName.includes("olive oil") || 
                                  mealName.includes("feta") ||
                                  mealName.includes("hummus") ||
                                  mealName.includes("greek") ||
                                  mealName.includes("tahini") ||
                                  mealName.includes("tabbouleh") ||
                                  mealName.includes("spanakopita") ||
                                  mealName.includes("moussaka") ||
                                  mealName.includes("mezze") ||
                                  mealName.includes("falafel");
            
            processedMeal.isMexican = mealName.includes("taco") || 
                            mealName.includes("burrito") ||
                            mealName.includes("salsa") ||
                            mealName.includes("cilantro");
            
            processedMeal.isItalian = mealName.includes("pasta") || 
                            mealName.includes("pizza") ||
                            mealName.includes("parmesan") ||
                            mealName.includes("mozzarella") ||
                            mealName.includes("lasagna") ||
                            mealName.includes("spaghetti") ||
                            mealName.includes("marinara") ||
                            mealName.includes("pesto") ||
                            mealName.includes("gnocchi") ||
                            mealName.includes("ravioli") ||
                            mealName.includes("cannelloni") ||
                            mealName.includes("risotto");
            
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
        
        // Display the filtered meals directly
        displayMeals(filteredMeals);
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
                
                // Add save meal button
                mealHTML += `<button class="save-meal-btn" data-meal='${JSON.stringify(meal)}'>Save Meal</button>`;
                
                mealCard.innerHTML = mealHTML;
                mealContainer.appendChild(mealCard);
            });
            
            mealList.appendChild(mealContainer);
            
            // Add event listeners to save meal buttons for current page
            mealContainer.querySelectorAll('.save-meal-btn').forEach(button => {
                button.addEventListener('click', saveMealToFirebase);
            });
            
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
    
    function saveMealToFirebase(event) {
        console.log("Save meal button clicked");
        
        // Get the meal data from the button's data attribute
        const mealData = JSON.parse(event.target.getAttribute('data-meal'));
        console.log("Meal data to save:", mealData);
        
        // Check if user is logged in (not guest)
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        const isGuest = userName === 'Guest' && userEmail === 'guest@example.com';
        
        if (isGuest) {
            alert("Please log in to save meals to your account.");
            return;
        }
        
        // Import Firebase modules
        import('https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js').then((firebaseApp) => {
            import('https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js').then((firebaseAuth) => {
                import('https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js').then((firebaseFirestore) => {
                    // Initialize Firebase
                    const firebaseConfig = {
                        apiKey: "AIzaSyARSa7Bs-0g55DBhi2EQvJ32BHlszCv8WY",
                        authDomain: "daily-meal-planner-f96db.firebaseapp.com",
                        projectId: "daily-meal-planner-f96db",
                        storageBucket: "daily-meal-planner-f96db.firebasestorage.app",
                        messagingSenderId: "494913060879",
                        appId: "1:494913060879:web:7c346a989ca633f33b237a"
                    };
                    
                    // Check if Firebase is already initialized
                    let app;
                    try {
                        app = firebaseApp.getApp();
                    } catch (error) {
                        app = firebaseApp.initializeApp(firebaseConfig);
                    }
                    
                    const auth = firebaseAuth.getAuth(app);
                    const db = firebaseFirestore.getFirestore(app);
                    
                    // Get current user
                    const user = auth.currentUser;
                    console.log("Current user:", user ? user.uid : "No user");
                    
                    if (user) {
                        // Save meal to user's saved meals collection
                        const userMealsRef = firebaseFirestore.collection(db, "users", user.uid, "savedMeals");
                        
                        // Clean the meal data to ensure it's Firestore-compatible
                        const cleanedMealData = JSON.parse(JSON.stringify(mealData));
                        
                        // Add meal with timestamp
                        firebaseFirestore.addDoc(userMealsRef, {
                            ...cleanedMealData,
                            savedAt: new Date().toISOString()
                        })
                        .then(() => {
                            alert("Meal saved successfully!");
                            event.target.textContent = "Saved!";
                            event.target.disabled = true;
                        })
                        .catch(error => {
                            console.error("Error saving meal:", error);
                            alert("Failed to save meal: " + error.message);
                        });
                    } else {
                        // If auth.currentUser is null but we have localStorage data, try to save with user ID from localStorage
                        const userEmail = localStorage.getItem('userEmail');
                        if (userEmail && userEmail !== 'guest@example.com') {
                            console.log("User not immediately available, waiting for auth state change");
                            // We need to get the user ID from Firebase Auth
                            const unsubscribe = firebaseAuth.onAuthStateChanged(auth, (user) => {
                                unsubscribe(); // Unsubscribe after first callback
                                
                                if (user) {
                                    console.log("User found after auth state change:", user.uid);
                                    // Now we have the user, save the meal
                                    const userMealsRef = firebaseFirestore.collection(db, "users", user.uid, "savedMeals");
                                    
                                    // Clean the meal data to ensure it's Firestore-compatible
                                    const cleanedMealData = JSON.parse(JSON.stringify(mealData));
                                    
                                    firebaseFirestore.addDoc(userMealsRef, {
                                        ...cleanedMealData,
                                        savedAt: new Date().toISOString()
                                    })
                                    .then(() => {
                                        alert("Meal saved successfully!");
                                        event.target.textContent = "Saved!";
                                        event.target.disabled = true;
                                    })
                                    .catch(error => {
                                        console.error("Error saving meal:", error);
                                        alert("Failed to save meal: " + error.message);
                                    });
                                } else {
                                    console.log("No user found after auth state change");
                                    alert("Please log in to save meals to your account.");
                                }
                            });
                        } else {
                            alert("Please log in to save meals to your account.");
                        }
                    }
                }).catch(error => {
                    console.error("Error importing Firestore:", error);
                    alert("Failed to load Firebase Firestore module: " + error.message);
                });
            }).catch(error => {
                console.error("Error importing Auth:", error);
                alert("Failed to load Firebase Auth module: " + error.message);
            });
        }).catch(error => {
            console.error("Error importing Firebase app:", error);
            alert("Failed to load Firebase App module: " + error.message);
        });
    }
});
