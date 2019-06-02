class Meal < ApplicationRecord
	belongs_to :week
	belongs_to :recipe
	belongs_to :meal_types
end