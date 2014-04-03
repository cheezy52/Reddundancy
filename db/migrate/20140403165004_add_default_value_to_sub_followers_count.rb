class AddDefaultValueToSubFollowersCount < ActiveRecord::Migration
  def change
    change_column :sub_seddits, :followers_count, :integer, :default => 0, 
      :null => false
  end
end
