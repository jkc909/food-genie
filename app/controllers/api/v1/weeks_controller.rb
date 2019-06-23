class Api::V1::WeeksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      render json: Week.find(params[:id]), serializer: SimpleWeekSerializer
    end

    def update
      update_daily_totals(week_params[:update_totals])
      Week.find(params[:id]).meals.where(meal_type_id: week_params[:meal_type_id]).first.try(:update_attributes, {meal_type_id: 1})
      Meal.find(week_params[:meal_id]).update!(meal_type_id: week_params[:meal_type_id])
      render status: 200, json: {}
    end


    def update_daily_totals(totals)
      totals.each do |t|
        if t != ""
          DailyTotal.find(t[:id]).update!(
            calories: t[:calories],
            fat: t[:fat],
            protein: t[:protein],
            carbs: t[:carbs],
            time: t[:time],
            cost: t[:cost],
          )
        end
      end
    end

    private
    def week_params
      params.require(:recipes)
    end
end
