class Recipe < ApplicationRecord
	belongs_to :user
	has_many :meals
	has_many :weeks, through: :meals
	belongs_to :prep_category
end