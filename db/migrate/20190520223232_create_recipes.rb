class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
    	t.belongs_to :user, null: false
			t.belongs_to :prep_category

			t.timestamps null: false

    	t.string :title, null: false
    	t.text :description
    	t.string :image_url
			t.float :servings
			t.string :cook_time
			t.string :image
			t.decimal :rating
			t.integer :ratings
			
			t.decimal :price_per_serving, :precision => 8, :scale => 2
    end
  end
end
