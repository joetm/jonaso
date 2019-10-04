#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vim: tabstop=8 expandtab shiftwidth=4 softtabstop=4

import os, sys, re

from fabric.api import *
from fabric.contrib.console import confirm

# .dotenv
from os.path import join, dirname
from dotenv import load_dotenv

# load environment variables from .env file
dotenv_path = join(dirname(__file__), 'ENV', 'jonaso.de')
load_dotenv(dotenv_path)
#os.environ.get('ftp_username')
#os.environ.get('ftp_password')


remotedir = os.environ.get("remotedir") # public
localdir = "public"
tarFilename = "dist/jonaso.tar.gz"

# credentials are stored in ENV/<site> file
env.user = os.environ.get("ftp_username")
env.hosts = [ os.environ.get("ftp_host") ]


@task
def local_cleanup():
    local("rm -f " + tarFilename)

@task
def deploy():
    print("========================================")
    print("deploying to server" + os.environ.get("ftp_host"))
    print("========================================")

    try:
        # cleanup
        local_cleanup()

        # compress the folder
        local("tar -zcvf %s %s" % (tarFilename, localdir))

        pass

        # upload the tar file to the remote host
        # put(tarFilename, join(remotedir, tarFilename), use_sudo=True, mirror_local_mode=True)

        # with cd(remotedir):

            # untar the folder
            # sudo("tar -xvf " + tarFilename)

            # modify perms # TODO: check if this is necessary
            # sudo("chmod 755 " + remotedir)
            # drop the database
            # sudo("mysqladmin -f -u%s -p\"%s\" drop %s" % (dbUsername, dbPassword, dbName))

            # sudo("cp -r wordpress/dist ./");
            # sudo("rm -rf ./wordpress/dist");
            # sudo("cp -r wordpress/static ./");
            # sudo("rm -rf ./wordpress/static");
            # sudo("cp -r wordpress/favicon.* ./");
            # # sudo("rm -f ./favicon.*");
            # sudo("cp -r wordpress/.htaccess ./.htaccess");
            # sudo("rm -f ./wordpress/.htaccess");

    finally:

        # cleanup
        local_cleanup()

        # remote cleanup
        # remove the tar file and sql file
        # sudo("rm -f " + join(remotedir, localdir))

        pass


if __name__ == "__main__":
    deploy()

