from datetime import datetime

from django.shortcuts import render
from OTCAPP.serializers import WareHSerializer
from OTCAPP.serializers import PTSerializer, PTBASISSerializer, PRODUCTserializers, GOODserialiaers,CHANGEser,line,CUSTSerializer,HEADser,line
from django.http.response import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view
from django.db import connection, connections
from OTCAPP.models import WHOUSE, salesinline
from OTCAPP.models import PAYTERM
from OTCAPP.models import PTBASIS
from OTCAPP.models import  PRODUCT, GOODRECIEPT,CHANGE,CUSTOMER,salesheader
from deepdiff import DeepDiff
import re

# Create your views here.
@api_view(['POST'])
def WHADD(request):
    print('BROOOO')
    if request.method == 'POST':
        WAREH = JSONParser().parse(request)
        wareh = WareHSerializer(data=WAREH)
        data_dict = wareh.initial_data
        print(data_dict)
        WHNAME1 = (data_dict['whName'])
        WHADD1 = (data_dict['whAdd'])
        cursor = connection.cursor()
        cursor.execute('INSERT INTO otcapp_whouse (WHNAME,WHADD) VALUES (%s,%s)', [WHNAME1, WHADD1])
        return JsonResponse(data_dict, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def WHshow(request):
    print(request)
    if request.method == 'GET':
        wareShow = WHOUSE.objects.raw('SELECT * FROM otcapp_whouse')

        print("h")

        wareh_serializer = WareHSerializer(wareShow, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(wareh_serializer.data, safe=False)


def WH_show_specific(request, pk):
    if request.method == "GET":
        print(request)
        cursor = connection.cursor()

        print("Hi")

        cursor.execute("""select * from otcapp_whouse where WHCODE = %s""", [pk, ])

        print("Hi 2")

        whouse = cursor.fetchone()

        # print(whouse)

        # print(cursor.description)

        col_names = [col[0] for col in (cursor.description)]

        # print(col_names, employee)
        #
        # print(dict(zip(col_names, employee)))

        return JsonResponse(dict(zip(col_names, whouse)), safe=False)


@api_view(['DELETE'])
def wh_delete(request):
    if request.method == "DELETE":
        wareh = JSONParser().parse(request)
        wareh_ser = WareHSerializer(data=wareh)

        print(wareh['id'])

        cursor = connection.cursor()

        cursor.execute("delete from otcapp_whouse where WHCODE = %s", [wareh['id'], ])

        return JsonResponse(wareh_ser.data, status=status.HTTP_200_OK)


@api_view(['PUT'])
def WHUPDATE(request, pk):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)
        print(data_dict)
        cursor = connection.cursor()

        cursor.execute("""update otcapp_whouse set WHNAME = %s, WHADD = %s where WHCODE = %s 
        """, [data_dict['WHNAME1'], data_dict['WHADD1'], data_dict['WHCODE2']])
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)


@api_view(['POST'])
def PTADD(request):
    print('BROOOO')
    if request.method == 'POST':
        PAYMENT = JSONParser().parse(request)
        payment = PTSerializer(data=PAYMENT)
        data_dict = payment.initial_data
        print(data_dict)
        PTDESC = (data_dict['PTNAME'])
        PTDAYS = (data_dict['PTTIME'])
        PTBASIS = (data_dict['PTTYPE'])
        cursor = connection.cursor()
        cursor.execute('INSERT INTO otcapp_payterm (PTDESC,PTDAYS,PTBASISCODE_id) VALUES (%s,%s,%s)',
                       [PTDESC, PTDAYS, PTBASIS])
        return JsonResponse(data_dict, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def PTSHOW(request):
    print(request)
    if request.method == 'GET':
        payterm = PAYTERM.objects.raw('SELECT * FROM otcapp_payterm')

        print("h")

        PaySerializer = PTSerializer(payterm, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(PaySerializer.data, safe=False)


def pt_show_specific(request, pk):
    if request.method == "GET":
        # print(request)
        cursor = connection.cursor()

        # print("Hi")

        cursor.execute("""select * from otcapp_product where PRODCODE = %s""", [pk, ])

        # print("Hi 2")

        products = cursor.fetchone()

        # print(whouse)

        # print(cursor.description)

        col_names = [col[0] for col in (cursor.description)]

        # print(col_names, employee)
        #
        # print(dict(zip(col_names, employee)))

        return JsonResponse(dict(zip(col_names, products)), safe=False)


def pbasis(request):
    if request.method == "GET":
        payterm = PTBASIS.objects.raw('SELECT * FROM otcapp_ptbasis')

        PaySerializer = PTBASISSerializer(payterm, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(PaySerializer.data, safe=False)


@api_view(['PUT'])
def PTUPDATE(request, pk):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)
        print(data_dict)
        cursor = connection.cursor()

        cursor.execute("""update otcapp_payterm set PTBASISCODE_id = %s, PTDESC = %s, PTDAYS = %s where PTERMCODE = %s 
        """, [data_dict['PTBASISCODE1'], data_dict['PTDESC1'], data_dict['PTDAYS1'], data_dict['PTERMCODE1']])
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)


@api_view(['POST'])
def CUSTADD(request):
    print('BROOOO')
    if request.method == 'POST':
        CUSTOMER = JSONParser().parse(request)
        customer = CUSTSerializer(data=CUSTOMER)
        data_dict = customer.initial_data
        print(data_dict)
        CUSTNAME = (data_dict['CUSTCALL'])
        CUSTADD = (data_dict['CUSTPLACE'])
        PTCODE = (data_dict['PTID'])
        WHCODE = (data_dict['WHID'])
        cursor = connection.cursor()
        cursor.execute('INSERT INTO otcapp_customer (CUSTNAME,CUSTADD,PTERMCODE_id,WHCODE_id) VALUES (%s,%s,%s,%s)',
                       [CUSTNAME, CUSTADD, PTCODE, WHCODE])
        return JsonResponse(data_dict, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def PRODADD(request):
    print('BROOOO')
    if request.method == 'POST':
        PRODUCT = JSONParser().parse(request)
        product = PRODUCTserializers(data=PRODUCT)
        data_dict = product.initial_data
        print(data_dict)
        PRODNAME = (data_dict['PRODCALL'])
        PRODGRP = (data_dict['PRODTYPE'])
        INVENT = (data_dict['STORAGE'])
        INVENTUNT = (data_dict['INVENTCLASS'])
        INVENTCOST = (data_dict['INVENTPRICE'])
        ONORDERQTY = (data_dict['ONORDER'])
        print("Bro 2: electric boogaloo")
        cursor = connection.cursor()
        cursor.execute(
            'INSERT INTO otcapp_product (PRODNAME,PRODGRP,INVENT,INVENTUNIT,INVENTCOST,ONORDERQTY) VALUES (%s,%s,%s,%s,%s,%s)',
            [PRODNAME, PRODGRP, INVENT, INVENTUNT, INVENTCOST, ONORDERQTY])
        print(cursor.fetchone())
        return JsonResponse(product.initial_data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def PRODSHOW(request):
    print(request)
    if request.method == 'GET':
        Product = PRODUCT.objects.raw('SELECT * FROM otcapp_product')

        print("h")

        prod = PRODUCTserializers(Product, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(prod.data, safe=False)


@api_view(['POST'])
def GOODSDADD(request):
    print('BROOOO')
    if request.method == 'POST':
        GOODS = JSONParser().parse(request)
        goods = GOODserialiaers(data=GOODS)
        data_dict = goods.initial_data
        print(data_dict)
        GOODDATE = (data_dict['DATE12'])
        PCODE = int(data_dict['PCODE'])
        WCODE = int(data_dict['WCODE'])
        QTY = int(data_dict['QUANTY'])
        PRICEPERPROD = int(data_dict['PPP2'])
        PONUM = int(data_dict['PO'])
        VENDOR = (data_dict['SELLER'])
        print("Bro 2: electric boogaloo")
        print(GOODDATE, PCODE, WCODE, QTY, PRICEPERPROD, PONUM, VENDOR)
        cursor = connection.cursor()
        cursor.execute(
            'INSERT INTO otcapp_goodreciept (DATE,PRODCODE,QTY,PRICEPERUNT,PONUM,VENDOR,WHCODE_id) VALUES (%s,%s,%s,%s,%s,%s,%s)',
            [GOODDATE, PCODE, QTY, PRICEPERPROD, PONUM, VENDOR, WCODE])
        print(cursor.fetchone())
        return JsonResponse(goods.initial_data, status=status.HTTP_201_CREATED)


def EXCITINGUPDATE(request):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)
        # print(data_dict)
        cursor = connection.cursor()

        cursor.execute("""update otcapp_product set INVENT = %s,INVENTCOST = %s where PRODCODE = %s
        """, [data_dict['PTBASISCODE1'],data_dict['BRO'], data_dict['PTDESC1']])
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)

@api_view(['GET'])
def GOODSHOW(request):
    # print(request)
    if request.method == 'GET':
        Reciept = GOODRECIEPT.objects.raw("""select BATCHNO,DATE,PRODCODE,WHCODE_id,QTY,PRICEPERUNT,PONUM,VENDOR
from otcapp_goodreciept""")

        print("h")

        goods = GOODserialiaers(Reciept, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(goods.data, safe=False)
@api_view(['DELETE'])
def goods_delete(request):
    if request.method == "DELETE":
        goods = JSONParser().parse(request)
        goods_ser = GOODserialiaers(data=goods)

        # print(goods['id'])

        cursor = connection.cursor()

        cursor.execute("delete from otcapp_goodreciept where BATCHNO = %s", [goods['id'], ])

        return JsonResponse(goods_ser.data, status=status.HTTP_200_OK)
def goods_show_specific(request, pk):
    if request.method == "GET":
        # print(request)
        cursor = connection.cursor()

        # print("Hi")

        cursor.execute("""select * from otcapp_goodreciept where BATCHNO = %s""", [pk, ])

        # print("Hi 2")

        products = cursor.fetchone()

        # print(whouse)

        # print(cursor.description)

        col_names = [col[0] for col in (cursor.description)]

        # print(col_names, employee)
        #
        # print(dict(zip(col_names, employee)))

        return JsonResponse(dict(zip(col_names, products)), safe=False)
@api_view(['PUT'])
def GOODSSPECUPDATE(request, pk):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)
        old_data, new_data = data_dict

        diff_dict = DeepDiff(old_data, new_data)['values_changed']
        cursor = connection.cursor()

        for changed in diff_dict:
            batch_no = pk
            col_name = changed.replace("root['", "")[:-2]
            old_val = diff_dict[changed]['old_value']
            new_val = diff_dict[changed]['new_value']
            date = datetime.now()
            cursor.execute(
                'INSERT INTO otcapp_change (BATCHNO,FIELDNAME,OLDVALUE,NEWVALUE,CHANGEDATE, USER) VALUES (%s,%s,%s,%s,%s, %s)',
                [batch_no, col_name, old_val, new_val, date, ""])

        # Batch no, Field changed, Product Code, Old value, new value, date&time, user

        cursor.execute("""update otcapp_goodreciept set DATE = %s, QTY = %s,PRICEPERUNT = %s,PONUM = %s,VENDOR = %s,WHCODE_id=%s where BATCHNO = %s
        """, [new_data['DATE'], new_data['QTY'], new_data['PRICEPERUNT'], new_data['PONUM'],new_data['VENDOR'],new_data['WHCODE_id'],pk])
        return JsonResponse(new_data, status=status.HTTP_201_CREATED, safe=False)

@api_view(['GET'])
def CHshow(request):
    if request.method == 'GET':

        change = CHANGE.objects.raw('SELECT CHANGENO,CHANGEDATE,BATCHNO,FIELDNAME,OLDVALUE,NEWVALUE from otcapp_change')

        changes_ser = CHANGEser(change, many=True)
        print(changes_ser.data)
        return JsonResponse(changes_ser.data, safe=False)
@api_view(['GET'])
def WHshowspec(request):
    print(request)
    if request.method == 'GET':
        wareShow = WHOUSE.objects.raw('SELECT WHCODE FROM otcapp_whouse')

        print("h")

        wareh_serializer = WareHSerializer(wareShow, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(wareh_serializer.data, safe=False)

@api_view(['POST'])
def SALESHEADERADD(request):
    print('BROOOO')
    if request.method == 'POST':
        SALESHEADER = JSONParser().parse(request)
        payment = HEADser(data=SALESHEADER)
        data_dict = payment.initial_data
        print(data_dict)
        SODATE = (data_dict['DATE1'])
        RDD = (data_dict['DATE2'])
        CUSTCODE = (data_dict['CUST'])
        PTCODE = (data_dict['PAYT'])
        ORDERAMT = (data_dict['ORDER'])
        cursor = connection.cursor()
        cursor.execute('INSERT INTO otcapp_salesheader (SODATE,RDD,ORDERAMT,CUSTCODE_id,PTERM_id) VALUES (%s,%s,%s,%s,%s)',
                       [SODATE,RDD,ORDERAMT,CUSTCODE,PTCODE])
        cursor.execute('SELECT SONUM from otcapp_salesheader')
        SONUM = cursor.fetchall()
        return JsonResponse({'WINSTON':SONUM},safe=False, status=status.HTTP_201_CREATED)
@api_view(['POST'])
def SALESLINEERADD(request):
    print('BROOOO')
    if request.method == 'POST':
        SALESHEADER = JSONParser().parse(request)
        payment = line(data=SALESHEADER)
        data_dict = payment.initial_data
        print(data_dict)
        SONUM = (data_dict['SOCODE'])
        ITEM = (data_dict['Item'])
        QTY = (data_dict['QUANT'])
        PRICE = (data_dict['PAYT'])
        STATUS = (data_dict['TYPE'])
        PRODCODE = (data_dict['PRODUCT1'])
        WH = (data_dict['WAREH1'])
        cursor = connection.cursor()
        cursor.execute('INSERT INTO otcapp_salesinline (SONUM,ITEM,QTY,PRICE,STATUS,PRODCODE_id,WAREH_id) VALUES (%s,%s,%s,%s,%s,%s,%s)',
                       [SONUM,ITEM,QTY,PRICE,STATUS,PRODCODE,WH])

    return JsonResponse(data_dict, status=status.HTTP_201_CREATED)
@api_view(['GET'])
def cust_show_specific(request, pk):
    if request.method == "GET":
        print(request)
        cursor = connection.cursor()

        print("Hi")

        cursor.execute("""select ORDERVALUE from otcapp_customer where CUSTCODE = %s""", [pk, ])

        print("Hi 2")

        whouse = cursor.fetchone()

        # print(whouse)

        # print(cursor.description)
        # print(col_names, employee)
        #
        # print(dict(zip(col_names, employee)))

        return JsonResponse({'broski' : whouse}, safe=False)
@api_view(['PUT'])
def CUSTAIUPDATE(request, pk,gk):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)

        print(data_dict)
        cursor = connection.cursor()
        print('Hi3')
        cursor.execute("""update otcapp_customer set ORDERVALUE = %s where CUSTCODE = %s 
        """, [pk,gk])
        print('Hi4')
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)
@api_view(['PUT'])
def PRODNEWUPDATE(request, pk,gk):
    if request.method == "PUT":
        data_dict = JSONParser().parse(request)
        print(data_dict)
        cursor = connection.cursor()

        cursor.execute("""update otcapp_product set ONORDERQTY = %s where PRODCODE = %s""", [pk,gk])
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)
@api_view(['GET'])
def SALESSHOW(request):
    print(request)
    print('brooo')
    if request.method == 'GET':
        wareShow = salesheader.objects.raw('SELECT * FROM otcapp_salesheader')

        print("h")

        wareh_serializer = HEADser(wareShow, many=True)
        # print(wareh_serializer.initial_data)
        return JsonResponse(wareh_serializer.data, safe=False)
@api_view(['GET'])
def SALESSPECIFYSHOW(request,pk):
    if request.method == 'GET':
        wareshow = salesheader.objects.raw('SELECT * FROM otcapp_salesheader where SONUM = %s',[pk])
        warejser=HEADser(wareshow,many=True)
        return JsonResponse(warejser.data,safe=False)
@api_view(['GET'])
def SALESSHOWPK(request,pk):
    print(request)
    print('brooo')
    if request.method == 'GET':
        wareShow = salesinline.objects.raw('SELECT * FROM otcapp_salesinline where SONUM = %s',[pk])

        print("h")

        wareh_serializer = line(wareShow, many=True)
        return JsonResponse(wareh_serializer.data, safe=False)
@api_view(['PUT'])
def SALESINLINeSHOWPK(request,pk,gk,hk,sk,jk,lk):
    print(request)
    print('brooo')
    if request.method == 'PUT':
        wareShow = salesinline.objects.raw('update otcapp_salesinline set QTY = %s,PRICE = %s,PRODCODE_id = %s,WAREH_id = %s where SONUM = %s AND ITEM = %s',[pk,gk,hk,sk,jk,lk])
        wareh_serializer = line(wareShow, many=True)
        return JsonResponse(wareh_serializer.data, safe=False)
@api_view(['PUT'])
def SALESHEADERNEWUPDATE(request, pk,gk):
    if request.method == "PUT":
        print('test1')
        data_dict = JSONParser().parse(request)
        print(data_dict)
        cursor = connection.cursor()
        print('test2')
        cursor.execute("""update otcapp_salesheader set ORDERAMT = %s where SONUM = %s""", [pk,gk])
        print('test3')
        return JsonResponse(JSONParser().parse(request), status=status.HTTP_201_CREATED, safe=False)