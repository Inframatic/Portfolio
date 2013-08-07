/**
 * @provides Function.prototype-shield
 * @requires __DEV__ Function.prototype
 * @polyfill
 * @nostacktrace
 *//**
 * Fixes toString on bound functions in dev. Now when you call toString on a
 * bound function, you get the result of toStringing the bound function instead
 * of Function.prototype.bind.toString() itself (which always says
 * [native code])
 *//**
 * This is a very basic typechecker that does primitives as well as boxed
 * versions of the primitives.
 *
 * @provides TypeChecker
 * @typechecks
 * @polyfill
 *//*globals __DEV__*//*TC*/(function(){function d(b,e){var f=typeof b,g=a.call(b).slice(8,-1),h,i,j,k=/^\?/.test(e);k&&(e=e.substring(1));var l=e.indexOf("function")!==0?e.indexOf("<"):-1;l!==-1&&(i=e.substring(l+1,e.lastIndexOf(">")),e=e.substring(0,l));if(b===undefined)f="undefined";else if(b===null)f="null";else if(g==="Function")f=b.__TCmeta&&e!=="function"?b.__TCmeta.signature:"function";else if(f==="object"||f==="function")if(b.constructor&&b.constructor.__TCmeta&&b.constructor.__TCmeta.type)e==="object"?f="object":f=b.constructor.__TCmeta.type;else if(b.nodeType!==1&&b.nodeType!==11||typeof b.nodeName!="string")if(b.nodeType===9)f="DOMDocument";else if(b.nodeType===3)f="DOMTextNode";else switch(g){case"Error":f=e==="Error"?"Error":b.name;break;case"Array":b.length&&(j=b[0]);case"Object":case"RegExp":case"Date":f=g.toLowerCase()}else f="DOMElement",h=b.nodeType===11?"FRAGMENT":b.nodeName.toUpperCase();return k&&/undefined|null/.test(f)?!0:(c.push(f),j&&i?e===f&&d(j,i):h&&i?e===f&&h===i:e===f)}function e(a,b){var e=b.split("|"),f=e.length;while(f--){c=[];if(d(a,e[f]))return!0}return!1}function f(){var a=Array.prototype.slice.call(arguments),d=a.length;while(d--){var f=a[d][0],g=a[d][1],h=a[d][2]||"return value";if(!e(f,g)){var i=c.shift();while(c.length)i+="<"+c.shift()+">";var j=new TypeError("Type Mismatch for "+h+': expected "'+g+'", actual "'+i+'"');if(!b)throw j;try{throw j}catch(k){k.framesToPop=a[d][2]?2:1,b(k)}}}return a[0][0]}function g(a,b){return a.__TCmeta=b,a}var a=Object.prototype.toString,b,c;f.setHandler=function(a){b=a},this.__t=f,this.__w=g})(),self.__DEV__=self.__DEV__||0,JSON.stringify(["\u2028\u2029"])==='["\u2028\u2029"]'&&(JSON.stringify=function(a){var b=/\u2028/g,c=/\u2029/g;return function(d,e,f){var g=a.call(this,d,e,f);return g&&(-1<g.indexOf("\u2028")&&(g=g.replace(b,"\\u2028")),-1<g.indexOf("\u2029")&&(g=g.replace(c,"\\u2029"))),g}}(JSON.stringify)),function(a){var b=a.ajax;a.ajax=function(c,d){typeof c=="object"&&(d=c,c=undefined),d=d||{};if(d.type==="POST"){var e=d.error;e===undefined?e=[]:a.isArray(e)||(e=[e]),e.push(function(b){var c;try{c=a.parseJSON(b.responseText)}catch(d){return}if(typeof c!="object"||!c||c.message!=="checkpoint_required"||!c.checkpoint_url)return;window.location.replace(c.checkpoint_url)}),d.error=e;var f=d.headers||{};f["X-Instagram-AJAX"]=1,d.headers=f}return b.apply(this,[c,d])}}($);