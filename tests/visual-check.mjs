import { chromium } from 'playwright';
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
const page=await browser.newPage({viewport:{width:390,height:844}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
async function check(){
 await page.locator('.screen').waitFor();
 const issues=await page.evaluate(async()=>{
  const images=[...document.querySelectorAll('img')];
  await Promise.all(images.map(i=>i.decode().catch(()=>{})));
  const screen=document.querySelector('.screen').getBoundingClientRect();
  return {
   broken:images.filter(i=>!i.naturalWidth).map(i=>i.src),
   icons:images.filter(i=>i.src.endsWith('bike-blue.svg')).filter(i=>{const r=i.getBoundingClientRect();return r.width>32||r.height>32||r.width<20}).length,
   overflow:[...document.querySelectorAll('.screen *')].filter(i=>{const r=i.getBoundingClientRect();return r.width>0&&(r.right>screen.right+1||r.left<screen.left-1)}).map(i=>i.className),
   forbidden:/\bdock\b|docking|slot pengembalian|slot kembali|available|🚲|🚴|KAYUH MRT/i.test(document.body.innerText)
  };
 });
 if(issues.broken.length||issues.icons||issues.overflow.length||issues.forbidden)throw Error(JSON.stringify(issues));
}
for(const width of [320,390,430]){
 await page.setViewportSize({width,height:844});await page.goto('http://127.0.0.1:3001');await check();
 for(const action of ['kayuh','destination','destinations','select-destination','discover','bike-location','detail','confirm-payment','scan','detect','unlock','start','advance','end','return','pay','complete']){
  await page.locator(`[data-action="${action}"]`).first().click();
  if(action==='unlock')await page.locator('[data-action="start"]').waitFor();
  if(action==='return')await page.locator('[data-action="pay"]').waitFor();
  await check();
  if(action==='bike-location')await page.screenshot({path:`test-results/e-bike-${width}.png`});
 }
}
await browser.close();if(errors.length)throw Error(JSON.stringify(errors));
console.log('All screens: no broken images, JavaScript errors, forbidden copy, oversized bike icons, or horizontal overflow at 320/390/430 px.');
