from django.contrib import admin
from .models import Movie, Rating


admin.site.register(Movie)
admin.site.register(Rating)

admin.site.site_header  =  "MovieRatings Admin"  
admin.site.site_title  =  "MovieRatings Admin site"
admin.site.index_title  =  "MovieRatings Admin"