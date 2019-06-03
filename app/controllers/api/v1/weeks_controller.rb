class Api::V1::WeeksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      week = Week.find(params[:id])
      user = current_user
      render json: week
    end

    def update
      week_params.each do |meal|
        new_type = MealTypes.where(name: meal[:used]).first.id
        Meal.find(meal[:meal_id]).update(meal_types_id: new_type)
      end
      render status: 200, json: {}
    end

    private
    def week_params
      params.require(:recipes)
    end
end
