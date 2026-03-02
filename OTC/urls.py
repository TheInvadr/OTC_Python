"""OTC URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from Frontend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'WHMAKE/',views.WHCREATE),
    re_path(r'WHMAK/',include('OTCAPP.urls')),
    re_path(r'WHSHOW/',views.WHSHOW),
    re_path(r'WHSHO/',include('OTCAPP.urls')),
    re_path(r'WHDEL',include('OTCAPP.urls')),
    re_path(r'WHEDIT/',views.WHEDIT),
    re_path(r'^WHUPDATE/',include('OTCAPP.urls')),
    re_path(r'^PTCREATE/',views.PTMAKE),
    re_path(r'^PTC/',include('OTCAPP.urls')),
    re_path(r'^PTDISP/',views.PTSHOW),
    re_path(r'^PRODDISPEC/',include('OTCAPP.urls')),
    re_path(r'^SKR/',include('OTCAPP.urls')),
    re_path(r'^MATRESS/',include('OTCAPP.urls')),
    re_path(r'^PTBASIS/', include('OTCAPP.urls')),
    re_path(r'^CUSTADD/',views.CUSTADD),
    re_path(r'^CUSTAD/',include('OTCAPP.urls')),
    re_path(r'^PRODBRO/',views.PRODADD),
    re_path(r'^PRODBR/',include('OTCAPP.urls')),
    re_path(r'^PRODSIS/',views.PRODSHOW),
    re_path(r'^PRODSI/',include('OTCAPP.urls')),
    re_path(r'^GOODSYO/',views.GOODADD),
    re_path(r'^GOODSY/',include('OTCAPP.urls')),
    re_path(r'^GOODS/',include('OTCAPP.urls')),
    re_path(r'^RECIEPTDAD/',views.GOODSHOW),
    re_path(r'^RECIEPTDA/',include('OTCAPP.urls')),
    re_path(r'^GOODBANISH/',include('OTCAPP.urls')),
    re_path(r'^masterfile/',views.master),
    re_path(r'^html/',views.brooo),
    re_path(r'^htm/',include('OTCAPP.urls')),
    re_path(r'^CASHMONEY/',views.cashmoney),
    re_path(r'^CASH/',include('OTCAPP.urls')),
    re_path(r'^CASH1/',include('OTCAPP.urls')),
    re_path(r'^WHSHOWSPEC/',include('OTCAPP.urls')),
    re_path(r'^CUSTSPEC/',include('OTCAPP.urls')),
    re_path(r'^CUSTAIUP/',include('OTCAPP.urls')),
    re_path(r'^PRODUCT/',include('OTCAPP.urls')),
    re_path(r'^SALESHEADERSHOW/',views.saleshow),
    re_path(r'^SALESSHOW/',include('OTCAPP.urls')),
    re_path(r'^SALESREP/',include('OTCAPP.urls'))
]
