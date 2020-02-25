class Week < ApplicationRecord
	belongs_to :user
	has_many :meals, dependent: :destroy  
	has_many :recipes, through: :meals
	has_many :daily_totals, dependent: :destroy  
	has_many :days, through: :daily_totals
	has_many :groceries, dependent: :destroy
end