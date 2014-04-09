class SubRedditsController < ApplicationController
  # Rails UI is deprecated.  All content UI should be through Backbone.

before_action :ensure_signed_in, only: [:new, :create]

  def index
    #Redirect to Backbone version; note root_url already ends with a "/"
    redirect_to "#{root_url}#"
  end

  def new
    @sub = SubReddundancy.new
    render :new, locals: {sub: @sub}
  end

  def create
    @sub = current_user.owned_subs.build(sub_params)
    if @sub.save
      flash[:notice] = "Sub-reddit successfully created!"
      redirect_to sub_reddit_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new, locals: {sub: @sub}
    end
  end

  def show
    #Redirect to Backbone version; note root_url already ends with a "/"
    redirect_to "#{root_url}#/s/#{params[:id]}"
#    Deprecated Rails UI
#    @sub = SubReddundancy.includes(posts:[:comments, :votes, :owner]).find(params[:id])
#    render :show, locals: {sub: @sub, posts: @sub.posts}
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
