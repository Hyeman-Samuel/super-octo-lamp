#!/bin/bash

#give permission for everything in the express-app directory
sudo chmod -R 777 /home/ec2-user/we-quick-pay

#navigate into our working directory where we have all our github files
cd /home/ec2-user/we-quick-pay

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

nvm install 16.15.0

#makes sure the deployment fails in the event of an error
set -e
#install node modules
npm install

export DB_PORT=$(aws ssm get-parameter --name "DB_PORT" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export DB_HOST=$(aws ssm get-parameter --name "DB_HOST" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export DB_USER=$(aws ssm get-parameter --name "DB_USER" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export DB_PASSWORD=$(aws ssm get-parameter --name "DB_PASSWORD" --region=us-east-1 --query "Parameter.Value" --with-decryption|tr -d \")
export DB_NAME=$(aws ssm get-parameter --name "DB_NAME" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export REMOVE_BG_API_KEY=$(aws ssm get-parameter --name "REMOVE_BG_API_KEY" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export FLUTTERWAVE_SECRET_KEY=$(aws ssm get-parameter --name "FLUTTERWAVE_SECRET_KEY" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export FLUTTERWAVE_PUBLIC_KEY=$(aws ssm get-parameter --name "FLUTTERWAVE_PUBLIC_KEY" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export FLUTTERWAVE_SECRET_HASH=$(aws ssm get-parameter --name "FLUTTERWAVE_SECRET_HASH" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export ADMIN_EMAIL=$(aws ssm get-parameter --name "ADMIN_EMAIL" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export NO_REPLY_EMAIL=$(aws ssm get-parameter --name "NO_REPLY_EMAIL" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export ADMIN_PASSWORD=$(aws ssm get-parameter --name "ADMIN_PASSWORD" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export MJ_APIKEY_PRIVATE=$(aws ssm get-parameter --name "MJ_APIKEY_PRIVATE" --region=us-east-1 --query "Parameter.Value"|tr -d \")
export MJ_APIKEY_PUBLIC=$(aws ssm get-parameter --name "MJ_APIKEY_PUBLIC" --region=us-east-1 --query "Parameter.Value"|tr -d \")

##write logic to decrypt environment variable
##echo "env" > .env


npm run typeorm migration
pm2 start build/app.js --name "filtar" -i