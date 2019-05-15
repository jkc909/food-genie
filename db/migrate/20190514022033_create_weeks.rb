class CreateWeeks < ActiveRecord::Migration[5.2]
  def change
    create_table :weeks do |t|
    	t.datetime :week_of
    end
  end
end
