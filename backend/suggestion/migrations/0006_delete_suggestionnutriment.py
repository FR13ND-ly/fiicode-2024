# Generated by Django 5.0.2 on 2024-03-17 20:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('suggestion', '0005_alter_suggestionallergen_name_and_more'),
    ]

    operations = [
        migrations.DeleteModel(
            name='SuggestionNutriment',
        ),
    ]