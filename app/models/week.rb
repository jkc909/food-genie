class Week < ApplicationRecord
	belongs_to :user
	has_many :meals
	has_many :recipes, through: :meals
	has_many :daily_totals
	has_many :days, through: :daily_totals
end