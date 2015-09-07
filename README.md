# Terra

## Setup

```
git clone git@github.com:memex-explorer/memex-terra.git

# Install python requirements
pip install -r requirements.txt

# Install JS/CSS requirements
cd src && bower update
```

### To run the CherryPy application
```
cd src && python main.py
```

## Deployment
Deployment is done using ```fabric```, this is not in the ```requirements.txt``` file and needs to be installed separately if you want to deploy.

```
pip install fabric
```

The deploy task assumes that ```docker``` is installed on the target machine.

It sets up 3 containers: one for mongodb, girder, and terra.

To deploy to a specific host(or hosts), over ssh:
```
fab --hosts=some-host-1,some-host-2 deploy
```

You can also see the ```docker ps``` output of the hosts by passing status:
```
fab --hosts=some-host-1,some-host-2 status
```



