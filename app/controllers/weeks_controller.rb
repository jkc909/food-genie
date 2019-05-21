class WeeksController < ApplicationController
	def index
		@week = Week.first
	end
end