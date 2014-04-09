class ChangeNameSedditToReddundancy < ActiveRecord::Migration
  def change
    rename_table :sub_seddits, :sub_reddits
  end
end
