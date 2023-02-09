cd kickstart-updated
npm i --legacy-peer-deps

cd ethereum
node compile.js
node deploy.js
Then you will see on your terminal "Contract deployed to ..." 
Copy ENS address after it then paste it to factory.js after CampaignFactory.abi

cd kickstart-updated
npm run dev

TESTING
cd kickstart-updated
npm run test