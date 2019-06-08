Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :weeks, only: [:show]
  resources :recipes, only: [:index, :show, :edit, :update]
  resources :weeks do 
    resources :recipes, only: [:index, :show, :edit, :update]
  end

  namespace :api do 
  	namespace :v1 do
      resources :weeks, only: [:show, :edit, :update]
      resources :recipes, only: [:index, :show, :edit, :update]
      resources :weeks do
        resources :recipes, only: [:index, :show, :edit, :update] do 
          resources :meals, only: [:create, :destroy]
        end
      end
  	end
  end
end
