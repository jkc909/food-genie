class RecipeSerializer < ActiveModel::Serializer
  attributes :user_recipes

  def user_recipes
    current_user.recipes
  end

end
