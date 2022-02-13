# Generated by Django 2.2.5 on 2022-01-17 10:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('OTCAPP', '0014_delete_goodreciept'),
    ]

    operations = [
        migrations.CreateModel(
            name='GOODRECIEPT',
            fields=[
                ('BATCHNO', models.AutoField(default='', max_length=6, primary_key=True, serialize=False)),
                ('DATE', models.DateField()),
                ('PRODCODE', models.PositiveIntegerField(default=0)),
                ('QTY', models.PositiveIntegerField(default=0)),
                ('PRICEPERUNT', models.PositiveIntegerField(default=0)),
                ('PONUM', models.CharField(default=0, max_length=8)),
                ('VENDOR', models.CharField(default=0, max_length=20)),
                ('WHCODE', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='OTCAPP.WHOUSE')),
            ],
            options={
                'ordering': ('BATCHNO',),
            },
        ),
    ]