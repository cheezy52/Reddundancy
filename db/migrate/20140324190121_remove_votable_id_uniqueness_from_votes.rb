class RemoveVotableIdUniquenessFromVotes < ActiveRecord::Migration
  def change
    remove_index :votes, [:votable_id, :owner_id]
    add_index :votes, [:votable_id, :owner_id]
  end
end
