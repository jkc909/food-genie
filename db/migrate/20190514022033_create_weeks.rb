class CreateWeeks < ActiveRecord::Migration[5.2]
  def change
    create_table :weeks do |t|
    	t.datetime :week_of
    	t.belongs_to :user, null: false, index: true
    end
  end
end
