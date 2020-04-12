#!/usr/bin/env python
# encoding=utf8
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

"""Reduce author names to 'Firstname Lastname' format (skipping middle names)"""

import sys
# from importlib import reload
reload(sys)  
sys.setdefaultencoding('utf8')

from nameparser import HumanName

if len(sys.argv) != 2:
	print "Usage:\n\t%s \"Firstname Middlename Lastname\"" % sys.argv[0]
else:

	name = HumanName(unicode(sys.argv[1], 'utf-8'))
	print "%s %s" % (name.first, name.last)


