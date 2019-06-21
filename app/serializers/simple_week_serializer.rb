class SimpleWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :meals, :weekly_total, :payload

	def payload
		recipes = []
		object.meals.find_each do |meal|
			recipe = meal.recipe
			name = recipe[:title]
			recipe_id = meal[:recipe_id]
			meal_name = meal.meal_types[:name]
			used = "#{meal.meal_types[:name]}_#{meal.meal_types.id}_#{meal.meal_types.meal_time}"
			meal_id = meal[:id]

			cost = recipe.cost.to_f
			time = recipe.cook_time
			nutrition = {}
			nutrition[:cals] = recipe.recipe_nutrition_value.calories
			nutrition[:fat] = recipe.recipe_nutrition_value.fat
			nutrition[:carbs] = recipe.recipe_nutrition_value.carbs
			nutrition[:protein] = recipe.recipe_nutrition_value.protein
			
			metrics = {nutrition: nutrition, cost: cost, time: time}

			recipes << {
				name: name, 
				bgcolor: "red", 
				used: used, 
				meal_id: meal_id,
				recipe_id: recipe_id,
				metrics: metrics
			}
		end
	  return recipes
	end

	def meals
		MealTypes.all.map{ |mt| [mt[:id],mt[:name],mt[:meal_time]]}
	end

	def weekly_total
		weekly_total = object.weekly_total
	end
end
