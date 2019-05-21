class WeekSerializer < ActiveModel::Serializer
  attributes :id, :meals, :recipes

  binding.pry
end
