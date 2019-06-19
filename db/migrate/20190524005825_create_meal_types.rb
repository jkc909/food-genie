class CreateMealTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :meal_types do |t|
      t.string :name, null: false
      t.timestamps null: false
      t.integer :meal_time, null: false
    end
  end
end
