"""Check generated routes, assets, metadata, anchors, and content invariants."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'dist'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.refs=[];self.h1=0;self.meta=set();self.canonical=False;self.images=[];self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.append(a['id'])
  if tag=='h1':self.h1+=1
  if tag=='meta':self.meta.add(a.get('name',a.get('property')))
  if tag=='link' and a.get('rel')=='canonical':self.canonical=True
  if tag=='img':self.images.append(a)
  if tag in ['a','link','script','img']:
   ref=a.get('href',a.get('src'))
   if ref:self.refs.append(ref)
pages={p:Page(p.read_text()) for p in OUT.rglob('*.html')}
errors=[];refcount=0
for path,page in pages.items():
 def check(ok,msg):
  if not ok:errors.append(str(path.relative_to(ROOT))+': '+msg)
 check(len(page.ids)==len(set(page.ids)),'duplicate IDs')
 check(page.h1==1,'requires exactly one H1')
 check(page.canonical,'missing canonical')
 check({'description','og:title','og:description','og:image','twitter:card'}<=page.meta,'incomplete metadata')
 for image in page.images:check(bool(image.get('alt')) and 'width' in image and 'height' in image,'image alt/dimensions missing')
 for ref in page.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  target=OUT/unquote(u.path.lstrip('/')) if u.path.startswith('/') else path.parent/unquote(u.path)
  if not u.path:target=path
  if target.is_dir():target=target/'index.html'
  refcount+=1
  check(target.is_file(),'missing local target '+ref)
  if u.fragment and target in pages:check(u.fragment in pages[target].ids,'missing anchor '+ref)
projects=json.loads((ROOT/'src/projects.json').read_text())
assert [p['slug'] for p in projects]==['rlb','nyrc','sirl','stocksense']
assert 'Closed, unmerged' in (OUT/'index.html').read_text()
assert 'Résumé needs updating' in (OUT/'index.html').read_text()
assert (OUT/'AKILAN_P_L.pdf').read_bytes().startswith(b'%PDF')
if errors:raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} HTML pages; {refcount} local references; metadata, image dimensions, IDs, anchors, project order, and résumé checks.')
