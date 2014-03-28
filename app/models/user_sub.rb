class UserSub < ActiveRecord::Base
  validates :user, :sub, :rank, :presence => true
  validates_uniqueness_of :sub, :scope => [:user]
  validates_uniqueness_of :rank, :scope => [:user]

  belongs_to :user, :inverse_of => :user_subs
  belongs_to :sub, class_name: "SubSeddit", :inverse_of => :user_subs,
    counter_cache: :followers_count
end
