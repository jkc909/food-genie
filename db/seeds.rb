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


p "create Recipes"
	Recipe.create!(title: "Unassigned", user: user, servings: 2)
	recipes = ["Cheeseburgers", "Chicken and rice", "Tuna", "Breakfast Sandwich", "NOTHING", "Pizza", "Salad"]
	recipes.each do |recipe|
		Recipe.create!(title: recipe, user: user, servings: 2)
	end



p "create Meals"
	all_weeks = Week.all

	all_weeks.each do |week|
		i = 1
		until i == 22
			Meal.create!(meal_type: i, week_id: week.id, recipe_id: 1)
			i += 1
		end
	end