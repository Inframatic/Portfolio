/*!CK:4046824898!*//*1375705728,173224731*/

if (self.CavalryLogger) { CavalryLogger.start_js(["lczzT"]); }

__d("ChannelSubdomain",["Cookie","JSLogger"],function(a,b,c,d,e,f){var g=b('Cookie'),h=b('JSLogger'),i=h.create('channel'),j=7,k=null;function l(o,p){var q=null,r=m(),s;o--;var t=Math.min(32,j*o);t=Math.max(t,1);var u=false;for(var v=0;v<32;v++){s=(v+p)%t;if(!(r&(1<<s))){u=true;break;}}if(u){k=s;q=k%j;g.set('sub',r|(1<<k));}else{k=-1;q=null;i.error('subdomain_overflow',{slot:k,max:o});}return q;}function m(){var o=g.get('sub')||0;o=parseInt(o,10);return isNaN(o)?0:o;}function n(){if(k!==null&&k>=0){var o=m()&~(1<<k);if(o){g.set('sub',o);}else g.clear('sub');}}e.exports={allocate:l,clear:n};});
__d("DocRPC",["ErrorUtils"],function(a,b,c,d,e,f){var g=b('ErrorUtils'),h={_apis:{},_dispatch:function(i){var j;try{i=JSON.parse(i);}catch(k){throw new Error('DocRPC unparsable dispatch: "'+i+'"');}if(h._apis.hasOwnProperty(i.api)){var l=h._apis[i.api];if(l[i.method])j=g.applyWithGuard(l[i.method],l,i.args);}if(j===undefined)j=null;return JSON.stringify(j);},publish:function(i,j){h._apis[j]=i;},proxy:function(i,j,k){var l={};k.forEach(function(m){l[m]=function(){var n={api:j,method:m,args:Array.prototype.slice.call(arguments)},o;try{if(i.closed)throw new Error('DocRPC window closed');o=i.DocRPC._dispatch(JSON.stringify(n));}catch(p){g.reportError(p);return;}if(typeof(o)=='string')try{o=JSON.parse(o);}catch(p){throw new Error('DocRPC '+j+'.'+m+' unparsable return: "'+o+'"');}return o;};});return l;}};e.exports=a.DocRPC=h;});
__d("ChannelTransport",["copyProperties","bind","AjaxRequest","URI","JSLogger","DocRPC","ChannelConstants","UserAgent"],function(a,b,c,d,e,f){var g=b('copyProperties'),h=b('bind'),i=b('AjaxRequest'),j=b('URI'),k=b('JSLogger'),l=b('DocRPC'),m=b('ChannelConstants'),n=b('UserAgent'),o=k.create('channel');function p(){return (1048576*Math.random()|0).toString(36);}function q(y,z){var aa=y.subdomain;aa=aa===null?'':(aa+'-');var ba=new j(z).setDomain(aa+y.host+'.facebook.com').setPort(y.port).setSecure(j().isSecure());return ba;}function r(y){var z={partition:y.partition,cb:p()},aa=q(y,'/p').setQueryData(z);o.log('start_p',{uri:aa.toString()});var ba=new i('GET',aa);if(i.supportsCORS())ba.xhr.withCredentials=true;var ca=function(da){o.log('finish_p',{xhr:da.toJSON?da.toJSON():da});};ba.timeout=y.P_TIMEOUT;ba.onError=ba.onSuccess=ca;ba.send();}function s(y,z,aa){var ba=new Image(),ca=0,da=function(ga){ba.abort();return ga?z():aa();};ba.onload=function(){o.log('ping_ok',{duration:Date.now()-ca});da(true);};ba.onerror=function(){r(y);da(false);};var ea=setTimeout(ba.onerror,10000,false);ba.abort=function(){if(ea){clearTimeout(ea);ea=null;}ba.onload=ba.onerror=null;};var fa={partition:y.partition,cb:p()};ca=Date.now();ba.src=q(y,'/ping').setQueryData(fa);return ba;}function t(y,z,aa,ba){var ca=new Date(),da=(ca-y.userActive)/1000|0;if(da<0)o.warn('idle_regression',{idleTime:da,now:ca.getTime(),userActive:y.userActive});var ea={channel:y.user_channel,seq:y.seq,partition:y.partition,clientid:y.sessionID,cb:p(),idle:da,cap:0};if(da<60)ea.state='active';if(y.streamingCapable){ea.mode='stream';ea.format='json';}if(y.profile)ea.profile=y.profile;if(y.webrtcSupport&&(n.chrome()>=24||n.firefox()>=22))ea.cap=m.CAPABILITY_VOIP;var fa=q(y,'/pull').setQueryData(ea),ga=new i('GET',fa);if(i.supportsCORS())ga.xhr.withCredentials=true;ga.timeout=y.streamingCapable?y.STREAMING_TIMEOUT:y.LONGPOLL_TIMEOUT;ga.onJSON=z;ga.onSuccess=aa;ga.onError=function(){var ha=(this.status==12002&&this._time>=y.MIN_12002_TIMEOUT)||(this.status==504&&this._time>=y.MIN_504_TIMEOUT),ia=ha?aa:ba;return ia&&ia.apply(this,arguments);};ga.send();y.inStreaming=y.streamingCapable;return ga;}function u(y){this.manager=y;(this.init&&this.init());}function v(y){u.apply(this,arguments);}g(v.prototype,{logName:'CORS',enterState:function(y,z){if(this._request){this._request.abort();this._request=null;}if(y=='init')setTimeout(h(this.manager,'exitState',{status:m.OK,stateId:z.stateId}),3000,false);if(!/pull|ping/.test(y))return;var aa=this.manager;if(y=='ping'){this._request=s(z,h(aa,'exitState',{status:m.OK,stateId:z.stateId}),h(aa,'exitState',{status:m.ERROR,stateId:z.stateId}));}else if(y=='pull')this._request=t(z,h(aa,'_processTransportData',z.stateId),h(aa,'exitState',{status:m.OK,stateId:z.stateId}),h(aa,'exitState',{status:m.ERROR,stateId:z.stateId}));}});function w(y){o.log('iframe_init_constructor');u.apply(this,arguments);this._iframe=document.createElement('iframe');this._iframe.style.display='none';document.body.appendChild(this._iframe);l.publish(this,'outerTransport');}g(w.prototype,{logName:'iframe',_initIframe:function(y){o.log('iframe_init_start');window.onchanneliframeready=function(){o.log('iframe_resources');return y.resources;};window.onchanneliframeloaded=function(){o.log('iframe_loaded');};if(y){this._iframeURI=q(y,y.path);if(y.bustIframe){var z={partition:y.partition,cb:p()};this._iframeURI.setQueryData(z);}}else this._iframeURI='about:blank';this._iframeProxy=null;try{this._iframe.contentWindow.location.replace(this._iframeURI);o.log('iframe_uri_set');}catch(aa){o.error('iframe_uri_set_error',aa);this.exitState({status:m.ERROR,stateId:y.stateId},aa+'');}},enterState:function(y,z){if(y=='init'){this._initIframe(z);}else if(/idle|ping|pull/.test(y)){if(this._iframeProxy){this._iframeProxy.enterState.apply(this._iframeProxy,arguments);}else if(y!='idle')this.exitState({status:m.ERROR,stateId:z.stateId},'iframe not yet loaded');}else if(y=='shutdown')this._initIframe();},_processTransportData:function(){this.manager._processTransportData.apply(this.manager,arguments);},exitState:function(y){if(this.manager.state=='init'&&y.status==m.OK)this._iframeProxy=l.proxy(this._iframe.contentWindow,'innerTransport',['enterState'],(this._iframeURI+'').replace(/iframe.*/,''));if(/ping|pull/.test(this.manager.state)&&!this._iframeProxy)return;this.manager.exitState.apply(this.manager,arguments);}});function x(){this.init=this.init.bind(this);u.apply(this,arguments);}g(x.prototype,{logName:'iframe(inner)',init:function(){l.publish(this,'innerTransport');try{var z=l.proxy(window.parent,'outerTransport',['_processTransportData','exitState'],top.DocRPC.origin);g(this,z);this.exitState({status:m.OK,stateId:1e+06});}catch(y){o.error('iframe_inner_init_error',y);}},enterState:function(y,z){if(this._request){this._request.abort();this._request=null;}if(y=='ping'){this._request=s(z,h(this,'exitState',{status:m.OK,stateId:z.stateId}),h(this,'exitState',{status:m.ERROR,stateId:z.stateId}));}else if(y=='pull')this._request=t(z,h(this,'_processTransportData',z.stateId),h(this,'exitState',{status:m.OK,stateId:z.stateId}),h(this,'exitState',{status:m.ERROR,stateId:z.stateId}));}});e.exports={getURI:q,Transport:u,CORSTransport:v,IframeTransport:w,IframeInnerTransport:x};});
__d("MovingStat",[],function(a,b,c,d,e,f){function g(h){h=h||60000;var i={t:new Date(),count:0,v:0},j=i,k=0,l=0;function m(){var n=new Date()-h;while(j&&j.next&&j.t<n){k-=j.v;l-=j.count;j=j.next;}}this.add=function(n){k+=n;l++;var o=new Date();if(o-i.t<1000){i.v+=n;i.count++;}else{i.next={t:o,v:n,count:1};i=i.next;m();}};this.tally=function(n){n=n||1000;m();return {sum:k,count:l,timeAverage:k*n/h};};}e.exports=g;});
__d("ChannelManager",["Event","function-extensions","AjaxRequest","Arbiter","AsyncRequest","ChannelConstants","ChannelInitialData","ChannelSubdomain","ChannelTransport","Env","FBAjaxRequest","JSLogger","MovingStat","PresenceCookieManager","PresenceState","PresenceUtil","Run","SystemEvents","URI","UserActivity","copyProperties","createArrayFrom","ChatVisibility"],function(a,b,c,d,e,f){var g=b('Event');b('function-extensions');var h=b('AjaxRequest'),i=b('Arbiter'),j=b('AsyncRequest'),k=b('ChannelConstants'),l=b('ChannelInitialData'),m=b('ChannelSubdomain'),n=b('ChannelTransport'),o=b('Env'),p=b('FBAjaxRequest'),q=b('JSLogger'),r=b('MovingStat'),s=b('PresenceCookieManager'),t=b('PresenceState'),u=b('PresenceUtil'),v=b('Run'),w=b('SystemEvents'),x=b('URI'),y=b('UserActivity'),z=b('copyProperties'),aa=b('createArrayFrom'),ba=b('ChatVisibility'),ca,da=q.create('channel'),ea=null;function fa(qa){ea=qa;}var ga={idle:{ok:'init!'},init:{ok:'pull!',error:'reconnect',sys_online:'init',sys_timetravel:'init'},pull:{ok:'pull!',error:'ping',error_missing:'pull',error_msg_type:'pull',refresh_0:'reconnect',refresh_110:'reconnect',refresh_111:'reconnect',refresh_112:'pull',refresh_113:'pull',refresh_117:'reconnect'},ping:{ok:'pull!',error:'ping',error_stale:'reconnect!'},reconnect:{ok:'init!',error:'reconnect',sys_online:'reconnect',sys_timetravel:'reconnect'},shutdown:{},_all:{error_max:'shutdown!',error_shutdown:'shutdown!',sys_owner:'reconnect',sys_nonowner:'idle!',sys_online:'ping',sys_offline:'idle!',sys_timetravel:'ping'}},ha={userActive:ba.isOnline()?Date.now():0,sessionID:(Math.random()*2147483648|0).toString(16),streamingCapable:false,inStreaming:false,LONGPOLL_TIMEOUT:60000,STREAMING_TIMEOUT:60000,P_TIMEOUT:30000,IFRAME_LOAD_TIMEOUT:30000,MIN_RETRY_INTERVAL:5000,MAX_RETRY_INTERVAL:30000,MIN_12002_TIMEOUT:9000,MIN_504_TIMEOUT:20000,STALL_THRESHOLD:180000,JUMPSTART_THRESHOLD:90000,MIN_INIT_PROBE_DELAY:3000,INIT_PROBE_DELAY_RANDOMIZE_RANGE:12000,PROBE_DELAY:60000,PROBE_HEARTBEATS_INTERVAL_LOW:1000,PROBE_HEARTBEATS_INTERVAL_HIGH:3000,STREAMING_EXIT_STATE_ON_CONTINUE:false},ia=1,ja={},ka=0;function la(){return j.lastSuccessTime?Math.round((Date.now()-j.lastSuccessTime)/1000):-1;}function ma(){var qa={};if(ca.getConfig('host'))qa[ca.getConfig('user_channel')]=ca.getConfig('seq',0);return qa;}function na(){var qa=Date.now(),ra=Date.now(),sa={total:0},ta='idle',ua=false;w.subscribe([w.USER,w.ONLINE,w.TIME_TRAVEL],function(xa,ya){pa(true);ra=null;ca.lastPullTime=Date.now();var za;switch(xa){case w.USER:za=w.isPageOwner()?k.SYS_OWNER:k.SYS_NONOWNER;break;case w.ONLINE:za=ya?k.SYS_ONLINE:k.SYS_OFFLINE;break;case w.TIME_TRAVEL:za=k.SYS_TIMETRAVEL;break;}ca.exitState({status:za,stateId:ia});});var va=function(xa,ya){var za=Date.now(),ab;if(ya){qa=za;ab=ya.nextState||ya.state;}else ab=ta;w.checkTimeTravel();if(ra){var bb=Math.round((za-ra)/1000);if(bb>0){sa[ta]=(sa[ta]||0)+bb;sa.total+=bb;}}ta=ab;ra=za;if(!xa){sa.lastSuccessTime=la();sa.online=w.isOnline();da.log('rollup',sa);}};i.subscribe(k.ON_ENTER_STATE,va);setInterval(va,60000,false);i.subscribe(q.DUMP_EVENT,function(xa,ya){ya.channelRollup=sa;});var wa=function(){if(ca.isShutdown()||ca.shouldIdle())return;w.checkTimeTravel();var xa=Date.now()-(ca.lastPullTime||o.start);if(!ua&&xa>ha.STALL_THRESHOLD){var ya=la();da.error('stall',{lastSuccessTime:ya,rollupState:ta});ua=true;}var za=Date.now()-qa;if(ca.state=='pull'&&za>ha.JUMPSTART_THRESHOLD){qa=null;da.warn('jumpstart',{state:ca.state,dormant:za});ca.enterState('init');}};setInterval(wa,10000,false);}function oa(){var qa=Date.now(),ra=1;function sa(){setTimeout(sa,ra*1000,false);var xa=ca.state;if(xa=='idle'&&ca.shouldIdle())return;da.bump('conn_t',ra);if(xa=='pull')da.bump('conn_t_pull',ra);}sa();var ta=[15,30,60,120,240],ua=false,va=false;function wa(xa){setTimeout(function(){da.rate('pullenter_'+xa,ua);da.rate('pullexit_'+xa,va);},xa*1000,false);}while(ta.length)wa(ta.shift());i.subscribe(k.ON_ENTER_STATE,function(xa,ya){if(ya.state=='pull')ua=true;qa=Date.now();});i.subscribe(k.ON_EXIT_STATE,function(xa,ya){if(ya.state!='pull'||!qa)return;var za='other';if(ya.status==k.OK){va=true;za='ok';}else if(ya.xhr&&ya.xhr.errorType){za=/ar:(\w+)/.test(ya.xhr.errorType)&&RegExp.$1;}else if(/^sys_/.test(ya.status))return;var ab=(Date.now()-qa)/1000;if(ab<0){return;}else if(ab>3600)ab=3600;da.bump('conn_num');da.bump('conn_exit',ab);da.bump('conn_num_'+za);da.bump('conn_exit_'+za,ab);});}function pa(qa){if(qa){ka=0;ja={};}else ka++;}ca={state:'idle',nextState:null,lastPullTime:Date.now(),heartbeats:[],setTestCallback:fa,init:function(qa){this.init=function(){};if(typeof(y)!='undefined'){y.subscribe(function(){if(ba.isOnline())ha.userActive=Date.now();}.bind(this));}else da.error('user_activity_undefined');s.register('ch',ma);var ra=this.getConfig('max_conn',2),sa=Math.floor(Math.random()*32);ha.subdomain=m.allocate(ra,sa);if(typeof window.onpageshow!='undefined'){g.listen(window,'pagehide',m.clear);}else v.onUnload(m.clear);this._transportRate=new r(30000);var ta=(h.supportsCORS()&&!ha.forceIframe)?'CORSTransport':'IframeTransport';this.transport=new n[ta](this);if(qa)this.enterState.apply(this,arguments);i.subscribe(q.DUMP_EVENT,function(event,va){va.transportRate=this._transportRate.tally();va.transportType=ta;va.transportVersion=2;}.bind(this));na();oa();if(ca.getConfig('tryStreaming')&&ca.getConfig('host')&&h.supportsCORS()&&!ha.forceIframe){var ua=ha.MIN_INIT_PROBE_DELAY+Math.random()*ha.INIT_PROBE_DELAY_RANDOMIZE_RANGE;setTimeout(this._probeTest,ua,false);}},configure:function(){var qa=aa(arguments);da.log('configure',qa);qa.forEach(z.bind(null,ha));i.inform(k.ON_CONFIG,this);},getConfig:function(qa,ra){return qa in ha?ha[qa]:ra;},isShutdown:function(){return this.state=='shutdown';},shouldIdle:function(){return !(w.isPageOwner()&&w.isOnline());},_sendIframeError:function(qa){var ra=new j().setURI('/ajax/presence/reconnect.php').setData({reason:qa,fb_dtsg:o.fb_dtsg}).setOption('suppressErrorHandlerWarning',true).setOption('retries',1).setMethod('GET').setReadOnly(true).setAllowCrossPageTransition(true);ra.specifiesWriteRequiredParams()&&ra.send();},_getDelay:function(){var qa=Math.min(ha.MIN_RETRY_INTERVAL*Math.pow(2,Math.max(0,ka-1)),ha.MAX_RETRY_INTERVAL);return qa*(.75+Math.random()/2)|0;},enterState:function(){if(this._inEnterState)da.warn('enterstate_recursion');this._inEnterState=true;try{this._enterState.apply(this,arguments);this._inEnterState=false;}catch(qa){this._inEnterState=false;throw qa;}},_enterState:function(qa){var ra=0,sa=aa(arguments);if(this.isShutdown())return;if(qa!='idle!'&&this.shouldIdle())return;ia++;ha.stateId=ia;clearTimeout(this._deferredTransition);this._deferredTransition=null;this.transport.enterState('idle');this.state='idle';this.nextState=null;if(/!$/.test(qa)){var ta=this._transportRate.tally().timeAverage,ua=ca.getConfig('MAX_CHANNEL_STATES_PER_SEC',1);if(ta>=ua){if(!this._throttled){this._throttled=true;da.warn('throttled');}da.bump('throttle');ra=1000/ua;}}else if(!(/#$/.test(qa)))ra=this._getDelay();qa=qa.replace(/\W*$/,'');if(!ga[qa])throw new Error('invalid state:'+qa);var va;if(ra<=0){va={state:qa};this._transportRate.add(1);this.state=qa;var wa=this['_enter_'+this.state];if(wa){sa.shift();wa.apply(this,sa);}if(/init|idle|pull|ping/.test(this.state)){if(ha.streamingCapable&&/pull/.test(this.state))this.heartbeats=[];this.transport.enterState(this.state,ha);if(this.state=='ping'){va.url=n.getURI(ha).toString();va.port=ha.port||'undefined';}}}else{this.state='idle';this.nextState=qa;va={state:this.state,delay:ra,nextState:qa};sa[0]=qa+'#';this._deferredTransition=(function(){this._deferredTransition=null;this.enterState.apply(this,sa);}).bind(this).defer(ra,false);}if(/pull/.test(qa)){va.client_id=ha.sessionID;va.streaming=ha.inStreaming;}da.log('enter_'+this.state,va);i.inform(k.ON_ENTER_STATE,va);},exitState:function(qa,ra){var sa=qa.stateId,ta=qa.status;if(this.isShutdown()||sa<ia)return;var ua=aa(arguments),va=this.state;ua[0]=qa.status;var wa={state:va,status:ta};if(/pull/.test(va)){wa.client_id=ha.sessionID;wa.streaming=ha.inStreaming;}if(/ping/.test(va)&&ta!=k.OK)wa.url=n.getURI(ha).toString();if(this.nextState)wa.nextState=this.nextState;if(ra&&ra.errorType){wa.xhr=ra.toJSON?ra.toJSON():ra;delete wa.xhr.json;}if(ra&&ra.json){if(ra.json.t)wa.t=ra.json.t;if(ra.json.reason)wa.reason=ra.json.reason;if(ra.json.seq)wa.seq=ra.json.seq;}da.log('exit_'+va,wa);i.inform(k.ON_EXIT_STATE,wa);var xa=this['_exit_'+va];if(xa)ta=xa.apply(this,ua)||ta;if(ta!=k.OK){pa();ja[va]=(ja[va]||0)+1;}var ya=ga[this.nextState||va][ta]||ga._all[ta],za=ya&&ya.replace(/!*$/,'');if(!za){da.error('terminal_transition',wa);this._shutdownHint=k.HINT_INVALID_STATE;ya='shutdown!';}this._lastState=va;this._lastStatus=ta;this.enterState(ya);},_processTransportData:function(qa,ra){var sa=ra.json,ta=sa.t;if('s' in sa){sa.seq=sa.s;delete sa.s;}var ua=ha.seq;if('seq' in sa){ha.seq=sa.seq;t.doSync();}switch(ta){case 'continue':if(ha.inStreaming&&this.heartbeats.length<1){ha.streamingCapable=false;da.log('switch_to_longpoll');setTimeout(this._probeTest,ha.PROBE_DELAY,false);}pa(true);if(!ha.inStreaming||ha.STREAMING_EXIT_STATE_ON_CONTINUE)this.exitState({status:k.OK,stateId:qa});break;case 'refresh':case 'refreshDelay':this.exitState({status:'refresh_'+(sa.reason||0),stateId:qa},ra);break;case 'fullReload':s.clear();da.log('invalid_history');i.inform(k.ON_INVALID_HISTORY);this.exitState({status:k.ERROR_MISSING,stateId:qa},ra);break;case 'msg':var va,wa,xa,ya;pa(true);wa=sa.ms;xa=ha.seq-wa.length;for(va=0;va<wa.length;va++,xa++)if(xa>=ua){ya=wa[va];if(ya.type){if(ya.type==='messaging'&&ya.message){var za=ya.unread_counts&&ya.unread_counts.inbox;da.debug('message',{type:'messaging',inbox_unread:za,tid:ya.message.tid,mid:ya.message.mid});}else if(ya.type==='m_messaging'){da.debug('message',{type:'m_messaging',tid:ya.tid,mid:ya.uuid});}else da.debug('message',{type:ya.type});i.inform(k.getArbiterType(ya.type),{obj:ya});}}else da.warn('seq_regression',{seq:xa,last_seq:ua,messages:wa.length});break;case 'heartbeat':if(ha.inStreaming){var ab=Date.now();if(this.heartbeats.length>0){var bb=ab-this.heartbeats[this.heartbeats.length-1];da.log('heartbeat_interval',{client_id:ha.sessionID,interval:bb});}this.heartbeats.push(ab);}break;default:da.error('unknown_msg_type',{type:ta});break;}},_enter_init:function(){if(ja.init>=ca.getConfig('MAX_INIT_FAILS',2))return this.exitState.bind(this,{status:k.ERROR_MAX,stateId:ia}).defer();this._initTimer=this.exitState.bind(this,{status:k.ERROR,stateId:ia},'timeout').defer(ha.IFRAME_LOAD_TIMEOUT,false);},_enter_reconnect:function(qa){var ra=ia;if(!u.hasUserCookie()){da.warn('no_user_cookie');(function(){ca._shutdownHint=k.HINT_AUTH;ca.exitState({status:k.ERROR_SHUTDOWN,stateId:ra});}).defer();return;}var sa={reason:qa,fb_dtsg:o.fb_dtsg};if(o.fb_isb)sa.fb_isb=o.fb_isb;if(ea)ea(sa);var ta=new p('GET','/ajax/presence/reconnect.php',sa);ta.onSuccess=(function(){ca.configure(ta.json);s.store();this.exitState({status:k.OK,stateId:ra});}).bind(this);ta.onError=(function(){var ua=ta.json&&ta.json.error;if(ta.errorType==h.TRANSPORT_ERROR||ta.errorType==h.PROXY_ERROR)this._shutdownHint=k.HINT_CONN;if(ua&&ua==1356007){this._shutdownHint=k.HINT_MAINT;}else if(ua==1357001||ua==1357004||ua==1348009){this._shutdownHint=k.HINT_AUTH;}else this._shutdownHint=null;this.exitState({status:this._shutdownHint?k.ERROR_SHUTDOWN:k.ERROR,stateId:ra},ta);}).bind(this);ta.send();},_enter_shutdown:function(){i.inform(k.ON_SHUTDOWN,{reason:this._shutdownHint});},_exit_init:function(qa){if(this._initTimer)this._initTimer=clearTimeout(this._initTimer);if(qa==k.ERROR_MAX)this._sendIframeError(k.reason_IFrameLoadGiveUp);},_exit_pull:function(qa){if(qa==k.OK)this.lastPullTime=Date.now();},_exit_ping:function(qa){if(qa==k.OK){var ra=Date.now()-(this.lastPullTime||o.start);if(ra>ha.STALL_THRESHOLD)return k.ERROR_STALE;}},_probeTest:function(){ha.streamingCapable=false;var qa=[],ra={mode:'stream',format:'json'},sa=new x('/probe').setDomain(ha.host+'.facebook.com').setPort(ha.port).setSecure(x().isSecure()).setQueryData(ra),ta=new h('GET',sa);ta.onJSON=function(ua,va){if(ua&&ua.json&&ua.json.t==='heartbeat'){qa.push(Date.now());if(qa.length>=2){var wa=qa[1]-qa[0];if(wa>=ha.PROBE_HEARTBEATS_INTERVAL_LOW&&wa<=ha.PROBE_HEARTBEATS_INTERVAL_HIGH){ha.streamingCapable=true;da.log('switch_to_streaming');}da.log('probe_ok',{time:wa});}}};ta.onSuccess=function(ua){if(qa.length!=2){ha.streamingCapable=false;da.error('probe_error',{error:'beats.length = '+qa.length});}};ta.onError=function(ua){ha.streamingCapable=false;da.error('probe_error',ua);};da.log('probe_request');ta.send();}};e.exports=ca;if(l.channelConfig){ca.configure(l.channelConfig);if(/shutdown/.test(l.state))ca._shutdownHint=k[l.reason];ca.init(l.state,l.reason);}});
__d("ChannelConnection",["Arbiter","copyProperties","ChatConfig","Run","SystemEvents","ChannelConstants","ChannelManager","JSLogger"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('copyProperties'),i=b('ChatConfig'),j=b('Run'),k=b('SystemEvents'),l=b('ChannelConstants'),m=b('ChannelManager'),n=b('JSLogger'),o=n.create('channel_connection'),p=null,q=null,r=null,s=null,t=0,u=h(new g(),{CONNECTED:'chat-connection/connected',RECONNECTING:'chat-connection/reconnecting',SHUTDOWN:'chat-connection/shutdown',MUTE_WARNING:'chat-connection/mute',UNMUTE_WARNING:'chat-connection/unmute'});function v(){if(q){clearTimeout(q);q=null;}}function w(){v();o.log('unmute_warning');u.inform(u.UNMUTE_WARNING);}function x(ba){v();q=w.defer(ba,false);o.log('mute_warning',{time:ba});u.inform(u.MUTE_WARNING);}function y(){if(r){clearTimeout(r);r=null;}}function z(ba,ca){y();if(ba===l.ON_ENTER_STATE&&(ca.nextState||ca.state)==='pull'){if(s!==u.CONNECTED){o.log('connected');var da=!s;s=u.CONNECTED;t=0;u.inform(u.CONNECTED,{init:da});}}else if(ba===l.ON_ENTER_STATE&&((ca.nextState||ca.state)==='ping'||(!ca.nextState&&ca.state==='idle'))){r=(function(){var ea=null;if(!(ca.state==='idle'&&!ca.nextState))ea=(ca.delay||0);o.log('reconnecting',{delay:ea});if(u.disconnected())o.log('reconnecting_ui',{delay:ea});s=u.RECONNECTING;(ca.state==='idle')&&t++;if(t>1){u.inform(u.RECONNECTING,ea);}else if(!ca.nextState&&ca.state==='idle')z(ba,ca);}).defer(500,false);}else if(ba===l.ON_SHUTDOWN){o.log('shutdown',{reason:ca.reason});s=u.SHUTDOWN;t=0;u.inform(u.SHUTDOWN,ca.reason);}}function aa(ba){if(m.state==='ping'||m.isShutdown())return;o.log('reconnect',{now:ba});u.inform(u.RECONNECTING,0);if(!!ba){if(p!==null){clearTimeout(p);p=null;}m.enterState('ping!');}else if(!p)p=setTimeout(function(){m.enterState('ping!');p=null;},i.get('channel_manual_reconnect_defer_msec'),false);}if(m.isShutdown()){z(l.ON_SHUTDOWN,m._shutdownHint);}else z(l.ON_ENTER_STATE,{state:m.state,nextState:m.nextState,delay:0});g.subscribe([l.ON_ENTER_STATE,l.ON_SHUTDOWN],z);k.subscribe(k.TIME_TRAVEL,function(){aa();x(i.get('mute_warning_time_msec'));});j.onBeforeUnload(y,false);h(u,{disconnected:function(){return s===u.SHUTDOWN||(s===u.RECONNECTING&&!q&&t>1);},isShutdown:function(){return s===u.SHUTDOWN;},reconnect:aa,unmuteWarning:w});e.exports=u;});
__d("LayerHideOnSuccess",["copyProperties"],function(a,b,c,d,e,f){var g=b('copyProperties');function h(i){this._layer=i;}h.prototype.enable=function(){this._subscription=this._layer.subscribe('success',this._layer.hide.bind(this._layer));};h.prototype.disable=function(){if(this._subscription){this._subscription.unsubscribe();this._subscription=null;}};g(h.prototype,{_subscription:null});e.exports=h;});
__d("Overlay",["CSS","DataStore","DOM","Layer","LayerButtons","LayerDestroyOnHide","LayerFadeOnHide","LayerFadeOnShow","LayerFormHooks","LayerHideOnBlur","LayerHideOnEscape","LayerHideOnSuccess","LayerHideOnTransition","LayerMouseHooks","LayerTabIsolation","copyProperties"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DataStore'),i=b('DOM'),j=b('Layer'),k=b('LayerButtons'),l=b('LayerDestroyOnHide'),m=b('LayerFadeOnHide'),n=b('LayerFadeOnShow'),o=b('LayerFormHooks'),p=b('LayerHideOnBlur'),q=b('LayerHideOnEscape'),r=b('LayerHideOnSuccess'),s=b('LayerHideOnTransition'),t=b('LayerMouseHooks'),u=b('LayerTabIsolation'),v=b('copyProperties');for(var w in j)if(j.hasOwnProperty(w)&&w!=="_metaprototype")y[w]=j[w];var x=j===null?null:j.prototype;y.prototype=Object.create(x);y.prototype.constructor=y;y.__superConstructor__=j;function y(z,aa){z=v({buildWrapper:true},z||{});this._shouldBuildWrapper=z.buildWrapper;j.call(this,z,aa);}y.prototype._configure=function(z,aa){x._configure.call(this,z,aa);var ba=this.getRoot();this._overlay=i.scry(ba,'div.uiOverlay')[0]||ba;g.hide(ba);i.appendContent(this.getInsertParent(),ba);h.set(this._overlay,'overlay',this);var ca=h.get(this._overlay,'width');ca&&this.setWidth(ca);if(this.setFixed)this.setFixed(h.get(this._overlay,'fixed')=='true');if(h.get(this._overlay,'fadeonshow')!='false')this.enableBehavior(n);if(h.get(this._overlay,'fadeonhide')!='false')this.enableBehavior(m);if(h.get(this._overlay,'hideonsuccess')!='false')this.enableBehavior(r);if(h.get(this._overlay,'hideonblur')=='true')this.enableBehavior(p);if(h.get(this._overlay,'destroyonhide')!='false')this.enableBehavior(l);return this;};y.prototype._getDefaultBehaviors=function(){return x._getDefaultBehaviors.call(this).concat([k,o,t,q,s,u]);};y.prototype.initWithoutBuildingWrapper=function(){this._shouldBuildWrapper=false;return this.init.apply(this,arguments);};y.prototype._buildWrapper=function(z,aa){aa=x._buildWrapper.call(this,z,aa);if(!this._shouldBuildWrapper){this._contentRoot=aa;return aa;}this._contentRoot=i.create('div',{className:'uiOverlayContent'},aa);return i.create('div',{className:'uiOverlay'},this._contentRoot);};y.prototype.getContentRoot=function(){return this._contentRoot;};y.prototype.destroy=function(){h.remove(this.getRoot(),'overlay');x.destroy.call(this);};e.exports=y;});
__d("ContextualDialogFooterLink",["CSS","DOM","Event","copyProperties"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('DOM'),i=b('Event'),j=b('copyProperties');function k(l){this._layer=l;}k.prototype.enable=function(){var l=this._layer.getRoot(),m=h.scry(l,'.uiContextualDialogFooterLink')[0],n='uiContextualDialogHoverFooterArrow';this._subscriptions=[i.listen(m,'mouseenter',g.addClass.curry(l,n)),i.listen(m,'mouseleave',g.removeClass.curry(l,n))];};k.prototype.disable=function(){this._subscriptions.forEach(function(l){l.remove();});this._subscriptions=null;};j(k.prototype,{_subscriptions:null});e.exports=k;});
__d("LegacyContextualDialog",["Arbiter","ArbiterMixin","ARIA","Bootloader","ContextualDialogFooterLink","ContextualThing","CSS","DataStore","DOM","Event","Locale","Overlay","Parent","Style","Vector","$","copyProperties","getOverlayZIndex","shield"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('ArbiterMixin'),i=b('ARIA'),j=b('Bootloader'),k=b('ContextualDialogFooterLink'),l=b('ContextualThing'),m=b('CSS'),n=b('DataStore'),o=b('DOM'),p=b('Event'),q=b('Locale'),r=b('Overlay'),s=b('Parent'),t=b('Style'),u=b('Vector'),v=b('$'),w=b('copyProperties'),x=b('getOverlayZIndex'),y=b('shield');for(var z in r)if(r.hasOwnProperty(z)&&z!=="_metaprototype")ba[z]=r[z];var aa=r===null?null:r.prototype;ba.prototype=Object.create(aa);ba.prototype.constructor=ba;ba.__superConstructor__=r;function ba(){if(r!==null)r.apply(this,arguments);}ba.prototype._configure=function(ca,da){aa._configure.call(this,ca,da);var ea=this.getRoot(),fa=n.get.curry(ea);this.setAlignH(fa('alignh','left'));this.setOffsetX(fa('offsetx',0));this.setOffsetY(fa('offsety',0));this.setPosition(fa('position','above'));this._hasFooter=fa('hasfooter',false);if(this._hasFooter){var ga=o.scry(ea,'.uiContextualDialogFooterLink')[0];ga&&this.enableBehavior(k);}this._setContextSubscription=this.subscribe('beforeshow',function(){this.unsubscribe(this._setContextSubscription);this._setContextSubscription=null;var ia=fa('context');if(ia){this.setContext(v(ia));}else{ia=fa('contextselector');if(ia)this.setContext(o.find(document,ia));}}.bind(this));this._content=o.scry(ea,'.uiContextualDialogContent')[0];if(this._content){this._content.setAttribute('role','dialog');var ha=o.scry(this._content,'.legacyContextualDialogTitle')[0];if(ha)this._content.setAttribute('aria-labelledby',o.getID(ha));}this._showSubscription=this.subscribe('show',function(){var ia=y(this.updatePosition,this);this._resizeListener=p.listen(window,'resize',ia);this._reflowSubscription=g.subscribe('reflow',ia);this._setupScrollListener(this._scrollParent);l.register(ea,this.context);g.inform('layer_shown',{type:'ContextualDialog'});}.bind(this));this._hideSubscription=this.subscribe('hide',function(){this._teardownResizeAndReflowListeners();this._teardownScrollListener();g.inform('layer_hidden',{type:'ContextualDialog'});}.bind(this));return this;};ba.prototype._buildWrapper=function(ca,da){var ea=aa._buildWrapper.call(this,ca,da);if(!this._shouldBuildWrapper)return ea;m.addClass(ea,'uiContextualDialog');return o.create('div',{className:'uiContextualDialogPositioner'},ea);};ba.prototype.setWidth=function(ca){this._width=Math.floor(ca);return this;};ba.prototype.setFixed=function(ca){ca=!!ca;m.conditionClass(this.getRoot(),'uiContextualDialogFixed',ca);this._fixed=ca;return this;};ba.prototype.setAlignH=function(ca){this.alignH=ca;this._updateAlignmentClass();this._shown&&this.updatePosition();this.position&&this._updateArrow();return this;};ba.prototype.getContent=function(){return this._content;};ba.prototype.getContext=function(){return this.context;};ba.prototype.setContext=function(ca){if(this._setContextSubscription){this.unsubscribe(this._setContextSubscription);this._setContextSubscription=null;}ca=v(ca);if(this.context&&this.context!=ca)n.remove(this.context,'LegacyContextualDialog');this.context=ca;i.setPopup(this.getCausalElement(),this.getRoot());var da=s.byClass(ca,'fbPhotoSnowlift');this.setInsertParent(da||document.body);if(this._scrollListener&&this._scrollParent!==da){this._teardownScrollListener();this._setupScrollListener(da);}this._scrollParent=da;var ea=x(ca,this._insertParent);t.set(this.getRoot(),'z-index',ea>200?ea:'');n.set(this.context,'LegacyContextualDialog',this);return this;};ba.prototype.getCausalElement=function(){return aa.getCausalElement.call(this)||this.context;};ba.prototype.listen=function(ca,da){return p.listen(this.getRoot(),ca,da);};ba.prototype.setOffsetX=function(ca){this.offsetX=parseInt(ca,10)||0;this._shown&&this.updatePosition();return this;};ba.prototype.setOffsetY=function(ca){this.offsetY=parseInt(ca,10)||0;this._shown&&this.updatePosition();return this;};ba.prototype.setPosition=function(ca){this.position=ca;for(var da in ba.POSITION_TO_CLASS)m.conditionClass(this.getRoot(),ba.POSITION_TO_CLASS[da],ca==da);this._updateAlignmentClass();this._shown&&this.updatePosition();this._updateArrow();return this;};ba.prototype.updatePosition=function(){if(!this.context)return false;if(this._width)t.set(this._overlay,'width',this._width+'px');var ca=this._fixed?'viewport':'document',da=u.getElementPosition(this.context,ca),ea=this._scrollParent;if(ea)da=da.sub(u.getElementPosition(ea,'document')).add(ea.scrollLeft,ea.scrollTop);var fa=u.getElementDimensions(this.context),ga=this.position=='above'||this.position=='below',ha=q.isRTL();if((this.position=='right'||(ga&&this.alignH=='right'))!=ha)da=da.add(fa.x,0);if(this.position=='below')da=da.add(0,fa.y);var ia=new u(0,0);if(ga&&this.alignH=='center'){ia=ia.add((fa.x-this._width)/2,0);}else{var ja=ga?fa.x:fa.y,ka=2*ba.ARROW_INSET;if(ja<ka){var la=ja/2-ba.ARROW_INSET;if(ga&&(this.alignH=='right'!=ha))la=-la;ia=ia.add(ga?la:0,ga?0:la);}}ia=ia.add(this.offsetX,this.offsetY);if(ha)ia=ia.mul(-1,1);da=da.add(ia);if(this._fixed)da=new u(da.x,da.y,'document');da.setElementPosition(this.getRoot());this._adjustVerticalPosition();this._adjustHorizontalPosition();return true;};ba.prototype.scrollTo=function(){if(this.context)j.loadModules(['DOMScroll'],function(ca){ca.scrollTo(this.context,true,true);}.bind(this));};ba.prototype.destroy=function(){this.unsubscribe(this._showSubscription);this.unsubscribe(this._hideSubscription);if(this._setContextSubscription){this.unsubscribe(this._setContextSubscription);this._setContextSubscription=null;}this._teardownScrollListener();this._teardownResizeAndReflowListeners();this.context&&n.remove(this.context,'LegacyContextualDialog');aa.destroy.call(this);};ba.prototype._adjustVerticalPosition=function(){if(this.position!='left'&&this.position!='right'){t.set(this._overlay,'top','');return;}var ca=this.getRoot(),da=u.getElementPosition(ca,'viewport').y,ea=u.getElementDimensions(this._overlay).y,fa=u.getViewportDimensions().y,ga=Math.min(Math.max(da,ba.MIN_TOP_GAP),ba.TOP_MARGIN),ha=Math.min(Math.max(0,da+ea+ba.BOTTOM_MARGIN-fa),Math.max(-ga,da-ga),ea-2*ba.ARROW_INSET);t.set(this._overlay,'top',(-1*ha)+'px');t.set(this._arrow,'top',ba.ARROW_OFFSET+'px');t.set(this._arrow,'marginTop',ha+'px');};ba.prototype._adjustHorizontalPosition=function(){if((this.position!='above'&&this.position!='below')||this.alignH!='left'){t.set(this._overlay,'left','');t.set(this._overlay,'right','');return;}var ca=this.getRoot(),da=u.getElementPosition(ca,'viewport').x,ea=u.getElementDimensions(this._overlay).x,fa=u.getViewportDimensions().x,ga=q.isRTL(),ha;if(!ga){ha=da+ea+ba.RIGHT_MARGIN-fa;}else ha=ba.LEFT_MARGIN+ea-da;ha=Math.min(Math.max(0,ha),ea-2*ba.ARROW_INSET);t.set(this._overlay,ga?'right':'left',-1*ha+'px');t.set(this._arrow,ga?'right':'left',ba.ARROW_OFFSET+'px');t.set(this._arrow,ga?'marginRight':'marginLeft',ha+'px');};ba.prototype._updateArrow=function(){var ca=0;if(this.position=='above'||this.position=='below')switch(this.alignH){case 'center':ca=50;break;case 'right':ca=100;break;}this._renderArrow(ba.POSITION_TO_ARROW[this.position],ca);};ba.prototype._renderArrow=function(ca,da){for(var ea in ba.ARROW_CLASS)m.conditionClass(this._overlay,ba.ARROW_CLASS[ea],ca==ea);m.conditionClass(this._overlay,'uiContextualDialogWithFooterArrowBottom',ca=='bottom'&&this._hasFooter);if(ca=='none')return;if(!this._arrow){this._arrow=o.create('i',{className:'uiContextualDialogArrow'});o.appendContent(this._overlay,this._arrow);}t.set(this._arrow,'top','');t.set(this._arrow,'left','');t.set(this._arrow,'right','');t.set(this._arrow,'margin','');var fa=ca=='top'||ca=='bottom',ga=fa?(q.isRTL()?'right':'left'):'top';da=da||0;t.set(this._arrow,ga,da+'%');var ha=ba.ARROW_LENGTH+ba.ARROW_OFFSET*2,ia=-(ha*da/100-ba.ARROW_OFFSET);t.set(this._arrow,'margin-'+ga,ia+'px');};ba.prototype._updateAlignmentClass=function(){m.conditionClass(this.getRoot(),ba.RIGHT_ALIGNED_CLASS,(this.position=='above'||this.position=='below')&&this.alignH=='right');};ba.prototype._setupScrollListener=function(ca){this._scrollListener=p.listen(ca||window,'scroll',y(this._adjustVerticalPosition,this));};ba.prototype._teardownScrollListener=function(){if(this._scrollListener){this._scrollListener.remove();this._scrollListener=null;}};ba.prototype._teardownResizeAndReflowListeners=function(){if(this._resizeListener){this._resizeListener.remove();this._resizeListener=null;}if(this._reflowSubscription){this._reflowSubscription.unsubscribe();this._reflowSubscription=null;}};ba.getInstance=function(ca){var da=n.get(ca,'LegacyContextualDialog');if(!da){var ea=s.byClass(ca,'uiOverlay');if(ea)da=n.get(ea,'overlay');}return da;};w(ba,h,{ARROW_OFFSET:15,ARROW_LENGTH:16,ARROW_INSET:22,TOP_MARGIN:50,BOTTOM_MARGIN:30,LEFT_MARGIN:15,RIGHT_MARGIN:30,MIN_TOP_GAP:5,POSITION_TO_CLASS:{above:'uiContextualDialogAbove',below:'uiContextualDialogBelow',left:'uiContextualDialogLeft',right:'uiContextualDialogRight'},RIGHT_ALIGNED_CLASS:'uiContextualDialogRightAligned',ARROW_CLASS:{bottom:'uiContextualDialogArrowBottom',top:'uiContextualDialogArrowTop',right:'uiContextualDialogArrowRight',left:'uiContextualDialogArrowLeft'},POSITION_TO_ARROW:{above:'bottom',below:'top',left:'right',right:'left'}});w(ba.prototype,{_scrollListener:null,_scrollParent:null,_width:null,_fixed:false,_hasFooter:false,_showSubscription:null,_hideSubscription:null,_setContextSubscription:null,_resizeListener:null,_reflowSubscription:null});e.exports=ba;});