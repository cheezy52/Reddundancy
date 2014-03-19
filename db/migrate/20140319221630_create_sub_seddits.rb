class CreateSubSeddits < ActiveRecord::Migration
  def change
    create_table :sub_seddits do |t|
      t.string :name, null: false
      t.integer :owner_id, null: false

      t.timestamps
    end
    add_index :sub_seddits, :name
    add_index :sub_seddits, :owner_id
  end
end
