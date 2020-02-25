class SimpleWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :meals, :daily_totals, :payload

	def payload
		recipes = []
		object.meals.find_each do |meal|
			recipe = meal.recipe
			name = recipe[:title]
			recipe_id = meal[:recipe_id]
			meal_type_id = meal.meal_type_id
			day_name = meal.meal_type.day.name
			meal_id = meal[:id]

			cost = recipe.cost
			time = recipe.cook_time
			calories = recipe.recipe_nutrition_value.calories
			fat = recipe.recipe_nutrition_value.fat
			carbs = recipe.recipe_nutrition_value.carbs
			protein = recipe.recipe_nutrition_value.protein
			
			image_url = "https://food-genie.s3.amazonaws.com/recipes/images/#{recipe.parsed_name}.jpg"

			metrics = {
				calories: calories, 
				fat: fat, 
				carbs: carbs, 
				protein: protein, 
				cost: cost, 
				time: time
			}

			recipes << {
				name: name, 
				bgcolor: "red", 
				meal_type_id: meal_type_id, 
				meal_id: meal_id,
				day_name: day_name,
				recipe_id: recipe_id,
				image_url: image_url,
				metrics: metrics,
			}
		end
		# binding.pry
	  return recipes
	end

	def meals
		# binding.pry
		MealType.all.order("meal_time, id").map{ |mt| {"id": mt[:id], "day": mt.day[:name], "day_id": mt.day[:id], "time": mt[:meal_time]}  }	
		# MealType.all.order("meal_time, id").map{ |mt| {"id": mt[:id], "day": mt.day[:name], "time": mt[:meal_time]} }

	end

	def week_of
		week_of = object.week_of.strftime('%B %e, %Y')
	end

	def daily_totals
		daily_totals = object.daily_totals.order("day_id")
	end
end
