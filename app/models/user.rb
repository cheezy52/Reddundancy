class User < ActiveRecord::Base
  validates :username, :password_digest, :email, :presence => true
  validates :username, :email, :session_token, :uniqueness => true
  validates :password, :length => { :minimum => 6, :allow_nil => true }
  before_validation :ensure_session_token


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
