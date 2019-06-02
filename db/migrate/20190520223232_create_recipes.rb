class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
    	t.belongs_to :user, null: false
    	t.string :title, null: false
    	t.text :description
    	t.string :image_url
    	t.float :servings
    end
  end
end
