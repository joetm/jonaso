/*! For license information please see e4051bc846d363e5a45e25cec957d1f6f2127540.js.LICENSE.txt */
"use strict";(self.webpackChunkjonaso_de=self.webpackChunkjonaso_de||[]).push([[301],{9820:function(e,t,r){r.d(t,{Z:function(){return f}});var s=r(4572),n=r(7294),i=r(4160),o=n.createElement;const a={navSpacer:{marginBottom:"2em"}},c=({active:e,item:t,url:r=null,link:s=null,handleItemClick:n=null})=>o("a",s?{key:t,href:s,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")}:{key:t,href:r,name:t,target:s?"_blank":"_self",rel:"noreferrer",tabIndex:-42,role:"presentation",onClick:n,className:"item"+(e?" active":"")},t),u=({active:e,item:t,link:r=null})=>o("a",{key:t,href:r,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")},t,o("i",{"aria-hidden":"true",class:"file pdf outline large icon",style:{marginLeft:".2em"}}));function l(){const{0:e,1:t}=(0,n.useState)("");function r(e){e.preventDefault();let r=e.target.getAttribute("href");const s=e.target.name.toLowerCase();t(s),r?(r="/"===r.charAt(0)?r.slice(1):r,(0,i.c4)(`/${r}`)):"home"===s?(0,i.c4)("/"):(0,i.c4)(`/${s}`)}return(0,n.useEffect)((()=>{const e=window.location.pathname.replace(/\//g,"").toLowerCase();t(e||"home")}),[]),o("header",null,o("div",{id:"desktopmenu"},o("div",{className:"ui fluid pointing stackable seven item menu",primary:"true"},o(c,{key:"home",active:"home"===e,item:"Home",handleItemClick:r}),o(c,{key:"publications",active:"publications"===e,item:"Publications",handleItemClick:r}),o(c,{key:"researchinterests",active:"research"===e||"researchinterests"===e,item:"Research Interests",url:"/research/interests",handleItemClick:r}),o(c,{key:"researchprojects",active:"researchprojects"===e,item:"Research Projects",url:"/research/projects",handleItemClick:r}),o(c,{key:"art",active:e.startsWith("art"),item:"Art",link:!1,header:!0,handleItemClick:r}),o(c,{key:"webdev",active:"webdev"===e,item:"WebDev Portfolio",link:"https://komasurfer.com/portfolio/"}),o(u,{key:"cv",active:"cv"===e,item:"CV",link:"/cv/oppenlaender-cv.pdf"}))),o("div",{style:a.navSpacer}))}var h=n.createElement;function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function p(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f({children:e,style:t={}}){return h("div",{style:p({margin:"0 auto",clear:"both",maxWidth:1024,paddingBottom:"5em"},t)},h(l,null),e)}},3250:function(e,t,r){var s=r(7294);var n="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},i=s.useState,o=s.useEffect,a=s.useLayoutEffect,c=s.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!n(e,r)}catch(s){return!0}}var l="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),s=i({inst:{value:r,getSnapshot:t}}),n=s[0].inst,l=s[1];return a((function(){n.value=r,n.getSnapshot=t,u(n)&&l({inst:n})}),[e,r,t]),o((function(){return u(n)&&l({inst:n}),e((function(){u(n)&&l({inst:n})}))}),[e]),c(r),r};t.useSyncExternalStore=void 0!==s.useSyncExternalStore?s.useSyncExternalStore:l},1688:function(e,t,r){e.exports=r(3250)},477:function(e,t,r){r.d(t,{a:function(){return Q}});var s=r(2161),n=r(81),i=r(5761),o=r(3989),a=r(2379);class c extends o.l{constructor(e,t){super(),this.client=e,this.options=t,this.trackedProps=new Set,this.selectError=null,this.bindMethods(),this.setOptions(t)}bindMethods(){this.remove=this.remove.bind(this),this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.length&&(this.currentQuery.addObserver(this),u(this.currentQuery,this.options)&&this.executeFetch(),this.updateTimers())}onUnsubscribe(){this.listeners.length||this.destroy()}shouldFetchOnReconnect(){return l(this.currentQuery,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return l(this.currentQuery,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=[],this.clearStaleTimeout(),this.clearRefetchInterval(),this.currentQuery.removeObserver(this)}setOptions(e,t){const r=this.options,n=this.currentQuery;if(this.options=this.client.defaultQueryOptions(e),(0,s.VS)(r,this.options)||this.client.getQueryCache().notify({type:"observerOptionsUpdated",query:this.currentQuery,observer:this}),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled)throw new Error("Expected enabled to be a boolean");this.options.queryKey||(this.options.queryKey=r.queryKey),this.updateQuery();const i=this.hasListeners();i&&h(this.currentQuery,n,this.options,r)&&this.executeFetch(),this.updateResult(t),!i||this.currentQuery===n&&this.options.enabled===r.enabled&&this.options.staleTime===r.staleTime||this.updateStaleTimeout();const o=this.computeRefetchInterval();!i||this.currentQuery===n&&this.options.enabled===r.enabled&&o===this.currentRefetchInterval||this.updateRefetchInterval(o)}getOptimisticResult(e){const t=this.client.getQueryCache().build(this.client,e);return this.createResult(t,e)}getCurrentResult(){return this.currentResult}trackResult(e){const t={};return Object.keys(e).forEach((r=>{Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:()=>(this.trackedProps.add(r),e[r])})})),t}getCurrentQuery(){return this.currentQuery}remove(){this.client.getQueryCache().remove(this.currentQuery)}refetch({refetchPage:e,...t}={}){return this.fetch({...t,meta:{refetchPage:e}})}fetchOptimistic(e){const t=this.client.defaultQueryOptions(e),r=this.client.getQueryCache().build(this.client,t);return r.isFetchingOptimistic=!0,r.fetch().then((()=>this.createResult(r,t)))}fetch(e){var t;return this.executeFetch({...e,cancelRefetch:null==(t=e.cancelRefetch)||t}).then((()=>(this.updateResult(),this.currentResult)))}executeFetch(e){this.updateQuery();let t=this.currentQuery.fetch(this.options,e);return null!=e&&e.throwOnError||(t=t.catch(s.ZT)),t}updateStaleTimeout(){if(this.clearStaleTimeout(),s.sk||this.currentResult.isStale||!(0,s.PN)(this.options.staleTime))return;const e=(0,s.Kp)(this.currentResult.dataUpdatedAt,this.options.staleTime)+1;this.staleTimeoutId=setTimeout((()=>{this.currentResult.isStale||this.updateResult()}),e)}computeRefetchInterval(){var e;return"function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.currentResult.data,this.currentQuery):null!=(e=this.options.refetchInterval)&&e}updateRefetchInterval(e){this.clearRefetchInterval(),this.currentRefetchInterval=e,!s.sk&&!1!==this.options.enabled&&(0,s.PN)(this.currentRefetchInterval)&&0!==this.currentRefetchInterval&&(this.refetchIntervalId=setInterval((()=>{(this.options.refetchIntervalInBackground||i.j.isFocused())&&this.executeFetch()}),this.currentRefetchInterval))}updateTimers(){this.updateStaleTimeout(),this.updateRefetchInterval(this.computeRefetchInterval())}clearStaleTimeout(){this.staleTimeoutId&&(clearTimeout(this.staleTimeoutId),this.staleTimeoutId=void 0)}clearRefetchInterval(){this.refetchIntervalId&&(clearInterval(this.refetchIntervalId),this.refetchIntervalId=void 0)}createResult(e,t){const r=this.currentQuery,n=this.options,i=this.currentResult,o=this.currentResultState,c=this.currentResultOptions,l=e!==r,p=l?e.state:this.currentQueryInitialState,f=l?this.currentResult:this.previousQueryResult,{state:y}=e;let v,{dataUpdatedAt:m,error:b,errorUpdatedAt:R,fetchStatus:g,status:S}=y,O=!1,k=!1;if(t._optimisticResults){const s=this.hasListeners(),i=!s&&u(e,t),o=s&&h(e,r,t,n);(i||o)&&(g=(0,a.Kw)(e.options.networkMode)?"fetching":"paused",m||(S="loading")),"isRestoring"===t._optimisticResults&&(g="idle")}if(t.keepPreviousData&&!y.dataUpdatedAt&&null!=f&&f.isSuccess&&"error"!==S)v=f.data,m=f.dataUpdatedAt,S=f.status,O=!0;else if(t.select&&void 0!==y.data)if(i&&y.data===(null==o?void 0:o.data)&&t.select===this.selectFn)v=this.selectResult;else try{this.selectFn=t.select,v=t.select(y.data),v=(0,s.oE)(null==i?void 0:i.data,v,t),this.selectResult=v,this.selectError=null}catch(Q){0,this.selectError=Q}else v=y.data;if(void 0!==t.placeholderData&&void 0===v&&"loading"===S){let e;if(null!=i&&i.isPlaceholderData&&t.placeholderData===(null==c?void 0:c.placeholderData))e=i.data;else if(e="function"==typeof t.placeholderData?t.placeholderData():t.placeholderData,t.select&&void 0!==e)try{e=t.select(e),this.selectError=null}catch(Q){0,this.selectError=Q}void 0!==e&&(S="success",v=(0,s.oE)(null==i?void 0:i.data,e,t),k=!0)}this.selectError&&(b=this.selectError,v=this.selectResult,R=Date.now(),S="error");const I="fetching"===g,E="loading"===S,C="error"===S;return{status:S,fetchStatus:g,isLoading:E,isSuccess:"success"===S,isError:C,isInitialLoading:E&&I,data:v,dataUpdatedAt:m,error:b,errorUpdatedAt:R,failureCount:y.fetchFailureCount,failureReason:y.fetchFailureReason,errorUpdateCount:y.errorUpdateCount,isFetched:y.dataUpdateCount>0||y.errorUpdateCount>0,isFetchedAfterMount:y.dataUpdateCount>p.dataUpdateCount||y.errorUpdateCount>p.errorUpdateCount,isFetching:I,isRefetching:I&&!E,isLoadingError:C&&0===y.dataUpdatedAt,isPaused:"paused"===g,isPlaceholderData:k,isPreviousData:O,isRefetchError:C&&0!==y.dataUpdatedAt,isStale:d(e,t),refetch:this.refetch,remove:this.remove}}updateResult(e){const t=this.currentResult,r=this.createResult(this.currentQuery,this.options);if(this.currentResultState=this.currentQuery.state,this.currentResultOptions=this.options,(0,s.VS)(r,t))return;this.currentResult=r;const n={cache:!0};!1!==(null==e?void 0:e.listeners)&&(()=>{if(!t)return!0;const{notifyOnChangeProps:e}=this.options;if("all"===e||!e&&!this.trackedProps.size)return!0;const r=new Set(null!=e?e:this.trackedProps);return this.options.useErrorBoundary&&r.add("error"),Object.keys(this.currentResult).some((e=>{const s=e;return this.currentResult[s]!==t[s]&&r.has(s)}))})()&&(n.listeners=!0),this.notify({...n,...e})}updateQuery(){const e=this.client.getQueryCache().build(this.client,this.options);if(e===this.currentQuery)return;const t=this.currentQuery;this.currentQuery=e,this.currentQueryInitialState=e.state,this.previousQueryResult=this.currentResult,this.hasListeners()&&(null==t||t.removeObserver(this),e.addObserver(this))}onQueryUpdate(e){const t={};"success"===e.type?t.onSuccess=!e.manual:"error"!==e.type||(0,a.DV)(e.error)||(t.onError=!0),this.updateResult(t),this.hasListeners()&&this.updateTimers()}notify(e){n.V.batch((()=>{var t,r,s,n;if(e.onSuccess)null==(t=(r=this.options).onSuccess)||t.call(r,this.currentResult.data),null==(s=(n=this.options).onSettled)||s.call(n,this.currentResult.data,null);else if(e.onError){var i,o,a,c;null==(i=(o=this.options).onError)||i.call(o,this.currentResult.error),null==(a=(c=this.options).onSettled)||a.call(c,void 0,this.currentResult.error)}e.listeners&&this.listeners.forEach((e=>{e(this.currentResult)})),e.cache&&this.client.getQueryCache().notify({query:this.currentQuery,type:"observerResultsUpdated"})}))}}function u(e,t){return function(e,t){return!(!1===t.enabled||e.state.dataUpdatedAt||"error"===e.state.status&&!1===t.retryOnMount)}(e,t)||e.state.dataUpdatedAt>0&&l(e,t,t.refetchOnMount)}function l(e,t,r){if(!1!==t.enabled){const s="function"==typeof r?r(e):r;return"always"===s||!1!==s&&d(e,t)}return!1}function h(e,t,r,s){return!1!==r.enabled&&(e!==t||!1===s.enabled)&&(!r.suspense||"error"!==e.state.status)&&d(e,r)}function d(e,t){return e.isStaleByTime(t.staleTime)}var p=r(7294);const f=r(1688).useSyncExternalStore;function y(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}const v=p.createContext(y()),m=()=>p.useContext(v);var b=r(5945);const R=p.createContext(!1),g=()=>p.useContext(R);R.Provider;const S=(e,t)=>{(e.suspense||e.useErrorBoundary)&&(t.isReset()||(e.retryOnMount=!1))},O=e=>{p.useEffect((()=>{e.clearReset()}),[e])},k=({result:e,errorResetBoundary:t,useErrorBoundary:r,query:s})=>{return e.isError&&!t.isReset()&&!e.isFetching&&(n=r,i=[e.error,s],"function"==typeof n?n(...i):!!n);var n,i},I=e=>{e.suspense&&"number"!=typeof e.staleTime&&(e.staleTime=1e3)},E=(e,t,r)=>(null==e?void 0:e.suspense)&&((e,t)=>e.isLoading&&e.isFetching&&!t)(t,r),C=(e,t,r)=>t.fetchOptimistic(e).then((({data:t})=>{null==e.onSuccess||e.onSuccess(t),null==e.onSettled||e.onSettled(t,null)})).catch((t=>{r.clearReset(),null==e.onError||e.onError(t),null==e.onSettled||e.onSettled(void 0,t)}));function Q(e,t,r){return function(e,t){const r=(0,b.NL)({context:e.context}),s=g(),i=m(),o=r.defaultQueryOptions(e);o._optimisticResults=s?"isRestoring":"optimistic",o.onError&&(o.onError=n.V.batchCalls(o.onError)),o.onSuccess&&(o.onSuccess=n.V.batchCalls(o.onSuccess)),o.onSettled&&(o.onSettled=n.V.batchCalls(o.onSettled)),I(o),S(o,i),O(i);const[a]=p.useState((()=>new t(r,o))),c=a.getOptimisticResult(o);if(f(p.useCallback((e=>s?()=>{}:a.subscribe(n.V.batchCalls(e))),[a,s]),(()=>a.getCurrentResult()),(()=>a.getCurrentResult())),p.useEffect((()=>{a.setOptions(o,{listeners:!1})}),[o,a]),E(o,c,s))throw C(o,a,i);if(k({result:c,errorResetBoundary:i,useErrorBoundary:o.useErrorBoundary,query:a.getCurrentQuery()}))throw c.error;return o.notifyOnChangeProps?c:a.trackResult(c)}((0,s._v)(e,t,r),c)}}}]);