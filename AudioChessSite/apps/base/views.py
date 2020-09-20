from django import forms
from .forms import UploadFileForm
from django.contrib import messages
from django.contrib.auth import logout
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

class GameCreationForm(forms.Form):
    username1 = forms.CharField(label="Your Username", max_length = 32)
    username2 = forms.CharField(label="Opponent's Username", max_length = 32)
    game_type = forms.CharField(label="Game Type", max_length=16)

def upload(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            print("Got file.")

def login_request(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"You are now logged in as {username}")
                return redirect('/')
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    form = AuthenticationForm()
    return render(request = request,
                    template_name = "login.html",
                    context={"form":form})

def logout_request(request):
    logout(request)
    return redirect("/login")

def register(request):
    print("plz workkkkk")
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        print("Form: ", form.errors, form.cleaned_data.get('username'), form.cleaned_data.get('email'))
        if form.is_valid():
            username, password, email = form.cleaned_data.get('username'), form.cleaned_data.get('password'), form.cleaned_data.get('email')
            print(username, password, email, "yooooo")
            User = get_user_model()
            try:
                match = User.objects.get(email=email)
                messages.error(request, "An account with that email already exists!", extra_tags="danger")
                return redirect("/")
            except User.DoesNotExist:
                form.save()
                user = authenticate(username=username, password=password, email=email)
                return redirect("/login")
    else:
        form = UserCreationForm()
    return render(request = request,
                    template_name = "register.html",
                    context={"form":form})

def index(request):
    if request.user.is_authenticated:
        return render(request, "home.html", {})
    else:
        return render(request, "index.html", {})

def about(request):
    return render(request, "about.html", {})

def preferences(request):
    return render(request, "preferences.html", {})

def chess(request):
    return render(request, "chess.html", {})

def ultimate_ttt(request):
    return render(request, "ultimate-ttt.html", {})

def user_list(request):
    return render(request, 'user_list.html')

def testing(request):
    return render(request, "testing.html", {})