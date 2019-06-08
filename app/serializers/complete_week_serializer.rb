class CompleteWeekSerializer < ActiveModel::Serializer
	attributes :id, :week_of, :used_recipes, :user_recipes
	
	def used_recipes
		recipes = []
		object.meals.find_each do |meal|
			name = meal.recipe[:title]
			recipe_id = meal[:recipe_id]
			used = meal.meal_types[:name]
			meal_id = meal[:id]

			recipes << [{name: name, 
						used: used, 
						bgcolor: "red", 
						recipe_id: recipe_id, 
						meal_id: meal_id}]
		end
	  return recipes.uniq.flatten
  end

	def user_recipes
		recipes = []
		User.first.recipes.find_each do |recipe|
			name = recipe[:title]
			recipe_id = recipe[:id]

			recipes << [{name: name, 
						bgcolor: "red", 
						recipe_id: recipe_id}]
		end
	  return recipes.uniq.flatten
	end
end
