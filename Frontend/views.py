from django.shortcuts import render

# Create your views here.
def WHCREATE(request):
    return render(request,'Frontend/make_warehouse.html')
def WHSHOW(request):
    return render(request, 'Frontend/show_warehouse.html')
def WHEDIT(request):
    return render(request,'Frontend/edit_warehouse.html')
def PTMAKE(request):
    return render(request,'Frontend/make_pterm.html')
def PTSHOW(request):
    return render(request,'Frontend/show_payments.html')
def CUSTADD(request):
    return render(request,'Frontend/make_cust.html')
def PRODADD(request):
    return render(request,'Frontend/make_prod.html')
def PRODSHOW(request):
    return render(request,'Frontend/prod_show.html')
def GOODADD(request):
    return render(request,'Frontend/good_add.html')
def GOODSHOW(request):
    return render(request,'FRONTEND/goodshow.html')
def master(request):
    return render(request,'FRONTEND/masterfile.html')
def brooo(request):
    return render(request,'FRONTEND/html.html')
def cashmoney(request):
    return render(request,'FRONTEND/sales.html')
def saleshow(request):
    return render(request,'FRONTEND/showsales.html')