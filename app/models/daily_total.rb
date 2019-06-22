class DailyTotal < ApplicationRecord
	belongs_to :week
	belongs_to :day
end