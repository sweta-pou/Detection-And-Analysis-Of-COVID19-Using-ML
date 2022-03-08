from covid.viewset import ImageViewSet
from rest_framework import routers

router=routers.DefaultRouter()
router.register('image',ImageViewSet)