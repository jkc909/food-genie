class CreateRecipeNutritionValues < ActiveRecord::Migration[5.2]
  def change
    create_table :recipe_nutrition_values do |t|
      t.belongs_to :recipe

      t.integer :energy
      t.integer :calories
      t.integer :fat
      t.integer :carbs
      t.integer :protein
    end
  end
end
