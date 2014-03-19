class SubSedditsController < ApplicationController
before_action :ensure_signed_in, only: [:new, :create]

#  def index
#  end

  def new
    @sub = SubSeddit.new
    render :new
  end

  def create
    @sub = SubSeddit.new(sub_params)
    @sub.owner = current_user
    if @sub.save
      flash[:notice] = "Sub-seddit successfully created!"
      redirect_to sub_seddit_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def show
    @sub = SubSeddit.includes(posts: [:comments, :votes]).find(params[:id])
    @posts = @sub.posts
    render :show
  end

#   def edit
#   end
#
#   def update
#   end
#
#   def destroy
#   end
  private
  def sub_params
    params.require(:sub).permit(:name)
  end
end