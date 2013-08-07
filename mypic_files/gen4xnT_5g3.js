/*1373852598,173214301*/

if (self.CavalryLogger) { CavalryLogger.start_js(["WLpRY"]); }

__d("AsyncDOM",["CSS","DOM"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i={invoke:function(j,k){for(var l=0;l<j.length;++l){var m=j[l],n=m[0],o=m[1],p=m[2],q=m[3],r=(p&&k)||null;if(o)r=h.scry(r||document.documentElement,o)[0];switch(n){case 'eval':(new Function(q)).apply(r);break;case 'hide':g.hide(r);break;case 'show':g.show(r);break;case 'setContent':h.setContent(r,q);break;case 'appendContent':h.appendContent(r,q);break;case 'prependContent':h.prependContent(r,q);break;case 'insertAfter':h.insertAfter(r,q);break;case 'insertBefore':h.insertBefore(r,q);break;case 'remove':h.remove(r);break;case 'replace':h.replace(r,q);break;default:}}}};e.exports=i;});
__d("Live",["Arbiter","AsyncDOM","AsyncSignal","ChannelConstants","DataStore","DOM","ServerJS","createArrayFrom","emptyFunction"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('AsyncDOM'),i=b('AsyncSignal'),j=b('ChannelConstants'),k=b('DataStore'),l=b('DOM'),m=b('ServerJS'),n=b('createArrayFrom'),o=b('emptyFunction');function p(r,s){s=JSON.parse(JSON.stringify(s));new m().setRelativeTo(r).handle(s);}var q={logAll:false,startup:function(){q.startup=o;g.subscribe(j.getArbiterType('live'),q.handleMessage.bind(q));},lookupLiveNode:function(r,s){var t=l.scry(document.body,'.live_'+r+'_'+s);t.forEach(function(u){if(k.get(u,'seqnum')===undefined){var v=JSON.parse(u.getAttribute('data-live'));k.set(u,'seqnum',v.seq);}});return t;},handleMessage:function(r,s){var t=s.obj,u=t.fbid,v=t.assoc,w=this.lookupLiveNode(u,v);if(!w)return false;w.forEach(function(x){if(t.expseq){var y=k.get(x,'seqnum'),z=k.get(x,'message_buffer');if(z===undefined){z={};k.set(x,'message_buffer',z);}var aa={obj:t};z[t.expseq]=aa;if(t.expseq!=y){q.log('mismatch',t.fbid,t.expseq,y);return false;}while(true){y=k.get(x,'seqnum');var ba=z[y];if(ba){h.invoke(ba.obj.updates,x);if(ba.obj.js)p(x,ba.obj.js);q.log('seqmatch',t.fbid,'exp',t.expseq,'cur',y);delete z[y];}else break;}}else{h.invoke(t.updates,x);if(t.js)p(x,t.js);}});},log:function(){if(q.logAll){var r=n(arguments).join(':');new i('/common/scribe_endpoint.php',{c:'live_sequence',m:r}).send();}}};e.exports=q;});
__d("legacy:live-js",["Live"],function(a,b,c,d){a.Live=b('Live');},3);
__d("PluginLikebox",["AsyncDOM","AsyncRequest","CSS","DOMEvent","DOMEventListener","DOMQuery","PluginLinkshim","copyProperties"],function(a,b,c,d,e,f){var g=b('AsyncDOM'),h=b('AsyncRequest'),i=b('CSS'),j=b('DOMEvent'),k=b('DOMEventListener'),l=b('DOMQuery'),m=b('PluginLinkshim'),n=b('copyProperties');function o(p,q){this.stream_id=p;this.force_wall=q;this.load();m.globalizeLegacySymbol();k.add(l.find(document.body,'.pluginLikeboxStream'),'click',function(r){var s=new j(r),t=s.target.parentNode;if(i.hasClass(t,'text_exposed_link')){s.kill();i.addClass(l.find(t,'^.text_exposed_root'),'text_exposed');}});}n(o.prototype,{load:function(p){new h().setMethod('GET').setURI('/plugins/likebox/stream').setData({id:this.stream_id,dom:p?'pluginLikeboxMoreStories':'pluginLikeboxStream',force_wall:this.force_wall,nobootload:1,inlinecss:1,max_timestamp:p}).setReadOnly(true).setErrorHandler(function(){}).setHandler(this.handleResponse.bind(this)).send();},handleResponse:function(p){if(p.inlinecss){var q=document.createElement('style');q.setAttribute("type","text/css");document.getElementsByTagName('head')[0].appendChild(q);if(q.styleSheet){q.styleSheet.cssText=p.inlinecss;}else q.appendChild(document.createTextNode(p.inlinecss));}g.invoke(p.domops);var r=l.scry(document.body,"#pluginLikeboxMoreStories a");if(!r.length)return;r=r[0];var s=this;k.add(r,'click',function(t){new j(t).kill();s.load(parseInt(r.getAttribute('data-timestamp'),10));var u=l.find(r.parentNode,'.uiMorePagerLoader');i.addClass(u,'uiMorePagerPrimary');i.removeClass(u,'uiMorePagerLoader');i.hide(r);});}});e.exports=o;});
__d("UFITracking",["Bootloader"],function(a,b,c,d,e,f){var g=b('Bootloader');function h(j){g.loadModules(['DOM','collectDataAttributes'],function(k,l){j.forEach(function(m){var n=k.scry(document.body,m);if(!n||n.link_data)return;var o=l(n,['ft']).ft;if(Object.keys(o).length){var p=k.create('input',{type:'hidden',name:'link_data',value:JSON.stringify(o)});n.appendChild(p);}});});}var i={addAllLinkData:function(){h(['form.commentable_item']);},addAllLinkDataForQuestion:function(){h(['form.fbEigenpollForm','form.fbQuestionPollForm']);}};e.exports=i;});
__d("legacy:ufi-tracking-js",["UFITracking"],function(a,b,c,d){var e=b('UFITracking');a.ufi_add_all_link_data=e.addAllLinkData;a.question_add_all_link_data=e.addAllLinkDataForQuestion;},3);