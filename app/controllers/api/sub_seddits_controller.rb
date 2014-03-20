class Api::SubSedditsController < ApplicationController
  def show
    #full firehose mode for now
    @sub = SubSeddit.includes(posts: [:comments, :votes, :owner]).find(params[:id])
    render :show, locals: {sub: @sub}
  end
end
