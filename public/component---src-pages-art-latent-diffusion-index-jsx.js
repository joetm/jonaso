"use strict";(self.webpackChunkjonaso_de=self.webpackChunkjonaso_de||[]).push([[383],{6511:function(e,t,n){n.d(t,{Z:function(){return f}});var o=n(7294);function r(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},i.apply(this,arguments)}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const c={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0};class u extends o.Component{constructor(e){let t;super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this),t=this.props.breakpointCols&&this.props.breakpointCols.default?this.props.breakpointCols.default:parseInt(this.props.breakpointCols)||2,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((()=>{this.reCalculateColumnCount()}))):this.reCalculateColumnCount()}reCalculateColumnCount(){const e=window&&window.innerWidth||1/0;let t=this.props.breakpointCols;"object"!=typeof t&&(t={default:parseInt(t)||2});let n=1/0,o=t.default||2;for(let r in t){const i=parseInt(r);i>0&&e<=i&&i<n&&(n=i,o=t[r])}o=Math.max(1,parseInt(o)||1),this.state.columnCount!==o&&this.setState({columnCount:o})}itemsInColumns(){const e=this.state.columnCount,t=new Array(e),n=o.Children.toArray(this.props.children);for(let o=0;o<n.length;o++){const r=o%e;t[r]||(t[r]=[]),t[r].push(n[o])}return t}renderColumns(){const{column:e,columnAttrs:t={},columnClassName:n}=this.props,r=this.itemsInColumns(),l=100/r.length+"%";let a=n;a&&"string"!=typeof a&&(this.logDeprecated('The property "columnClassName" requires a string'),void 0===a&&(a="my-masonry-grid_column"));const c=s(s(s({},e),t),{},{style:s(s({},t.style),{},{width:l}),className:a});return r.map(((e,t)=>o.createElement("div",i({},c,{key:t}),e)))}logDeprecated(e){console.error("[Masonry]",e)}render(){const e=this.props,{children:t,breakpointCols:n,columnClassName:l,columnAttrs:s,column:a,className:c}=e,u=r(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let m=c;return"string"!=typeof c&&(this.logDeprecated('The property "className" requires a string'),void 0===c&&(m="my-masonry-grid")),o.createElement("div",i({},u,{className:m}),this.renderColumns())}}u.defaultProps=c;var m=u;var d={1200:4,980:3,700:2,default:5};var p=function(e,{threshold:t=0,root:n=null,rootMargin:r="0%",freezeOnceVisible:i=!1}){const{0:l,1:s}=(0,o.useState)(),a=(null==l?void 0:l.isIntersecting)&&i,c=([e])=>{s(e)};return(0,o.useEffect)((()=>{const o=null==e?void 0:e.current;if(!!!window.IntersectionObserver||a||!o)return;const i=new IntersectionObserver(c,{threshold:t,root:n,rootMargin:r});return i.observe(o),()=>i.disconnect()}),[null==e?void 0:e.current,JSON.stringify(t),n,r,a]),l},h=o.createElement;function f({images:e,next:t,fetchMore:n,isFetching:r}){let i=0;if(!e.length)return h("div",{className:"ui"},h("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},h("div",{className:"ui inverted text loader"},"Loading")));const l=(0,o.useRef)(null),s=(0,o.useRef)(null),a=p(l,{}),c=!(null==a||!a.isIntersecting);if(null!=s&&s.current){const e=null==s?void 0:s.current.querySelectorAll(".my-masonry-grid_column"),t=null==s?void 0:s.current.clientHeight;let n=0;e.forEach((e=>{let t=0;e.childNodes.forEach((e=>{t+=e.clientHeight})),n?t<n&&(n=t):n=t})),i=t-n}return t&&c&&!r&&(console.log("fetching MOAR!"),n()),h("section",{ref:s,style:{textAlign:"center",marginLeft:"30px",marginRight:"30px",maxWidth:"2000px",margin:"auto"}},h(m,{breakpointCols:d,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column"},e.map((e=>h("div",{key:encodeURI(e[0]),className:"gatsby-image-wrapper gatsby-image-wrapper-constrained",style:{backgroundColor:e[3]}},h("div",{style:{maxWidth:"400px",display:"block"}},h("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+e[2]+"' width='"+e[1]+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})),h("div",{"aria-hidden":"true",style:{opacity:0,transition:"opacity 500ms linear 0s",backgroundColor:e[3],position:"absolute",inset:"0px",objectFit:"cover"}}),h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",style:{objectFit:"cover",opacity:1},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:"",width:e[1],height:e[2]})),h("noscript",null,h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",width:e[1],height:e[2],style:{objectFit:"cover",opacity:0},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:""}))))))),h("div",{ref:l,style:{position:"relative",top:`-${i}px`,height:"1px",width:"1px"}}))}},7240:function(e,t,n){n.d(t,{Z:function(){return a}});var o=n(4160),r=n(7294),i=r.createElement;const l=(0,r.createContext)(null);function s({name:e,folder:t,shortname:n=null}){const o=(0,r.useContext)(l);return i("a",{folder:t,className:"item"+(o.generator===e?" active":""),onClick:o.handleMenuClick,onKeyDown:o.handleMenuClick},n||e)}function a({generator:e,byline:t,totalCount:n}){return i("div",null,i("h1",null,e),i("section",{style:{textAlign:"center",marginBottom:"2em"}},i("p",null,t,n&&(0===n?i("span",null," "):n>=100?`Latest ${n} images`:`${n} images`))),i("section",{style:{textAlign:"center",marginBottom:"2em"}},i("div",{className:"ui fluid pointing secondary six item menu"},i(l.Provider,{value:{handleMenuClick:e=>{e.preventDefault();const t=e.target.getAttribute("folder");(0,o.c4)(`/art/${t}/`)},generator:e}},i(s,{name:"Midjourney",folder:"midjourney"}),i(s,{name:"DALL-E",folder:"dalle"}),i(s,{name:"Stable Diffusion",folder:"stablediffusion"}),i(s,{name:"Latent Diffusion",folder:"latent-diffusion"}),i(s,{name:"VQGAN-CLIP",folder:"vqganclip"}),i(s,{name:"Misc. Text-To-Image Systems",folder:"misc",shortname:"Misc."})))))}},8315:function(e,t,n){n.d(t,{Z:function(){return r}});var o=n(7294).createElement;function r(){return o("div",{className:"ui"},o("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},o("div",{className:"ui inverted text loader"},"Loading")))}},9650:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var o=n(7294),r=n(477),i=n(7240),l=n(9820),s=n(6511),a=n(8315),c=o.createElement;const u=`https://raw.githubusercontent.com/joetm/jonaso/master/public/artworks/json/webp-latent-diffusion.json?${Math.round(Date.now()/1e4)}`;function m(){const{0:e,1:t}=(0,o.useState)([]),{isLoading:n,data:m}=(0,r.a)({queryKey:["webp-latent-diffusion"],queryFn:()=>fetch(u).then((e=>e.json()))});return(0,o.useEffect)((()=>{m&&t(m)}),[m]),n?c(a.Z,null):c(o.Fragment,null,c(l.Z,{style:{paddingBottom:0}},c(i.Z,{generator:"Latent Diffusion",totalCount:e.length})),c(s.Z,{images:e}))}}}]);