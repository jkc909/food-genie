class CreateDailyTotals < ActiveRecord::Migration[5.2]
  def change
    create_table :daily_totals do |t|
      t.belongs_to :week
      t.belongs_to :day
      t.integer :calories
      t.integer :fat
      t.integer :carbs
      t.integer :protein
      t.integer :cost
      t.integer :time
    end
  end
end
