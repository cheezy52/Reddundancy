class SessionsController < ApplicationController
  before_action :ensure_signed_in, only: [:destroy]

  def new
    @user = User.new
    render :new, locals: {user: @user}
  end

  def create
    @user = User.find_by_credentials(session_params[:username], session_params[:password])
    if @user
      @user.username == "SedditGuest" ? login_as_guest!(@user) : login!(@user)
      redirect_to "/"
    else
      @user = User.new(session_params)
      flash.now[:errors] = "No user found for these credentials."
      render :new, locals: {user: @user}
    end
  end

  def destroy
    current_user.username == "SedditGuest" ? logout_guest! : logout!
    redirect_to "/"
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end

  def login!(user)
    if user
      user.generate_session_token!
      session[:session_token] = user.session_token
    else
      flash[:errors] = "Error logging in: no user provided to login function."
    end
  end

  def logout!
    if current_user
      current_user.generate_session_token!
      session[:session_token] = nil
    end
  end

  #Guest account keeps permanent session token to avoid multi-user conflicts
  def login_as_guest!(user)
    session[:session_token] = user.session_token
  end

  def logout_guest!
    session[:session_token] = nil
  end
end
