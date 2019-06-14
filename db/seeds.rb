# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Week.destroy_all
PrepCategory.destroy_all
Recipe.destroy_all
Meal.destroy_all

p "create Users"
	user = User.create!(email: "admin@foodgenie.com", password: "password")
		
p "create Weeks"
	weeks = 0
	until weeks == 5 do 
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


recipes = [{'name': 'Chicken Bulgogi Bowl', 'prep_time': '25 minutes', 'ingredients': [{'name': 'Jasmine Rice', 'amount': '0.75 cup', 'not_included': '0'}, {'name': 'White Wine Vinegar', 'amount': '5.0 teaspoon', 'not_included': '0'}, {'name': 'Cucumber', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Shredded Carrots', 'amount': '4.0 ounce', 'not_included': '0'}, {'name': 'Chicken Breast Strips', 'amount': '10 ounce', 'not_included': '0'}, {'name': 'Bulgogi Sauce', 'amount': '4.0 ounce', 'not_included': '0'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon', 'not_included': '0'}, {'name': 'Sriracha', 'amount': '1.0 teaspoon', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Sugar', 'amount': '0.5 teaspoon', 'not_included': '1'}, {'name': 'Vegetable Oil', 'amount': '2.0 teaspoon', 'not_included': '1'}, {'name': 'Butter', 'amount': '1.0 tablespoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '750 kcal', 'carbs': '106 g', 'fat': '24 g', 'protein': '31 g'}]}, {'name': 'Quick Beef Ragù Spaghetti', 'prep_time': '30 minutes', 'ingredients': [{'name': 'Zucchini', 'amount': '2.0 unit', 'not_included': '0'}, {'name': 'Yellow Onion', 'amount': '2.0 unit', 'not_included': '0'}, {'name': 'Garlic', 'amount': '4.0 clove', 'not_included': '0'}, {'name': 'Thyme', 'amount': '0.25 ounce', 'not_included': '0'}, {'name': 'Ground Beef', 'amount': '20 ounce', 'not_included': '0'}, {'name': 'Italian Seasoning', 'amount': '1.0 tablespoon', 'not_included': '0'}, {'name': 'Soy Sauce', 'amount': '4.0 tablespoon', 'not_included': '0'}, {'name': 'Spaghetti', 'amount': '12 ounce', 'not_included': '0'}, {'name': 'Crushed Tomatoes', 'amount': '26.4 ounce', 'not_included': '0'}, {'name': 'Parmesan Cheese', 'amount': '0.5 cup', 'not_included': '0'}, {'name': 'Chili Flakes', 'amount': '1.0 teaspoon', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Olive Oil', 'amount': '2.0 teaspoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '770 kcal', 'carbs': '93 g', 'fat': '27 g', 'protein': '46 g'}]}, {'name': 'Cuban Pork Burgers', 'prep_time': '35 minutes', 'ingredients': [{'name': 'Yukon Gold Potatoes', 'amount': '12 ounce', 'not_included': '0'}, {'name': 'Fry Seasoning', 'amount': '1.0 tablespoon', 'not_included': '0'}, {'name': 'Dill Pickle', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Mayonnaise', 'amount': '2.0 tablespoon', 'not_included': '0'}, {'name': 'Dijon Mustard', 'amount': '2.0 teaspoon', 'not_included': '0'}, {'name': 'Ground Pork', 'amount': '10 ounce', 'not_included': '0'}, {'name': 'Cumin', 'amount': '1.0 teaspoon', 'not_included': '0'}, {'name': 'Monterey Jack Cheese', 'amount': '0.25 cup', 'not_included': '0'}, {'name': 'Potato Bun', 'amount': '2.0 unit', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Sugar', 'amount': '0.5 teaspoon', 'not_included': '1'}, {'name': 'Vegetable Oil', 'amount': '4.0 teaspoon', 'not_included': '1'}, {'name': 'Butter', 'amount': '1.0 tablespoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '980 kcal', 'carbs': '74 g', 'fat': '58 g', 'protein': '38 g'}]}, {'name': 'Spice-Rubbed Pork with a Jammy Glaze', 'prep_time': '25 minutes', 'ingredients': [{'name': 'Yellow Squash', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Scallions', 'amount': '2.0 unit', 'not_included': '0'}, {'name': 'Lemon', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Israeli Couscous', 'amount': '0.5 cup', 'not_included': '0'}, {'name': 'Pork Cutlets', 'amount': '12 ounce', 'not_included': '0'}, {'name': 'Smoky Cinnamon Paprika Spice', 'amount': '1.0 tablespoon', 'not_included': '0'}, {'name': 'Apricot Jam', 'amount': '2.0 tablespoon', 'not_included': '0'}, {'name': 'Chicken Stock Concentrate', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Dijon Mustard', 'amount': '2.0 teaspoon', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Olive Oil', 'amount': '4.0 teaspoon', 'not_included': '1'}, {'name': 'Butter', 'amount': '2.0 tablespoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '630 kcal', 'carbs': '56 g', 'fat': '28 g', 'protein': '42 g'}]}, {'name': 'Sweet Potato and Black Bean Tacos', 'prep_time': '40 minutes', 'ingredients': [{'name': 'Sweet Potato', 'amount': '2.0 unit', 'not_included': '0'}, {'name': 'Yellow Onion', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Cilantro', 'amount': '0.25 ounce', 'not_included': '0'}, {'name': 'Garlic', 'amount': '2.0 clove', 'not_included': '0'}, {'name': 'Black Beans', 'amount': '6.7 ounce', 'not_included': '0'}, {'name': 'Lime', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Flour Tortillas', 'amount': '6.0 unit', 'not_included': '0'}, {'name': 'Honey', 'amount': '0.5 ounce', 'not_included': '0'}, {'name': 'Cumin', 'amount': '1.0 teaspoon', 'not_included': '0'}, {'name': 'Avocado', 'amount': '1.0 unit', 'not_included': '0'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Olive Oil', 'amount': '2.0 tablespoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '860 kcal', 'carbs': '114 g', 'fat': '38 g', 'protein': '17 g'}]}, {'name': 'Cheddar-Crusted Chicken', 'prep_time': '30 minutes', 'ingredients': [{'name': 'Sweet Potato', 'amount': '2.0 unit', 'not_included': '0'}, {'name': 'Panko Breadcrumbs', 'amount': '0.25 cup', 'not_included': '0'}, {'name': 'Cheddar Cheese', 'amount': '0.5 cup', 'not_included': '0'}, {'name': 'Fry Seasoning', 'amount': '1.0 tablespoon', 'not_included': '0'}, {'name': 'Chicken Breasts', 'amount': '12 ounce', 'not_included': '0'}, {'name': 'Sour Cream', 'amount': '4.0 tablespoon', 'not_included': '0'}, {'name': 'Broccoli Florets', 'amount': '8.0 ounce', 'not_included': '0'}], 'ingredients_not_included': [{'name': 'Olive Oil', 'amount': '2.0 teaspoon', 'not_included': '1'}, {'name': 'Butter', 'amount': '2.0 tablespoon', 'not_included': '1'}, {'name': 'Salt', 'amount': '', 'not_included': '1'}, {'name': 'Pepper', 'amount': '', 'not_included': '1'}], 'nutrition': [{'calories': '730 kcal', 'carbs': '52 g', 'fat': '35 g', 'protein': '49 g'}]}]


	Recipe.create!(
		title: "Unused", 
		user: user, 
		servings: 2,
		prep_category: PrepCategory.offset(rand(PrepCategory.count)).first,
		cook_time: nil,
		price_per_serving: nil
	)


	recipes.each do |recipe|
		new_recipe = Recipe.create!(
			title: recipe[:name],
			user: user,
			prep_category: PrepCategory.offset(rand(PrepCategory.count)).first,
			cook_time: recipe[:prep_time],
			servings: 2,
			price_per_serving: 10.00
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
				amount: amount,
				not_included: r[:not_included]
			)
		end
	end



p "create meal types"

			meal_types= [
			["unused"],
			["sunday1"],
			["monday1"],
			["tuesday1"],
			["wednesday1"],
			["thursday1"],
			["friday1"],
			["saturday1"],
			["sunday2"],
			["monday2"],
			["tuesday2"],
			["wednesday2"],
			["thursday2"],
			["friday2"],
			["saturday2"],	
			["sunday3"],
			["monday3"],
			["tuesday3"],
			["wednesday3"],
			["thursday3"],
			["friday3"],
			["saturday3"]].flatten

			meal_types.each do |meal|
				MealTypes.create!(name: meal)
			end


p "create Meals"
	all_weeks = Week.all

	all_weeks.each do |week|
		i = 1
		until i == 22
				Meal.create!(
					week_id: week.id, 
					recipe: Recipe.offset(rand(Recipe.count)).first, 
					meal_types_id: 1) 
			i += 1
		end
	end



		