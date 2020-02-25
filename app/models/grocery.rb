class Grocery < ApplicationRecord
    belongs_to :week
    belongs_to :ingredient
end