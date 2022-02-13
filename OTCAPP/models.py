from django.db import models


# Create your models here.

class WHOUSE(models.Model):
    WHCODE = models.AutoField(primary_key=True, max_length=3, blank=False, default='')
    WHNAME = models.CharField(primary_key=False, max_length=25, blank=False, default='')
    WHADD = models.CharField(primary_key=False, max_length=25, blank=False, default='')

    class Meta:
        ordering = ('WHCODE',)


#
#
class PTBASIS(models.Model):
     BASISCODE = models.AutoField(primary_key=True)
     BASISDESC = models.CharField(primary_key=False,max_length=25,blank=False,default='')
     class Meta:
         ordering = ('BASISCODE',)

class PAYTERM(models.Model):
    PTERMCODE = models.AutoField(primary_key=True, max_length=4, blank=False, default='')
    PTDESC = models.CharField(primary_key=False, max_length=25, blank=False, default='')
    PTDAYS = models.PositiveIntegerField(blank=False)
    PTBASISCODE = models.ForeignKey(PTBASIS, on_delete=models.CASCADE)
    class Meta:
        ordering = ('PTERMCODE',)
class CUSTOMER(models.Model):
     CUSTCODE = models.AutoField(primary_key=True,max_length=4,blank=False)
     CUSTNAME = models.CharField(primary_key=False, max_length=25,blank=False,default='')
     CUSTADD = models.CharField(primary_key=False,max_length=25,blank=False,default='')
     PTERMCODE = models.ForeignKey(PAYTERM,on_delete=models.CASCADE)
     WHCODE = models.ForeignKey(WHOUSE,on_delete=models.CASCADE)
     ORDERVALUE = models.IntegerField(primary_key=False,max_length=10)

class PRODUCT(models.Model):
    PRODCODE = models.AutoField(primary_key=True,max_length=4,blank=False,default='')
    PRODNAME = models.CharField(primary_key=False,max_length=25,blank=False,default='')
    PRODGRP = models.CharField(primary_key=False,max_length=10,default='')
    INVENT = models.PositiveSmallIntegerField(primary_key=False,blank=True,default=0)
    INVENTUNIT = models.CharField(primary_key=False,max_length=3,default='')
    INVENTCOST = models.PositiveSmallIntegerField(primary_key=False,blank=True,default=0)
    ONORDERQTY = models.PositiveSmallIntegerField(primary_key=False, blank=True,default=0)
    class Meta:
        ordering = ('PRODCODE',)

class GOODRECIEPT(models.Model):
    BATCHNO = models.AutoField(primary_key=True,max_length=6,blank=False,default='')
    DATE = models.DateField(primary_key=False)
    PRODCODE = models.PositiveIntegerField(primary_key=False,blank=False,default=0)
    WHCODE = models.ForeignKey(WHOUSE,on_delete=models.CASCADE)
    QTY = models.PositiveIntegerField(primary_key=False,blank=False,default=0)
    PRICEPERUNT = models.PositiveIntegerField(primary_key=False,blank=False,default=0)
    PONUM = models.CharField(primary_key=False,max_length=8,blank=False,default=0)
    VENDOR = models.CharField(primary_key=False,max_length=20,blank=False,default=0)
    class Meta:
        ordering = ('BATCHNO',)


class CHANGE(models.Model):
    CHANGENO = models.AutoField(primary_key=True,max_length=10,blank=False,default='')
    BATCHNO = models.CharField(primary_key=False,max_length=6,blank=False,default='')
    FIELDNAME = models.CharField(primary_key=False,max_length=600,blank=False,default='')
    OLDVALUE = models.CharField(primary_key=False,max_length=600,blank=False,default='')
    NEWVALUE = models.CharField(primary_key=False,max_length=600,blank=False,default='')
    CHANGEDATE = models.DateTimeField(primary_key=False,blank=False)
    USER = models.CharField(primary_key=False, max_length=50, blank=False,default='')

    class Meta:
        ordering = ('CHANGENO',)
class salesheader(models.Model):
    SONUM = models.AutoField(primary_key=True,max_length=6,blank=False,default='')
    SODATE = models.DateField(primary_key=False,max_length=10,blank=False,default='')
    RDD = models.DateField(primary_key=False,max_length=10,blank=False,default='')
    CUSTCODE = models.ForeignKey(CUSTOMER,on_delete=models.CASCADE)
    PTERM = models.ForeignKey(PAYTERM,on_delete=models.CASCADE)
    ORDERAMT = models.IntegerField(primary_key=False,default='')

class salesinline(models.Model):
    SONUM = models.IntegerField(primary_key=False,blank=False,default='')
    ITEM = models.IntegerField(primary_key=False,blank=False,default='')
    PRODCODE = models.ForeignKey(PRODUCT,on_delete=models.CASCADE)
    QTY = models.IntegerField(primary_key=False,blank=False,default='')
    PRICE = models.IntegerField(primary_key=False,blank=False,default='')
    WAREH = models.ForeignKey(WHOUSE,on_delete=models.CASCADE)
    STATUS = models.CharField(primary_key=False,max_length=10,blank=False,default='')



