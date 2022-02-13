from rest_framework import serializers
from OTCAPP.models import WHOUSE
from OTCAPP.models import PAYTERM, PTBASIS, PRODUCT,GOODRECIEPT,CHANGE,CUSTOMER,salesinline,salesheader

class WareHSerializer(serializers.ModelSerializer):
    class Meta:
        model = WHOUSE
        fields = ('WHCODE', 'WHNAME', 'WHADD')
class PTSerializer(serializers.ModelSerializer):
    class Meta:
        model = PAYTERM
        fields = ('PTERMCODE','PTDESC','PTDAYS','PTBASISCODE',)
class PTBASISSerializer(serializers.ModelSerializer):
    class Meta:
        model = PTBASIS
        fields = ('BASISCODE','BASISDESC',)
class CUSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = CUSTOMER
        fields = ('CUSTCODE','CUSTNAME','CUSTADD','ORDERVALUE','PTERMCODE_id','WHCODE_id')
class PRODUCTserializers(serializers.ModelSerializer):
    class Meta:
        model = PRODUCT
        fields = ('PRODCODE','PRODNAME','PRODGRP','INVENT','INVENTUNIT','INVENTCOST','ONORDERQTY')
class GOODserialiaers(serializers.ModelSerializer):
    class Meta:
        model = GOODRECIEPT
        fields = ('BATCHNO','DATE','PRODCODE','WHCODE','QTY','PRICEPERUNT','PONUM','VENDOR')
class CHANGEser(serializers.ModelSerializer):
    class Meta:
        model = CHANGE
        fields = ('CHANGENO','BATCHNO','FIELDNAME','OLDVALUE','NEWVALUE','CHANGEDATE')
class HEADser(serializers.ModelSerializer):
    class Meta:
        model = salesheader
        fields = ('SONUM','SODATE','RDD','ORDERAMT','CUSTCODE_id','PTERM_id')
class line(serializers.ModelSerializer):
    class Meta:
        model = salesinline
        fields = ('SONUM','ITEM','QTY','PRICE','STATUS','PRODCODE','WAREH')