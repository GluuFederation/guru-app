# Generated by Django 2.1.8 on 2019-05-12 01:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ticketcategory',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='info/categories'),
        ),
    ]
