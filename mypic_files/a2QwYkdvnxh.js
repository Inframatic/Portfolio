/*1375178934,173214305*/

if (self.CavalryLogger) { CavalryLogger.start_js(["wDP9y"]); }

__d("FileUploadTarget",["AsyncUploadRequest","DragDropFileUpload","DragDropTarget","copyProperties","emptyFunction"],function(a,b,c,d,e,f){var g=b('AsyncUploadRequest'),h=b('DragDropFileUpload'),i=b('DragDropTarget'),j=b('copyProperties'),k=b('emptyFunction');function l(m,n){var o=(function(p){var q=new g(n).setFiles({file:p}).setRelativeTo(m).setStatusElement(m);q.subscribe('complete',function(r,s){this.onCompleteCallback(s);}.bind(this));q.send();}).bind(this);this.dragDropTarget=new i(m).setOnFilesDropCallback(function(p){p.length&&this.asyncProcess(p,function(q){q.length&&o(q);});}.bind(this));this.asyncProcess=function(p,q){q(p);};this.preprocess=function(p){return p;};this.onCompleteCallback=k;}j(l.prototype,{setPreprocessor:function(m){this.preprocess=m;return this;},setAsyncProcessor:function(m){this.asyncProcess=m;return this;},onComplete:function(m){this.onCompleteCallback=m;return this;},activate:function(){if(!h.isSupported())return;this.dragDropTarget.setFileFilter(this.preprocess).enable();}});e.exports=l;});
__d("SinglePictureUploadTarget",["Bootloader","Dialog","ErrorDialog","FileUploadTarget","copyProperties","emptyFunction","htmlSpecialChars","tx"],function(a,b,c,d,e,f){var g=b('Bootloader'),h=b('Dialog'),i=b('ErrorDialog'),j=b('FileUploadTarget'),k=b('copyProperties'),l=b('emptyFunction'),m=b('htmlSpecialChars'),n=b('tx');function o(p,q){this.fileUploadTarget=new j(p,q);this.preprocessCallback=l;this.oncompleteCallback=l;this.afterSuccessCallback=l;this.maxWidth=null;this.maxHeight=null;}k(o.prototype,{setPreprocessCallback:function(p){this.preprocessCallback=p;return this;},setOncompleteCallback:function(p){this.oncompleteCallback=p;return this;},setAfterSuccessCallback:function(p){this.afterSuccessCallback=p;return this;},setMaximumDimensions:function(p,q){this.maxWidth=p;this.maxHeight=q;return this;},activate:function(){var p=function(t){return m(t.name);},q=(function(t){if(t.length>1){i.show("Upload Error",n._("You can only select {max-photos} photos to upload to this album.  Only the first {max-photos} photo you selected will be uploaded.",{'max-photos':1}));t=[t[0]];}var u=t[0];if(!u.type.match(/^image\//)){i.show("Upload Error",n._("We could not understand the contents of {filename}.  Make sure it is a jpg, gif, or png formatted image.",{filename:p(u)}));return [];}this.preprocessCallback(t);return t;}).bind(this),r=(function(t,u){var v=1024*1024*16,w=1024*1024*1,x=function(z){if(z.size>v){i.show("Upload Error",n._("{filename} is too large. Please resize your photo to under\n                     8000x8000 pixels and try again.",{filename:p(t[0])}));u([]);}else u([z]);},y=t[0];if((y.size<w)||(!this.maxWidth&&!this.maxHeight)){x(y);}else g.loadModules(['ImageExif','ImageResizer'],function(z,aa){if(!aa.isSupported()){x(y);return;}var ba=new aa(y,this.maxWidth,this.maxHeight);ba.subscribe('resized',function(ca,da){if(da.size>y.size){x(y);}else x(da);}.bind(this));ba.subscribe('error',function(){x(y);}.bind(this));z.readFromFile(y,function(ca){ca&&ba.setOrientation(ca.Orientation);ba.resize();});});}).bind(this),s=(function(t){var u=t[0];this.oncompleteCallback(u);var v=u.getResponse().getPayload();if(u.isSuccess()){this.afterSuccessCallback(v);}else if(v&&v.__dialog){var w=new h();w._setFromModel(v.__dialog);w.setButtons(h.OK).show();}else i.show(v.error.title,v.error.body);}).bind(this);return this.fileUploadTarget.onComplete(s).setPreprocessor(q).setAsyncProcessor(r).activate();}});e.exports=o;});
__d("ProfilePOPAlbumEducationDialog",["Event","AsyncRequest"],function(a,b,c,d,e,f){var g=b('Event'),h=b('AsyncRequest'),i={listen:function(j,k){g.listen(j,'click',function(){k.show();new h().setURI('/ajax/profile/picture/record_seen_nux/').send();});}};e.exports=i;});
__d("TimelineProfilePic",["Arbiter","CSS","Dialog","DOM","HTML","Run","$","copyProperties","ge"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('Dialog'),j=b('DOM'),k=b('HTML'),l=b('Run'),m=b('$'),n=b('copyProperties'),o=b('ge');function p(q,r,s,t){p.destroyInstance();p._instance=this;this.leavingMessage=r;this.elemID=s||'fbProfileCover';this.elemClass=t||'.profilePicThumb';this._arbiterTokens=[g.subscribe(q.LOADING,this.startLoading.bind(this)),g.subscribe(q.SUCCESS,this.onUploadSuccess.bind(this))];l.onBeforeUnload(this.onBeforeUnload.bind(this));l.onLeave(this.destroy.bind(this));}p.prototype._setLoadingIndicator=function(q){this._loading=q;h.conditionClass(m(this.elemID),'profilePicLoading',q);};p.prototype.destroy=function(){this._arbiterTokens.forEach(function(q){q.unsubscribe();});this._arbiterTokens=[];p._instance=null;};p.prototype.startLoading=function(q,r){this._setLoadingIndicator(r.isLoading);};p.prototype.onUploadSuccess=function(q,r){this._setLoadingIndicator(false);var s=i.getCurrent();if(s)s.hide();var t=r.newPic;j.replace(j.find(m(this.elemID),this.elemClass),typeof t==='string'?k(t):t);if(typeof(r.profileId)!==undefined&&typeof(r.headerPicURL)!==undefined){var u=o('profile_pic_header_'+r.profileId);if(u)u.src=r.headerPicURL;}if(o('fbProfilePicSelector'))h.removeClass(m('fbProfilePicSelector'),'fbTimelineNullProfilePicSelector');};p.prototype.onBeforeUnload=function(){if(p._instance===this&&this._loading)return this.leavingMessage;};p.destroyInstance=function(){this._instance&&this._instance.destroy();};n(p,{_instance:null});e.exports=p;});
__d("timeline-cover-dragdrop-edit",["SinglePictureUploadTarget","TimelineCover"],function(a,b,c,d,e,f){var g=b('SinglePictureUploadTarget'),h=b('TimelineCover'),i=function(){var m=h.getInstance();m.hideLoadingIndicator();},j=function(m){var n=h.getInstance(),o=m.id,p=m.photo_html;n.updateCoverImage(o,p);},k=function(m){h.getInstance().showLoadingIndicator();},l=function(m,n,o,p){new g(m,n).setMaximumDimensions(o,p).setPreprocessCallback(k).setOncompleteCallback(i).setAfterSuccessCallback(j).activate();};f.initialize_timeline_cover_drop_target=l;});
__d("profile-pic-dragdrop-edit",["Arbiter","SinglePictureUploadTarget","TimelineProfilePic"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('SinglePictureUploadTarget'),i=b('TimelineProfilePic');f.initialize_profile_pic_drop_target=function(j,k,l,m){new i(l,m);new h(j,k).setPreprocessCallback(function(n){g.inform(l.LOADING,{isLoading:1},g.BEHAVIOR_STATE);}).setOncompleteCallback(function(){g.inform(l.LOADING,{isLoading:0},g.BEHAVIOR_STATE);}).setAfterSuccessCallback(function(n){g.inform(l.SUCCESS,{newPic:n.photo_html},g.BEHAVIOR_STATE);}).activate();};});
__d("OnlyMeUI",["AudienceSelectorTags","Arbiter","CSS","DOM","Parent","PrivacyConst","SelectorDeprecated","$","tx"],function(a,b,c,d,e,f){var g=b('AudienceSelectorTags'),h=b('Arbiter'),i=b('CSS'),j=b('DOM'),k=b('Parent'),l=b('PrivacyConst'),m=b('SelectorDeprecated'),n=b('$'),o=b('tx');function p(){return [j.create('div',{className:'onlyMeBorder'}),j.create('div',{className:'onlyMeBorder onlyMeBorderBottom'})];}function q(){return j.create('img',{alt:' ',className:'onlyMePrivacyCorner',height:34,src:'/images/profile/timeline/privacy_corner.png',width:34});}function r(x){var y=j.scry(x,'.photoUnit a.photo');return y.filter(function(z){return !j.scry(z,'.onlyMePrivacyCorner').length;});}function s(x,y){if(g.hasTags(u(y)))return;if(i.hasClass(x,'storyContent'))if(!k.byClass(x,'onlyMeWrap')){var z=j.create('div',{className:'onlyMeWrap'});j.appendContent(k.byClass(x,'uiStreamStory'),z);j.appendContent(z,x);x=z;}else x=k.byClass(x,'onlyMeWrap');i.addClass(x,'storyOnlyMe');if(!i.hasClass(x,'timelineRecentActivityStory'))j.setContent(j.find(y,'span.uiButtonText'),"Only Me");if(!i.hasClass(x,'storyContent')){var aa=r(x);for(var ba=0,ca=aa.length;ba<ca;++ba)j.appendContent(aa[ba],q());}if(!j.scry(x,'div.onlyMeBorder').length){var da=p();j.prependContent(x,da[0]);j.appendContent(x,da[1]);}}function t(x){if(!x)return;var y=k.byClass(x,'storyContent')||k.byClass(x,'timelineRecentActivityStory')||k.byClass(x,'timelineUnitContainer')||k.byClass(x,'fbTimelineTwoColumn');if(!y){y=j.scry(x,'^.permalink_stream .storyContent');y=y.length&&y[0];}else if(i.hasClass(y,'fbTimelineComposerUnit'))return null;return y;}function u(x){var y=j.scry(x,'*[data-oid]');if(y.length===0)return '';return y[0].getAttribute('data-oid');}var v=false,w={init:function(){if(v)return;v=true;h.subscribe('AudienceSelector/changed',function(x,y){if(y.selector&&i.hasClass(y.selector,'blacklistOnlyMeUI'))return;var z=t(y.selector)||t(y.clone);if(!z)return;if(m.getOptionValue(y.option)==l.BaseValue.SELF){s(z,y.selector);}else{z=i.hasClass(z,'storyContent')?k.byClass(z,'onlyMeWrap'):z;z&&i.removeClass(z,'storyOnlyMe');}});},setOnlyMe:function(x){if(v)return;w.init();x=j.find(k.byClass(n(x),'uiSelector'),'a.uiSelectorButton');var y=t(x);y&&s(y,x);}};e.exports=w;});
__d("CountButtonCountDEPRECATED",["ArbiterMixin","DOM","mixin"],function(a,b,c,d,e,f){var g=b('ArbiterMixin'),h=b('DOM'),i=b('mixin'),j=i(g);for(var k in j)if(j.hasOwnProperty(k)&&k!=="_metaprototype")m[k]=j[k];var l=j===null?null:j.prototype;m.prototype=Object.create(l);m.prototype.constructor=m;m.__superConstructor__=j;function m(n,o,p){this._root=n;this._count=o;this._max=p;}m.prototype.getCount=function(){return this._count;};m.prototype.setCount=function(n){this._count=n;var o=this.getDisplayedValue();h.setContent(this._root,o);this.inform('change',{value:this._count,max:this._max,display:o});return this;};m.prototype.addCount=function(n){this.setCount(this.getCount()+n);return this;};m.prototype.getDisplayedValue=function(n){var o=(this._count>this._max)?'+':'';return Math.max(0,Math.min(this._count,this._max))+o;};e.exports=m;});
__d("CountButtonDEPRECATED",["CSS","cx"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('cx'),i={huge:"_4q9",large:"_9x",small:"_9w",hidden:"_9v"};function j(k,l){this._root=k;this._counter=l;this._initEvents();}j.prototype._initEvents=function(){this._counter.subscribe('change',this._counterChange.bind(this));};j.prototype._counterChange=function(k,l){g.removeClass(this._root,i.huge);g.removeClass(this._root,i.large);g.removeClass(this._root,i.small);g.removeClass(this._root,i.hidden);var m=l.count>l.max;if(m&&l.max>9){g.addClass(this._root,i.huge);}else if(l.value>9||(m&&l.max>0)){g.addClass(this._root,i.large);}else if(l.value>0){g.addClass(this._root,i.small);}else g.addClass(this._root,i.hidden);};j.prototype.getCounter=function(){return this._counter;};e.exports=j;});