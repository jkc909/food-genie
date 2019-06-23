class Recipe < ApplicationRecord
	belongs_to :user

	has_one :recipe_nutrition_value

	has_many :meals
	has_many :weeks, through: :meals

	has_many :recipe_ingredients
	has_many :ingredients, through: :recipe_ingredients
end