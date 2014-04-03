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
  include Votable
  include Commentable

  validates :body, :owner, :post, presence: true
  #allows nil parent_id for toplevel comments, else must be valid reference
  validates_associated :parent

  belongs_to :parent, class_name: "Comment", inverse_of: :comments
  belongs_to :post, inverse_of: :comments
  belongs_to :owner, class_name: "User", inverse_of: :owned_comments

  has_many :comments, inverse_of: :parent, foreign_key: :parent_id
  has_many :votes, as: :votable, inverse_of: :votable, dependent: :destroy

  def self.post_comments_by_parent_id(post_id)
    #Takes in a list of comments rather than fetching locally
    comments = self.includes(:owner).where(post_id: post_id)
    comments_hash = Hash.new { [] }

    comments.each do |comment|
      if (comment.parent_id.nil?)
        comments_hash["toplevel"] = comments_hash["toplevel"].push(comment)
      else
        comments_hash[comment.parent_id] = comments_hash[comment.parent_id].push(comment)
      end
    end
    return comments_hash
  end

  def num_comments_nested
    #Works, but fires a SQL query for every comment that's not top-level.
    #To be avoided for now; Commentable "num_comments" will return
    #a shallow list of children, instead of this one's deep list.
    if (self.comments.length == 0)
      return 0
    else
      self.comments.length + self.comments.map do |subcomment|
        subcomment.num_comments
      end.inject(:+)
    end
  end
end
