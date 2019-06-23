class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
    	t.belongs_to :user, null: false

			t.timestamps null: false

    	t.string :title, null: false
    	t.text :description
    	t.string :image_url
			t.float :servings
			t.integer :cook_time
			t.string :image
			t.decimal :rating
			t.integer :ratings
			
			t.integer :cost, default: 0
    end
  end
end
