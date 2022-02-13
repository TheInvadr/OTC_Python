from django.conf.urls import url
from django.urls import path, include
from OTCAPP import views
urlpatterns = [
url(r'MAKE',views.WHADD),
url(r'^SHOW$',views.WHshow),
url(r'DEL',views.wh_delete),
url(r'^SHOW/(?P<pk>[0-9]+)$', views.WH_show_specific),
url(r'^UPDATE/(?P<pk>[0-9]+)$', views.WHUPDATE),
url(r'^C$',views.PTADD),
url(r'^DIS$',views.PTSHOW),
url(r'^SPEC/(?P<pk>[0-9]+)$', views.pt_show_specific),
url(r'^PTSHOW$', views.pbasis),
url(r'^UPD/(?P<pk>[0-9]+)$', views.PTUPDATE),
url(r'^AD$',views.CUSTADD),
url(r'^BR$',views.PRODADD),
url(r'^SI$',views.PRODSHOW),
url(r'^O$',views.GOODSDADD),
url(r'^GOODSUPD$',views.EXCITINGUPDATE),
url(r'^D$',views.GOODSHOW),
url(r'^BANISH$',views.goods_delete),
url(r'^CLOCKER/(?P<pk>[0-9]+)$',views.goods_show_specific),
url(r'^KING/(?P<pk>[0-9]+)$',views.GOODSSPECUPDATE),
url(r'^ht$',views.CHshow),
url(r'^WHSHOWSPECIFIC$',views.WHshowspec),
url(r'^MONEY$',views.SALESHEADERADD),
url(r'^MONEY1$',views.SALESLINEERADD),
url(r'^CUST/(?P<pk>[0-9]+)$',views.cust_show_specific),
url(r'^AI/(?P<pk>[0-9]+)/(?P<gk>[0-9]+)$',views.CUSTAIUPDATE),
url(r'^AIUPDATE/(?P<pk>[0-9]+)/(?P<gk>[0-9]+)$',views.PRODNEWUPDATE),
url(r'^SALESBABY$',views.SALESSHOW),
url(r'^SALESSPECIFYINGLY/(?P<pk>[0-9]+)$',views.SALESSPECIFYSHOW),
url(r'^NAHFAM/(?P<pk>[0-9]+)$',views.SALESSHOWPK),
url(r'^BEATSLAPPING/(?P<pk>[0-9]+)/(?P<gk>[0-9]+)$',views.SALESHEADERNEWUPDATE),
url(r'^DOUBLETROUBLE/(?P<pk>[0-9]+)/(?P<gk>[0-9]+)/(?P<hk>[0-9]+)/(?P<sk>[0-9]+)/(?P<jk>[0-9]+)/(?P<lk>[0-9]+)$',views.SALESINLINeSHOWPK)
]