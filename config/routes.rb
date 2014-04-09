Reddundancy::Application.routes.draw do
  root to: "static_pages#index"
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create]

#   Rails UI is deprecated.  All user interface should be through Backbone.
#
#   resources :users, only: [:show]
#
#   This route will redirect to the appropriate Backbone view.
  resources :sub_reddits, only: [:show, :index], path: "s"
#     resources :posts, only: [:new, :create]
#   end
#   resources :posts, only: [:show] do
#     resources :comments, only: [:new, :create]
#   end
#   resources :comments, only: [:show] do
#     resources :comments, only: [:new, :create]
#   end
#
#   resources :votes, only: [:create, :update]

  namespace :api, :defaults => { :format => :json } do
    resources :sub_reddits, only: [:index, :show, :create, :update, :destroy],
    path: "s" do
      resources :posts, only: [:index]
      resource :user_subs, only: [:create, :update, :destroy], path: "favorite"
    end
    resources :posts, only: [:show, :create, :update, :destroy] do
      resources :comments, only: [:index, :create]
    end
    resources :comments, only: [:show, :create, :update, :destroy] do
      resources :comments, only: [:create]
    end
    resources :users, only: [] do
      resources :user_subs, only: [:index], path: "favorites"
    end

    resources :votes, only: [:create, :update, :destroy]
  end
end
