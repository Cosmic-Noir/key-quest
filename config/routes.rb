# config/routes.rb
Rails.application.routes.draw do
  # root to: 'home#index'  # Adjust as per your controller setup
  # get '*path', to: 'home#index'  # Send all routes to React app

  namespace :api do
    # resources :scores, only: [:index, :create]
    # post 'login', to: 'sessions#create'
  end

  # Send all non-API requests to the React SPA
  get '*path', to: 'public#index', constraints: ->(req) do
    !req.path.start_with?('/api') && !req.path.start_with?('/assets')
  end
end
