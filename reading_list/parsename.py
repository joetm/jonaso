#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# encoding=utf8
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

"""Reduce author names to 'Firstname Lastname' format (skipping middle names)"""

import sys
# from importlib import reload
# reload(sys)  
# sys.setdefaultencoding('utf8')

from nameparser import HumanName

if len(sys.argv) != 2:
	print("Usage:\n\t%s \"Firstname Middlename Lastname\"" % sys.argv[0])
else:

	# name = HumanName(unicode(sys.argv[1], 'utf-8'))
	name = HumanName(str(sys.argv[1]).encode('utf-8'))
	print("%s %s" % (name.first, name.last))


