class CreateMealTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :meal_types do |t|
      t.belongs_to :day, null: false
      t.integer :meal_time, null: false
      t.timestamps null: false
    end
  end
end
