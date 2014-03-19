Seddit::Application.routes.draw do
  root to: "static_pages#index"
  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:new, :create, :show]
end
