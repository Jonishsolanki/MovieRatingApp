from django.contrib import admin
from .models import Movie, Rating

# Register your models here.


@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    list_display = ["title"]
    # list_filter = ["rating"]
    search_fields = ["title", "description"]


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ["user"]
