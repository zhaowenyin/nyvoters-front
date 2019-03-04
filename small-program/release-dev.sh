#!/bin/bash

ip_name=192.168.5.178
zip -r dist.zip dist/
scp -r dist.zip $ip_name:/data/hitales/h5/
ssh $ip_name -tt << eeooff
cd /data/hitales/h5
rm -rf dist
unzip -o dist.zip
exit
eeooff
rm -rf dist.zip
