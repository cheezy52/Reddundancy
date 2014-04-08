class SessionsController < ApplicationController
  before_action :ensure_signed_in, only: [:destroy]

  def new
    @user = User.new
    render :new, locals: {user: @user}
  end

  def create
    if session_params[:username] == "RedditLiteGuest"
      login_as_guest!
      redirect_to "/" and return
    end
    @user = User.find_by_credentials(session_params[:username], session_params[:password])
    if @user
      login!(@user)
      redirect_to "/"
    else
      @user = User.new(session_params)
      flash.now[:errors] = "No user found for these credentials."
      render :new, locals: {user: @user}
    end
  end

  def destroy
    if current_user.username[0..14] == "RedditLiteGuest"
      logout_guest!
    elsif current_user
      logout!
    end
    redirect_to "/"
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end

  #Guest account keeps permanent session token to avoid multi-user conflicts
  DEFAULT_SUBS = ["RedditLiteAnnouncements", "BenjaminSmith", "technology"]
  def login_as_guest!
    guest_id = (User.maximum(:id) || 1) + 1
    @user = User.create(email: "guest#{guest_id}@herokuapp.com", 
      username: "RedditLiteGuest#{guest_id}", password: SecureRandom::urlsafe_base64(16))
    DEFAULT_SUBS.each_with_index do |sub_name, i|
      @user.user_subs.build(sub: SubReddit.find_by_name(sub_name), rank: i)
    end
    if @user.save
      session[:session_token] = @user.session_token
    else
      flash.now[:errors] = "An error occurred creating your guest account.  Sorry!"
    end
  end

  def logout_guest!
    #clear favorites/votes to prevent karmabotting with guest accounts
    current_user.user_subs.map(&:destroy)
    current_user.owned_votes.map(&:destroy)
    logout!
  end
end
