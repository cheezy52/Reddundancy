# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)      not null
#  email           :string(255)      not null
#  password_digest :string(255)      not null
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :presence => true
  validates :username, :email, :session_token, :uniqueness => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  before_validation :ensure_session_token

  has_many :owned_comments, class_name: "Comment", foreign_key: "owner_id"
  has_many :owned_posts, class_name: "Post", foreign_key: "owner_id"
  has_many :owned_subs, class_name: "SubSeddit", foreign_key: "owner_id"
  has_many :owned_votes, class_name: "Vote", foreign_key: "owner_id"

  def self.find_by_credentials(username, plaintext_password)
    user = self.find_by_username(username)
    if user
      if user.is_password?(plaintext_password)
        return user
      end
    end
    return nil
  end

  def password
    @password ||= nil
  end

  def password=(plaintext)
    @password = plaintext
    #plaintext pw NOT persisted to database; only used to verify length

    self.password_digest = BCrypt::Password.create(plaintext)
  end

  def is_password?(plaintext)
    return BCrypt::Password.new(self.password_digest).is_password?(plaintext)
  end

  def generate_session_token
    return SecureRandom::urlsafe_base64(16)
  end

  def generate_session_token!
    self.session_token = self.generate_session_token
    self.save
  end

  def ensure_session_token
    self.session_token ||= self.generate_session_token
  end
end
