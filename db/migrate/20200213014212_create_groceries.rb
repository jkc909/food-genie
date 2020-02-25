class CreateGroceries < ActiveRecord::Migration[5.2]
  def change
    create_table :groceries do |t|
      t.belongs_to :week
      t.belongs_to :ingredient
      t.boolean :checked, null: false, default: false
    end
  end
end
