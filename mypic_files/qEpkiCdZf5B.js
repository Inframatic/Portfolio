/*!CK:1366341965!*//*1375666359,178129727*/

if (self.CavalryLogger) { CavalryLogger.start_js(["xfhln"]); }

__d("ComposerXEmptyAttachment",["Class","ComposerXAttachment","copyProperties"],function(a,b,c,d,e,f){var g=b('Class'),h=b('ComposerXAttachment'),i=b('copyProperties');function j(k,l){this.parent.construct(this);this._root=k;if(l)this.attachmentClassName=l;}g.extend(j,h);i(j.prototype,{getRoot:function(){return this._root;}});e.exports=j;});
__d("ComposerXDatepickerIconReset",["CSS","cx"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('cx');function i(j){g.removeClass(j.element,"_4_na");g.removeClass(j.element,"_509o");}e.exports=i;});
__d("TimelineCommentsLoader",["Event","CommentPrelude","CSS","DOM","Parent","emptyFunction"],function(a,b,c,d,e,f){var g=b('Event'),h=b('CommentPrelude'),i=b('CSS'),j=b('DOM'),k=b('Parent'),l=b('emptyFunction'),m={init:function(){m.init=l;g.listen(document.body,'click',function(n){var o=k.byClass(n.getTarget(),'fbTimelineFeedbackCommentLoader');if(o){n.kill();h.click(o,false);var p=k.byTag(o,'form'),q=j.scry(p,'li.uiUfiViewAll input');if(!q.length)q=j.scry(p,'li.fbUfiViewPrevious input');if(!q.length)q=j.scry(p,'a.UFIPagerLink');q[0].click();i.show(j.find(p,'li.uiUfiComments'));i.removeClass(o,'fbTimelineFeedbackCommentLoader');}});}};e.exports=m;});
__d("TimelineCapsule",["Arbiter","CSS","DataStore","DOM","DOMQuery","DOMScroll","Parent","TimelineConstants","TimelineLegacySections","UserAgent","Vector","$","createArrayFrom","csx","isEmpty","queryThenMutateDOM","requestAnimationFrame"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DataStore'),j=b('DOM'),k=b('DOMQuery'),l=b('DOMScroll'),m=b('Parent'),n=b('TimelineConstants'),o=b('TimelineLegacySections'),p=b('UserAgent'),q=b('Vector'),r=b('$'),s=b('createArrayFrom'),t=b('csx'),u=b('isEmpty'),v=b('queryThenMutateDOM'),w=b('requestAnimationFrame'),x=(function(){var y=45,z=15,aa='use',ba='update',ca={},da={};function ea(ra){return h.hasClass(ra,'fbTimelineBalancer');}function fa(ra){return ra.getAttribute('data-spine');}function ga(ra){return h.hasClass(ra,'placeholderUnit');}function ha(ra,sa){if(sa)return (i.get(n.DS_SIDEORG,ra.id)||ra.getAttribute('data-side'));return ra.getAttribute('data-side');}var ia=function(ra,sa){if(p.ie()<=6){ia=function(ta,ua){i.set(n.DS_SIDEORG,ta.id,ha(ta,true));ta.setAttribute('data-side',ua);h.removeClass(ta,'leftColumn');h.removeClass(ta,'rightColumn');h.addClass(ta,ua=='l'?'leftColumn':'rightColumn');};}else ia=function(ta,ua){i.set(n.DS_SIDEORG,ta.id,ha(ta,true));ta.setAttribute('data-side',ua);};ia(ra,sa);};function ja(ra){return ra.getAttribute('data-size');}function ka(ra){if(h.hasClass(ra,'fbTimelineOneColumn')&&ra.prevSibling&&h.hasClass(ra.prevSibling,'fbTimelineOneColumn'))return z*2;if(h.hasClass(ra,'fbTimelineIndeterminateContent'))return 0;return z;}function la(ra,sa){var ta=0;if(h.shown(ra)&&!h.hasClass(ra,'placeholderUnit'))if(sa===aa){ta=i.get(n.DS_HEIGHT,ra.id,null);if(ta===null)ta=ra.getAttribute('data-calculatedheight');}else ta=ra.offsetHeight+ka(ra);if(sa===aa&&ta===null)ta=300;i.set(n.DS_HEIGHT,ra.id,parseInt(ta,10));}function ma(ra){var sa=i.get(n.DS_HEIGHT,ra.id,null);return sa;}function na(ra,sa){if(ja(sa)=='2'){return 0;}else if(ha(sa)=='r'){return ra+ma(sa);}else return ra-ma(sa);}function oa(ra){k.scry(ra,"._3ram").forEach(function(sa){var ta=sa.getAttribute('data-endmarker'),ua=sa.getAttribute('data-pageindex'),va=function(){if(!sa.parentNode)return;i.set(n.DS_LOADED,ra.id,ua);j.remove(sa);g.inform(n.SECTION_FULLY_LOADED,{scrubberKey:ta,pageIndex:ua,capsuleID:ra.id,childCount:ra.childNodes.length});};if(o.get(ta)){va();}else var wa=g.subscribe(n.SECTION_REGISTERED,function(xa,ya){if(ya.scrubberKey===ta){va();wa.unsubscribe();}});});g.inform('TimelineCapsule/balanced',{capsule:ra});}function pa(ra){if(u(ca[ra.id]))return;var sa=ea(ra)?ra.firstChild:ra,ta=sa.childNodes.length,ua={},va={},wa,xa=z,ya=z,za,ab=[];for(var bb=0;bb<ta;bb++){wa=sa.childNodes[bb];if(h.hasClass(wa,'fbTimelineUnit')){za=k.scry(wa,'div.timelineUnitContainer')[0];if(za)va[wa.id]=za.getAttribute('data-time');if(!ga(wa)&&h.shown(wa)){if(ja(wa)=='2'){ua[wa.id]=Math.max(xa,ya);xa=ya=ua[wa.id]+ma(wa);}else if(ha(wa)=='r'){ua[wa.id]=ya;ya+=ma(wa);}else{ua[wa.id]=xa;xa+=ma(wa);}if(ha(wa,true)=='l'||ja(wa)=='2')ab.push(wa.id);}}}for(bb=0;bb<ab.length-1;++bb){var cb=ab[bb],db=ab[bb+1],eb=ua[cb]+y,fb=ua[db];for(var gb in ca[ra.id]){if(eb>fb)break;var hb=ca[ra.id][gb];if(h.shown(hb))continue;if(va[gb]<=va[cb]&&va[gb]>va[db]){hb.style.top=eb+"px";eb+=y;h.show(hb);}}}}function qa(ra,sa){var ta=m.byAttribute(ra,'data-size');if(ta){if(h.hasClass(ra.parentNode,'timelineReportContent')){sa(ra);}else sa(ta);x.balanceCapsule(m.byClass(ta,'fbTimelineCapsule'));}}return {removeUnit:function(ra){qa(ra,function(sa){j.remove(sa);});},hideUnit:function(ra){qa(ra,function(sa){h.addClass(sa,'fbTimelineColumnHidden');});},undoHideUnit:function(ra,sa){j.remove(m.byClass(sa,'hiddenText'));qa(ra,function(ta){h.removeClass(ta,'fbTimelineColumnHidden');});},unplacehold:function(ra){var sa=r(ra);sa.style.top=null;h.removeClass(sa,'visiblePlaceholder');h.removeClass(sa,'placeholder');var ta=m.byClass(sa,'fbTimelineCapsule');delete ca[ta.id][ra];x.balanceCapsule(ta);},scrollToCapsule:function(ra){if(!da.hasOwnProperty(ra.id)){var sa=q.getElementPosition(ra.parentNode);l.scrollTo(new q(q.getScrollPosition().x,sa.y-n.SUBSECTION_SCROLL_TO_OFFSET,'document'));da[ra.id]=true;}},balanceCapsuleFromChild:function(ra,sa){x.balanceCapsule(m.byClass(ra,'fbTimelineCapsule'),sa);},balanceCapsuleDeferred:function(ra,sa){x.balanceCapsule.curry(ra,sa).defer();},balanceCapsule:function(ra,sa){if(!ra||!ra.childNodes)return;var ta=0,ua,va=document.createDocumentFragment(),wa=[],xa=[],ya=[],za=false,ab=sa&&sa.heights_action;if(sa&&sa.tail_balance)i.set(n.DS_TAILBALANCE,ra.id,sa.tail_balance);if(ab!==ba&&(p.chrome()||p.webkit()))h.toggleClass(ra,'webkitFix');for(var bb=0;bb<ra.childNodes.length;bb++){ua=ra.childNodes[bb];if(fa(ua)){continue;}else if(ea(ua)){s(ua.firstChild.childNodes).forEach(function(jb){la(jb,ab);});continue;}la(ua,ab);if(ha(ua,true)=='r'){xa.push(ua);}else wa.push(ua);ya.push(ua);if(ja(ua)!='2')if((ta>0&&ha(ua)=='r')||(ta<0&&ha(ua)=='l'))za=true;ta=na(ta,ua);}var cb=[],db=[],eb=[];k.scry(ra,'li.fbTimelineBalancer').forEach(function(jb){var kb=s(jb.firstChild.childNodes);if(jb.getAttribute('data-nonunits')){eb=eb.concat(kb);}else if(ha(jb)=='left'){cb=cb.concat(kb);}else if(ha(jb)=='right')db=db.concat(kb);});if(za){ra.style.minHeight=ra.offsetHeight;wa.forEach(function(jb){if(ja(jb)!='2')ia(jb,'l');});xa.forEach(function(jb){if(ja(jb)!='2')ia(jb,'r');});var fb=j.create('li',{className:'fbTimelineBalancer'},j.create('ol',null,wa));fb.setAttribute('data-side','left');j.prependContent(ra,fb);cb=wa.concat(cb);var gb=j.create('li',{className:'fbTimelineBalancer'},j.create('ol',null,xa));gb.setAttribute('data-side','right');j.prependContent(ra,gb);db=xa.concat(db);ta=0;}while(eb.length)va.appendChild(eb.shift());while((ta>=0&&cb.length)||(ta<0&&db.length)){if(ta>=0){ua=cb.shift();}else ua=db.shift();va.appendChild(ua);ta=na(ta,ua);}ra.appendChild(va);k.scry(ra,'li.fbTimelineBalancer').forEach(function(jb){if(!jb.firstChild.childNodes.length)j.remove(jb);});var hb=(sa&&sa.tail_balance)||i.get(n.DS_TAILBALANCE,ra.id);if(hb)ta=x.tailBalance(ra,ta,hb);if(za){ya.forEach(function(jb){if(jb.parentNode!==ra){ra.appendChild(jb);ta=na(ta,jb);}});ra.style.minHeight=null;}var ib=m.byClass(ra,'fbTimelineSection');if(ib)i.set(n.DS_COLUMN_HEIGHT_DIFFERENTIAL,ib.id,ta);ca[ra.id]={};k.scry(ra,'li.placeholderUnit').forEach(function(jb){ca[ra.id][jb.id]=jb;});pa(ra);oa(ra);if(ab===aa){sa.heights_action=ba;w(function(){w(x.balanceCapsule.curry(ra,sa));});}},tailBalance:function(ra,sa,ta){if(!ra)return sa;var ua=[],va=[],wa=[],xa=[];k.scry(ra,'li.fbTimelineBalancer').forEach(function(za){var ab=s(za.firstChild.childNodes);if(za.getAttribute('data-nonunits')){xa=xa.concat(ab);}else if(ha(za)=='left'){va=va.concat(ab);}else if(ha(za)=='right')wa=wa.concat(ab);ua=ua.concat(ab);});if((ta==n.FIXED_SIDE_RIGHT&&va.length)||(ta==n.FIXED_SIDE_LEFT&&wa.length))return sa;var ya=document.createDocumentFragment();if(ua)while(ua.length){if(ta!=n.FIXED_SIDE_NONE)if(ja(ua[0])!='2')if(sa>=0){ia(ua[0],'l');}else ia(ua[0],'r');sa=na(sa,ua[0]);ya.appendChild(ua.shift());}ra.appendChild(ya);k.scry(ra,'li.fbTimelineBalancer').forEach(function(za){if(!za.firstChild.childNodes.length)j.remove(za);});return sa;},loadTwoColumnUnits:function(ra){var sa=r(ra);v(function(){var ta=m.byClass(sa,'fbTimelineSection');if(ta){var ua=k.find(sa,"._3rbf"),va=k.find(sa,"._3rbh"),wa=va.offsetHeight-ua.offsetHeight;i.set(n.DS_COLUMN_HEIGHT_DIFFERENTIAL,ta.id,wa);}},oa.curry(sa));}};})();e.exports=a.TimelineCapsule||x;});
__d("TimelineCapsuleUtilities",["CSS"],function(a,b,c,d,e,f){var g=b('CSS'),h={setFirstUnit:function(i){var j=true;for(var k=0;k<i.childNodes.length;++k){var l=i.childNodes[k];if(l.id.indexOf('tl_unit_')===0)if(j){j=false;g.addClass(l,'firstUnit');}else{g.removeClass(l,'firstUnit');break;}}}};e.exports=h;});
__d("TimelineUnitSelector",["DOMQuery","Parent"],function(a,b,c,d,e,f){var g=b('DOMQuery'),h=b('Parent'),i={getUnitsWithTime:function(j){return g.scry(j,'div.timelineUnitContainer').filter(function(k){return (h.byClass(k,'fbTimelineCapsule')===j&&k.getAttribute('data-time'));});}};e.exports=i;});
__d("TimelineComposerUtilities",["Event","Arbiter","Bootloader","CSS","DOM","DOMQuery","Parent","TimelineUnitSelector","Vector","cx","csx"],function(a,b,c,d,e,f){var g=b('Event'),h=b('Arbiter'),i=b('Bootloader'),j=b('CSS'),k=b('DOM'),l=b('DOMQuery'),m=b('Parent'),n=b('TimelineUnitSelector'),o=b('Vector'),p=b('cx'),q=b('csx'),r=86400*31,s=86400000,t={listenToSetEstimatedDate:function(u,v){return h.subscribe('ComposerXTimelineTagger/init',function(w,x){if(l.contains(u,x.datePickerElement)){t.setEstimatedDate(x.datePickerInstance,v());x.composerTimelineTagger.switchToTagger('date');}});},listenToSetEstimatedDateOld:function(u,v){return h.subscribe('TimelineBackdatedComposerTagger/initialized',function(event,w){if(w.composer===u)w.date_picker.subscribe('initialized',function(x,y){t.setEstimatedDate(y,v());});});},listenToPublish:function(u,v){if(u.root)u=u.root;return h.subscribe('composer/publish',function(event,w){if(w.composer_id===u.id)i.loadModules(['TimelineStoryPublisher'],function(x){x.publish(w);v&&v();});});},listenToAnotherComposerOpen:function(u,v){return h.subscribe('composer/mutate',function(w,x){if(x!==u)v();});},listenToCancel:function(u,v){return g.listen(u,'click',function(event){if(m.byClass(event.getTarget(),"_306"))v();});},listenToCancelOld:function(u,v){return g.listen(u,'click',function(event){m.byClass(event.getTarget(),'cancelBtn')&&v();});},hidePlaceIfAttachmentsTooTall:function(u){var v=l.find(u,"._2_4"),w=o.getElementDimensions(v).y;if(w>50)j.hide(l.find(v,"._mg"));},hidePlaceIfAttachmentsTooTallOld:function(u){var v=k.find(u,'ul.fbTimelineComposerAttachments'),w=o.getElementDimensions(v).y;if(w>50){var x=m.byTag(k.scry(v,'span.placeAttachment')[0],'li');x&&j.hide(x);}},setEstimatedDate:function(u,v){var w,x;if(v&&j.hasClass(v,'fbTimelineCapsule')){w=v.getAttribute('data-start');x=v.getAttribute('data-end');if(w&&x){var y=new Date(x*1000),z=new Date();if(y>z){u.setDate(z.getFullYear(),z.getMonth()+1,z.getDate());}else if(x-w>2*r){u.setDate(y.getFullYear());}else u.setDate(y.getFullYear(),y.getMonth()+1);}return;}var aa=m.byClass(v,'fbTimelineCapsule');if(aa){w=aa.getAttribute('data-start');x=aa.getAttribute('data-end');var ba=o.getElementPosition(v).y,ca=[x,null],da=[w,null],ea=n.getUnitsWithTime(aa);for(var fa=0;fa<ea.length;fa++){var ga=ea[fa],ha=k.scry(ga.parentNode,'.spinePointer')[0];if(!ha)continue;var ia=o.getElementPosition(ha).y;if(ia<=ba){if(!ca[1]||ia>ca[1])ca=[ga.getAttribute('data-time'),ia];}else if(!da[1]||ia<da[1])da=[ga.getAttribute('data-time'),ia];}if(ca[0]!==null&&da[0]!==null){var ja=Math.round((parseInt(ca[0],10)+parseInt(da[0],10))/2)*1000;ja=Math.min(new Date()-s,ja);u.setDateWithTimestamp(ja);}}},showMLEFlyout:function(u){var v=k.scry(document,'a.fbTimelineSpine').length===0,w=function(x){x.showMLEFlyout(u);};if(v){i.loadModules(['TimelineSpinelessComposer'],w);}else i.loadModules(['TimelineComposer'],w);}};e.exports=t;});
__d("TimelineComposer",["Arbiter","Bootloader","CSS","DOM","Parent","Run","TimelineCapsule","TimelineCapsuleUtilities","TimelineComposerUtilities","$","cx"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Bootloader'),i=b('CSS'),j=b('DOM'),k=b('Parent'),l=b('Run'),m=b('TimelineCapsule'),n=b('TimelineCapsuleUtilities'),o=b('TimelineComposerUtilities'),p=b('$'),q=b('cx'),r;function s(x){if(x.isScheduledPost||x.isOGPost)return;if(!x.streamStory){window.location.reload();return;}if(x.backdatedTime){h.loadModules(['TimelineStoryPublisher'],function(z){z.publish(x);});return;}var y=w.renderCapsuleBasedStory(r,x.streamStory);g.inform('TimelineComposer/on_after_publish',y,g.BEHAVIOR_PERSISTENT);}function t(){var x=k.byClass(r,'fbTimelineTwoColumn');return j.find(x,'.spinePointer');}function u(x){var y=v();i.show(y);var z=x.subscribe('hide',function(){i.hide(y);x.unsubscribe(z);});}function v(){var x=k.byClass(r,'fbTimelineTwoColumn'),y=j.scry(x,'div.composerVeil');if(y.length!==1)y=j.appendContent(x,j.create('div',{className:'composerVeil hidden_elem'}));return y[0];}var w={init:function(x){r=p(x);var y=g.subscribe('composer/publish',function(event,z){if(z.composer_id===r.id)s(z);});l.onLeave(y.unsubscribe.bind(y));if(i.hasClass(r,"_mj")){o.hidePlaceIfAttachmentsTooTall(r);}else o.hidePlaceIfAttachmentsTooTallOld(r);},showMLEFlyout:function(x){x.setContext(t()).show();u(x);},renderCapsuleBasedStory:function(x,y){var z=k.byClass(x,'fbTimelineCapsule');if(!z)return;var aa=k.byClass(x,'timelineUnitContainer').parentNode;if(aa.nextSibling.getAttribute('data-spine'))aa=aa.nextSibling;var ba=j.insertAfter(aa,y)[0];h.loadModules(['Animation'],function(ca){new ca(ba.firstChild).from('backgroundColor','#fff8dd').to('backgroundColor','#fff').duration(2000).ease(ca.ease.both).go();});n.setFirstUnit(z);m.balanceCapsule(z);return ba;}};e.exports=a.TimelineComposer||w;});
__d("TimelineContentLoader",["function-extensions","Arbiter","CSS","DOM","DOMScroll","Event","OnVisible","Parent","ScrollingPager","TimelineConstants","TimelineController","TimelineLegacySections","TimelineSmartInsert","TimelineURI","UIPagelet","UserAgent","Vector","$","arrayContains","copyProperties","createArrayFrom","csx","debounce","ge","startsWith","tx","userAction"],function(a,b,c,d,e,f){b('function-extensions');var g=b('Arbiter'),h=b('CSS'),i=b('DOM'),j=b('DOMScroll'),k=b('Event'),l=b('OnVisible'),m=b('Parent'),n=b('ScrollingPager'),o=b('TimelineConstants'),p=b('TimelineController'),q=b('TimelineLegacySections'),r=b('TimelineSmartInsert'),s=b('TimelineURI'),t=b('UIPagelet'),u=b('UserAgent'),v=b('Vector'),w=b('$'),x=b('arrayContains'),y=b('copyProperties'),z=b('createArrayFrom'),aa=b('csx'),ba=b('debounce'),ca=b('ge'),da=b('startsWith'),ea=b('tx'),fa=b('userAction'),ga=false,ha=false,ia,ja=null,ka={},la=[],ma=[],na=[],oa={},pa={},qa={},ra={},sa=null,ta=null,ua=false,va=null;function wa(gb,hb,ib,jb,kb){this.node=gb;this.loaded=jb;this.canScrollLoad=true;this.canUnload=hb!=fb.RECENT;this.scrubberKey=hb;this.historicUnitCount=kb;this._pageletLoadData=ib;this._expandPageletLoadData={};this.rightColumnFinished=false;}wa.prototype.load=function(gb,hb){if(this.loaded)return;var ib=this._pageletLoadData;g.inform(o.SECTION_LOADING,{data:ib,scrubberKey:this.scrubberKey});this.loaded=true;h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');var jb='ProfileTimelineSectionPagelet',kb=this.scrubberKey==fb.WAY_BACK;if(kb)jb='ProfileTimelineRemainingYearsPagelet';ib.time_cutoff=fb.getTimeCutoff();ib.highlight_unit_data=gb;ib.parent_key=this.parentKey;ib.force_no_friend_activity=ua;h.conditionClass(this.node,'combinedSections',ib.combine_sections);h.conditionClass(this.node,'fbTimelineSectionLoading',!ib.combine_sections);if(this.canUnload&&ha){var lb=this.node.firstChild.cloneNode(true);h.hide(lb);i.insertAfter(this.node,lb);}else this.canScrollLoad=false;var mb=null;if(hb&&!ib.combine_sections){this.node.style.minHeight=window.innerHeight+'px';mb=function(){this.node.style.minHeight='';bb(this.scrubberKey);}.bind(this);}else if(ib.combine_sections)mb=function(){bb(this.scrubberKey);fb.hideSection(this.scrubberKey);i.remove(this.node);}.bind(this);var nb=ib.combine_sections&&kb;qa[this.scrubberKey]=t.loadFromEndpoint(jb,nb?ib.unit_container_id+'_left':this.node.id,ib,{usePipe:true,jsNonblock:true,constHeight:true,append:nb,finallyHandler:mb});eb(this.scrubberKey);};wa.prototype.preload=function(){h.addClass(this.node,'fbTimelineTimePeriodSuppressed');h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');var gb=i.find(this.node,'span.sectionLabel');if(gb.getAttribute('data-original-label')){i.setContent(gb,gb.getAttribute('data-original-label'));gb.removeAttribute('data-original-label');}};wa.prototype.unload=function(){if(!this.loaded||!this.canUnload)return;this.loaded=false;qa[this.scrubberKey]&&qa[this.scrubberKey].cancel();h.addClass(this.node,'fbTimelineTimePeriodUnexpanded');h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');if(this.node.nextSibling&&h.hasClass(this.node.nextSibling,'fbTimelineSection')){i.setContent(this.node,this.node.nextSibling);h.show(this.node.firstChild);}else i.empty(this.node);this.deactivateScrollLoad();};wa.prototype.activateScrollLoad=function(){this.canScrollLoad=true;h.removeClass(this.node,'fbTimelineTimePeriodSuppressed');h.addClass(this.node,'fbTimelineTimePeriodUnexpanded');pa[this.scrubberKey]&&pa[this.scrubberKey].reset();};wa.prototype.deactivateScrollLoad=function(){if(!this.loaded){this.canScrollLoad=false;h.removeClass(this.node,'fbTimelineTimePeriodUnexpanded');h.addClass(this.node,'fbTimelineTimePeriodSuppressed');pa[this.scrubberKey]&&pa[this.scrubberKey].remove();}};wa.prototype.setExpandLoadData=function(gb){this._expandPageletLoadData=gb;return this;};wa.prototype.appendData=function(gb){y(this._pageleLoadData,gb);return this;};wa.prototype.expandSubSections=function(){if(this.subSections.length)fb.navigateToSection(this.subSections[0].scrubberKey);};wa.prototype.expand=function(gb){if(!this.loaded)return;ta.add_event('expand_'+this.scrubberKey);var hb=i.find(this.node,'.fbTimelineSectionExpander');h.addClass(hb.firstChild,'async_saving');gb&&h.addClass(gb,'async_saving');this._expandPageletLoadData.time_cutoff=fb.getTimeCutoff();fb.navigateToSection(this.scrubberKey);i.scry(this.node,'.fbTimelineCapsule').forEach(i.remove);this._expandPageletLoadData.new_expand=true;qa[this.scrubberKey]&&qa[this.scrubberKey].cancel();qa[this.scrubberKey]=t.loadFromEndpoint('ProfileTimelineSectionPagelet',hb.id,this._expandPageletLoadData,{usePipe:true,jsNonblock:true,constHeight:true});};wa.prototype.isPermalinkPeriod=function(){return this._pageletLoadData.is_permalink_period;};wa.prototype.shouldCombineSections=function(){return this._pageletLoadData.combine_sections;};function xa(){if(ga)return;p.register(p.CONTENT,fb);ta=fa('timeline').uai('init','scrubber',false);ga=true;if(u.ie()<=7)ha=true;}var ya=ba(function(gb,hb,ib){var jb=q.get(gb).historicUnitCount;hb-=jb;ib-=1;if(jb==-1||ib<=0||hb<0)return;var kb=fb.getNextSectionKey(gb);if(kb){q.get(kb).load();ya(kb,hb,ib);}},500);function za(gb,hb,ib,jb){var kb=fb.getNextSectionKey(hb);if(kb){pa[kb]=new l(gb,ab.curry(kb,gb),false,ib||1000);}else if(hb!==fb.WAY_BACK){jb=jb?jb:0;if(jb>80)return null;za.curry(gb,hb,ib,jb+1).defer(250);}}function ab(gb,hb){var ib=q.get(gb);if(ib&&ib.canScrollLoad){ta.add_event("scroll_load_"+gb);if(ha){ib.preload();}else{ib.load();if(va&&!ib.shouldCombineSections())ya(gb,va.required_units,va.max_parallelism);}hb&&i.remove(hb);}}function bb(gb){var hb=pa[gb];if(hb){hb.remove();pa[gb]=null;i.remove(hb.getElement());}}function cb(){var gb,hb,ib=false;for(var jb=0;jb<la.length;jb++){var kb=la[jb];if(!kb)continue;var lb=q.get(kb);if(lb&&(lb.canScrollLoad||lb.loaded)){if(!lb.loaded){h.removeClass(lb.node,'fbTimelineTimePeriodSuppressed');h.addClass(lb.node,'fbTimelineTimePeriodUnexpanded');}if(gb&&hb){db(gb,hb);if(ib)gb.deactivateScrollLoad();ib=true;}gb=null;hb=null;continue;}else if(gb){hb=lb;lb.deactivateScrollLoad();}else{gb=lb;if(ib)lb.activateScrollLoad();}h.removeClass(lb.node,'fbTimelineTimePeriodSuppressed');h.addClass(lb.node,'fbTimelineTimePeriodUnexpanded');}}function db(gb,hb){h.removeClass(hb.node,'fbTimelineTimePeriodUnexpanded');h.addClass(hb.node,'fbTimelineTimePeriodSuppressed');var ib=i.find(gb.node,'span.sectionLabel'),jb=i.find(hb.node,'span.sectionLabel');if(!jb.getAttribute('data-original-label'))jb.setAttribute('data-original-label',i.getText(jb));if(ib.getAttribute('data-month')&&jb.getAttribute('data-month')&&ib.getAttribute('data-year')==jb.getAttribute('data-year')){i.setContent(jb,ea._("Show {month1} - {month2} {year}",{month1:jb.getAttribute('data-month'),month2:ib.getAttribute('data-month'),year:ib.getAttribute('data-year')}));}else if(ib.getAttribute('data-year')!==jb.getAttribute('data-year')){i.setContent(jb,ea._("Show {year1} - {year2}",{year1:jb.getAttribute('data-year'),year2:ib.getAttribute('data-year')}));}else i.setContent(jb,ea._("Show {year}",{year:jb.getAttribute('data-year')}));}function eb(gb){if(ha)for(var hb=0;hb<la.length-1;hb++){var ib=la[hb];if(!ib)continue;if(ib!=gb){var jb=q.get(ib);if(jb.loaded&&jb.canUnload)jb.unload();}}cb();}var fb={WAY_BACK:'way_back',RECENT:'recent',HEADER_SCROLL_CUTOFF:80,CURRENT_SECTION_OFFSET:150,FOOTER_HEIGHT:60,registerTimePeriod:function(gb,hb,ib,jb,kb,lb,mb){xa();if(x(na,hb))return;if(ma)y(ib,ma);var nb=new wa(gb,hb,ib,jb,mb);if(!kb){la[lb]=hb;ka[hb]=true;}else{nb.parentKey=kb;q.get(kb).subSections=q.get(kb).subSections||[];q.get(kb).subSections[lb]=nb;}if(nb.shouldCombineSections())p.hideStickyHeaderNavSectionMenu();q.set(hb,nb);fb.checkCurrentSectionChange();g.inform(o.SECTION_REGISTERED,{scrubberKey:hb});},reset:function(){for(var gb in pa)pa[gb].remove();for(var hb in qa)qa[hb]&&qa[hb].cancel();for(var ib in ra){ra[ib].unsubscribe();delete ra[ib];}ia&&ia.unsubscribe();ia=null;q.removeAll();ja=null;ka={};la=[];ma=[];na=[];oa={};pa={};qa={};sa=null;ta=null;ua=false;ga=false;},checkCurrentSectionChange:function(){var gb=fb.getCurrentSection(),hb=ja&&ja.scrubberKey;if(gb&&gb.scrubberKey!==hb&&!gb.isPermalinkPeriod()){ja=gb;var ib=gb.scrubberKey,jb=gb.parentKey;if(!jb){jb=ib;ib=null;}p.sectionHasChanged(jb,ib);}},setTimeCutoff:function(gb){sa=gb;},getTimeCutoff:function(){return sa;},setParallelLoadConfig:function(gb){va=gb;},getCurrentSection:function(){var gb={},hb=q.getAll();for(var ib in hb){var jb=hb[ib];if(!jb.loaded||oa[jb.scrubberKey])continue;var kb=v.getElementPosition(jb.node,'viewport').y;if(jb.scrubberKey=='recent')kb--;if(kb<fb.CURRENT_SECTION_OFFSET)gb[kb]=jb;}var lb=Math.max.apply(null,Object.keys(gb)),mb=lb==-Infinity;if(!mb){return gb[lb];}else if(la[0])return q.get(la[0]);return null;},capsuleForCurrentSection:function(){var gb=fb.getCurrentSection();return gb&&i.scry(gb.node,'.fbTimelineCapsule')[0];},enableScrollLoad:function(gb,hb,ib,jb){gb=w(gb);var kb=m.byClass(gb,'fbTimelineSection')||gb.parentNode,lb=kb&&i.scry(kb,'.fbTimelineCapsule')[0];if(!lb)return;if(ib===null){za(gb,hb,jb);}else p.runOnceWhenSectionFullyLoaded(za.curry(gb,hb,jb),hb,ib);},enableScrollLoadOnClick:function(gb,hb,ib){gb=w(gb);k.listen(gb,'click',function(jb){jb.prevent();fb.enableScrollLoad(gb,hb,null,ib);});},expandSectionOnClick:function(gb,hb){k.listen(gb,'click',function(ib){ib.prevent();q.get(hb).expand();});},expandSubSectionsOnClick:function(gb,hb){k.listen(gb,'click',function(ib){ib.prevent();q.get(hb).expandSubSections();});},getNextSectionKey:function(gb){for(var hb=0;hb<la.length-1;hb++)if(la[hb]==gb){while(hb<la.length-1&&!la[hb+1])hb++;return la[hb+1];}var ib=q.get(gb);if(!ib||!ib.parentKey)return;var jb=q.get(ib.parentKey);if(!jb)return;for(var kb=0;kb<jb.subSections.length-1;kb++)if(jb.subSections[kb].scrubberKey==gb)return jb.subSections[kb+1].scrubberKey;},hideSection:function(gb){var hb=q.get(gb);hb&&h.hide(i.find(hb.node,'.fbTimelineSection'));var ib=p.getCurrentScrubber();if(ib){var jb=p.getCurrentScrubber().getNav(gb);jb&&h.hide(jb);}var kb=p.getCurrentStickyHeaderNav();kb&&kb.removeTimePeriod(gb);oa[gb]=true;},loadSectionOnClick:function(gb,hb){k.listen(gb,'click',function(ib){ib.prevent();q.get(hb).load();});},removeSection:function(gb){for(var hb in la)if(la[hb]==gb){la[hb]=null;break;}q.remove(gb);delete ka[gb];if(gb in pa){pa[gb].remove();delete pa[gb];}var ib=p.getCurrentStickyHeaderNav();ib&&ib.removeTimePeriod(gb);na.push(gb);},removeSectionParent:function(gb){i.remove(w(gb).parentNode);},navigateToSection:function(gb,hb,ib){ta.add_event("nav_"+gb);hb=!!hb;var jb=gb,kb=q.get(gb);if(!kb)return;if(!kb.loaded){r.enable();i.scry(w('timeline_tab_content'),'.fbTimelineShowOlderSections').forEach(i.remove);}if(!ka[gb]){kb.node.style.minHeight=v.getViewportDimensions().y+'px';var lb=g.subscribe(o.SECTION_FULLY_LOADED,function(tb,ub){if(ub.scrubberKey===gb){kb.node.style.minHeight='';lb.unsubscribe();}});jb=kb.parentKey;var mb=q.get(jb).node;if(!h.hasClass(mb,'fbTimelineSectionExpanded')){j.scrollTo(mb,0);h.addClass(mb,'fbTimelineSectionExpanded');i.scry(mb,'.fbTimelineCapsule').forEach(i.remove);i.scry(mb,'div.fbTimelineSectionExpandPager').forEach(i.remove);i.scry(mb,'div.fbTimelineContentHeader').forEach(i.remove);i.scry(mb,"._5vf").forEach(function(tb){if(!tb.getAttribute('data-subsection'))i.remove(tb);});}var nb=fb.getNextSectionKey(jb);if(nb&&pa[nb])pa[nb].setBuffer(0);}for(var ob=0;ob<la.length;ob++){var pb=la[ob];if(!pb)continue;if(pb==jb)break;q.get(pb).deactivateScrollLoad();i.scry(w('timeline_tab_content'),'.fbTimelineSectionExpandPager').forEach(function(tb){var ub=n.getInstance(tb.id);ub&&ub.removeOnVisible();});}fb.adjustContentPadding();kb.load(ib,true);cb();var qb=v.getScrollPosition().x,rb=v.getElementPosition(kb.node).y;if(!hb){var sb=ka[gb]?o.SCROLL_TO_OFFSET:o.SUBSECTION_SCROLL_TO_OFFSET;j.scrollTo(new v(qb,rb-sb,'document'),true,false,false,function(){var tb=v.getElementPosition(kb.node).y;j.scrollTo(new v(qb,tb-sb,'document'),false);var ub=i.scry(kb.node,'h3.uiHeaderTitle')[0];if(ub){ub.tabIndex=0;ub.focus();}});}},adjustContentPadding:function(){var gb=ca('timeline_tab_content');if(!gb)return;if(p.isOneColumnMinimal())return;var hb=p.getCurrentKey()||s.TIMELINE_KEY;if(hb!==s.TIMELINE_KEY)return;var ib=la.length-1,jb=q.get(la[ib]);gb.style.paddingBottom=jb&&jb.loaded?null:v.getViewportDimensions().y-fb.CURRENT_SECTION_OFFSET-fb.HEADER_SCROLL_CUTOFF-fb.FOOTER_HEIGHT+'px';},adjustContentPaddingAfterLoad:function(gb,hb){p.runOnceWhenSectionFullyLoaded(fb.adjustContentPadding,gb,hb);},appendContentAfterLoad:function(gb,hb,ib){p.runOnceWhenSectionFullyLoaded(i.appendContent.curry(w(gb),hb),ib,'0');},markSectionAsLoaded:function(gb,hb,ib){p.runOnceWhenSectionFullyLoaded(function(){ca(gb)&&h.removeClass(w(gb).parentNode,'fbTimelineSectionLoading');},hb,ib);},suppressSectionsAbove:function(gb){var hb,ib;for(var jb=0;jb<la.length;jb++){var kb=la[jb];if(!kb)continue;hb=q.get(kb).node;ib=null;if(z(gb.parentNode.children).indexOf(gb)<=z(hb.parentNode.children).indexOf(hb)){ib=kb;break;}q.get(kb).deactivateScrollLoad();}if(ib)fb.navigateToSection(ib,true);},forceNoFriendActivity:function(){ua=true;},removeDupes:function(gb){var hb=ca(gb);if(!hb)return;var ib=i.scry(hb,'li.fbTimelineUnit'),jb={};for(var kb=0;kb<ib.length;kb++){var lb=ib[kb];if(lb.id&&da(lb.id,'tl_unit_')){var mb=lb.id.substring(8,lb.id.length),nb=(lb.getAttribute('data-unit')=='ExperienceSummaryUnit'?lb.getAttribute('data-time'):1);if(jb.hasOwnProperty(mb)&&jb[mb]==nb){lb.id='dupe_unit_'+Math.random();lb.className="hidden_elem";}else jb[mb]=nb;}}},removeLoadingState:function(gb){ca(gb)&&h.removeClass(w(gb),'fbTimelineSectionLoading');},setExpandLoadDataForSection:function(gb,hb){var ib=q.get(gb);ib&&ib.setExpandLoadData(hb);},appendSectionDataForAllSections:function(gb){ma=gb;for(var hb=0;hb<la.length-1;hb++){var ib=la[hb];if(!ib)continue;var jb=q.get(ib);jb&&jb.appendData(gb);}},updatePagerAfterLoad:function(gb,hb,ib,jb,kb){var lb=n.getInstance(gb.firstChild.id);if(!lb){ra[gb.firstChild.id]=g.subscribe(n.REGISTERED,function(mb,nb){ra[gb.firstChild.id].unsubscribe();delete ra[gb.firstChild.id];if(nb.id===gb.firstChild.id)fb.updatePagerAfterLoad(gb,hb,ib,jb,kb);});return;}p.runOnceWhenSectionFullyLoaded(function(){h.removeClass(gb,'fbTimelineHiddenPager');lb.checkBuffer();},ib,jb);if(kb)p.runOnceWhenSectionFullyLoaded(p.adjustScrollingPagerBuffer.curry(gb.firstChild.id,hb),ib,jb);},showAfterLoad:function(gb,hb,ib){p.runOnceWhenSectionFullyLoaded(function(){var jb=ca(gb);jb&&h.show(jb);},hb,ib);},repositionDialog:function(gb){g.subscribe(o.SECTION_LOADED,function(){gb.updatePosition();});},rightColumnFinished:function(gb){var hb=q.get(gb);hb.rightColumnFinished=true;},registerUnrankedGroup:function(gb,hb){k.listen(gb,'click',function(event){p.unrankedWasClicked();i.remove(gb.parentNode);h.removeClass(hb,'hidden_elem');});}};e.exports=fb;});
__d("TimelineLogging",["TimelineController","reportData"],function(a,b,c,d,e,f){var g=b('TimelineController'),h=b('reportData'),i=false,j=0,k=null,l=null,m={init:function(n){if(i)return;j=n;g.register(g.LOGGING,this);},reset:function(){i=false;j=0;k=null;},log:function(n,o){o.profile_id=j;h(n,{gt:o});},logSectionChange:function(n,o){var p={timeline_section_change:1,key:n};if(k&&n==k){p.timeline_scrubber=1;k=null;}if(l&&n==l){p.sticky_header_nav=1;l=null;}m.log('timeline',p);},logScrubberClick:function(n){k=n;},logStickyHeaderNavClick:function(n){l=n;},logUnrankedClick:function(){var n={timeline_unranked:1};m.log('timeline',n);}};e.exports=m;});
__d("TimelineStickyHeaderComposerX",["Arbiter","Bootloader","ComposerXController","CSS","DOMQuery","Event","Parent","Run","TimelineComposerUtilities","TimelineContentLoader","TimelineStickyHeader","Vector","csx","cx"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Bootloader'),i=b('ComposerXController'),j=b('CSS'),k=b('DOMQuery'),l=b('Event'),m=b('Parent'),n=b('Run'),o=b('TimelineComposerUtilities'),p=b('TimelineContentLoader'),q=b('TimelineStickyHeader'),r=b('Vector'),s=b('csx'),t=b('cx');function u(w){return w&&m.byClass(w.getContext(),"_2wp");}function v(w){this._composerRoot=w;this._tokens=[o.listenToSetEstimatedDate(this._composerRoot,p.capsuleForCurrentSection),o.listenToPublish(this._composerRoot,this._close.bind(this)),g.subscribe('PhotoSnowlift.OPEN',this._close.bind(this)),g.subscribe('TimelineMLE/mleFlyoutShown',function(x,y){if(u(y)===this._composerRoot)i.reset(this._composerRoot);}.bind(this)),g.subscribe('composer/initializedAttachment',function(x,y){if(y.composerRoot===this._composerRoot){this._registerClickToDismiss();if(!y.isInitial)this._closeMLE();}else this._close();}.bind(this)),g.subscribe(q.ADJUST_WIDTH,this._toggleNarrowMode.bind(this))];this._clickCancelToken=o.listenToCancel(this._composerRoot,this._close.bind(this));n.onLeave(function(){while(this._tokens.length)this._tokens.pop().unsubscribe();this._clearClickDismissToken();if(this._clickCancelToken){this._clickCancelToken.remove();this._clickCancelToken=null;}}.bind(this));}v.prototype._toggleNarrowMode=function(event,w){h.loadModules(['Tooltip'],function(x){var y=r.getElementDimensions(w).x>400,z=k.scry(this._composerRoot,"._9lb");j.conditionClass(this._composerRoot,"_2wq",y);for(var aa=0;aa<z.length;aa++){var ba=z[aa],ca=k.getText(ba);if(y){x.set(ba,ca);}else x.remove(ba);}}.bind(this));return false;};v.prototype._registerClickToDismiss=function(){var w=j.hasClass(k.find(this._composerRoot,"._yq"),"_519b");if(!w){this._clearClickDismissToken();return;}this._clickDismissToken=l.listen(document.body,'click',function(x){var y=m.byClass(x.getTarget(),"_2wp");if(!y){this._close();this._clearClickDismissToken();}}.bind(this));};v.prototype._clearClickDismissToken=function(){if(this._clickDismissToken){this._clickDismissToken.remove();this._clickDismissToken=null;}};v.prototype._close=function(){this._clearClickDismissToken();this._closeMLE();i.reset(this._composerRoot);};v.prototype._closeMLE=function(){h.loadModules(['TimelineMLE'],function(w){var x=w.getFlyout();if(u(x)===this._composerRoot)w.hideFlyout();}.bind(this));};e.exports=v;});
__d("TimelineSpinelessComposer",["Arbiter","Bootloader","CSS","DOM","Parent","Run","TimelineComposer","TimelineComposerUtilities","csx","cx"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('Bootloader'),i=b('CSS'),j=b('DOM'),k=b('Parent'),l=b('Run'),m=b('TimelineComposer'),n=b('TimelineComposerUtilities'),o=b('csx'),p=b('cx'),q;function r(w){if(w.isScheduledPost||w.isOGPost)return;if(!w.streamStory){window.location.reload();return;}if(w.backdatedTime){h.loadModules(['TimelineStoryPublisher'],function(x){x.publish(w);});return;}m.renderCapsuleBasedStory(q,w.streamStory);}function s(){return j.find(k.byClass(q,'fbTimelineComposerCapsule'),"div._4s3");}function t(w){var x=u();i.show(x);var y=w.subscribe('hide',function(){i.hide(x);w.unsubscribe(y);});}function u(){var w=k.byClass(q,'fbTimelineComposerCapsule'),x=j.scry(w,'div.composerVeil');if(x.length!==1)x=j.appendContent(w,j.create('div',{className:'composerVeil hidden_elem'}));return x[0];}var v={init:function(w){q=w;var x=g.subscribe('composer/publish',function(event,y){if(y.composer_id===q.id)r(y);});l.onLeave(x.unsubscribe.bind(x));if(i.hasClass(q,"_mj")){n.hidePlaceIfAttachmentsTooTall(q);}else n.hidePlaceIfAttachmentsTooTallOld(q);},showMLEFlyout:function(w){w.setContext(s()).show();t(w);}};e.exports=v;});
__d("TimelineStickyRightColumn",["Arbiter","CSS","DOMQuery","Event","PhotoSnowlift","Run","Style","TimelineContentLoader","Vector","UserAgent","csx","queryThenMutateDOM"],function(a,b,c,d,e,f){var g=b('Arbiter'),h=b('CSS'),i=b('DOMQuery'),j=b('Event'),k=b('PhotoSnowlift'),l=b('Run'),m=b('Style'),n=b('TimelineContentLoader'),o=b('Vector'),p=b('UserAgent'),q=b('csx'),r=b('queryThenMutateDOM'),s=100,t=15,u=15,v=71,w=false,x=null,y=null,z,aa,ba,ca,da,ea,fa,ga;function ha(){if(k.getInstance().isOpen)return;z=n.getCurrentSection();if(!z||!z.rightColumnFinished)return;var pa=i.scry(z.node,"._3rbf")[0],qa=i.scry(z.node,"._3rbh")[0];aa=pa?pa.offsetHeight:0;ba=qa?qa.offsetHeight:0;ca=o.getViewportDimensions().y;fa=pa?o.getElementPosition(pa).y:0;ga=document.body.clientWidth<document.body.scrollWidth;}function ia(){if(k.getInstance().isOpen)return;if(y&&y!==z){var pa=i.scry(y.node,"._3rbh")[0];if(pa)ka(pa,'','','');}var qa=i.scry(z.node,"._3rbh")[0];if(!qa)return;if(ga){ka(qa,'','','');return;}if(!z||!z.rightColumnFinished)return;ja(z);y=h.hasClass(qa,'fixed_always')?z:null;}function ja(pa){if(ba>=aa||aa<=ca)return;ea=da;da=o.getScrollPosition().y;var qa,ra=i.scry(pa.node,"._3rbh")[0];if(!ra)return;if(da<=fa-la()){ka(ra,'','','');return;}if(aa+fa<=da+Math.min(ba+la(),ca-u-v)){ka(ra,'absolute','',u+'px');return;}if(ba>ca-u-la()){if(da<ea){var sa=false;if(ra.style.position==='absolute')if(ra.style.top!==''&&da+la()-fa<=parseInt(ra.style.top,10)){sa=true;}else if(ra.style.bottom!==''&&da<=(fa+aa-la())-ba)sa=true;if(sa){ka(ra,'fixed',la()+'px','');return;}else if(ra.style.position==='absolute'&&ra.style.top){return;}else if(h.hasClass(ra,'fixed_always')){if(parseInt(ra.style.top,10)>=la())return;qa=da-fa-(ba-(ca-v));if(ea)qa+=ea-da;ka(ra,'absolute',qa+'px','');return;}}else{var ta=false;if(ra.style.position==='absolute'||(ra.style.position===''&&!h.hasClass(ra,'fixed_always'))){qa=ra.style.top?parseInt(ra.style.top,10):0;if(da+ca>=fa+qa+ba+v)ta=true;}if(ta){qa=ca-ba-u-v;ka(ra,'fixed',qa+'px','');return;}else if(da==ea){return;}else if(h.hasClass(ra,'fixed_always')){if(parseInt(ra.style.top,10)>=la()){qa=da-fa+la();if(ea)qa+=ea-da;ka(ra,'absolute',qa+'px','');return;}}else if(ra.style.position==='absolute')return;}}else ka(ra,'fixed',la()+'px','');}function ka(pa,qa,ra,sa){m.set(pa,'bottom',sa);if(qa==='fixed'){h.addClass(pa,'fixed_always');m.set(pa,'position','');}else{h.removeClass(pa,'fixed_always');m.set(pa,'position',qa);}m.set(pa,'top',ra);g.inform('reflow');}function la(){return h.hasClass(document.documentElement,'tinyViewport')?t:s;}function ma(){r(ha,ia);}function na(){w=false;y=null;while(x.length)x.pop().remove();x=null;}var oa={init:function(){if(w||p.ie()<8)return;w=true;x=[j.listen(window,'scroll',ma),j.listen(window,'resize',ma)];l.onLeave(na);},adjust:function(){if(w){ha();ia();}}};e.exports=oa;});
__d("TimelineProfileQuestionsUnit",["CSS","Event","Parent","tidyEvent"],function(a,b,c,d,e,f){var g=b('CSS'),h=b('Event'),i=b('Parent'),j=b('tidyEvent'),k=null,l={COLLAPSED:'collapsedUnit',UNIT:'fbTimelineUnit'};function m(n,o,p,q){this.$TimelineProfileQuestionsUnit0=n;this.$TimelineProfileQuestionsUnit1=o;this.$TimelineProfileQuestionsUnit2=p;this.$TimelineProfileQuestionsUnit3=q;this.$TimelineProfileQuestionsUnit4();k&&k.$TimelineProfileQuestionsUnit5();k=this;}m.prototype.$TimelineProfileQuestionsUnit5=function(){this.$TimelineProfileQuestionsUnit6&&this.$TimelineProfileQuestionsUnit6.remove();this.$TimelineProfileQuestionsUnit6=null;};m.prototype.$TimelineProfileQuestionsUnit4=function(){if(this.$TimelineProfileQuestionsUnit3.isCollapsed)return;this.$TimelineProfileQuestionsUnit6=h.listen(this.$TimelineProfileQuestionsUnit1,'click',this.$TimelineProfileQuestionsUnit7.bind(this));j(this.$TimelineProfileQuestionsUnit6);};m.prototype.$TimelineProfileQuestionsUnit7=function(){if(!this.$TimelineProfileQuestionsUnit2)return;var n=i.byClass(this.$TimelineProfileQuestionsUnit0,l.UNIT);g.toggle(this.$TimelineProfileQuestionsUnit2);var o=!g.shown(this.$TimelineProfileQuestionsUnit2);g.conditionClass(n,l.COLLAPSED,o);};m.updateElements=function(n,o){if(!k)return;k.$TimelineProfileQuestionsUnit5();k.$TimelineProfileQuestionsUnit1=n;k.$TimelineProfileQuestionsUnit2=o;k.$TimelineProfileQuestionsUnit4();};e.exports=m;});