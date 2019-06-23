class RecipesController < ApplicationController
	def index
		@recipes = Week.find(params[:week_id]).recipes
	end

	# week.recipes.includes(:recipe_ingredients).pluck(:amount)
end