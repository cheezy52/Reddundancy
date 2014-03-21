class Api::SubSedditsController < ApplicationController
  def index
    @subs = SubSeddit.includes(:owner).all
    render :index, locals: {subs: @subs}
  end

  def show
    #full firehose mode for now
    @sub = SubSeddit.includes(posts: [:comments, :votes, :owner]).find(params[:id])
    render :show, locals: {sub: @sub}
  end
end
