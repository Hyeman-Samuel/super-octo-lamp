#!/bin/bash

sudo chmod -R 777 /home/ec2-user/we-quick-pay

cd /home/ec2-user/we-quick-pay
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 16.15.0
npm i -g pm2

pm2 stop "filtar"
pm2 delete "filtar"