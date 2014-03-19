Seddit::Application.routes.draw do
  root to: "static_pages#index"
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]
  resources :sub_seddits, only: [:new, :create, :show, :index], path: "s" do
    resources :posts, only: [:new, :create]
  end
  resources :posts, only: [:show] do
    resources :comments, only: [:new, :create]
    resources :votes, only: [:create]
  end
  resources :comments, only: [:show] do
    resources :comments, only: [:new, :create]
    resources :votes, only: [:create]
  end
end
