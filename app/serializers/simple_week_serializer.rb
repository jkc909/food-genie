class SimpleWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :payload, :meals
	def payload
		user = current_user
		recipes = []
		object.meals.find_each do |meal|
			recipe = meal.recipe
			name = recipe[:title]
			recipe_id = meal[:recipe_id]
			used = "#{meal.meal_types[:name]}_#{meal.meal_types.id}_#{meal.meal_types.meal_time}"
			meal_id = meal[:id]
			time = 0

			nutrition = {}
			if recipe.id != 1
				nutrition[:cals] = recipe.recipe_nutrition_value.calories
				nutrition[:fat] = recipe.recipe_nutrition_value.fat
				nutrition[:carbs] = recipe.recipe_nutrition_value.carbs
				nutrition[:protein] = recipe.recipe_nutrition_value.protein
				time = recipe.cook_time.split(" ")
			end

			cost = recipe.price_per_serving
			

			recipes << [{
				name: name, 
				bgcolor: "red", 
				used: used, 
				meal_id: meal_id,
				recipe_id: recipe_id, 
				nutrition: nutrition,
				cost: cost,
				time: time,
			}]
		end
	  return recipes.uniq.flatten
	end

	def meals
		MealTypes.all.map{ |mt| [mt[:id],mt[:name],mt[:meal_time]]}
	end
end
