class SubSedditsController < ApplicationController
before_action :ensure_signed_in, only: [:new, :create]

#  def index
#  end

  def new
    @sub = SubSeddit.new
    render :new, locals: {sub: @sub}
  end

  def create
    @sub = current_user.owned_subs.build(sub_params)
    @sub.owner = current_user
    if @sub.save
      flash[:notice] = "Sub-seddit successfully created!"
      redirect_to sub_seddit_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new, locals: {sub: @sub}
    end
  end

  def show
    @sub = SubSeddit.includes(posts: [:comments, :votes]).find(params[:id])
    render :show, locals: {sub: @sub}
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
