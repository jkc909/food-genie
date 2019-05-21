class WeeksController < ApplicationController
	def index
		@weeks = Week.first(4)
	end
end