class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :link
      t.integer :owner_id, null: false
      t.integer :sub_id

      t.timestamps
    end
    add_index :posts, :sub_id
    add_index :posts, :owner_id
  end
end
