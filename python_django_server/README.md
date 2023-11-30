# Django and Django Rest Framework backend + React frontend  

## Installation
- Django
- Django Rest Framework

## why to use DRF serializers?
- Serializers in Django REST Framework is responsible for converting objects into data types understandable by javascript and front-end frameworks - this process is called serialization
- Serializers also provide deserialization, allowing parsed data to be converted back into complex types, after first validating the incoming data - this process is called deserialization
- 

## venv
- for window: `.venv\Scripts\activate`

## command line commands

- mkdir ANewDir
- cd ANewDir

- python3 -m venv .venv
- On Windows use `.venv\Scripts\activate` OR source `env/bin/activate`

- pip install django
- pip install djangorestframework

- django-admin startproject Mydj_react_project   # `Note  if add a trailing '.' character, file structure is different`
- cd Mydj_react_project
- django-admin startapp firstapi

- go to parent of manage.py : python manage.py migrate --- sync database for the first time ---
- python manage.py createsuperuser --email admin@example.com --username admin
- To test the api:  cd to Mydj_react_project : python manage.py runserver 
- for update models: 
    * python manage.py makemigrations project-name
    *  python manage.py migrate project-name



## config settting
- Add 'rest_framework' to INSTALLED_APPS. The settings


## add Model Article instance to db
- method1: use /admin interface 
- method2: use python manage.py shell 
- method3: use postman
- method4: use browsable API from rest_framework (*Viewsets.ModelViewSets+router* is the best approach)

## best part of DRF: - ver DRY code using classes
- views: viewsets.ModelViewSets
- models: models.Model
- serializer: serializers.ModelSerializer
- router: routers.DefaultRouter
- TokenAuthentication + permission
    * 'rest_framework.authtoken' added to setting/Installed_app : Auth Token / token is created in 'admin' (must run python manage.py migrate ) - token can be manually added to users
    * add permission_classes = [IsAuthenticatedOrReadOnly] to views that need auth/permission (only allow GET which are list and retrieve mixins for all users)
- User with hashed Password / auto token / not shown 

## handle in-browser CORS error caused by requests from other localhost ports (e.g 3000)
- python -m pip install django-cors-headers
- "corsheaders" added in installed_app in settings
- check doc, add middleware 
- CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
] for react frontend requests access