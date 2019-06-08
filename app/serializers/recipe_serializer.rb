class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :used_recipe

  def used_recipe
    recipe_id = object.id
    name = object.title
  end

end
