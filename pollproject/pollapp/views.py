from rest_framework import viewsets
from .models import Poll, Question, Choice
from .serializers import PollSerializer, QuestionSerializer, ChoiceSerializer
from django.contrib.auth import authenticate, login
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def csrf_token_view(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

@api_view(['POST'])
def vote_choice(request, choice_id):
    choice = get_object_or_404(Choice, id=choice_id)
    choice.votes += 1
    choice.save()
    return JsonResponse({'message': 'Vote counted', 'votes': choice.votes})

@api_view(['POST'])
def reset_votes(request):
    choices = Choice.objects.all()
    choices.update(votes=0)
    return JsonResponse({'message': 'Votes reset successfully'})
