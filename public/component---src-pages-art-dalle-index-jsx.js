"use strict";(self.webpackChunkjonaso_de=self.webpackChunkjonaso_de||[]).push([[311],{6511:function(e,t,n){n.d(t,{Z:function(){return f}});var r=n(7294);function o(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const c={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0};class u extends r.Component{constructor(e){let t;super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this),t=this.props.breakpointCols&&this.props.breakpointCols.default?this.props.breakpointCols.default:parseInt(this.props.breakpointCols)||2,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((()=>{this.reCalculateColumnCount()}))):this.reCalculateColumnCount()}reCalculateColumnCount(){const e=window&&window.innerWidth||1/0;let t=this.props.breakpointCols;"object"!=typeof t&&(t={default:parseInt(t)||2});let n=1/0,r=t.default||2;for(let o in t){const i=parseInt(o);i>0&&e<=i&&i<n&&(n=i,r=t[o])}r=Math.max(1,parseInt(r)||1),this.state.columnCount!==r&&this.setState({columnCount:r})}itemsInColumns(){const e=this.state.columnCount,t=new Array(e),n=r.Children.toArray(this.props.children);for(let r=0;r<n.length;r++){const o=r%e;t[o]||(t[o]=[]),t[o].push(n[r])}return t}renderColumns(){const{column:e,columnAttrs:t={},columnClassName:n}=this.props,o=this.itemsInColumns(),a=100/o.length+"%";let s=n;s&&"string"!=typeof s&&(this.logDeprecated('The property "columnClassName" requires a string'),void 0===s&&(s="my-masonry-grid_column"));const c=l(l(l({},e),t),{},{style:l(l({},t.style),{},{width:a}),className:s});return o.map(((e,t)=>r.createElement("div",i({},c,{key:t}),e)))}logDeprecated(e){console.error("[Masonry]",e)}render(){const e=this.props,{children:t,breakpointCols:n,columnClassName:a,columnAttrs:l,column:s,className:c}=e,u=o(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let m=c;return"string"!=typeof c&&(this.logDeprecated('The property "className" requires a string'),void 0===c&&(m="my-masonry-grid")),r.createElement("div",i({},u,{className:m}),this.renderColumns())}}u.defaultProps=c;var m=u;var d={1200:4,980:3,700:2,default:5};var p=function(e,{threshold:t=0,root:n=null,rootMargin:o="0%",freezeOnceVisible:i=!1}){const{0:a,1:l}=(0,r.useState)(),s=(null==a?void 0:a.isIntersecting)&&i,c=([e])=>{l(e)};return(0,r.useEffect)((()=>{const r=null==e?void 0:e.current;if(!!!window.IntersectionObserver||s||!r)return;const i=new IntersectionObserver(c,{threshold:t,root:n,rootMargin:o});return i.observe(r),()=>i.disconnect()}),[null==e?void 0:e.current,JSON.stringify(t),n,o,s]),a},h=r.createElement;function f({images:e,next:t,fetchMore:n,isFetching:o}){let i=0;if(!e.length)return h("div",{className:"ui"},h("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},h("div",{className:"ui inverted text loader"},"Loading")));const a=(0,r.useRef)(null),l=(0,r.useRef)(null),s=p(a,{}),c=!(null==s||!s.isIntersecting);if(null!=l&&l.current){const e=null==l?void 0:l.current.querySelectorAll(".my-masonry-grid_column"),t=null==l?void 0:l.current.clientHeight;let n=0;e.forEach((e=>{let t=0;e.childNodes.forEach((e=>{t+=e.clientHeight})),n?t<n&&(n=t):n=t})),i=t-n}return t&&c&&!o&&(console.log("fetching MOAR!"),n()),h("section",{ref:l,style:{textAlign:"center",marginLeft:"30px",marginRight:"30px",maxWidth:"2000px",margin:"auto"}},h(m,{breakpointCols:d,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column"},e.map((e=>h("div",{key:encodeURI(e[0]),className:"gatsby-image-wrapper gatsby-image-wrapper-constrained",style:{backgroundColor:e[3]}},h("div",{style:{maxWidth:"400px",display:"block"}},h("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+e[2]+"' width='"+e[1]+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})),h("div",{"aria-hidden":"true",style:{opacity:0,transition:"opacity 500ms linear 0s",backgroundColor:e[3],position:"absolute",inset:"0px",objectFit:"cover"}}),h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",style:{objectFit:"cover",opacity:1},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:"",width:e[1],height:e[2]})),h("noscript",null,h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",width:e[1],height:e[2],style:{objectFit:"cover",opacity:0},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:""}))))))),h("div",{ref:a,style:{position:"relative",top:`-${i}px`,height:"1px",width:"1px"}}))}},7240:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(4160),o=n(7294),i=o.createElement;const a=(0,o.createContext)(null);function l({name:e,folder:t,shortname:n=null}){const r=(0,o.useContext)(a);return i("a",{folder:t,className:"item"+(r.generator===e?" active":""),onClick:r.handleMenuClick,onKeyDown:r.handleMenuClick},n||e)}function s({generator:e,byline:t,totalCount:n}){return i("div",null,i("h1",null,e),i("section",{style:{textAlign:"center",marginBottom:"2em"}},i("p",null,t,n&&(0===n?i("span",null," "):n>=100?`Latest ${n} images`:`${n} images`))),i("section",{style:{textAlign:"center",marginBottom:"2em"}},i("div",{className:"ui fluid pointing secondary six item menu"},i(a.Provider,{value:{handleMenuClick:e=>{e.preventDefault();const t=e.target.getAttribute("folder");(0,r.c4)(`/art/${t}/`)},generator:e}},i(l,{name:"Midjourney",folder:"midjourney"}),i(l,{name:"DALL-E",folder:"dalle"}),i(l,{name:"Stable Diffusion",folder:"stablediffusion"}),i(l,{name:"Latent Diffusion",folder:"latent-diffusion"}),i(l,{name:"VQGAN-CLIP",folder:"vqganclip"}),i(l,{name:"Misc. Text-To-Image Systems",folder:"misc",shortname:"Misc."})))))}},9820:function(e,t,n){n.d(t,{Z:function(){return h}});var r=n(4572),o=n(7294),i=n(4160),a=o.createElement;const l={navSpacer:{marginBottom:"2em"}},s=({active:e,item:t,url:n=null,link:r=null,handleItemClick:o=null})=>a("a",r?{key:t,href:r,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")}:{key:t,href:n,name:t,target:r?"_blank":"_self",rel:"noreferrer",tabIndex:-42,role:"presentation",onClick:o,className:"item"+(e?" active":"")},t),c=({active:e,item:t,link:n=null})=>a("a",{key:t,href:n,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")},t,a("i",{"aria-hidden":"true",class:"file pdf outline large icon",style:{marginLeft:".2em"}}));function u(){const{0:e,1:t}=(0,o.useState)("");function n(e){e.preventDefault();let n=e.target.getAttribute("href");const r=e.target.name.toLowerCase();t(r),n?(n="/"===n.charAt(0)?n.slice(1):n,(0,i.c4)(`/${n}`)):"home"===r?(0,i.c4)("/"):(0,i.c4)(`/${r}`)}return(0,o.useEffect)((()=>{const e=window.location.pathname.replace(/\//g,"").toLowerCase();t(e||"home")}),[]),a("header",null,a("div",{id:"desktopmenu"},a("div",{className:"ui fluid pointing stackable seven item menu",primary:"true"},a(s,{key:"home",active:"home"===e,item:"Home",handleItemClick:n}),a(s,{key:"publications",active:"publications"===e,item:"Publications",handleItemClick:n}),a(s,{key:"researchinterests",active:"research"===e||"researchinterests"===e,item:"Research Interests",url:"/research/interests",handleItemClick:n}),a(s,{key:"researchprojects",active:"researchprojects"===e,item:"Research Projects",url:"/research/projects",handleItemClick:n}),a(s,{key:"art",active:e.startsWith("art"),item:"Art",link:!1,header:!0,handleItemClick:n}),a(s,{key:"webdev",active:"webdev"===e,item:"WebDev Portfolio",link:"https://komasurfer.com/portfolio/"}),a(c,{key:"cv",active:"cv"===e,item:"CV",link:"/cv/oppenlaender-cv.pdf"}))),a("div",{style:l.navSpacer}))}var m=o.createElement;function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function h({children:e,style:t={}}){return m("div",{style:p({margin:"0 auto",clear:"both",maxWidth:1024,paddingBottom:"5em"},t)},m(u,null),e)}},8315:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(7294).createElement;function o(){return r("div",{className:"ui"},r("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},r("div",{className:"ui inverted text loader"},"Loading")))}},3124:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(7294),o=n(7240),i=n(9820),a=n(6511),l=n(8315),s=r.createElement;const c=`https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-dall-e.json?${Math.round(Date.now()/1e4)}`;function u(){const{0:e,1:t}=(0,r.useState)([]);return(0,r.useEffect)((()=>{(async()=>{const e=await(await fetch(c)).json();t(e)})()}),[]),s(r.Fragment,null,s(i.Z,{style:{paddingBottom:0}},s(o.Z,{generator:"DALL-E",totalCount:e.length})),e.length?s(a.Z,{images:e}):s(l.Z,null))}}}]);