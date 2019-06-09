class Recipe < ApplicationRecord
	belongs_to :user
	belongs_to :prep_category

	has_many :meals
	has_many :weeks, through: :meals

	has_one :recipe_nutrition_value
end