class PublicController < ApplicationController
  def index
    # Serve the React SPA from public/index.html
    render file: Rails.root.join('public', 'index.html'), layout: false
  end
end
