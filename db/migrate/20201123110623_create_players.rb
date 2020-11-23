class CreatePlayers < ActiveRecord::Migration[6.0]
  def change
    create_table :players do |t|
      t.string :name
      t.datetime :start_time
      t.datetime :end_time
      t.integer :score

      t.timestamps
    end
  end
end
