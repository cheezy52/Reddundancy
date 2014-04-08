class Api::UserSubsController < ApplicationController
  before_action :ensure_signed_in, only: [:create, :update, :destroy]

  def index
    @favs = UserSub.includes(:sub).where(user_id: params[:user_id])
    if @favs
      render :index, locals: {favs: @favs}
    else
      head 404
    end
  end

  def create
    @sub = SubReddit.friendly.find(params[:sub_reddit_id])
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
    @sub = SubReddit.friendly.find(params[:sub_reddit_id])
    if @sub
      max_rank = current_user.user_subs.maximum("rank") || 0
      @favorite = UserSub.find_by(user_id: current_user.id, sub_id: @sub.id)
      if @favorite
        @favorite.rank = params[:rank] || max_rank + 1
        #update favorites this save is colliding with to maintain ranking
        reranked_faves = [@favorite]
        possible_collision = true
        collision_rank = @favorite.rank
        while possible_collision
          @collided_favorite = UserSub.find_by(user_id: current_user.id, 
            rank: collision_rank)
          if @collided_favorite
            @collided_favorite.rank += 1
            collision_rank = @collided_favorite.rank
            reranked_faves.push(@collided_favorite)
          else
            possible_collision = false
          end
        end
        #this will be very slow if users start having very many favorites
        if reranked_faves.reverse.all? { |fav| fav.save! }
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
    @sub = SubReddit.friendly.find(params[:sub_reddit_id])
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
