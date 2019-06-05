class Api::V1::RecipesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
        user = current_user
        week = Week.find(params[:week_id])
        render json: week, serializer: CompleteWeekSerializer
    end

    private
end