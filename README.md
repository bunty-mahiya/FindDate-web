connect with aws machine

Connect to your instance using its Public DNS:
ec2-13-61-152-202.eu-north-1.compute.amazonaws.com

server ko connect karne ki command 
ssh -i "C:\Users\PC\Downloads\FindDate.pem" ubuntu@ec2-13-61-152-202.eu-north-1.compute.amazonaws.com

cd ~/DevTinder
pm2 start src/App.js --name "backend"

http://13.61.152.202/