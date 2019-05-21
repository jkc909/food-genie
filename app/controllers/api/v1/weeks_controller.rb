class Api::V1::WeeksController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def show
      week = Week.find(params[:id])
      user = current_user
      render json: week
    end
end
