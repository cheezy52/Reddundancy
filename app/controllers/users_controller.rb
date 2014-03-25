class UsersController < ApplicationController
  def new
    @user = User.new
    render :new, locals: {user: @user}
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      redirect_to "/"
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new, locals: {user: @user}
    end
  end

  def show
    @user = User.find(params[:id])
    render :show, locals: {user: @user}
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password)
  end
end
