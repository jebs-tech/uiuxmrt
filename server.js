import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const types = { '.html':'text/html', '.css':'text/css', '.js':'text/javascript', '.svg':'image/svg+xml' };
http.createServer(async (req,res)=>{
 try {
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const filename=path.resolve(root,'.'+(pathname==='/'?'/index.html':pathname));
  if(!filename.startsWith(root+path.sep)) {res.writeHead(403);res.end();return;}
  const data=await readFile(filename);
  res.writeHead(200,{'Content-Type':types[path.extname(filename)]||'application/octet-stream'});res.end(data);
 } catch {res.writeHead(404);res.end('Not found');}
}).listen(Number(process.env.PORT || 3000),'127.0.0.1',()=>console.log(`E-Bike: http://localhost:${process.env.PORT || 3000}`));
