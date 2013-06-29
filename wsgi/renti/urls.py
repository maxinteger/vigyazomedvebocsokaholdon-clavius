from django.conf.urls import patterns, include, url

import views
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^render$', views.render, name='render'),
	#url(r'^phantom/\?_escaped_fragment_=(?P<url>.+)$', views.phantom, name='phantom')
    # Examples:
    # url(r'^$', 'renti.views.home', name='home'),
    # url(r'^renti/', include('renti.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
