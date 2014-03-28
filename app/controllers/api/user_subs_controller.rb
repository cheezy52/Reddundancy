class Api::UserSubsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update, :destroy]

  def create
    @sub = SubSeddit.friendly.find(params[:sub_seddit_id])
    if @sub
      max_rank = current_user.user_subs.maximum("rank") || 0
      @favorite = @sub.user_subs.build(user_id: current_user.id, sub_id: @sub.id,
        rank: params[:rank] || max_rank + 1)
      if @favorite.save
        render :json => @favorite
      else
        render :json => @favorite.errors.full_messages, :status => 422
      end
    else
      head 404
    end
  end

  def update
    @sub = SubSeddit.friendly.find(params[:sub_seddit_id])
    if @sub
      max_rank = current_user.user_subs.maximum("rank") || 0
      @favorite = UserSub.find_by(user_id: current_user.id, sub_id: @sub.id)
      if @favorite
        @favorite.rank = params[:rank] || max_rank + 1
        if @favorite.save
          render :json => @favorite
        else
          head 422
        end
      else
        head 404
      end
    else
      head 404
    end
  end

  def destroy
    @sub = SubSeddit.friendly.find(params[:sub_seddit_id])
    if @sub
      @favorite = UserSub.find_by(user_id: current_user.id, sub_id: @sub.id)
      if @favorite
        @favorite.destroy
        render :json => @favorite
      else
        head 404
      end
    else
      head 404
    end
  end
end
