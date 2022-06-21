# པ་ཀྲ་ཧེ་། Bazahei IC-XRP frontend galley and cross-chain platform
#### Building for Dfinity Supernova Hackthon in 2022

<p align="center">
  <img src="https://github.com/Itoka-DAO/IC-XRP/blob/main/Bazahei_cover.png">
  <img src="https://github.com/Itoka-DAO/xrp_server/blob/main/DFINITY%20logo%20-%20dark.png">
  <img src="https://github.com/Itoka-DAO/xrp_server/blob/main/xrpl.png">
</p>

Explore demo on [HERE](https://aack7-jaaaa-aaaai-acl6a-cai.ic0.app/)

This frontend repository is current on production. :fire: 

Please review [Bazahei NFT](https://github.com/Itoka-DAO/IC-XRP) repo before deploy the the frontend 

Welcome to hack and crash our cross-chain scheme so makes our system more robust and secured. :interrobang: 

We are planning to provide bug bounty when Bazahei NFT is ready to scale up. :dollar: 

Invite the talent hackers to join [Itoka discord](https://discord.gg/7BqSGMCE5c)

LFG and པ་ཀྲ་ཧེ་།! :rocket: 

## Deploy tricks to IC network

Depoloyer might try [Fleek](https://fleek.co/) to build and deploy and frontend. However, we recommend build within your own cansiters by following; 

1. `yarn install; yarn build;` the copy the `build` file.
2. under a new directory, `dfx new bazahei;cd ./bazahei`. paste the `build` under `./bazahei`
3. config the dfx.json
```json
      "bazahei_assets": {
      "dependencies": ["bazahei"],
      "frontend": {
        "entrypoint": "build/index.html" 
      },
      "source": ["build/"],
      "type": "assets"
```
4. config the package.json to skip the webpack build
```json
  "scripts": {
    "build": "ls",
  },
```
5. `dfx depoly` and we see each other in metaverse. 

Note: Don't forget reconfiguring CanisterID to your own canisters, or you might want to join [Itoka discord](https://discord.gg/7BqSGMCE5c) and get same answers from our developers.


