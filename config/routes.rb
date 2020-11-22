Rails.application.routes.draw do
  root to: "pages#index"
  resources :characters, only: [:show]
end
