class Day < ApplicationRecord
    has_many :meals
    has_many :daily_totals
end