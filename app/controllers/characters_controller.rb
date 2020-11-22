class CharactersController < ApplicationController
  def show
    @character = Character.find_by(location: params[:id])

    render json: @character
  end
end