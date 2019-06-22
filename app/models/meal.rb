class Meal < ApplicationRecord
	belongs_to :week
	belongs_to :recipe
	belongs_to :meal_type
	belongs_to :prep_category
end