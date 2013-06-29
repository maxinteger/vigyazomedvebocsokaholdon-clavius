#!/usr/bin/env python

from setuptools import setup

setup(
    name='Vigyazo medvebocsok a holdon',
    version='1.0',
    description='OpenShift App',
    author='Maxinteger',
    author_email='example@example.com',
    url='http://www.python.org/sigs/distutils-sig/',
    install_requires=[
		'Django==1.5.1',
		'argparse==1.2.1',
		'distribute==0.6.34',
		'dj-database-url==0.2.1',
		'django-debug-toolbar==0.9.4',
		'djangorestframework==2.3.5',
		'gunicorn==0.17.4',
		'wsgiref==0.1.2'
    ],
)
