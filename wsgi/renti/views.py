from django.http import HttpResponse
import urllib2
import os, errno, time, subprocess
import settings

PhatomJS = None

def index(request):
    out = "path: %s<br>host: %s<br>abs uri: %s" % (settings.PROJECT_ROOT, request.get_host(), request.build_absolute_uri())
    out += str(request.GET)
    if  request.GET.has_key('_escaped_fragment_'):
        url = request.GET['_escaped_fragment_']
        #return HttpResponse("hello")
        return phantom(url)
    return HttpResponse(out)

def render(request):
    return HttpResponse("hello world")

def phantom(url):
    global PhatomJS
    if (PhatomJS == None or PhatomJS.poll() != None):
        path = settings.PROJECT_ROOT + '/bin/'
        arr = [path + 'phantomjs', path + 'test.js']
        PhatomJS = subprocess.Popen(arr)
        time.sleep(1)
    print PhatomJS.pid, url
    return HttpResponse(urllib2.urlopen('http://localhost:8888' + url))