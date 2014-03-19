class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
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

end
