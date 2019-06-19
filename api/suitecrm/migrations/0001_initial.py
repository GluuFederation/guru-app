# Generated by Django 2.1.8 on 2019-05-08 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host', models.URLField(blank=True, verbose_name='host')),
                ('client_id', models.TextField(blank=True, verbose_name='client id')),
                ('client_secret', models.TextField(blank=True, verbose_name='client secret')),
                ('access_token', models.TextField(blank=True, verbose_name='access token')),
                ('access_token_expiry', models.DateTimeField(blank=True, null=True, verbose_name='access token expiry date')),
                ('created_on', models.DateTimeField(auto_now_add=True, verbose_name='created on')),
                ('last_update', models.DateTimeField(auto_now=True, verbose_name='last login')),
            ],
        ),
    ]