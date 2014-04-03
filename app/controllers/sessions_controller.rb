class SessionsController < ApplicationController
  before_action :ensure_signed_in, only: [:destroy]

  def new
    @user = User.new
    render :new, locals: {user: @user}
  end

  def create
    if session_params[:username] == "SedditGuest"
      login_as_guest!
      redirect_to "/" and return
    end
    @user = User.find_by_credentials(session_params[:username], session_params[:password])
    if @user
      @user.username == "SedditGuest" ? login_as_guest! : login!(@user)
      redirect_to "/"
    else
      @user = User.new(session_params)
      flash.now[:errors] = "No user found for these credentials."
      render :new, locals: {user: @user}
    end
  end

  def destroy
    logout!
    redirect_to "/"
  end

  private
  def session_params
    params.require(:user).permit(:username, :password)
  end

  #Guest account keeps permanent session token to avoid multi-user conflicts
  def login_as_guest!
    guest_id = User.maximum(:id) + 1
    @user = User.create(email: "guest#{guest_id}@herokuapp.com", 
      username: "SedditGuest#{guest_id}", password: SecureRandom::urlsafe_base64(16))
    if @user.save
      session[:session_token] = @user.session_token
    else
      flash.now[:errors] = "An error occurred creating your guest account.  Sorry!"
    end
  end
end
