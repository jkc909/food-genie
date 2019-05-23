class WeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :payload
  def payload
		recipes = []
		object.meals.find_each do |meal|
			recipes << [{name: meal.recipe[:title], 
					used: meal.meal_type,bgcolor: "red"}]
		end

  	binding.pry
		object.recipes.each do |recipe|
			recipes << [{name: recipe.title, used: "Unused", bgcolor: "blue"}]
		end
  	return recipes
	end
end
