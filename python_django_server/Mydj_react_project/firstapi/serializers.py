from rest_framework import serializers
from .models import Article
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class ArticleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ['id', 'title', 'description'] # add "id" which is auto-generated

""" User needs 1. auto token 2. hashed password 3. non-shown"""
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

        # not show password
        extra_kwargs = {'password': {'write_only': True}}

        # to hash password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # to auto generate Token for this user
        Token.objects.create(user=user)
        return user