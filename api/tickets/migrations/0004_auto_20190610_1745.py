# Generated by Django 2.2.2 on 2019-06-10 17:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0003_auto_20190610_1732'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ticket',
            name='os',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='os_version',
            field=models.CharField(max_length=255),
        ),
    ]