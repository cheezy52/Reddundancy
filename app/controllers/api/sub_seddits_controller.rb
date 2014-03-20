class Api::SubSedditsController < ApplicationController
  def show
    #full firehose mode for now
    @sub = SubSeddit.includes(posts: [:comments, :votes]).find(params[:id])
    render :json => @sub, :include => {
      :posts => {
        :include => [:comments, :votes]
      }
    }
  end
end
