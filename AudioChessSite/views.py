from django.shortcuts import render

def landing(request):
    return render(request, "index.html", {})

def login(request):
    return render(request, "login.html", {})

def register(request):
    return render(request, "register.html", {})

def home(request):
    return render(request, "home.html", {})

def game(request):
    return render(request, "game.html", {})