class CreateMeals < ActiveRecord::Migration[5.2]
  def change
    create_table :meals do |t|
      t.belongs_to :week, null: false, index: true
    	t.belongs_to :recipe, index: true
      t.belongs_to :meal_type, index: true
      t.belongs_to :prep_category
      t.timestamps null: false
    end
  end
end
