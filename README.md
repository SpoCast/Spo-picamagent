# SPO-Picam Listener


### How to set up

  - Clone this repository to $HOME/source
  - cp all the files to /usr/local/spocamagent
  - Run the below commands
  
#### Run via  NPM Command

```sh
$ sudo cd rootdirectory /usr/local/spocamagent
$ sudo npm install
$ sudo service spocamagent restart 
```
#### Run via  PM2 


```sh
$ cd rootdirectory
$ npm install
$ pm2 start bin/www
```
