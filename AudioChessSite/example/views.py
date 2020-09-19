from django.shortcuts import render


def user_list(request):
    return render(request, 'templates/example/user_list.html')