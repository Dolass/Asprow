﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){var a={table:1,pre:1},b=/\s*<(p|div|address|h\d|center)[^>]*>\s*(?:<br[^>]*>|&nbsp;|&#160;)\s*(:?<\/\1>)?\s*$/gi;function c(f){var k=this;if(k.mode=='wysiwyg'){k.focus();var g=k.getSelection(),h=f.data;if(k.dataProcessor)h=k.dataProcessor.toHtml(h);if(CKEDITOR.env.ie){var i=g.isLocked;if(i)g.unlock();var j=g.getNative();if(j.type=='Control')j.clear();j.createRange().pasteHTML(h);if(i)k.getSelection().lock();}else k.document.$.execCommand('inserthtml',false,h);}};function d(f){if(this.mode=='wysiwyg'){this.focus();this.fire('saveSnapshot');var g=f.data,h=g.getName(),i=CKEDITOR.dtd.$block[h],j=this.getSelection(),k=j.getRanges(),l=j.isLocked;if(l)j.unlock();var m,n,o,p;for(var q=k.length-1;q>=0;q--){m=k[q];m.deleteContents();n=!q&&g||g.clone(true);var r,s;if(this.config.enterMode!=CKEDITOR.ENTER_BR&&i)while((r=m.getCommonAncestor(false,true))&&((s=CKEDITOR.dtd[r.getName()])&&(!(s&&s[h]))))m.splitBlock();m.insertNode(n);if(!o)o=n;}m.moveToPosition(o,CKEDITOR.POSITION_AFTER_END);var t=o.getNextSourceNode(true);if(t&&t.type==CKEDITOR.NODE_ELEMENT)m.moveToElementEditStart(t);j.selectRanges([m]);if(l)this.getSelection().lock();CKEDITOR.tools.setTimeout(function(){this.fire('saveSnapshot');},0,this);}};function e(f){var g=f.editor,h=f.data.path,i=h.blockLimit,j=f.data.selection,k=j.getRanges()[0],l=g.document.getBody(),m=g.config.enterMode;if(m!=CKEDITOR.ENTER_BR&&k.collapsed&&i.getName()=='body'&&!h.block){var n=j.createBookmarks(),o=k.fixBlock(true,g.config.enterMode==CKEDITOR.ENTER_DIV?'div':'p');if(CKEDITOR.env.ie){var p=o.getElementsByTag('br'),q;for(var r=0;r<p.count();r++)if((q=p.getItem(r))&&(q.hasAttribute('_cke_bogus')))q.remove();}j.selectBookmarks(n);var s=o.getChildren(),t=s.count(),u,v=o.getPrevious(true),w=o.getNext(true),x;if(v&&v.getName&&!(v.getName() in a))x=v;else if(w&&w.getName&&!(w.getName() in a))x=w;if((!t||(u=s.getItem(0))&&(u.is&&u.is('br')))&&(x)){o.remove();k.moveToElementEditStart(x);k.select();}}var y=l.getLast(true);if(y.getName&&y.getName() in a){var z=g.document.createElement(CKEDITOR.env.ie&&m!=CKEDITOR.ENTER_BR?'<br _cke_bogus="true" />':'br');l.append(z);}};CKEDITOR.plugins.add('wysiwygarea',{requires:['editingblock'],init:function(f){var g=f.config.enterMode!=CKEDITOR.ENTER_BR?f.config.enterMode==CKEDITOR.ENTER_DIV?'div':'p':false;f.on('editingBlockReady',function(){var h,i,j,k,l,m=CKEDITOR.env.isCustomDomain(),n=function(){if(i)i.remove();i=new CKEDITOR.dom.element('iframe').setAttributes({frameBorder:0,tabIndex:-1,allowTransparency:true}).setStyles({width:'100%',height:'100%'});
if(CKEDITOR.env.ie)if(m)i.setAttribute('src','javascript:void( (function(){document.open();document.domain="'+document.domain+'";'+'document.write( window.parent._cke_htmlToLoad_'+f.name+' );'+'document.close();'+'window.parent._cke_htmlToLoad_'+f.name+' = null;'+'})() )');else i.setAttribute('src','javascript:void(0)');var q=f.lang.editorTitle.replace('%1',f.name);if(CKEDITOR.env.gecko){h.setAttributes({role:'region',title:q});i.setAttributes({role:'region',title:' '});}else if(CKEDITOR.env.webkit){i.setAttribute('title',q);i.setAttribute('name',q);}else if(CKEDITOR.env.ie){var r=CKEDITOR.dom.element.createFromHtml('<fieldset style="height:100%'+(CKEDITOR.env.quirks?';position:relative':'')+'">'+'<legend style="position:absolute;left:-10000px">'+CKEDITOR.tools.htmlEncode(q)+'</legend>'+'</fieldset>',CKEDITOR.document);i.appendTo(r);r.appendTo(h);}if(!CKEDITOR.env.ie)h.append(i);},o='<script id="cke_actscrpt" type="text/javascript">window.onload = function(){var s = document.getElementById( "cke_actscrpt" );s.parentNode.removeChild( s );window.parent.CKEDITOR._["contentDomReady'+f.name+'"]( window );'+'}'+'</script>',p=function(q){delete CKEDITOR._['contentDomReady'+f.name];var r=q.document,s=r.body;s.spellcheck=!f.config.disableNativeSpellChecker;if(CKEDITOR.env.ie){s.hideFocus=true;s.disabled=true;s.contentEditable=true;s.removeAttribute('disabled');}else r.designMode='on';try{r.execCommand('enableObjectResizing',false,!f.config.disableObjectResizing);}catch(v){}try{r.execCommand('enableInlineTableEditing',false,!f.config.disableNativeTableHandles);}catch(w){}q=f.window=new CKEDITOR.dom.window(q);r=f.document=new CKEDITOR.dom.document(r);if(!(CKEDITOR.env.ie||CKEDITOR.env.opera))r.on('mousedown',function(x){var y=x.data.getTarget();if(y.is('img','hr','input','textarea','select'))f.getSelection().selectElement(y);});if(CKEDITOR.env.webkit){r.on('click',function(x){if(x.data.getTarget().is('input','select'))x.data.preventDefault();});r.on('mouseup',function(x){if(x.data.getTarget().is('input','textarea'))x.data.preventDefault();});}var t=CKEDITOR.env.ie||CKEDITOR.env.safari?q:r;t.on('blur',function(){f.focusManager.blur();});t.on('focus',function(){f.focusManager.focus();});var u=f.keystrokeHandler;if(u)u.attach(r);if(f.contextMenu)f.contextMenu.addTarget(r);setTimeout(function(){f.fire('contentDom');if(l){f.mode='wysiwyg';f.fire('mode');l=false;}j=false;if(k){f.focus();k=false;}if(CKEDITOR.env.ie)setTimeout(function(){if(f.document){var x=f.document.$.body;
x.runtimeStyle.marginBottom='0px';x.runtimeStyle.marginBottom='';}},1000);},0);};f.addMode('wysiwyg',{load:function(q,r,s){h=q;if(CKEDITOR.env.ie&&(CKEDITOR.env.quirks||CKEDITOR.env.version<8))q.setStyle('position','relative');if(!m||!CKEDITOR.env.gecko)n();f.mayBeDirty=true;l=true;if(s)this.loadSnapshotData(r);else this.loadData(r);},loadData:function(q){j=true;if(f.dataProcessor)q=f.dataProcessor.toHtml(q,g);q=f.config.docType+'<html dir="'+f.config.contentsLangDirection+'">'+'<head>'+'<link href="'+f.config.contentsCss+'" type="text/css" rel="stylesheet" _fcktemp="true"/>'+'<style type="text/css" _fcktemp="true">'+f._.styles.join('\n')+'</style>'+'</head>'+'<body>'+q+'</body>'+'</html>'+o;if(m)window['_cke_htmlToLoad_'+f.name]=q;CKEDITOR._['contentDomReady'+f.name]=p;if(m||CKEDITOR.env.gecko)n();if(!m){var r=i.$.contentWindow.document;r.open();r.write(q);r.close();}},getData:function(){var q=i.getFrameDocument().getBody().getHtml();if(f.dataProcessor)q=f.dataProcessor.toDataFormat(q,g);if(f.config.ignoreEmptyParagraph)q=q.replace(b,'');return q;},getSnapshotData:function(){return i.getFrameDocument().getBody().getHtml();},loadSnapshotData:function(q){i.getFrameDocument().getBody().setHtml(q);},unload:function(q){f.window=f.document=i=h=k=null;f.fire('contentDomUnload');},focus:function(){if(j)k=true;else if(f.window){f.window.focus();f.selectionChange();}}});f.on('insertHtml',c,null,null,20);f.on('insertElement',d,null,null,20);f.on('selectionChange',e,null,null,1);});}});})();CKEDITOR.config.disableObjectResizing=false;CKEDITOR.config.disableNativeTableHandles=true;CKEDITOR.config.disableNativeSpellChecker=true;CKEDITOR.config.ignoreEmptyParagraph=true;