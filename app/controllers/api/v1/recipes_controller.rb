class Api::V1::RecipesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
        render json: Week.find(params[:week_id]), serializer: CompleteWeekSerializer
    end

    def show
        render json: Recipe.find(params[:id]), week: params[:week_id]
    end

    private
end