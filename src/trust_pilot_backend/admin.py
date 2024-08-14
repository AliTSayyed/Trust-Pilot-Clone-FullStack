from django.contrib import admin

from .models import Reviews, Freelancers, Users

# give admin access to review db
admin.site.register(Reviews)
admin.site.register(Freelancers)
admin.site.register(Users)