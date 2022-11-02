from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

import json
import requests

# Create your views here.

RANKING_URL = "http://localhost:8080/rank/xgboost"
FEEDBACK_URL = "http://localhost:8080/feedback"
#FILE_NAME = './base/incoming_data.js'

@api_view(['POST'])
def rank(request):
    payload = json.dumps(request.data)
    headers = {
    'Content-Type': 'application/json'
    }
    #print(payload)
    try:
        response = requests.request("POST", RANKING_URL, headers=headers, data=payload,timeout=10)
        print(response)
        data = json.loads(response.text)
        # with open(FILE_NAME,'a') as f:
        #     f.write('Ranking = ')
        #     f.write(payload)
        #     f.write('\n')
        return Response(data,status=200)
    except:
        return Response({'detail':"Server didn't respond"},status=400)
    
@api_view(['POST'])
def interact(request):
    payload = json.dumps(request.data)
    headers = {
    'Content-Type': 'application/json'
    }
    try:
        response = requests.request("POST", FEEDBACK_URL, headers=headers, data=payload,timeout=10)
        print(response)
        # with open(FILE_NAME,'a') as f:
        #     f.write('Interaction = ')
        #     f.write(payload)
        #     f.write('\n')
        return Response({"data":"ok"},status=200)
    except:
        return Response({'detail':"Server didn't respond"},status=400)