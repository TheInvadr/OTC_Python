# Generated by Django 2.2.5 on 2022-01-12 15:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('OTCAPP', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='whouse',
            options={'ordering': ('WHCODE',)},
        ),
    ]
