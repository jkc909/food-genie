class Api::V1::MealsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def create
        week = Week.find(params[:week_id])
        recipe = Recipe.find(params[:recipe_id])
        Meal.create!(week: week, recipe: recipe, meal_types_id: 1)
        render status: 200, json: week, serializer: CompleteWeekSerializer
    end
    private
end