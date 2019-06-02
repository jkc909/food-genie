class CreateMealTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :meal_types do |t|
    	t.string :name, null: false
    end
  end
end
