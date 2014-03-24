class Api::SubSedditsController < ApplicationController
  def index
    @subs = SubSeddit.includes(:owner).all
    render :index, locals: {subs: @subs}
  end

  def show
    @sub = SubSeddit.includes(posts: [:comments, :votes, :owner]).find(params[:id])
    render :show, locals: {sub: @sub}
  end

  def create
    puts params
    @sub = current_user.owned_subs.build(sub_params)
    if @sub.save
      render :show, locals: {sub: @sub}
    else
      render :json => @sub.errors.full_messages, status: 422
    end
  end

  private
  def sub_params
    params.require(:sub).permit(:name)
  end
end
