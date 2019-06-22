class CreateDailyTotals < ActiveRecord::Migration[5.2]
  def change
    create_table :daily_totals do |t|
      t.belongs_to :week
      t.belongs_to :day
      t.integer :calories
      t.integer :fat
      t.integer :carbs
      t.integer :protein
      t.money :cost, default: 0, :scale => 2
      t.integer :time
    end
  end
end
