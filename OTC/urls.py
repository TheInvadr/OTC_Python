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
from django.urls import path
from django.conf.urls import include,url
from Frontend import views

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'WHMAKE/',views.WHCREATE),
    url(r'WHMAK/',include('OTCAPP.urls')),
    url(r'WHSHOW/',views.WHSHOW),
    url(r'WHSHO/',include('OTCAPP.urls')),
    url(r'WHDEL',include('OTCAPP.urls')),
    url(r'WHEDIT/',views.WHEDIT),
    url(r'^WHUPDATE/',include('OTCAPP.urls')),
    url(r'^PTCREATE/',views.PTMAKE),
    url(r'^PTC/',include('OTCAPP.urls')),
    url(r'^PTDISP/',views.PTSHOW),
    url(r'^PRODDISPEC/',include('OTCAPP.urls')),
    url(r'^SKR/',include('OTCAPP.urls')),
    url(r'^MATRESS/',include('OTCAPP.urls')),
    url(r'^PTBASIS/', include('OTCAPP.urls')),
    url(r'^CUSTADD/',views.CUSTADD),
    url(r'^CUSTAD/',include('OTCAPP.urls')),
    url(r'^PRODBRO/',views.PRODADD),
    url(r'^PRODBR/',include('OTCAPP.urls')),
    url(r'^PRODSIS/',views.PRODSHOW),
    url(r'^PRODSI/',include('OTCAPP.urls')),
    url(r'^GOODSYO/',views.GOODADD),
    url(r'^GOODSY/',include('OTCAPP.urls')),
    url(r'^GOODS/',include('OTCAPP.urls')),
    url(r'^RECIEPTDAD/',views.GOODSHOW),
    url(r'^RECIEPTDA/',include('OTCAPP.urls')),
    url(r'^GOODBANISH/',include('OTCAPP.urls')),
    url(r'^masterfile/',views.master),
    url(r'^html/',views.brooo),
    url(r'^htm/',include('OTCAPP.urls')),
    url(r'^CASHMONEY/',views.cashmoney),
    url(r'^CASH/',include('OTCAPP.urls')),
    url(r'^CASH1/',include('OTCAPP.urls')),
    url(r'^WHSHOWSPEC/',include('OTCAPP.urls')),
    url(r'^CUSTSPEC/',include('OTCAPP.urls')),
    url(r'^CUSTAIUP/',include('OTCAPP.urls')),
    url(r'^PRODUCT/',include('OTCAPP.urls')),
    url(r'^SALESHEADERSHOW/',views.saleshow),
    url(r'^SALESSHOW/',include('OTCAPP.urls')),
    url(r'^SALESREP/',include('OTCAPP.urls'))
]
