(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e020c79"],{"077b":function(t,s,n){},"3e59":function(t,s,n){},6097:function(t,s,n){"use strict";n("077b")},"9ac3":function(t,s,n){"use strict";n("3e59")},e37d:function(t,s,n){"use strict";n.r(s);var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{staticClass:"hotMusic-box"},[n("div",{staticClass:"topad"},[n("div",{staticClass:"hot-top"},[n("div",{staticClass:"ad"}),n("p",[t._v("更新日期："+t._s(t._f("formatTime")(t.nowTime)))])])]),n("MusicList")],1)},e=[],a=n("f382"),o={components:{MusicList:a["a"]},data:function(){return{musicList:[],nowTime:Date.now()}},beforeRouteEnter:function(t,s,n){n((function(t){t.$axios.get("/playlist/detail?id=3778678").then((function(t){console.log(t)}))}))},filters:{formatTime:function(t){var s=new Date(t),n=s.getMonth()+1,i=s.getDate();return n=n<10?"0"+n:n,i=i<10?"0"+i:i,n+"月"+i+"日"}}},c=o,l=(n("6097"),n("2877")),u=Object(l["a"])(c,i,e,!1,null,null,null);s["default"]=u.exports},f382:function(t,s,n){"use strict";var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ul",{staticClass:"music-list"},t._l(t.newsongs,(function(s){return n("router-link",{key:s.id,attrs:{to:"/",tag:"li"}},[n("div",{staticClass:"list-left"},[n("div",{staticClass:"song-title"},[t._v(t._s(s.name))]),n("p",[n("i"),n("span",[t._v(t._s(s.song.artists[0].name)+" - "+t._s(s.name))])])]),n("div",{staticClass:"list-right"},[n("span")])])})),1)},e=[],a={props:["newsongs"]},o=a,c=(n("9ac3"),n("2877")),l=Object(c["a"])(o,i,e,!1,null,null,null);s["a"]=l.exports}}]);
//# sourceMappingURL=chunk-3e020c79.f3908a27.js.map