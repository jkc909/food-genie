class Api::V1::RecipesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
        user = current_user
        recipes = Week.find(params[:week_id]).recipes
        render json: recipes
    end

    private
end