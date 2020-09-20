from django.db import models
from ..auth.models import User

# Create your models here.
class GameState(models.Model):

	game_board = models.CharField()
	id = models.IntegerField(default=-1)
	game_type = models.CharField(default="chess")

	player_one = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gamestate")
	player_two = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gamestate")
	current_turn = models.ForeignKey(User, on_delete=models.CASCADE, related_name="gamestate")

	def get_current_turn(self):
		return self.current_turn.username
