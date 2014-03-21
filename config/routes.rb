Seddit::Application.routes.draw do
  root to: "static_pages#index"
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]

  resources :sub_seddits, only: [:new, :create, :show, :index], path: "s" do
    resources :posts, only: [:new, :create]
  end
  resources :posts, only: [:show] do
    resources :comments, only: [:new, :create]
    resource :vote, only: [:create, :update]
  end
  resources :comments, only: [:show] do
    resources :comments, only: [:new, :create]
    resource :vote, only: [:create, :update]
  end

  namespace :api, :defaults => { :format => :json } do
    resources :sub_seddits, only: [:index, :show], path: "s" do
      resources :posts, only: [:index]
    end
    resources :posts, only: [:show] do
      resources :comments, only: [:index, :create]
      resource :vote, only: [:create, :update]
    end
    resources :comments, only: [:show] do
      resources :comments, only: [:create]
      resource :vote, only: [:create, :update]
    end
  end
end
