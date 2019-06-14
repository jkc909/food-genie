class CreateRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_ingredients do |t|
      t.belongs_to :recipe 
      t.belongs_to :ingredient
      t.decimal :amount
      t.boolean :not_included
    end
  end
end
