class Player < ApplicationRecord
  before_update :set_score

  def set_score
    self.score = self.end_time - self.start_time
  end
end
