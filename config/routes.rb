# config/routes.rb
Rails.application.routes.draw do
  root to: 'home#index'  # Adjust as per your controller setup
  get '*path', to: 'home#index'  # Send all routes to React app
end
