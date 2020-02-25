Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  resources :users, only: [:create, :show, :index]

  scope '/api' do
    resources :users, only: [:show] do 
      resources :weeks, only: [:show, :update]
      resources :grocery, only: [:show, :update]
    end
  end

  get  '*path', to: 'application#fallback_index_html', constraints: ->(request) do
    !request.xhr? && request.format.hml?
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
