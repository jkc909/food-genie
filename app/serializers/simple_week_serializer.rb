class SimpleWeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :payload
	def payload
		user = current_user
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
end
