# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  body       :string(255)      not null
#  owner_id   :integer          not null
#  created_at :datetime
#  updated_at :datetime
#  post_id    :integer          not null
#  parent_id  :integer
#

class Comment < ActiveRecord::Base
  validates :body, :owner, :post, presence: true

  belongs_to :parent, class_name: "Comment", inverse_of: :comments
  belongs_to :post, inverse_of: :comments
  belongs_to :owner, class_name: "User", inverse_of: :owned_comments

  has_many :comments, inverse_of: :parent, foreign_key: :parent_id
  has_many :votes, as: :votable, inverse_of: :votable

  def self.post_comments_by_parent_id(post_id)
    comments = self.where(post_id: post_id)
    comments_hash = Hash.new { [] }

    comments.each do |comment|
      #there's some strange stuff going on in here -
      #hacky stuff in the meantime to circumvent hash key strangeness
      if (comment.parent_id.nil?)
        comments_hash["toplevel"] = comments_hash["toplevel"].push(comment)
      else
        comments_hash[comment.parent_id] = comments_hash[comment.parent_id].push(comment)
      end
    end
    return comments_hash
  end
end
