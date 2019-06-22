class Api::V1::WeeksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      render json: Week.find(params[:id]), serializer: SimpleWeekSerializer
    end

    def update
      # binding.pry
      Week.find(params[:id]).meals.where(meal_type_id: week_params[:meal_type_id]).first.try(:update_attributes, {meal_type_id: 1})
      Meal.find(week_params[:meal_id]).update!(meal_type_id: week_params[:meal_type_id])
      render status: 200, json: {}
    end

    private
    def week_params
      params.require(:recipes)
    end
end
