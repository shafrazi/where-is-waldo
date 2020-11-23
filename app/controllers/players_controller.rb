class PlayersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @players = Player.all
    render json: @players
  end

  def create
    @player = Player.new(player_params)

    if @player.save
      render json: @player
    else
      render json: { error: @player.errors.messages }, status: 422
    end
  end

  def update
    @player = Player.find(params[:id])

    if @player.update(player_params)
      render json: @player
    else
      render json: { error: @player.errors.messages }, status: 422
    end
  end

  private

  def player_params
    params.require(:player).permit(:name, :start_time, :end_time)
  end
end
