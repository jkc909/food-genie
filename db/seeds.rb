
Rake::Task['db:migrate:reset'].invoke

# User.destroy_all
# Week.destroy_all
# PrepCategory.destroy_all
# Recipe.destroy_all
# Meal.destroy_all
# MealType.destroy_all
# RecipeNutritionValue.destroy_all
# Ingredient.destroy_all
# RecipeIngredient.destroy_all
# Day.destroy_all
# DailyTotal.destroy_all

p "create Users"
	user = User.create!(email: "admin@foodgenie.com", password: "password")
		
p "create Weeks"
	weeks = 0
	until weeks == 11 do 
		week_of = Time.now.weeks_since(weeks).beginning_of_week
		Week.create!(week_of: week_of, user: user)
		weeks += 1
	end

p "create prep categories"
	prep_cats = ["No prep", "Sunday Meal Prep", "Day-of"]
	prep_cats.each do |cat|
		PrepCategory.create!(name: cat)
	end
	

p "create Recipes"


	recipes = [{'name': 'Chicken Bulgogi Bowl', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/2019-w28-r14-chicken-bulgogi-bowl-c1dc252b.jpg', 'rating': {'rating': '', 'ratings': ''}, 'prep_time': '25', 'ingredients': [{'name': 'Jasmine Rice', 'amount': '0.75 cup'}, {'name': 'White Wine Vinegar', 'amount': '5.0 teaspoon'}, {'name': 'Cucumber', 'amount': '1.0 unit'}, {'name': 'Shredded Carrots', 'amount': '4.0 ounce'}, {'name': 'Chicken Breast Strips', 'amount': '10 ounce'}, {'name': 'Bulgogi Sauce', 'amount': '4.0 ounce'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon'}, {'name': 'Sriracha', 'amount': '1.0 teaspoon'}, {'name': 'Sugar', 'amount': '0.5 teaspoon'}, {'name': 'Vegetable Oil', 'amount': '2.0 teaspoon'}, {'name': 'Butter', 'amount': '1.0 tablespoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '750 kcal', 'carbs': '106 g', 'fat': '24 g', 'protein': '31 g'}]}, {'name': 'Quick Beef Ragù Spaghetti', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/5abd4797ae08b549e56a1502-fcb551c9.jpg', 'rating': {'rating': 'Rated 3.4 / 4', 'ratings': 'out of 839 ratings'}, 'prep_time': '30', 'ingredients': [{'name': 'Zucchini', 'amount': '2.0 unit'}, {'name': 'Yellow Onion', 'amount': '2.0 unit'}, {'name': 'Garlic', 'amount': '4.0 clove'}, {'name': 'Thyme', 'amount': '0.25 ounce'}, {'name': 'Ground Beef', 'amount': '20 ounce'}, {'name': 'Italian Seasoning', 'amount': '1.0 tablespoon'}, {'name': 'Soy Sauce', 'amount': '4.0 tablespoon'}, {'name': 'Spaghetti', 'amount': '12 ounce'}, {'name': 'Crushed Tomatoes', 'amount': '26.4 ounce'}, {'name': 'Parmesan Cheese', 'amount': '0.5 cup'}, {'name': 'Chili Flakes', 'amount': '1.0 teaspoon'}, {'name': 'Olive Oil', 'amount': '2.0 teaspoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '770 kcal', 'carbs': '93 g', 'fat': '27 g', 'protein': '46 g'}]}, {'name': 'Cuban Pork Burgers', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/2019-w27-r15-cuban-pork-burger-05324246.jpg', 'rating': {'rating': '', 'ratings': ''}, 'prep_time': '35', 'ingredients': [{'name': 'Yukon Gold Potatoes', 'amount': '12 ounce'}, {'name': 'Fry Seasoning', 'amount': '1.0 tablespoon'}, {'name': 'Dill Pickle', 'amount': '1.0 unit'}, {'name': 'Mayonnaise', 'amount': '2.0 tablespoon'}, {'name': 'Dijon Mustard', 'amount': '2.0 teaspoon'}, {'name': 'Ground Pork', 'amount': '10 ounce'}, {'name': 'Cumin', 'amount': '1.0 teaspoon'}, {'name': 'Monterey Jack Cheese', 'amount': '0.25 cup'}, {'name': 'Potato Bun', 'amount': '2.0 unit'}, {'name': 'Sugar', 'amount': '0.5 teaspoon'}, {'name': 'Vegetable Oil', 'amount': '4.0 teaspoon'}, {'name': 'Butter', 'amount': '1.0 tablespoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '980 kcal', 'carbs': '74 g', 'fat': '58 g', 'protein': '38 g'}]}, {'name': 'Spice-Rubbed Pork with a Jammy Glaze', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/2019-w28-r4-spice-rubbed-pork-with-a-jammy-glaze-5ba5999e.jpg', 'rating': {'rating': '', 'ratings': ''}, 'prep_time': '25', 'ingredients': [{'name': 'Yellow Squash', 'amount': '1.0 unit'}, {'name': 'Scallions', 'amount': '2.0 unit'}, {'name': 'Lemon', 'amount': '1.0 unit'}, {'name': 'Israeli Couscous', 'amount': '0.5 cup'}, {'name': 'Pork Cutlets', 'amount': '12 ounce'}, {'name': 'Smoky Cinnamon Paprika Spice', 'amount': '1.0 tablespoon'}, {'name': 'Apricot Jam', 'amount': '2.0 tablespoon'}, {'name': 'Chicken Stock Concentrate', 'amount': '1.0 unit'}, {'name': 'Dijon Mustard', 'amount': '2.0 teaspoon'}, {'name': 'Olive Oil', 'amount': '4.0 teaspoon'}, {'name': 'Butter', 'amount': '2.0 tablespoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '630 kcal', 'carbs': '56 g', 'fat': '28 g', 'protein': '42 g'}]}, {'name': 'Sweet Potato and Black Bean Tacos', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/5abd494fae08b54b610ca122-8bfc3c25.jpg', 'rating': {'rating': 'Rated 3.3 / 4', 'ratings': 'out of 1011 ratings'}, 'prep_time': '40', 'ingredients': [{'name': 'Sweet Potato', 'amount': '2.0 unit'}, {'name': 'Yellow Onion', 'amount': '1.0 unit'}, {'name': 'Cilantro', 'amount': '0.25 ounce'}, {'name': 'Garlic', 'amount': '2.0 clove'}, {'name': 'Black Beans', 'amount': '6.7 ounce'}, {'name': 'Lime', 'amount': '1.0 unit'}, {'name': 'Flour Tortillas', 'amount': '6.0 unit'}, {'name': 'Honey', 'amount': '0.5 ounce'}, {'name': 'Cumin', 'amount': '1.0 teaspoon'}, {'name': 'Avocado', 'amount': '1.0 unit'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon'}, {'name': 'Olive Oil', 'amount': '2.0 tablespoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '860 kcal', 'carbs': '114 g', 'fat': '38 g', 'protein': '17 g'}]}, {'name': 'Cheddar-Crusted Chicken', 'recipe_image': 'https://res.cloudinary.com/hellofresh/image/upload/f_auto,fl_lossy,q_auto,w_1200/v1/hellofresh_s3/image/2019-w26-r15-cheddar-crusted-chicken-f46385e1.jpg', 'rating': {'rating': '', 'ratings': ''}, 'prep_time': '30', 'ingredients': [{'name': 'Sweet Potato', 'amount': '2.0 unit'}, {'name': 'Panko Breadcrumbs', 'amount': '0.25 cup'}, {'name': 'Cheddar Cheese', 'amount': '0.5 cup'}, {'name': 'Fry Seasoning', 'amount': '1.0 tablespoon'}, {'name': 'Chicken Breasts', 'amount': '12 ounce'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon'}, {'name': 'Broccoli Florets', 'amount': '8.0 ounce'}, {'name': 'Olive Oil', 'amount': '2.0 teaspoon'}, {'name': 'Butter', 'amount': '2.0 tablespoon'}, {'name': 'Salt', 'amount': ''}, {'name': 'Pepper', 'amount': ''}], 'nutrition': [{'calories': '730 kcal', 'carbs': '52 g', 'fat': '35 g', 'protein': '49 g'}]}]

	recipes.each do |recipe|
		new_recipe = Recipe.create!(
			title: recipe[:name],
			user: user,
			cook_time: recipe[:prep_time],
			servings: 2,
			cost: rand(1000) + 500,
			image: recipe[:product_image],
			rating: recipe[:rating][:rating],
			ratings: recipe[:rating][:ratings]
		)
		RecipeNutritionValue.create_with(
			recipe: new_recipe,
			calories: recipe[:nutrition][0][:calories],
			fat: recipe[:nutrition][0][:fat],
			carbs: recipe[:nutrition][0][:carbs],
			protein: recipe[:nutrition][0][:protein],
		).find_or_create_by!(
			recipe: new_recipe
		)

		recipe[:ingredients].each do |r|	
			if r[:amount].split[1]
				unit = r[:amount].split[1]
				amount = r[:amount].split[0]
			else
				unit = nil
				amount = nil
			end
			name = r[:name]
			ingredient = Ingredient.create_with(unit: unit).find_or_create_by!(name: name)
			RecipeIngredient.create!(
				recipe: new_recipe,
				ingredient: ingredient,
				amount: amount
			)
		end
	end



p "create meal types and days"
			unused = Day.create(name: "unused")
			MealType.create!(day: unused, meal_time: 0)

			days= [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday"]

			days.each do |day|
				new_day = Day.create(name: day)
			end

			days = Day.where("name != 'unused'")

			[1,2,3].each do |mt|
				days.each do |day|
					MealType.create!(day: day, meal_time: mt)
				end
			end



p "create Meals and weekly totals"
	all_weeks = Week.all

	all_weeks.each do |week|
		i = 1
		until i == 22
				Meal.create!(
					week_id: week.id, 
					recipe: Recipe.offset(rand(Recipe.count)).first, 
					meal_type: MealType.first,
					prep_category: PrepCategory.offset(rand(PrepCategory.count)).first) 
			i += 1
		end
		days.each do |day|
			DailyTotal.create!(week: week, day: day, calories: 0, fat: 0, carbs: 0, protein: 0, time: 0, cost: 0)
		end
	end

