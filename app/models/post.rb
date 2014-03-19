# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  link       :string(255)
#  owner_id   :integer          not null
#  sub_id     :integer
#  created_at :datetime
#  updated_at :datetime
#

class Post < ActiveRecord::Base
end
