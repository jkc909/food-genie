# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


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
	Recipe.create!(title: "Unused", 
					user: user, 
					servings: 2,
					calories_per_serving: 0,
					prep_category_id: 1,
					cook_time: nil,
					price_per_serving: nil)
	recipes = ["Cheeseburgers", "Chicken and rice", "Tuna", "Breakfast Sandwich", "NOTHING", "Pizza", "Salad"]
	recipes.each do |recipe|
		Recipe.create!(title: recipe, 
						user: user, 
						servings: 2, 
						calories_per_serving: rand(500..1000), 
						prep_category_id: rand(2..3),
						cook_time: "00:45",
						price_per_serving: rand(7..12))
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
				Meal.create!(week_id: week.id, recipe_id: 1+rand(8), meal_types_id: 1) 
			i += 1
		end
	end



		