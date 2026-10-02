import { defineConfig } from '@playwright/test';
export default defineConfig({
 testDir:'./tests',
 use:{baseURL:'http://127.0.0.1:3000',viewport:{width:390,height:844},launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',args:['--no-sandbox']}},
 webServer:{command:'node server.js',url:'http://127.0.0.1:3000',reuseExistingServer:true},
 reporter:'list'
});
