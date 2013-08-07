/*!CK:3596814602!*//*1375666360,178146589*/

if (self.CavalryLogger) { CavalryLogger.start_js(["R940f"]); }

__d("StickyController",["CSS","Event","Style","Vector","queryThenMutateDOM"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('Event'),i=b('Style'),j=b('Vector'),k=b('queryThenMutateDOM');function l(m,n,o,p){this._element=m;this._marginTop=n;this._onchange=o;this._proxy=p||m.parentNode;this._boundQueryOnScroll=this._queryOnScroll.bind(this);this._boundMutateOnScroll=this._mutateOnScroll.bind(this);}l.prototype.handleScroll=function(){k(this._boundQueryOnScroll,this._boundMutateOnScroll);};l.prototype._queryOnScroll=function(){this._shouldFix=j.getElementPosition(this._proxy,'viewport').y<=this._marginTop;};l.prototype._mutateOnScroll=function(){var m=this._shouldFix;if(this.isFixed()!==m){i.set(this._element,'top',m?this._marginTop+'px':'');g.conditionClass(this._element,'fixed_elem',m);this._onchange&&this._onchange(m);}};l.prototype.start=function(){if(this._event)return;this._event=h.listen(window,'scroll',this.handleScroll.bind(this));this.handleScroll.bind(this).defer();};l.prototype.stop=function(){this._event&&this._event.remove();this._event=null;};l.prototype.isFixed=function(){return g.hasClass(this._element,'fixed_elem');};e.exports=l;});
__d("PhotoMultiPhotosThumb",["Event","function-extensions","Style"],function(a,b,c,d,e,f){var g=b('Event');b('function-extensions');var h=b('Style'),i=1200,j={init:function(k,l){var m=null,n=0;function o(q){n=q;l.forEach(function(r,s){h.set(r,'opacity',s===q?1:0);});}function p(){o((n+1)%l.length);m=p.defer(i);}g.listen(k,'mouseenter',function(){if(m)return;n=0;p();});g.listen(k,'mouseleave',function(){o(0);window.clearTimeout(m);m=null;});}};e.exports=j;});
__d("TimelineSideAds",["function-extensions","Arbiter","CSS","DOM","EgoAdsObjectSet","Event","StickyController","TimelineConstants","TimelineController","UIPagelet","URI","Vector","cx","csx","debounce","ge"],function(a,b,c,d,e,f){b('function-extensions');var g=b('Arbiter'),h=b('CSS'),i=b('DOM'),j=b('EgoAdsObjectSet'),k=b('Event'),l=b('StickyController'),m=b('TimelineConstants'),n=b('TimelineController'),o=b('UIPagelet'),p=b('URI'),q=b('Vector'),r=b('cx'),s=b('csx'),t=b('debounce'),u=b('ge'),v=75,w='data-height',x=30000,y=0,z=false,aa,ba,ca,da,ea,fa=new j(),ga,ha=false,ia,ja=Infinity,ka=false,la=5,ma,na,oa,pa,qa=false,ra,sa,ta,ua,va,wa,xa=false,ya=[],za;function ab(xb,yb,zb){var ac=0;if(yb)ac+=yb.getHeight();if(!fb()&&!ac)return;xb-=ac;var bc=0;for(var cc=0;cc<zb;cc++)bc+=ob(cc);if(yb)if(xb<bc){xb+=yb.fold(bc-xb);}else if(xb>bc)xb-=yb.unfold(xb-bc);return xb;}function bb(){var xb=ba.cloneNode(true);xb.id='';var yb=new j();yb.init(i.scry(xb,'div.ego_unit'));var zb=true;yb.forEach(function(ac){if(zb){zb=false;}else i.remove(ac);});h.addClass(xb,'fixed_elem');return xb;}function cb(){ea=undefined;if(!n.pageHasScrubber(ga)){gb(la);jb();}else if(sa){hb(ba,false);var xb=ta;ta&&i.remove(ta);ta=bb();if(xb)ub();gb(n.sidebarInitialized()&&ha?pa:oa);jb();if(!ia){var yb=n.getCurrentScrubber();if(yb)tb(yb.getRoot(),yb.getOffset());}ia&&ia.start();}else wb.adjustAdsToFit();}function db(){if(ta){i.remove(ta);ta=null;}if(ia){ia.stop();ia=null;}if(fb()){h.conditionClass(ba,'fixed_elem',!sa);h.conditionClass(ba,"_22s",!n.pageHasScrubber(ga));}else h.conditionClass(ba,'fixed_elem',!sa&&n.pageHasScrubber(ga));}function eb(xb){var yb=q.getViewportDimensions().y,zb=n.getCurrentScrubber(),ac=zb?zb.getOffset():m.SCRUBBER_DEFAULT_OFFSET,bc=yb-ac-v;if(zb||fb())return ab(bc,zb,xb);}function fb(){return n.fixedAds();}function gb(xb){da=Math.min(xb,fa.getCount());fa.forEach(function(yb,zb){hb(yb,zb>=da);});hb(ba,da===0);}function hb(xb,yb){h.conditionClass(xb,"_22r",yb);xb.setAttribute('aria-hidden',yb?'true':'false');}function ib(xb){var yb=i.find(fa.getUnit(xb),"div._4u8"),zb=yb.getAttribute('data-ad');return JSON.parse(zb).adid;}function jb(){lb();kb();}function kb(){var xb;if(ea!==undefined){xb=fa.getHoldoutAdIDsForSpace(ea,pb);}else xb=fa.getHoldoutAdIDsForNumAds(da);if(xb)xb.forEach(mb);}function lb(){if(!ua)return;for(var xb=da-1;xb>=0;--xb){if(ia&&ia.isFixed()&&((xb!==0)||(ta&&!h.shown(ta))))continue;var yb=ib(xb);if(!ua[yb])return;mb(yb);}}function mb(xb){if(!ua[xb])return;var yb=i.create('iframe',{src:p('/ai.php').addQueryData({aed:ua[xb]}),width:0,height:0,frameborder:0,scrolling:'no',className:'fbEmuTracking'});yb.setAttribute('aria-hidden','true');i.appendContent(ba,yb);delete ua[xb];}function nb(xb){var yb=0;while(xb>0&&yb<la){xb-=ob(yb);if(xb>=0)yb++;}return yb;}function ob(xb){var yb=fa.getUnit(xb);if(!yb)return 0;return pb(yb);}function pb(xb){if(!xb.getAttribute(w))qb(xb);return parseInt(xb.getAttribute(w),10);}function qb(xb){xb.setAttribute(w,xb.offsetHeight);}function rb(){for(var xb=0;xb<fa.getCount();xb++){var yb=fa.getUnit(xb);if(!yb)continue;qb(yb);}}function sb(){var xb=i.scry(ba,'div.ego_unit');fa.init(xb);var yb=xb.length;if(!yb)return;h.addClass(fa.getUnit(0),'ego_unit_no_top_border');qa=yb;cb();var zb=function(ac){qb(ac);qa=--yb;wb.adjustAdsToFit();if(!qa)ja=Date.now();};xb.forEach(function(ac){function bc(){zb.curry(ac).defer();}var cc=i.scry(ac,'img.img')[0];if(!cc)return;if(cc.complete){bc();}else k.listen(cc,{load:bc,error:bc,abort:bc});});}function tb(xb,yb){ia=new l(xb,yb,function(zb){if(zb){ub();}else{i.remove(ta);jb();}});if(ta)ia.start();}function ub(){i.insertAfter(ba,ta);vb();}function vb(){h.conditionShow(ta,ob(0)<=eb(1)&&!h.hasClass(document.documentElement,'tinyViewport'));}var wb={init:function(xb,yb,zb){if(z)return;la=zb.max_ads;aa=zb.refresh_delay;x=zb.refresh_threshold;ma=zb.min_ads;na=zb.min_ads_wide;oa=zb.min_ads_short;pa=zb.min_ads_short_wide;z=true;ca=yb;ba=xb;wb.adjustAdsType(n.shouldShowWideAds());va=g.subscribe(['UFI/CommentAddedActive','UFI/CommentDeletedActive','UFI/LikeActive','Curation/Action','ProfileBrowser/LoadMoreContent','Ads/NewContentDisplayed'],wb.loadAdsIfEnoughTimePassed);wa=g.subscribe('TimelineSideAds/refresh',wb.forceReloadAds);za=t(wb.loadAdsIfEnoughTimePassed,aa,this,true);if(zb.mouse_move){ya.push(k.listen(window,'mousemove',za));ya.push(k.listen(window,'scroll',za));ya.push(k.listen(window,'resize',za));ya.push(k.listen(ba,'mouseenter',function(){ka=true;}));ya.push(k.listen(ba,'mouseleave',function(){ka=false;}));}n.register(n.ADS,wb);},setShortMode:function(xb){sa=xb;},start:function(xb){ua=xb;ra=null;sb();},updateCurrentKey:function(xb){if(xb==ga)return;ga=xb;db();},loadAds:function(xb){if(qa||ra)return;ja=Infinity;ra=o.loadFromEndpoint('WebEgoPane',ba.id,{pid:33,data:[ca,'timeline_'+xb,sa?pa:la,++y,false]},{crossPage:true,bundle:false});},registerScrubber:function(xb){if(sa)tb(xb.getRoot(),xb.getOffset());!ra&&wb.adjustAdsToFit();},loadAdsIfEnoughTimePassed:function(){if(x&&(Date.now()-ja>=x)&&!h.hasClass(document.documentElement,'tinyViewport')&&(!ia||ia.isFixed())&&(!ua||!ua[ib(0)])&&!ka)wb.loadAds(ga);wb.adjustAdsToFit();},forceReloadAds:function(){wb.loadAds(ga);},adjustAdsType:function(xb){if(xb!=ha){h.conditionClass(ba,"_22q",!xb);h.conditionClass(ba,"_35q",!xb);ta&&h.conditionClass(ta,"_22q",!xb);ta&&h.conditionClass(ta,"_35q",!xb);ha=xb;rb();wb.adjustAdsToFit();var yb=u('rightColContent');if(yb)h.conditionClass(yb,'fbTimelineWideRightCol',xb);}},adjustAdsToFit:function(){if(!ba||xa)return;xa=true;var xb;if(sa){xb=ha?pa:oa;if(ia&&ta){ia.handleScroll();if(ia.isFixed()){h.conditionShow(ta,ob(0)<=eb(1)&&!h.hasClass(document.documentElement,'tinyViewport'));}else gb(xb);jb();}}else{xb=ha?na:ma;var yb=eb(xb);if(typeof yb!=='undefined'){ea=yb;gb(nb(yb));if(!qa)jb();}}xa=false;},reset:function(){ia&&ia.stop();ra&&ra.cancel();fa=new j();ha=false;ba=null;ia=null;ra=null;y=0;qa=null;sa=null;ta=null;ga=null;ja=Infinity;z=false;va&&g.unsubscribe(va);va=null;wa&&g.unsubscribe(wa);wa=null;ka=false;ya.forEach(function(xb){xb.remove();});ya=[];za&&za.reset();}};e.exports=a.TimelineSideAds||wb;});
__d("TimelineStickyHeader",["Animation","Arbiter","Bootloader","CSS","DOM","Style","TimelineController","TimelineURI","Vector","ViewportBounds","$","ge","queryThenMutateDOM"],function(a,b,c,d,e,f){var g=b('Animation'),h=b('Arbiter'),i=b('Bootloader'),j=b('CSS'),k=b('DOM'),l=b('Style'),m=b('TimelineController'),n=b('TimelineURI'),o=b('Vector'),p=b('ViewportBounds'),q=b('$'),r=b('ge'),s=b('queryThenMutateDOM'),t=200,u=false,v=false,w,x,y,z,aa,ba,ca={},da={VISIBLE:'TimelineStickyHeader/visible',ADJUST_WIDTH:'TimelineStickyHeader/adjustWidth',init:function(ea){if(u)return;u=true;w=ea;x=k.find(ea,'div.name');y=k.find(ea,'div.actions');v=j.hasClass(ea,'fbTimelineStickyHeaderVisible');var fa=q('blueBar'),ga,ha=false;s(function(){if(fa.offsetTop&&!r('page_admin_panel')&&m.getCurrentKey()!==n.TIMELINE_KEY){ga=o.getElementDimensions(fa).y;ha=true;}},function(){if(ha){i.loadModules(['StickyController'],function(ia){new ia(ea,ga).start();});}else j.addClass(ea,'fixed_elem');s(function(){aa=ea.offsetTop;ba=ea.scrollHeight;},function(){z=p.addTop(function(){return v?aa+ba:0;});},'TimelineStickyHeader/init');m.register(m.STICKY_HEADER,da);},'TimelineStickyHeader/init');},reset:function(){u=false;v=false;w=null;x=null;y=null;ca={};z.remove();z=null;},toggle:function(ea){if(ea!==v){var fa=ea?aa-ba:aa,ga=ea?aa:aa-ba;l.set(w,'top',fa+'px');j.addClass(w,'fbTimelineStickyHeaderAnimating');var ha=k.getID(w);ca[ha]&&ca[ha].stop();ca[ha]=new g(w).from('top',fa).to('top',ga).duration(t).ondone(function(){ca[ha]=null;j.conditionClass(w,'fbTimelineStickyHeaderHidden',!ea);w.setAttribute('aria-hidden',ea?'false':'true');j.removeClass(w,'fbTimelineStickyHeaderAnimating');l.set(w,'top','');h.inform(da.VISIBLE,ea);}).go();v=ea;}},adjustWidth:function(){h.inform(da.ADJUST_WIDTH,x,h.BEHAVIOR_STATE);},getRoot:function(){return w;},setActions:function(ea){if(u&&ea){k.setContent(y,ea);y=ea;}}};e.exports=a.TimelineStickyHeader||da;});
__d("TimelineStickyHeaderNav",["Event","function-extensions","Arbiter","ButtonGroup","CSS","DOM","Parent","SelectorDeprecated","Style","SubscriptionsHandler","TimelineConstants","TimelineController","TimelineLegacySections","URI","UserAgent","Vector","ge","tx"],function(a,b,c,d,e,f){var g=b('Event');b('function-extensions');var h=b('Arbiter'),i=b('ButtonGroup'),j=b('CSS'),k=b('DOM'),l=b('Parent'),m=b('SelectorDeprecated'),n=b('Style'),o=b('SubscriptionsHandler'),p=b('TimelineConstants'),q=b('TimelineController'),r=b('TimelineLegacySections'),s=b('URI'),t=b('UserAgent'),u=b('Vector'),v=b('ge'),w=b('tx'),x=false,y,z,aa,ba,ca,da,ea,fa,ga,ha,ia,ja={},ka={},la=[],ma=false,na=[],oa=[],pa,qa=["January","February","March","April","May","June","July","August","September","October","November","December"];function ra(){var fb=m.getSelectorMenu(da);pa.addSubscriptions(g.listen(fb,'click',sa),h.subscribe(p.SECTION_LOADED,wa));}function sa(event){var fb=l.byTag(event.getTarget(),'a');if(fb){var gb=fb.getAttribute('data-key');q.stickyHeaderNavWasClicked(gb);q.navigateToSection(gb);event.prevent();}}function ta(fb,gb){var hb=m.getValue(gb);if(hb==='allStories')r.get(fb).expandSubSections();if(hb!=='activityLog')ua(gb);}function ua(fb){db(fb,'highlights');db(fb,'allStories');var gb=k.find(fb,'li.separator');j.conditionShow(gb,gb.previousSibling);}function va(fb){if(ga[fb]&&!z.custom_subsection_menu){ab(fb);}else xa();q.adjustStickyHeaderWidth();}function wa(fb,gb){var hb=gb.key;if(ha[hb]){bb(hb);va(hb);}}function xa(){ba.hideItem(ea);}function ya(fb){var gb=fb.split('_');return qa[gb.pop()-1];}function za(fb){var gb=fa[fb],hb=ga[fb];if(!gb&&hb){gb=fa[fb]=ea.cloneNode(true);var ib=k.scry(gb,'li.activityLog a')[0];if(ib)ib.href=s(ib.href).addQueryData({key:fb});var jb=q.getCurrentScrubber();if(hb.length)j.show(k.find(gb,'li.separator'));for(var kb=0;kb<hb.length;kb++){var lb=hb[kb].scrubberKey,mb=jb?jb.getLabelForSubnav(hb[kb].parentKey,lb):mb=ya(lb);if(mb)cb(gb,{key:lb,label:mb});}pa.addSubscriptions(m.listen(gb,'change',ta.curry(fb,gb)),g.listen(gb,'click',sa));}return gb;}function ab(fb){var gb=za(fb);k.insertAfter(ea,gb);j.hide(ea);for(var hb in fa){var ib=fa[hb];j.conditionShow(ib,ib===gb);}ba.showItem(ea);}function bb(fb){ga[fb]=r.get(fb).subSections;}function cb(fb,gb){var hb=k.create('a',{href:'#',rel:'ignore',className:'itemAnchor',tabIndex:0},k.create('span',{className:'itemLabel fsm'},gb.label));hb.setAttribute('data-key',gb.key);hb.setAttribute('aria-checked',false);var ib=k.create('li',{className:'uiMenuItem uiMenuItemRadio uiSelectorOption'},hb);ib.setAttribute('data-label',gb.label);var jb=k.find(fb,'ul.uiMenuInner'),kb=k.create('option',{value:gb.key},gb.label),lb=k.find(fb,'select');if(gb.key==='recent'){k.prependContent(jb,ib);k.insertAfter(lb.options[0],kb);}else{k.appendContent(jb,ib);k.appendContent(lb,kb);}}function db(fb,gb){var hb=k.scry(fb,'li.uiMenuItem');if(!hb)return;for(var ib=0;ib<hb.length;ib++){var jb=hb[ib];if(j.hasClass(jb,gb)||jb.firstChild.getAttribute('data-key')==gb){k.remove(jb);break;}}var kb=k.find(fb,'select'),lb=k.scry(kb,'option');for(ib=0;ib<lb.length;ib++)if(lb[ib].value===gb){k.remove(lb[ib]);return;}}var eb={init:function(fb,gb){if(x)return;x=true;y=fb;z=gb||{};ca=k.find(y,'div.pageMenu');da=k.find(y,'div.sectionMenu');ea=k.find(y,'div.subsectionMenu');ia=k.find(ca,'li.uiMenuSeparator');ba=i.getInstance(ca);pa=new o();fa={};ga={};ha={};eb.adjustMenuHeights();ra();q.register(q.STICKY_HEADER_NAV,eb);oa.forEach(function(hb){hb();});},reset:function(){x=false;z={};la=[];ja={};ka={};ma=false;na=[];y=null;ca=null;da=null;ea=null;ia=null;fa={};ga={};ha={};pa.release();},addTimePeriod:function(fb){var gb=q.getCurrentScrubber();if(!gb)return;var hb=gb.getLabelForNav(fb);if(!hb)return;cb(da,{key:fb,label:hb});var ib=k.find(da,'ul.uiMenuInner');if(fb==='recent'||ib.children.length<2)m.setSelected(da,fb,true);},updateSection:function(fb,gb){if(gb){var hb=za(fb);if(hb){m.setSelected(hb,gb);ua(hb);}else aa=fb;}else{ha[fb]=true;bb(fb);}m.setSelected(da,fb,true);va(fb);},adjustMenuHeights:function(){if(t.ie()<=7)return;[ca,da].forEach(function(fb){var gb='';if(!j.hasClass(document.documentElement,'tinyViewport')){gb=u.getViewportDimensions().y-u.getElementDimensions(v('blueBar')).y-80;gb+='px';}n.set(k.find(fb,'ul.uiMenuInner'),'maxHeight',gb);});},initPageMenu:function(fb,gb){if(!x){oa.push(eb.initPageMenu.curry(fb,gb));return;}function hb(ib,jb){ib.forEach(function(kb){var lb=ka[kb]=k.create('li');j.hide(lb);jb?k.insertBefore(ia,lb):k.appendContent(k.find(ca,'ul.uiMenuInner'),lb);});}hb(fb,true);hb(gb,false);ja.info=k.scry(ca,'li')[0];la=gb;ma=true;if(na.length)na.forEach(function(ib){eb.registerPageMenuItem(ib.key,ib.item);});},registerPageMenuItem:function(fb,gb){if(!ma){na.push({key:fb,item:gb});return;}if(ka[fb]){k.replace(ka[fb],gb);ja[fb]=gb;delete ka[fb];if(la.indexOf(fb)>=0)j.show(ia);}},removeTimePeriod:function(fb){db(da,fb);},hideSectionMenu:function(){x&&j.hide(da);}};e.exports=eb;});
__d("TimelineScrubber",["CSS","DOM","Event","Focus","Keys","Parent","TimelineController","Vector","copyProperties"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('Event'),j=b('Focus'),k=b('Keys'),l=b('Parent'),m=b('TimelineController'),n=b('Vector'),o=b('copyProperties');function p(q){this._root=q;this._navKeys={};this._subNavKeys={};this._rollups={};this._rolledup={};var r=q.childNodes;this._currentNav=r[0];for(var s=0;s<r.length;s++){var t=r[s].getAttribute('data-key');this._navKeys[t]=r[s];var u=h.scry(r[s],'ul');this._subNavKeys[t]={};if(u.length){var v=u[0].childNodes;for(var w=0;w<v.length;w++)this._subNavKeys[t][v[w].getAttribute('data-key')]=v[w];}var x=r[s].getAttribute('data-rollup');if(x){this._rollups[x]=this._rollups[x]||[];this._rollups[x].push(r[s]);}}this._clickListener=i.listen(this._root,'click',this._handleScrub.bind(this));this._focusHandler=i.listen(this._root,'keydown',this._moveFocus.bind(this));this._tabbableElement=h.scry(this._root,'a')[0];g.show(this._root);var y=n.getViewportDimensions().y-this.SCRUBBER_NO_ADS_VERTICAL_BUFFER,z=this.getHeight();if(z>y)this.fold(z-y);m.register(m.SCRUBBER,this);m.scrubberHasLoaded(this);}p.prototype.reset=function(){this._root=null;this._navKeys={};this._subNavKeys={};this._rollups={};this._rolledup={};};p.prototype.getRoot=function(){return this._root;};p.prototype.getNav=function(q){return this._navKeys[q];};p.prototype.getSubnav=function(q,r){return this._subNavKeys[q][r];};p.prototype.getHeight=function(){return this._root.offsetHeight;};p.prototype.getLabelForNav=function(q){var r=this.getNav(q);return r&&h.getText(h.scry(r,'a')[0]);};p.prototype.getLabelForSubnav=function(q,r){var s=this.getSubnav(q,r);return s&&h.getText(h.scry(s,'a')[0]);};p.prototype.fold=function(q){return this._adjustFolding(q,true);};p.prototype.unfold=function(q){return this._adjustFolding(q,false);};p.prototype.getOffset=function(){return this.OFFSET+(g.hasClass(document.body,'hasVoiceBar')?26:0)+(g.hasClass('rightColContent','pagesTimelineRightColumn')?48:0);};p.prototype.updateSection=function(q,r){if(!this._navKeys[q])return;var s=this._navKeys[q].getAttribute('data-rollup');if(this._currentRollup&&this._currentRollup!=s){g.removeClass(this._currentRollup,'selected');g.removeClass(h.scry(this._currentRollup,'ul')[0],'loaded');delete this._currentRollup;}if(s&&this._rolledup[s]){var t=this._rolledup[s];if(t.getAttribute('data-rollup')){this._currentRollup=t;g.addClass(this._currentRollup,'selected');g.addClass(h.scry(this._currentRollup,'ul')[0],'loaded');}}this._currentNav&&g.removeClass(this._currentNav,'selected');this._currentSubNav&&g.removeClass(this._currentSubNav,'selected');this._currentNav=null;this._currentSubNav=null;if(this._navKeys[q]){this._currentNav=this._navKeys[q];g.addClass(this._currentNav,'selected');if(this.decadesAreSelectable&&this._navKeys[r]){this._currentSubNav=this._navKeys[r];g.addClass(this._currentSubNav,'selected');}else if(r&&this._subNavKeys[q][r]){this._currentSubNav=this._subNavKeys[q][r];g.addClass(this._currentSubNav,'selected');}}};p.prototype._getRollupSize=function(q){var r=this._currentNav,s=r&&r.getAttribute('data-rollup'),t=this.KEY_HEIGHT*(this._rollups[q].length-1);if(q==s){t+=this.SUBKEY_HEIGHT*h.scry(r,'li').length;t-=this.SUBKEY_HEIGHT*(this._rollups[q].length-1);}return t;};p.prototype._adjustFolding=function(q,r){var s=q,t=Object.keys(this._rollups);while(q>0&&t.length){var u=t[r?'pop':'shift']();if(!r==!this._rolledup[u])continue;var v=this._getRollupSize(u);if(v<=0)continue;if(!r&&v>q)break;this[r?'_collapseRollup':'_expandRollup'](u);q-=v;}return s-q;};p.prototype._collapseRollup=function(q){var r=this._rollups[q];if(!r||r.length<2||this._rolledup[q])return;var s=r[0].previousSibling,t=r[0],u=h.create('a',{href:t.firstChild.href,rel:'ignore',tabindex:'-1'},[q]),v=h.create('ul',{className:'clearfix'});for(var w=0;w<r.length;w++)v.appendChild(r[w]);var x=h.create('li',null,[u,v]);if(this.decadesAreSelectable){var y=r[r.length-1],z=t.getAttribute('data-key')+y.getAttribute('data-key');x.setAttribute('data-start',y.getAttribute('data-start'));x.setAttribute('data-end',t.getAttribute('data-end'));x.setAttribute('data-key',z);this._navKeys[z]=x;}else x.setAttribute('data-key',t.getAttribute('data-key'));x.setAttribute('data-rollup',q);if(s){h.insertAfter(s,x);}else h.prependContent(this._root,x);this._rolledup[q]=x;this._checkSelection();this._ensureFocusableElementIsVisible();};p.prototype._expandRollup=function(q){if(!this._rolledup[q])return;var r=this._rolledup[q],s=h.scry(r,'ul')[0],t=document.createDocumentFragment();while(s.childNodes.length)t.appendChild(s.firstChild);h.replace(r,t);this._rolledup[q]=false;this._checkSelection();};p.prototype._checkSelection=function(){if(this._currentNav){var q=this._currentSubNav&&this._currentSubNav.getAttribute('data-key');this.updateSection(this._currentNav.getAttribute('data-key'),q);}};p.prototype._handleScrub=function(event){var q=event.getModifiers();if(event.isMiddleClick()||q.access||q.meta)return true;var r=l.byTag(event.getTarget(),'a'),s=r&&l.byAttribute(r,'data-key');if(s){m.scrubberWasClicked(s.getAttribute('data-key'));m.navigateToSection(s.getAttribute('data-key'));return event.prevent();}};p.prototype._ensureFocusableElementIsVisible=function(){while(!(this._tabbableElement.offsetHeight||this._tabbableElement.offsetWidth)){this._tabbableElement.tabIndex=-1;var q=l.byTag(l.byTag(this._tabbableElement,'li'),'li');this._tabbableElement=h.scry(q,'a')[0];this._tabbableElement.tabIndex=0;}};p.prototype._moveFocus=function(event){if(event.getModifiers().any)return;var q=i.getKeyCode(event);if(q===k.UP||q===k.DOWN){var r=h.scry(this._root,'a').filter(function(u){return u.offsetHeight||u.offsetWidth;}),s=r.indexOf(this._tabbableElement);if(s!=-1){var t=r[s+(q===k.UP?-1:1)];if(t){t.tabindex=0;j.set(t);this._tabbableElement.tabindex=-1;this._tabbableElement=t;event.prevent();}}}};o(p.prototype,{KEY_HEIGHT:23,SUBKEY_HEIGHT:16,OFFSET:38,SCRUBBER_NO_ADS_VERTICAL_BUFFER:125});e.exports=p;});
__d("TimelineMainScrubber",["Arbiter","CSS","DOMQuery","TimelineConstants","TimelineController","TimelineScrubber"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DOMQuery'),j=b('TimelineConstants'),k=b('TimelineController'),l=b('TimelineScrubber');for(var m in l)if(l.hasOwnProperty(m)&&m!=="_metaprototype")o[m]=l[m];var n=l===null?null:l.prototype;o.prototype=Object.create(n);o.prototype.constructor=o;o.__superConstructor__=l;function o(p){l.call(this,p);this._subscribe=g.subscribe(j.SECTION_LOADED,function(q,r){var s=this._navKeys[r.key],t=s&&i.scry(s,'ul')[0];if(t){h.addClass(t,'loaded');k.scrubberHasChangedState();if(r.hideSubSections)h.hide(t);}}.bind(this));}o.prototype.reset=function(){n.reset.call(this);this._subscribe&&this._subscribe.unsubscribe();};e.exports=o;});
__d("legacy:TimelineMainScrubber",["TimelineMainScrubber"],function(a,b,c,d){a.TimelineMainScrubber=b('TimelineMainScrubber');},3);
__d("PubcontentPageTimelineChainingController",["Arbiter","AsyncRequest","DOM","PageLikeButton"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncRequest'),i=b('DOM'),j=b('PageLikeButton'),k='fbSuggestionsPlaceHolder',l='/ajax/pages/suggestions_on_liking.php';m.init=function(n){if(!this.$PubcontentPageTimelineChainingController0)this.$PubcontentPageTimelineChainingController0=new m(n);};function m(n){this.likedPageIDs={};this.config=n;g.subscribe(j.LIKED,this.onLike.bind(this));}m.prototype.$PubcontentPageTimelineChainingController1=function(n){var o=i.scry(document,'#'+k);if(o.length===0)return null;return o[0];};m.prototype.onLike=function(n,o){if(o.profile_id&&o.target&&o.origin&&o.origin in this.config&&!(o.profile_id in this.likedPageIDs)){var p=this.$PubcontentPageTimelineChainingController1(o.target);if(!p)return;this.likedPageIDs[o.profile_id]=true;new h().setURI(l).setData({pageid:o.profile_id}).setRelativeTo(p).send();}};e.exports=m;});