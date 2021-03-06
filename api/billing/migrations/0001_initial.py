# Generated by Django 2.1.8 on 2019-05-12 01:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('updated_on', models.DateTimeField(auto_now=True)),
                ('plan', models.CharField(choices=[('community', 'Community'), ('core', 'Core'), ('vip', 'VIP')], default='community', max_length=25, verbose_name='support plan')),
                ('name', models.CharField(max_length=255, verbose_name='name')),
                ('idp_uuid', models.TextField(verbose_name='idp uuid')),
                ('company', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='profiles.Company')),
                ('user', models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_on', '-updated_on'],
                'abstract': False,
            },
        ),
    ]
