/*1374479641,178138183*/

if (self.CavalryLogger) { CavalryLogger.start_js(["2ldhc"]); }

__d("OGCollectionAddCuration",["AsyncRequest","DataStore","DOM","copyProperties","tidyEvent"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('DataStore'),i=b('DOM'),j=b('copyProperties'),k=b('tidyEvent'),l='OGCollectionAddCuration';function m(n,o,p,q,r,s){this._container=n;this._control=o;this._itemID=p;this._surface=r;this._display=s.display;if(o)k([o.subscribe('reload',this.reloadControl.bind(this))]);if(q)h.set(String(q),l,this);if(p)h.set(String(p),l,this);}j(m,{handleDeleteAction:function(n){var o=h.get(String(n),l);if(o)o.reloadControl();},handleAddItemSuccess:function(n,o,p){var q=h.get(String(n),l);h.set(String(o),l,q);q.insertMenuIntoDialog(p);},hideControl:function(n){var o=h.get(String(n),l);o.hideControl();},insertControl:function(n,o){var p=h.get(String(n),l);p.replaceControl(o);},reloadControl:function(n){var o=h.get(String(n),l);o.reloadControl();}});j(m.prototype,{hideControl:function(){this._control.hide();},reloadControl:function(){var n=new g('/ajax/collections/add_curation').setData({itemid:this._itemID,surface:this._surface,forceedit:true,display:this._display}).setHandler(this._handleAddCurationResponse.bind(this));n.send();},insertMenuIntoDialog:function(n){this._control.insertMenuIntoDialog(n);},replaceControl:function(n){i.replace(this._container,n);},_handleAddCurationResponse:function(n){this._control.destroy();i.replace(this._container,n.payload);}});e.exports=m;});
__d("OGCollectionAddObject",["AsyncRequest","CSS","DOM","DOMQuery","Form","JSLogger","Parent","TidyArbiterMixin","TimelineSection","copyProperties","csx","cx","ge"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('CSS'),i=b('DOM'),j=b('DOMQuery'),k=b('Form'),l=b('JSLogger'),m=b('Parent'),n=b('TidyArbiterMixin'),o=b('TimelineSection'),p=b('copyProperties'),q=b('csx'),r=b('cx'),s=b('ge'),t=l.create('og_collection_add_object'),u=p({ADD_PLACEHOLDER:'OGCollectionAddObject/addPlaceholder',NEW_ITEM:'OGCollectionAddObject/newItem',PLACEHOLDER:'OGCollectionAddObject/placeholder',REMOVE_PLACEHOLDER:'OGCollectionAddObject/removePlaceholder',init:function(v,w,x,y,z){o.callWithSection(z,function(aa){this.initImpl(v,w,x,y,aa.getNode(),z,aa.id);}.bind(this));},initInReport:function(v,w,x,y){var z=m.byClass(y,"_w8_");this.initImpl(v,w,x,y,z,null,null);},initImpl:function(v,w,x,y,z,aa,ba){var ca=j.scry(z,"._620")[0];if(!ca){t.error('grid_not_found',{collection_id:aa,section:ba,csx:'.public/fbTimelineCollectionGrid/root'});return;}w.subscribe('select',function(da,ea){if(!ea.selected.uid||ea.selected.type.indexOf('disabled')!=-1)return;u.inform(u.ADD_PLACEHOLDER,aa);var fa=ca.nextSibling,ga=null;if(fa&&h.hasClass(fa,"_3t3")){h.hide(ca.lastChild);ga=ca.lastChild;}var ha=i.prependContent(ca,x.cloneNode(true))[0];u.inform(u.PLACEHOLDER,{grid:ca});var ia=p({action:'add',mechanism:'typeahead'},k.serialize(y));ha.setAttribute('data-item',ia.item_id);new g().setURI(v).setData(ia).setRelativeTo(ca).setErrorHandler(function(ja){i.remove(ha);u.inform(u.REMOVE_PLACEHOLDER,aa);ga&&h.show(ga);}).setHandler(function(ja){ga&&i.remove(ga);}).setFinallyHandler(function(ja){u.inform(u.PLACEHOLDER,{grid:ca});}).send();});},replaceItem:function(v,w,x){var y=i.scry(v,'div[data-obj="'+w+'"]')[0];if(y){var z=m.byClass(y,"_30f");if(z)u.inform(u.REMOVE_PLACEHOLDER,z.id);i.remove(y.parentNode);}var aa=i.find(v,'[data-item="'+w+'"]'+"._gx9");i.replace(aa,x);this.inform(u.NEW_ITEM,{grid:v,newItem:x});},prependItem:function(v,w){var x=j.scry(s(v),"._620")[0];i.prependContent(x,w);this.inform(u.NEW_ITEM,{grid:x,newItem:w});}},n);e.exports=u;});
__d("TimelineCollectionsCuration",["getContextualParent","CSS","Parent","$","cx"],function(a,b,c,d,e,f){var g=b('getContextualParent'),h=b('CSS'),i=b('Parent'),j=b('$'),k=b('cx'),l={hideAppSection:function(m){var n=g(j(m),true),o=['getTimelineUnitFromChildElement','getMedleyAppSectionFromChildElement'];for(var p=0;p<o.length;p++){var q=l[o[p]](n);if(q)return h.hide(q);}},getTimelineUnitFromChildElement:function(m){return i.byClass(m,'fbTimelineUnit');},getMedleyAppSectionFromChildElement:function(m){return i.byClass(m,"_30f");}};e.exports=l;});
__d("OGCollectionAddToggle",["CSS","DOM","Event","TimelineCollectionsCuration","csx","cx","tidyEvent"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('Event'),j=b('TimelineCollectionsCuration'),k=b('csx'),l=b('cx'),m=b('tidyEvent'),n={},o="_4__4";function p(r,s,t){g.conditionShow(r,t);g.conditionClass(s,o,t);}var q={initTypeaheadToggleInReport:function(r,s,t){h.prependContent(h.find(j.getTimelineUnitFromChildElement(r),"._5amu"),s);if(n[t]===undefined){n[t]=g.hasClass(s,o);}else p(r,s,n[t]);m(i.listen(s,'click',function(u){p(r,s,n[t]=!n[t]);}));}};e.exports=q;});
__d("OGCollectionAddedIconPlaceholder",["CSS","DataStore","DOM","DOMQuery","Event","copyProperties","csx","tidyEvent"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DataStore'),i=b('DOM'),j=b('DOMQuery'),k=b('Event'),l=b('copyProperties'),m=b('csx'),n=b('tidyEvent'),o='OGCollectionAddedIconPlaceholder';function p(q,r,s,t){this._dialog=s;this._icon=r;this._addPlaceholder=t;n(k.listen(r,'click',s.show.bind(s)));h.set(String(q),o,this);}l(p,{loadEditMenu:function(q,r){var s=h.get(String(q),o);s.insertIntoDialog(r);}});l(p.prototype,{destroy:function(){this._dialog.destroy();},getIcon:function(){return this._icon;},hide:function(){g.hide(this._icon);g.show(this._addPlaceholder);this._dialog.hide();},insertIntoDialog:function(q){i.setContent(j.find(this._dialog.getContent(),"._51rr"),q);}});e.exports=p;});
__d("OGCollectionAddedIconRate",["DataStore","Event","copyProperties","tidyEvent"],function(a,b,c,d,e,f){var g=b('DataStore'),h=b('Event'),i=b('copyProperties'),j=b('tidyEvent'),k='OGCollectionAddedIconRate';function l(m,n){this._link=m;g.set(String(n),k,this);}l.disable=function(m){var n=g.get(String(m),k);n._disable();};i(l.prototype,{_disable:function(){j(h.listen(this._link,'click',function(m){m.kill();}));}});e.exports=l;});
__d("OGCollectionBatchAddCuration",["AsyncRequest","Event","OGCollectionAddCuration","Parent","Run"],function(a,b,c,d,e,f){var g=b('AsyncRequest'),h=b('Event'),i=b('OGCollectionAddCuration'),j=b('Parent'),k=b('Run'),l={},m;function n(p){for(var q=0;q<l[p].listeners.length;q++)l[p].listeners[q].remove();l[p]=null;}var o={loadControls:function(p,q,r){if(!q||!Array.isArray(q))return;l[r]=l[r]||{tokens:[],listeners:[]};l[r].tokens=l[r].tokens.concat(q);var s=j.byClass(p,'fbTimelineUnit');l[r].listeners.push(h.listen(s,'mouseenter',function(){new g('/ajax/collections/batch_add_curation').setData({collectionitemtokens:l[r].tokens.join(),surface:r}).send();n(r);}));if(!m){m=true;k.onLeave(function(){for(var t in l)l[t]&&n(t);l={};m=null;});}},attachControls:function(p,q){for(var r=0;r<p.length;r++)i.insertControl(p[r],q[r]);}};e.exports=o;});
__d("TimelineOGCollectionReportGrid",["CSS","OGCollectionAddObject"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('OGCollectionAddObject'),i={init:function(j,k){h.subscribe([h.NEW_ITEM,h.PLACEHOLDER],i.hideOverflowNodes.curry(j,k));},hideOverflowNodes:function(j,k,l,m){if(m.grid!=j)return;for(var n=0;n<j.childNodes.length;n++)g.conditionShow(j.childNodes[n],n<k);}};e.exports=i;});