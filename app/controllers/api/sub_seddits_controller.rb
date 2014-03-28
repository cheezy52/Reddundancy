class Api::SubSedditsController < ApplicationController
  before_action :ensure_signed_in, only: [:update, :destroy, :create]
  before_action :verify_ownership, only: [:update, :destroy]

  def index
    @subs = SubSeddit.includes(:owner, :followers)
      .order(followers_count: :desc).order('lower(name)')
      .page(params[:page].to_i);
    render :index, locals: {subs: @subs}
  end

  def show
    @sub = SubSeddit.includes(:followers, posts: [:comments, :votes, :owner])
      .friendly.find(params[:id].to_s.downcase)
    render :show, locals: {sub: @sub}
  end

  def create
    @sub = current_user.owned_subs.build(sub_params)
    if @sub.save
      render :show, locals: {sub: @sub}
    else
      render :json => @sub.errors.full_messages, status: 422
    end
  end

  def update
    #@sub found in verify_ownership
    if @sub.update_attributes(sub_params)
      render :show, locals: {sub: @sub}
    else
      render :json => @sub.errors.full_messages, status: 422
    end
  end

  def destroy
    #@sub found in verify_ownership
    if @sub
      @sub.destroy
      render :show, locals: {sub: @sub}
    else
      head 404
    end
  end

  private
  def sub_params
    params.require(:sub).permit(:name)
  end

  def verify_ownership
    @sub = SubSeddit.includes(:owner).find(params[:id])
    head 403 unless @sub.owner == current_user
  end
end
