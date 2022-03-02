# Generated by Django 4.0.1 on 2022-01-27 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Room_status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.IntegerField(unique=True)),
                ('roll_number', models.CharField(blank=True, default=0, max_length=20, null=True)),
            ],
        ),
    ]
