# Generated by Django 2.2.5 on 2022-01-15 10:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('OTCAPP', '0010_delete_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='PRODUCT',
            fields=[
                ('PRODCODE', models.AutoField(default='', max_length=4, primary_key=True, serialize=False)),
                ('PRODNAME', models.CharField(default='', max_length=25)),
                ('PRODGRP', models.CharField(default='', max_length=10)),
                ('INVENT', models.PositiveSmallIntegerField(default=0)),
                ('INVENTUNIT', models.CharField(default='', max_length=3)),
                ('INVENTCOST', models.PositiveSmallIntegerField(default=0)),
                ('ONORDERQTY', models.PositiveSmallIntegerField(default=0)),
            ],
            options={
                'ordering': ('PRODCODE',),
            },
        ),
    ]
