class SimpleWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :meals, :daily_totals, :payload

	def payload
		recipes = []
		object.meals.find_each do |meal|
			recipe = meal.recipe
			name = recipe[:title]
			recipe_id = meal[:recipe_id]
			# meal_name = meal.meal_type[:name]
			# used = "#{meal.meal_type[:name]}_#{meal.meal_type.id}_#{meal.meal_type.meal_time}"
			used = meal.meal_type_id
			day_name = meal.meal_type.day.name
			meal_id = meal[:id]

			cost = recipe.cost.to_f
			time = recipe.cook_time
			calories = recipe.recipe_nutrition_value.calories
			fat = recipe.recipe_nutrition_value.fat
			carbs = recipe.recipe_nutrition_value.carbs
			protein = recipe.recipe_nutrition_value.protein
			
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
				used: used, 
				meal_id: meal_id,
				day_name: day_name,
				recipe_id: recipe_id,
				metrics: metrics,
			}
		end
		# binding.pry
	  return recipes
	end

	def meals
		# binding.pry
		MealType.all.order("meal_time, id").map{ |mt| {"id": mt[:id], "day": mt.day[:name], "time": mt[:meal_time]} }
	end

	def daily_totals
		daily_totals = object.daily_totals
	end
end
