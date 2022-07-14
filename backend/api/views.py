from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Movie, Rating
from .serializers import MovieSerializers, RatingSerializers, UserSerializers


class UserViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = UserSerializers
    permission_classes = (AllowAny,)


class MoviesViewSet(viewsets.ModelViewSet):

    queryset = Movie.objects.all()
    serializer_class = MovieSerializers
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    @action(detail=True, methods=['POST'])
    def movie_rating(self, request, pk):

        
        if 'rating' in request.data:
            movie = Movie.objects.get(id=pk)
            rating = request.data['rating']
            user = request.user
            print(user)

            try:
                ratings_up = Rating.objects.get(user=user.id, movie=movie.id)
                ratings_up.ratings = rating
                ratings_up.save()
                serializer = RatingSerializers(ratings_up, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except:
                ratings_cr = Rating.objects.create(user=user, movie=movie, ratings=rating)
                serializer = RatingSerializers(ratings_cr, many=False)
                return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            response = {'message': 'Something Went Wrong!'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class RatingViewSet(viewsets.ModelViewSet):

    queryset = Rating.objects.all()
    serializer_class = RatingSerializers
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def create(self, request, *args, **kwargs):
        response = {'message': "You Can't Create Ratings Like This"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': "You Can't Update Ratings Like This"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)