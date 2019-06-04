class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
    	t.belongs_to :user, null: false
    	t.string :title, null: false
    	t.text :description
    	t.string :image_url
			t.float :servings
			t.integer :calories_per_serving
			t.time :cook_time
			t.belongs_to :prep_category
			t.decimal :price_per_serving, :precision => 8, :scale => 2
			t.timestamps null: false
    end
  end
end
