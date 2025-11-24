// assistant.js
// Provides food lookup and a simple daily meal planner using the existing `meals` array.

(function () {
    // Lookup removed: assistant no longer exposes a free-text meal search.

    // Build badge HTML based on meal name heuristics
    function buildBadgesHTML(meal) {
        const name = (meal.name || '').toLowerCase();
        const isVegetarian = !(/chicken|beef|turkey|salmon|tuna|shrimp|cod|pork|lamb|goat|katsu|sashimi|tandoori|meat/.test(name));
        const isVegan = isVegetarian && !(/cheese|yogurt|milk|egg|eggs|honey|butter|paneer|feta|mozzarella|cottage/.test(name));
        const isLiquid = /soup|smoothie|juice|shake/.test(name);

        let badges = '';
        if (isVegan) badges += `<span class="vegan-badge">Vegan</span>`;
        else if (isVegetarian) badges += `<span class="veg-badge">Veg</span>`;
        else badges += `<span class="non-veg-badge">Non-Veg</span>`;

        if (isLiquid) badges += ` <span class="liquid-badge">Liquid</span>`;

        // cuisine badges
        if (/burger|sandwich|toast|pancake|bbq|bowl/.test(name)) badges += ` <span class="american-badge">American</span>`;
        if (/stir fry|fried rice|soy sauce|chow mein|wonton|dim sum|noodle/.test(name)) badges += ` <span class="chinese-badge">Chinese</span>`;
        if (/curry|masala|tikka|lentil|paneer|biryani|tandoori|dal/.test(name)) badges += ` <span class="indian-badge">Indian</span>`;
        if (/pasta|pizza|parmesan|mozzarella|spaghetti|risotto|ravioli|gnocchi/.test(name)) badges += ` <span class="italian-badge">Italian</span>`;
        if (/sushi|miso|teriyaki|ramen|udon|soba|yakitori/.test(name)) badges += ` <span class="japanese-badge">Japanese</span>`;
        if (/olive oil|feta|hummus|greek|tahini|tabbouleh|mezze|moussaka/.test(name)) badges += ` <span class="mediterranean-badge">Mediterranean</span>`;
        if (/taco|burrito|salsa|cilantro|quesadilla|corn tortilla|tamale|mole|elote|chilaquiles|carnitas|barbacoa|cotija|masa|hominy|pozole|chipotle|poblano|queso fresco|adobo/.test(name)) badges += ` <span class="mexican-badge">Mexican</span>`;

        return badges;
    }

    // Helper: determine if a meal matches diet/cuisine filters
    function mealMatchesFilters(meal, diet, cuisines) {
        const name = (meal.name || '').toLowerCase();

        // Inspect ingredient keys to improve diet detection
        const ingredientKeys = meal.ingredients ? Object.keys(meal.ingredients).join(' ').toLowerCase() : '';

        const meatRegex = /chicken|beef|turkey|pork|lamb|goat|bacon|ham|sausage|meat|shrimp|tuna|salmon|cod|trout|mackerel|sardine/;
        const dairyRegex = /cheese|yogurt|milk|butter|cream|paneer|feta|mozzarella|cottage|ricotta|parmesan|cheddar/;
        const eggRegex = /egg|eggs/;
        const honeyRegex = /honey/;

        const hasMeat = meatRegex.test(name) || meatRegex.test(ingredientKeys);
        const hasDairy = dairyRegex.test(name) || dairyRegex.test(ingredientKeys);
        const hasEgg = eggRegex.test(name) || eggRegex.test(ingredientKeys);
        const hasHoney = honeyRegex.test(name) || honeyRegex.test(ingredientKeys);

        const isVegetarian = !hasMeat;
        const isVegan = isVegetarian && !hasDairy && !hasEgg && !hasHoney;

        if (diet === 'vegan' && !isVegan) return false;
        if (diet === 'vegetarian' && !isVegetarian) return false;
        if (diet === 'non-veg' && isVegetarian) return false;

        // cuisine checks: if none selected, accept all
        if (!cuisines || cuisines.length === 0) return true;

        // map meal name and ingredients to cuisine flags (simple heuristics)
        const cuisineFlags = {
            med: /olive oil|feta|hummus|greek|tahini|tabbouleh|mezze|moussaka/.test(name) || /olive|feta|hummus|tahini/.test(ingredientKeys),
            indian: /curry|masala|tikka|lentil|paneer|dal|biryani|tandoori|chana/.test(name) || /lentil|curry|garam masala|chickpeas|paneer/.test(ingredientKeys),
            italian: /pasta|pizza|parmesan|mozzarella|lasagna|spaghetti|risotto|gnocchi|ravioli/.test(name) || /parmesan|mozzarella|pasta/.test(ingredientKeys),
            chinese: /stir fry|fried rice|soy sauce|chow mein|wonton|dim sum|noodle/.test(name) || /soy sauce|ginger|hoisin|szechuan/.test(ingredientKeys),
            japanese: /sushi|miso|teriyaki|ramen|udon|soba|yakitori|tamagoyaki/.test(name) || /miso|soba|udon|teriyaki/.test(ingredientKeys),
            mexican: /taco|burrito|salsa|cilantro|quesadilla|corn tortilla|tamale|mole|elote|chilaquiles|carnitas|barbacoa|cotija|masa|hominy|pozole|chipotle|poblano|queso fresco|adobo/.test(name) || /cilantro|corn tortilla|black beans|salsa|tamale|mole|elote|chile|masa|hominy|cotija|pozole|chipotle|poblano|adobo/.test(ingredientKeys),
            american: /burger|sandwich|toast|pancake|bbq|bowl/.test(name) || /burger|bbq/.test(ingredientKeys)
        };

        // if any selected cuisine flag matches, accept
        for (const c of cuisines) {
            if (c === 'any') return true;
            if (cuisineFlags[c]) return true;
        }
        return false;
    }

    // Simple randomized search to find combination of meals approximating targets.
    // This version classifies meals (Breakfast/Lunch/Dinner/Snack) and uniformly scales servings
    // so totals (especially calories) can reach the user's target more closely.
    function generateDailyPlan(targets, opts = {}) {
        const maxIter = opts.iterations || 4000;
        const allowSnack = opts.allowSnack !== false; // default true
        const diet = (opts.filters && opts.filters.diet) || 'any';
        const cuisines = (opts.filters && opts.filters.cuisines) || [];

        // build population according to filters
        let population = meals.slice();
        if (diet !== 'any' || (cuisines && cuisines.length > 0)) {
            population = population.filter(m => mealMatchesFilters(m, diet, cuisines));
        }

        if (!population || population.length === 0) return { err: Infinity, combo: [], sum: {} };

        // weights for nutrient importance
        const weights = { calories: 1.0, protein: 1.2, fiber: 0.6, sugar: 0.8, fat: 0.7, vitamins: 0.4 };

        // classify meal time (Breakfast/Lunch/Dinner/Snack) from name/ingredients
        function classifyMealTime(meal) {
            const n = (meal.name || '').toLowerCase();
            const keys = meal.ingredients ? Object.keys(meal.ingredients).join(' ').toLowerCase() : '';
            if (/pancake|oatmeal|overnight|porridge|granola|yogurt|omelette|egg|eggs|toast|smoothie|chia|waffle|cereal/.test(n + ' ' + keys)) return 'Breakfast';
            if (/salad|sandwich|wrap|bowl|tuna|turkey|chickpea|quinoa|rice|poke|bento/.test(n + ' ' + keys)) return 'Lunch';
            if (/curry|steak|grilled|roasted|baked|pasta|stew|dinner|soup|stir fry|fried rice|tandoori|roast/.test(n + ' ' + keys)) return 'Dinner';
            if (/snack|bite|energy|bar|chips|almond|peanut|fruit/.test(n + ' ' + keys)) return 'Snack';
            return 'Dinner';
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // If filtered population is too small to make a diverse plan, return early with a message
        if (population.length < 3) {
            return { err: Infinity, combo: [], sum: {}, message: 'Not enough meals match the selected filters.' };
        }

        // For deterministic meal structure, split population into meal-time buckets
        const breakfastPop = population.filter(m => classifyMealTime(m) === 'Breakfast');
        const lunchPop = population.filter(m => classifyMealTime(m) === 'Lunch');
        const dinnerPop = population.filter(m => classifyMealTime(m) === 'Dinner');

        if (breakfastPop.length === 0 || lunchPop.length === 0 || dinnerPop.length === 0) {
            return { err: Infinity, combo: [], sum: {}, message: 'Not enough Breakfast/Lunch/Dinner meals match the selected filters.' };
        }

        let best = { err: Infinity, combo: [], sum: {} };

        for (let i = 0; i < maxIter; i++) {
            // pick one random meal from each bucket
            const b = breakfastPop[Math.floor(Math.random() * breakfastPop.length)];
            const l = lunchPop[Math.floor(Math.random() * lunchPop.length)];
            const d = dinnerPop[Math.floor(Math.random() * dinnerPop.length)];
            const combo = [b, l, d];

            // compute base sums for the combo (per 1 serving each)
            const base = combo.reduce((acc, m) => {
                Object.keys(weights).forEach(k => acc[k] = (acc[k] || 0) + (m[k] || 0));
                return acc;
            }, {});

            if (!base.calories || base.calories === 0) continue;

            // uniformly scale servings so total calories approach target (clamped)
            const scale = Math.max(0.6, Math.min(2.5, (targets.calories || 1) / base.calories));
            const scaled = {};
            Object.keys(weights).forEach(k => scaled[k] = (base[k] || 0) * scale);

            // compute normalized error on scaled sums
            let err = 0;
            Object.keys(weights).forEach(k => {
                const tgt = Math.max(1, targets[k] || 0);
                const diff = Math.abs(scaled[k] - tgt) / tgt;
                err += diff * weights[k];
            });

            if (err < best.err) {
                const servings = combo.map(() => scale);
                const mealTypes = ['Breakfast', 'Lunch', 'Dinner'];
                best = { err, combo, sum: scaled, servings, mealTypes };
            }

            // small early exit if very close
            if (best.err < 0.06) break;
        }
        return best;
    }

    function renderPlan(best, container) {
        if (!best) {
            container.innerHTML = '<p>Unable to generate a plan.</p>';
            return;
        }

        if (Array.isArray(best.combo) && best.combo.length === 0) {
            const msg = best.message || 'No plan could be generated for the selected filters.';
            container.innerHTML = `<p>${msg}</p>`;
            return;
        }
        const combo = best.combo;
        const sum = best.sum || combo.reduce((acc, m) => { Object.keys(m).forEach(k => { if (['calories', 'protein', 'fiber', 'sugar', 'fat', 'vitamins'].includes(k)) acc[k] = (acc[k] || 0) + m[k]; }); return acc; }, {})
        const servings = best.servings || combo.map(() => 1);
        const mealTypes = best.mealTypes || combo.map((_, i) => `Meal ${i + 1}`);

        // Render in fixed order: Breakfast -> Lunch -> Dinner -> Snack
        const items = combo.map((m, i) => ({ m, i, serve: servings[i] || 1, mealType: mealTypes[i] || `Meal ${i + 1}` }));
        const orderList = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        const ordered = [];
        orderList.forEach(type => ordered.push(...items.filter(it => it.mealType === type)));

        let html = ordered.map(item => {
            const m = item.m;
            const badges = buildBadgesHTML(m);
            const serve = item.serve;
            return `<div class="plan-card"><h4>${item.mealType} — ${m.name} ${badges}</h4>
                <div>Serving: x${serve.toFixed(2)} &nbsp;|&nbsp; Calories: ${Math.round((m.calories || 0) * serve)} | Protein: ${Math.round((m.protein || 0) * serve)}g | Fiber: ${Math.round((m.fiber || 0) * serve)}g | Sugar: ${Math.round((m.sugar || 0) * serve)}g | Fat: ${Math.round((m.fat || 0) * serve)}g | Vitamins: ${Math.round((m.vitamins || 0) * serve)}%</div>
                <details><summary>Ingredients</summary><ul>${Object.keys(m.ingredients).map(k => `<li>${k}: ${m.ingredients[k]}g</li>`).join('')}</ul></details>
            </div>`;
        }).join('');
        html += `<div class="plan-summary">Totals — Calories: ${Math.round(sum.calories || 0)} | Protein: ${Math.round(sum.protein || 0)}g | Fiber: ${Math.round(sum.fiber || 0)}g | Sugar: ${Math.round(sum.sugar || 0)}g | Fat: ${Math.round(sum.fat || 0)}g | Vitamins: ${Math.round(sum.vitamins || 0)}%</div>`;
        container.innerHTML = html;
    }

    // Hook up DOM
    document.addEventListener('DOMContentLoaded', function () {
        const generateBtn = document.getElementById('generatePlanBtn');
        const regenBtn = document.getElementById('regenerateBtn');
        const planOutput = document.getElementById('planOutput');

        function readTargets() {
            return {
                calories: parseFloat(document.getElementById('targetCalories').value) || 0,
                protein: parseFloat(document.getElementById('targetProtein').value) || 0,
                sugar: parseFloat(document.getElementById('targetSugar').value) || 0,
                fat: parseFloat(document.getElementById('targetFat').value) || 0,
                vitamins: parseFloat(document.getElementById('targetVitamins').value) || 0
            };
        }

        function doGenerate(opts) {
            const targets = readTargets();
            planOutput.innerHTML = '<em>Generating plan…</em>';
            // read filters from DOM
            const dietEl = document.getElementById('dietSelect');
            const diet = dietEl ? dietEl.value : 'any';
            const cuisineEls = Array.from(document.querySelectorAll('.cuisine-option'));
            const cuisines = cuisineEls.filter(e => e.checked).map(e => e.value);
            const finalOpts = Object.assign({}, opts || {}, { filters: { diet, cuisines } });

            setTimeout(() => {
                const best = generateDailyPlan(targets, finalOpts);
                renderPlan(best, planOutput);
            }, 10);
        }

        generateBtn && generateBtn.addEventListener('click', function () { doGenerate({ iterations: 5000 }); });
        regenBtn && regenBtn.addEventListener('click', function () { doGenerate({ iterations: 3000 }); });

        // real-time adjustments: regenerate when any target changes (debounced)
        const targetIds = ['targetCalories', 'targetProtein', 'targetFiber', 'targetSugar', 'targetFat', 'targetVitamins'];
        let debounceTimer = null;
        targetIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.addEventListener('input', () => {
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => doGenerate({ iterations: 1500 }), 300);
            });
        });

        // initial sample plan
        doGenerate({ iterations: 2000 });
    });
})();
