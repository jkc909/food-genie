Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :weeks, only: [:show]

  namespace :api do 
  	namespace :v1 do
  		resources :weeks, only: [:show, :edit]
  	end
  end
end
