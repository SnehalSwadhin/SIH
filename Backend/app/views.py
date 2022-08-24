from django.shortcuts import render
from rest_framework.decorators import api_view
from django.http import JsonResponse
from Backend.settings import MEDIA_ROOT
from django.core.files.storage import default_storage
import os
import librosa
import torch
from transformers import Wav2Vec2ForCTC, Wav2Vec2Tokenizer

tokenizer = Wav2Vec2Tokenizer.from_pretrained("Harveenchadha/vakyansh-wav2vec2-sanskrit-sam-60")
model = Wav2Vec2ForCTC.from_pretrained("Harveenchadha/vakyansh-wav2vec2-sanskrit-sam-60")

@api_view(['POST'])
def transcript(request):
    save_path = os.path.join(MEDIA_ROOT, 'uploads', request.FILES['file'].name)
    save_path += '.wav'
    default_storage.save(save_path, request.FILES['file'])

    speech, rate = librosa.load(save_path, sr=16000)
    input_values = tokenizer(speech, return_tensors='pt').input_values
    # Store logits (non-normalized predictions)
    logits = model(input_values).logits
    # Store predicted id's
    predicted_ids = torch.argmax(logits, dim=-1)
    # decode the audio to generate text
    transcriptions = ''.join(tokenizer.decode(predicted_ids[0]).split('<s>'))

    default_storage.delete(save_path)
    return JsonResponse({'text': transcriptions}, json_dumps_params={'ensure_ascii': False})
