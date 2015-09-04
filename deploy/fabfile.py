from fabric.api import sudo, run
from fabric.contrib.files import exists
from fabric.decorators import task

crane_file = 'https://raw.githubusercontent.com/Kitware/SMQTK/tempus/python/smqtk/web/geospace/deploy/crane.yaml'


def install_crane():
    if not exists('crane'):
        run('bash -c "`curl -sL https://raw.githubusercontent.com/michaelsauter/crane/master/download.sh`"')

@task
def status():
    sudo('docker ps')

@task
def deploy():
    install_crane()

    run('wget -O crane.yaml {}'.format(crane_file))
    sudo('./crane lift')

    sudo('docker ps')

@task
def update():
    sudo('./crane kill tempus')
    sudo('./crane lift tempus')
