class CreateUserSubs < ActiveRecord::Migration
  def change
    create_table :user_subs do |t|
      t.integer :user_id, :null => false
      t.integer :sub_id, :null => false
      t.integer :rank, :null => false

      t.timestamps
    end
    add_index :user_subs, [:user_id, :sub_id]
    add_index :user_subs, [:sub_id, :user_id]
    add_column :sub_seddits, :followers_count, :integer
  end
end
