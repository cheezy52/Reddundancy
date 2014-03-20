class ReplaceCommentPolymorphismWithTree < ActiveRecord::Migration
  def change
    remove_column :comments, :commentable_id
    remove_column :comments, :commentable_type
    add_column :comments, :post_id, :integer, null: false
    add_column :comments, :parent_id, :integer

    add_index :comments, :post_id
    add_index :comments, :parent_id
  end
end
