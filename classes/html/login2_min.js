svGlobal.auth=new function(){var f=this;this.login=function(m){function n(d,a){window.__sparkUser=null;if(!f.beforelogin||!f.beforelogin(d)){var b=new WebSocket(d.substring(0,d.indexOf("?"))+"?_METHOD=post","login");b.onclose=function(a){f.afterlogin&&f.afterlogin(h);h=!1};b.onopen=function(a){h=!0};b.onmessage=function(e){0==e.data.indexOf("00")?b.send("00"+d.substring(d.indexOf("?")+1)):(e=JSON.parse(e.data),0===e.type&&e.message?hi5.notifications.notify(e.message):(e.error||b.send("A1"+navigator.userAgent),
a(e),b.close()))}}}var h=!1,d=hi5.browser.cookie2Obj();d.svSession&&d.svEmail&&(m+="&svSession="+d.svSession+"&svEmail="+encodeURIComponent(d.svEmail));setTimeout(function(){n(m,svGlobal.onloggedin)},5);return!1}};
function startExitingApp(f){function m(d){n.addSurface(d);n.startExitingApp(f)}var n=svManager.getInstance();window.svOnSurfaceReady=m;window.open("rail.html").svOnSurfaceReady=m;var h=hi5.$(f),d=h.parentNode;d.removeChild(h);d=d.parentNode;0==d.getElementsByTagName("input").length&&(d.dismiss(),n.checkRemaining(2E3))}function getLoginURL(){return("https:"==location.protocol?"wss://":"ws://")+hi5.$("gateway").value+"/LOGIN?"}
window.addEventListener("load",function(f){function m(){f.preventDefault();svGlobal.auth.beforesubmit&&svGlobal.auth.beforesubmit();var a=hi5.$("frmLogin").elements,b=a.user.value,e=a.pwd.value,b=getLoginURL()+"user="+encodeURIComponent(b)+"&pwd="+encodeURIComponent(e);(a=a.sharedSecret)&&a.value&&(b+="&sharedSecret="+encodeURIComponent(a.value));return svGlobal.auth.login(b)}function n(){window.__sparkUser=null;var a=hi5.$("frmLogin");a.elements.pwd.value="";a.style.display="block";hi5.$("frmConn").style.display=
"none";(a=svManager.getInstance())&&a.running()&&a.close()}function h(a){var b=a.target;b.onclick=null;setTimeout(function(){b.onclick=h},300);q(b.id)}function d(){function a(a){e.addSurface(a);e.running()?e.startApp(b.exe,b.args,""):e.run()}var b=window.__sparkUser.server,e=svManager.getInstance();null==e&&(e=new svGlobal.Rdp2(b),e.sessionTimeout=9E5);window.svOnSurfaceReady=a;window.open("rail.html").svOnSurfaceReady=a}function q(a,b,e){var c=window.__sparkUser,r=c.servers,p=r.length;c.server=null;
window.sparkGateway=c.gateway;for(var k=0;k<p;k++){var l=r[k];if(a==l.id){l.gateway=c.gateway;l.session=c.session;l.account=c.account;c.server=l;break}}if(c.server){console.log("connecting to:"+c.server.id);(a=hi5.$("touchpad"))&&a.checked&&(c.server.touchpad=!0);if(a=hi5.$("keyboard"))a=parseInt(a.options[a.selectedIndex].value),0<a&&(c.server.keyboard=a);"undefined"==typeof b&&(b=(a=hi5.$("sameWindow"))&&a.checked);b&&!c.server.rdp&&(b=!1);if(c.server.rdp&&"app"==c.server.startProgram&&hi5.browser.isMultitask&&
!b)d();else if(b){var g=new Rdp2(c.server);hi5.$("login").style.display="none";g.addSurface(new svGlobal.LocalInterface);g.run();g.onclose=function(){if(e){window.__sparkUser=null;var a=hi5.$("frmLogin");a.elements.pwd.value="";a.style.display="block";hi5.$("frmConn").style.display="none"}else g.hide(),hi5.$("login").style.display="block"}}else c.server.rdp?window.open("rdpdirect.html"):c.server.vnc?window.open("vnc.html"):c.server.ssh?window.open("sshdirect.html"):c.server.telnet&&window.open("telnet.html")}else hi5.notifications.notify("Not a valid server")}
svGlobal.auth.beforelogin=function(){hi5.tool.disableInput()};svGlobal.auth.afterlogin=function(a){a||(hi5.notifications.notify(__svi18n.errorCode.connection),n());hi5.tool.enableInput()};svGlobal.onloggedin=function(a){hi5.tool.enableInput();if(a.error)hi5.notifications.notify(__svi18n.errorCode["S"+a.name]);else{hi5.$("frmLogin").style.display="none";hi5.$("frmConn").style.display="block";if(!0===a.isDomainUser){var b=hi5.$("settings");b&&b.parentNode.removeChild(b)}for(b=hi5.$("programs");b.hasChildNodes();)b.removeChild(b.firstChild);
var e=a.servers;if(!a.accessNotInList){var c=hi5.$("anyconn");c&&(c.style.display="none")}window.__sparkUser={session:a.session,account:hi5.$("user").value,gateway:hi5.$("gateway").value,servers:e};a=e.length;if(!(1>a)){for(var c="",d=0;d<a;d++){var p=e[d].server,k=e[d].id,p=e[d].displayName||k||p,l=e[d].icon;l||(l="rdp32.png");var g=document.createElement("div");g.className="icon";var f=document.createElement("img");f.src=l;f.id=k;f.alt=k;f.title=p;f.style.cursor="pointer";f.onclick=h;g.appendChild(f);
g.appendChild(document.createElement("br"));g.appendChild(document.createTextNode(p));b.appendChild(g);hi5.appcfg.startup&&k===hi5.appcfg.startup.server&&(c=k)}!c&&hi5.appcfg.startup&&(console.log("start up:"+hi5.appcfg.startup.server+" not found, use the first instead"),c=e[0].id);c&&q(c,!hi5.appcfg.startup.newWindow,!0)}}};(function(){hi5.$("user").focus();hi5.$("frmLogin").onsubmit=m;var a=hi5.$("anyconn");a&&(a.onclick=function(){window.open("rdp.html?gateway="+hi5.$("gateway").value)});if(a=
document.querySelector('input[name="showlogin"]'))a.onclick=n;var a=hi5.browser.cookie2Obj(),b=-1!=document.cookie.indexOf("__SV_TOKEN_A"),e=hi5.tool.queryToObj();if(a.svEmail||a.user||b||e.autoLogin){var c=hi5.$("frmLogin").elements;c.user.value=a.svEmail||a.user||"";c.pwd.value=(a.svSession?"fake":a.pwd)||"_";a.gateway&&(c.gateway.value=a.gateway);(c.user.value&&c.pwd.value||a.autoLogin||b||e.autoLogin)&&setTimeout(m,30)}var a=hi5.$("settings"),d=hi5.$("settingsDiv");a&&(a.onclick=function(){d&&
((new hi5.Lightbox(d)).show(),hi5.$("currPwd").focus())});if(a=hi5.$("frmSettings"))a.onsubmit=function(a){a.preventDefault();var b=a.target.elements;if(b.newPwd1.value!=b.newPwd2.value)hi5.notifications.notify(__svi18n.errorCode.pwdmatch);else{a=getLoginURL()+"_METHOD=post&action=put";var c=new WebSocket(a,"login");c.onmessage=function(a){0==a.data.indexOf("00")?(c.send("00currPwd="+encodeURIComponent(b.currPwd.value)+"&newPwd="+encodeURIComponent(b.newPwd1.value)+"&user="+encodeURIComponent(hi5.$("user").value)),
hi5.$("frmSettings").reset()):(a=JSON.parse(a.data),a.error&&hi5.notifications.notify(__svi18n.errorCode["S"+a.name]),c.close())};d.dismiss&&d.dismiss();return!1}};(a=hi5.$("sameWindow"))&&(hi5.browser.isiOS||hi5.browser.isIE||hi5.browser.isChromeApp)&&(a.checked=!0);a=hi5.$("gateway");(b=a.value)||(b=hi5.appcfg.defaultPort?window.location.hostname+":"+hi5.appcfg.defaultPort:window.location.host);0==b.length&&(b="localhost");a.value=b;a=hi5.$("touchpadmode");hi5.browser.isTouch&&(a.style.display=
"");(a=hi5.$("user"))&&!a.value&&hi5.appcfg&&hi5.appcfg.domain&&(a.value=hi5.appcfg.domain+"\\");(function(){var a=!1,b="";try{document.createElement("canvas").getContext("2d"),a=!0}catch(t){b="This browser does not support Canvas.\n\n"}var c=!("WebSocket"in window)&&!("MozWebSocket"in window),d=navigator.userAgent,e=-1!=d.indexOf("Firefox");c&&(b+="This browser doesn't support WebSocket.\n\n",e?b+="Please update to Firefox 6 or later.\n\n":-1!=d.indexOf("Opera")?b+="Please open 'opera:config#Enable WebSockets' (type it in the link field) make 'Enable WebSockets' selected and restart Opera.\n\n":
-1!=d.indexOf("MSIE")&&(b+="Please install Google Chrome Frame.\n\n"));0<b.length&&hi5.notifications.notify(b);return!c&&a})();(a=hi5.$("defPort"))&&hi5.appcfg.defaultPort&&(a.innerHTML=hi5.appcfg.defaultPort);(a=document.getElementById("frmConn"))&&(a=a.querySelector('select[name="keyboard"]'));a&&(b=svGlobal.Rdp.languageToKeyboard.detect())&&(a.value=b)})()},!1);