class AddFriendlyIdToSubs < ActiveRecord::Migration
  def change
    add_column :sub_seddits, :slug, :string
    add_index :sub_seddits, :slug, :unique => true
  end
end
