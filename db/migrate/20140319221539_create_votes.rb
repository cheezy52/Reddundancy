class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.boolean :up, null: false
      t.integer :owner_id, null: false
      t.integer :votable_id, null: false
      t.string :votable_type, null: false

      t.timestamps
    end
    add_index :votes, :votable_id
    add_index :votes, :owner_id
    add_index :votes, [:votable_id, :owner_id], unique: true
  end
end
