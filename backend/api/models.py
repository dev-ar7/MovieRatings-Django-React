from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Movie(models.Model):

    title = models.CharField(max_length=245)
    # img = models.ImageField(blank = True)
    description = models.TextField(max_length=1000)

    def no_of_ratings(self):

        ratings = Rating.objects.filter(movie = self)
        return len(ratings)

    def avg_ratings(self):

        sum = 0
        ratings = Rating.objects.filter(movie = self)
        for rating in ratings:
            sum += rating.ratings

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0

    def __str__(self):
        return self.title


class Rating(models.Model):

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    ratings = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])

    class Meta:
        unique_together = (('user', 'movie'),)
        index_together = (('user', 'movie'),)

    def __str__(self):
        return f'{self.movie} - {self.ratings}'