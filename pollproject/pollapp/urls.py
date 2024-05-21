from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PollViewSet, QuestionViewSet, ChoiceViewSet, reset_votes, vote_choice

router = DefaultRouter()
router.register(r'polls', PollViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'choices', ChoiceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/choices/<int:choice_id>/vote/', vote_choice, name='vote-choice'),  
    path('api/reset-votes/', reset_votes, name='reset-votes'),
]
