Rails.application.routes.draw do
  root to: "pages#index"
  resources :characters, only: [:show]
  resources :players, only: [:index, :create, :update]
  get "*path", to: "pages#index", via: :all
end
