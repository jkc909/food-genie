class MealType < ApplicationRecord
	belongs_to :day
	has_many :meals
end