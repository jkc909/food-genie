class RecipesController < ApplicationController
	def index
		@recipes = Week.find(params[:week_id]).recipes
	end
end