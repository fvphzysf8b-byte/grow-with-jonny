const {chromium}=require('playwright');
const fs=require('fs');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
await context.route('**/*',route=>{
 if(route.request().url()==='http://jonny.test/')return route.fulfill({contentType:'text/html',body:fs.readFileSync('index.html','utf8')});
 return route.abort();
});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://jonny.test/');
await page.getByRole('button',{name:'Erstes Zelt anlegen',exact:true}).waitFor();
assert.equal(await page.getByText('3 Zelte + Trockenzelt anlegen',{exact:true}).isVisible(),false);
await page.evaluate(async()=>{await put({id:'test-env',type:'env',kind:'grow',name:'Testzelt'});await put({id:'test-plant',type:'plant',name:'Basilikum',strain:'Genovese',envId:'test-env',created:'2026-11-01',phases:{}});tab('garden')});
await page.getByRole('searchbox').fill('genovese');assert.equal(await page.locator('.pcard').count(),1);
await page.getByRole('searchbox').fill('unbekannt');await page.getByText('Keine passende Pflanze gefunden.',{exact:false}).waitFor();
await page.getByRole('searchbox').fill('');await page.locator('.pcard').click();
await page.getByRole('button',{name:'Neuer Eintrag',exact:true}).click();
await page.getByText('Für die geöffnete Pflanze',{exact:true}).waitFor();
assert.equal(await page.locator('[data-k="harvest"]').isVisible(),false);
await page.locator('summary').filter({hasText:'Weitere Aktionen'}).click();assert.equal(await page.locator('[data-k="harvest"]').isVisible(),true);
await page.getByRole('button',{name:'Abbrechen',exact:true}).click();
await page.evaluate(()=>tab('today'));
assert.equal(await page.locator('.ecard').count(),0);
await page.getByRole('button',{name:'Eintrag hinzufügen',exact:false}).first().click();
await page.locator('[data-k="note"]').click();
await page.locator('textarea').fill('Testnotiz');await page.getByRole('button',{name:'Sichern',exact:true}).click();
assert.equal(await page.evaluate(()=>all('log').length),1);
await page.reload();await page.locator('.tabbar').waitFor();assert.equal(await page.evaluate(()=>all('log').length),1);
for(const width of [390,1280]){await page.setViewportSize({width,height:844});await page.evaluate(()=>tab('garden'));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);await page.screenshot({path:`/tmp/jonny-garden-${width}.png`,fullPage:true});}
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: onboarding, search, contextual actions, save/reload, mobile/desktop overflow, no runtime errors');
})().catch(e=>{console.error(e);process.exit(1)});
