import os, errno, time, subprocess
from django.shortcuts import render_to_response

from django.http import HttpResponse
import urllib2
import settings

def home(request):
    return render_to_response('home/home.html')

PhatomJS = None

def test(request):
    return HttpResponse("hello world")

def render(request):
    out = "path: %s<br>host: %s<br>abs uri: %s" % (settings.MEDIA_ROOT, request.get_host(), request.build_absolute_uri())
    out += str(request.GET)
    if  request.GET.has_key('_escaped_fragment_'):
        url = request.GET['_escaped_fragment_']
        #return HttpResponse("hello")
        return phantom(url)
    return HttpResponse(out)

def phantom(url):
    global PhatomJS
    if (PhatomJS == None or PhatomJS.poll() != None):
        path = settings.MEDIA_ROOT + '/bin/'
        arr = [path + 'phantomjs', path + 'phantom-server.js']
        PhatomJS = subprocess.Popen(arr)
        time.sleep(1)
    print PhatomJS.pid, url
    return HttpResponse(urllib2.urlopen('http://localhost:8888' + url))