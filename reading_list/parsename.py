#!/usr/bin/env python
# encoding=utf8

"""Reduce author names to 'Firstname Lastname' format"""

import sys
reload(sys)  
sys.setdefaultencoding('utf8')

from nameparser import HumanName

if len(sys.argv) != 2:
	print "Usage:\n\t%s \"Firstname Middlename Lastname\"" % sys.argv[0]
else:

	name = HumanName(unicode(sys.argv[1], 'utf-8'))
	print "%s %s" % (name.first, name.last)


