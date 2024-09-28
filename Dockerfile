# Use Ruby 3.1.3 as the base image
FROM ruby:3.1.3

# Label with the version number
LABEL version="0.1.0"

# Install dependencies
RUN apt-get update -qq && apt-get install -y \
  curl \
  gnupg2

# Install Node.js 18.x and Yarn
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs && \
  npm install --global yarn

# Set the working directory inside the container
WORKDIR /key_quest

# Copy the Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock /key_quest/

# Install Ruby dependencies
RUN bundle install

# Copy package.json and yarn.lock
COPY package.json yarn.lock /key_quest/

# Install JavaScript dependencies using Yarn
RUN yarn install --verbose

# Copy the entire project into the working directory inside the container
COPY . /key_quest/

# Expose port 3000 to the host
EXPOSE 3000
