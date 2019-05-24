class WeekSerializer < ActiveModel::Serializer
  attributes :id, :week_of, :payload
  def payload
		recipes = []

		object.meals.each do |meal|
			rec_name = meal.recipe[:title]

			recipes << [{name: rec_name, 
					used: meal.meal_types[:name],bgcolor: "red"}]
		end
  	return recipes.uniq.flatten
	end
end
