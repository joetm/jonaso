"use strict";(self.webpackChunkjonaso_de=self.webpackChunkjonaso_de||[]).push([[869],{6511:function(e,t,r){r.d(t,{Z:function(){return m}});var o=r(7294);function n(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},s=Object.keys(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(o=0;o<s.length;o++)r=s[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e},s.apply(this,arguments)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){w(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function w(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const l={breakpointCols:void 0,className:void 0,columnClassName:void 0,children:void 0,columnAttrs:void 0,column:void 0};class c extends o.Component{constructor(e){let t;super(e),this.reCalculateColumnCount=this.reCalculateColumnCount.bind(this),this.reCalculateColumnCountDebounce=this.reCalculateColumnCountDebounce.bind(this),t=this.props.breakpointCols&&this.props.breakpointCols.default?this.props.breakpointCols.default:parseInt(this.props.breakpointCols)||2,this.state={columnCount:t}}componentDidMount(){this.reCalculateColumnCount(),window&&window.addEventListener("resize",this.reCalculateColumnCountDebounce)}componentDidUpdate(){this.reCalculateColumnCount()}componentWillUnmount(){window&&window.removeEventListener("resize",this.reCalculateColumnCountDebounce)}reCalculateColumnCountDebounce(){window&&window.requestAnimationFrame?(window.cancelAnimationFrame&&window.cancelAnimationFrame(this._lastRecalculateAnimationFrame),this._lastRecalculateAnimationFrame=window.requestAnimationFrame((()=>{this.reCalculateColumnCount()}))):this.reCalculateColumnCount()}reCalculateColumnCount(){const e=window&&window.innerWidth||1/0;let t=this.props.breakpointCols;"object"!=typeof t&&(t={default:parseInt(t)||2});let r=1/0,o=t.default||2;for(let n in t){const s=parseInt(n);s>0&&e<=s&&s<r&&(r=s,o=t[n])}o=Math.max(1,parseInt(o)||1),this.state.columnCount!==o&&this.setState({columnCount:o})}itemsInColumns(){const e=this.state.columnCount,t=new Array(e),r=o.Children.toArray(this.props.children);for(let o=0;o<r.length;o++){const n=o%e;t[n]||(t[n]=[]),t[n].push(r[o])}return t}renderColumns(){const{column:e,columnAttrs:t={},columnClassName:r}=this.props,n=this.itemsInColumns(),a=100/n.length+"%";let w=r;w&&"string"!=typeof w&&(this.logDeprecated('The property "columnClassName" requires a string'),void 0===w&&(w="my-masonry-grid_column"));const l=i(i(i({},e),t),{},{style:i(i({},t.style),{},{width:a}),className:w});return n.map(((e,t)=>o.createElement("div",s({},l,{key:t}),e)))}logDeprecated(e){console.error("[Masonry]",e)}render(){const e=this.props,{children:t,breakpointCols:r,columnClassName:a,columnAttrs:i,column:w,className:l}=e,c=n(e,["children","breakpointCols","columnClassName","columnAttrs","column","className"]);let p=l;return"string"!=typeof l&&(this.logDeprecated('The property "className" requires a string'),void 0===l&&(p="my-masonry-grid")),o.createElement("div",s({},c,{className:p}),this.renderColumns())}}c.defaultProps=l;var p=c;var u={1200:4,980:3,700:2,default:5};var d=function(e,{threshold:t=0,root:r=null,rootMargin:n="0%",freezeOnceVisible:s=!1}){const{0:a,1:i}=(0,o.useState)(),w=(null==a?void 0:a.isIntersecting)&&s,l=([e])=>{i(e)};return(0,o.useEffect)((()=>{const o=null==e?void 0:e.current;if(!!!window.IntersectionObserver||w||!o)return;const s=new IntersectionObserver(l,{threshold:t,root:r,rootMargin:n});return s.observe(o),()=>s.disconnect()}),[null==e?void 0:e.current,JSON.stringify(t),r,n,w]),a},h=o.createElement;function m({images:e,next:t,fetchMore:r,isFetching:n}){let s=0;if(!e.length)return h("div",{className:"ui"},h("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},h("div",{className:"ui inverted text loader"},"Loading")));const a=(0,o.useRef)(null),i=(0,o.useRef)(null),w=d(a,{}),l=!(null==w||!w.isIntersecting);if(null!=i&&i.current){const e=null==i?void 0:i.current.querySelectorAll(".my-masonry-grid_column"),t=null==i?void 0:i.current.clientHeight;let r=0;e.forEach((e=>{let t=0;e.childNodes.forEach((e=>{t+=e.clientHeight})),r?t<r&&(r=t):r=t})),s=t-r}return t&&l&&!n&&(console.log("fetching MOAR!"),r()),h("section",{ref:i,style:{textAlign:"center",marginLeft:"30px",marginRight:"30px",maxWidth:"2000px",margin:"auto"}},h(p,{breakpointCols:u,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column"},e.map((e=>h("div",{key:encodeURI(e[0]),className:"gatsby-image-wrapper gatsby-image-wrapper-constrained",style:{backgroundColor:e[3]}},h("div",{style:{maxWidth:"400px",display:"block"}},h("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+e[2]+"' width='"+e[1]+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})),h("div",{"aria-hidden":"true",style:{opacity:0,transition:"opacity 500ms linear 0s",backgroundColor:e[3],position:"absolute",inset:"0px",objectFit:"cover"}}),h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",style:{objectFit:"cover",opacity:1},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:"",width:e[1],height:e[2]})),h("noscript",null,h("picture",null,h("source",{type:"image/webp",srcSet:e[0]+" 400w",sizes:"(min-width: 400px) 400px, 100vw"}),h("img",{layout:"constrained",placeholder:"dominantColor",width:e[1],height:e[2],style:{objectFit:"cover",opacity:0},sizes:"(min-width: 400px) 400px, 100vw",decoding:"async",loading:"lazy",src:e[0],srcSet:e[0]+" 400w",alt:""}))))))),h("div",{ref:a,style:{position:"relative",top:`-${s}px`,height:"1px",width:"1px"}}))}},7240:function(e,t,r){r.d(t,{Z:function(){return w}});var o=r(4160),n=r(7294),s=n.createElement;const a=(0,n.createContext)(null);function i({name:e,folder:t,shortname:r=null}){const o=(0,n.useContext)(a);return s("a",{folder:t,className:"item"+(o.generator===e?" active":""),onClick:o.handleMenuClick,onKeyDown:o.handleMenuClick},r||e)}function w({generator:e,byline:t,totalCount:r}){return s("div",null,s("h1",null,e),s("section",{style:{textAlign:"center",marginBottom:"2em"}},s("p",null,t,r&&(0===r?s("span",null," "):r>=100?`Latest ${r} images`:`${r} images`))),s("section",{style:{textAlign:"center",marginBottom:"2em"}},s("div",{className:"ui fluid pointing secondary six item menu"},s(a.Provider,{value:{handleMenuClick:e=>{e.preventDefault();const t=e.target.getAttribute("folder");(0,o.c4)(`/art/${t}/`)},generator:e}},s(i,{name:"Midjourney",folder:"midjourney"}),s(i,{name:"DALL-E",folder:"dalle"}),s(i,{name:"Stable Diffusion",folder:"stablediffusion"}),s(i,{name:"Latent Diffusion",folder:"latent-diffusion"}),s(i,{name:"VQGAN-CLIP",folder:"vqganclip"}),s(i,{name:"Misc. Text-To-Image Systems",folder:"misc",shortname:"Misc."})))))}},9820:function(e,t,r){r.d(t,{Z:function(){return h}});var o=r(4572),n=r(7294),s=r(4160),a=n.createElement;const i={navSpacer:{marginBottom:"2em"}},w=({active:e,item:t,url:r=null,link:o=null,handleItemClick:n=null})=>a("a",o?{key:t,href:o,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")}:{key:t,href:r,name:t,target:o?"_blank":"_self",rel:"noreferrer",tabIndex:-42,role:"presentation",onClick:n,className:"item"+(e?" active":"")},t),l=({active:e,item:t,link:r=null})=>a("a",{key:t,href:r,name:t,target:"_blank",rel:"noreferrer",tabIndex:-42,role:"presentation",className:"item"+(e?" active":"")},t,a("i",{"aria-hidden":"true",class:"file pdf outline large icon",style:{marginLeft:".2em"}}));function c(){const{0:e,1:t}=(0,n.useState)("");function r(e){e.preventDefault();let r=e.target.getAttribute("href");const o=e.target.name.toLowerCase();t(o),r?(r="/"===r.charAt(0)?r.slice(1):r,(0,s.c4)(`/${r}`)):"home"===o?(0,s.c4)("/"):(0,s.c4)(`/${o}`)}return(0,n.useEffect)((()=>{const e=window.location.pathname.replace(/\//g,"").toLowerCase();t(e||"home")}),[]),a("header",null,a("div",{id:"desktopmenu"},a("div",{className:"ui fluid pointing stackable seven item menu",primary:"true"},a(w,{key:"home",active:"home"===e,item:"Home",handleItemClick:r}),a(w,{key:"publications",active:"publications"===e,item:"Publications",handleItemClick:r}),a(w,{key:"researchinterests",active:"research"===e||"researchinterests"===e,item:"Research Interests",url:"/research/interests",handleItemClick:r}),a(w,{key:"researchprojects",active:"researchprojects"===e,item:"Research Projects",url:"/research/projects",handleItemClick:r}),a(w,{key:"art",active:e.startsWith("art"),item:"Art",link:!1,header:!0,handleItemClick:r}),a(w,{key:"webdev",active:"webdev"===e,item:"WebDev Portfolio",link:"https://komasurfer.com/portfolio/"}),a(l,{key:"cv",active:"cv"===e,item:"CV",link:"/cv/oppenlaender-cv.pdf"}))),a("div",{style:i.navSpacer}))}var p=n.createElement;function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){(0,o.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function h({children:e,style:t={}}){return p("div",{style:d({margin:"0 auto",clear:"both",maxWidth:1024,paddingBottom:"5em"},t)},p(c,null),e)}},8315:function(e,t,r){r.d(t,{Z:function(){return n}});var o=r(7294).createElement;function n(){return o("div",{className:"ui"},o("div",{className:"ui active transition visible inverted dimmer",style:{display:"flex !important"}},o("div",{className:"ui inverted text loader"},"Loading")))}},9065:function(e,t,r){r.r(t),r.d(t,{default:function(){return c}});var o=r(7294),n=JSON.parse('[["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Tree%20of%20Life/1/175.webp",400,400,"#797467"],["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Tree%20Seasons/Autumn/50.webp",400,400,"#8D7E7B"],["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Tree%20Seasons/Winter/50.webp",400,400,"#848085"],["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Trees%20in%20the%20Wind/3/100.webp",400,400,"#8D8D81"],["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Trees%20in%20the%20Wind/2/100.webp",400,400,"#938C7C"],["https://www.jonaso.de/artworks/VQGANCLIP/Trees/Trees%20in%20the%20Wind/1/75.webp",400,400,"#8F9181"],["https://www.jonaso.de/artworks/VQGANCLIP/Crystals/Crystal%20of%20Life/7/650.webp",400,400,"#8B8381"],["https://www.jonaso.de/artworks/VQGANCLIP/Crystals/Crystal%20of%20Life/3/106.webp",400,400,"#79675C"],["https://www.jonaso.de/artworks/VQGANCLIP/Crystals/Crystal%20of%20Life/1/175.webp",400,400,"#6B6557"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/Human%20Centipede/2/human-centipede.webp",400,400,"#BBBBAB"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/American%20Beauty/1/0099.webp",400,400,"#A5503D"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/Pulp%20Fiction/the%20choice%20is%20yours%20painting%20by%20A.%20K.%20in%20the%20style%20of%20pulp%20fiction/350.webp",400,400,"#594836"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/Big%20Lebowski/run-3/316.webp",400,400,"#96734D"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/Mad%20Max/Mad%20Max%20ferrari%20by%20Abimelec%20Arellano/run-1/0057.webp",400,400,"#A2886B"],["https://www.jonaso.de/artworks/VQGANCLIP/Movies/Mad%20Max/Mad%20Max%20ferrari%20by%20Abimelec%20Arellano/run-2/100.webp",400,400,"#B4936C"],["https://www.jonaso.de/artworks/VQGANCLIP/Graffiti/banksy/350.webp",400,400,"#7D7557"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/Skull%20portrait%20by%20Maciej%20Drabik/0074.webp",400,400,"#6F6D56"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/Puking%20Skull/3%20Abstract%20skull%20puking%2C%20painting%20by%20Maciej%20Drabik%2C%20trending%20on%20artstation/650.webp",400,400,"#6C6153"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/Puking%20Skull/5%20-%20skull%20puking%2C%20painting%20by%20Maciej%20Drabik%2C%20trending%20on%20artstation/150.webp",400,400,"#837965"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/Puking%20Skull/7%20-%20a%20skull%20puking%20colors%2C%20painting%20by%20Maciej%20Drabik%2C%20trending%20on%20artstation/150.webp",400,400,"#7B8178"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/2/100.webp",400,400,"#556A62"],["https://www.jonaso.de/artworks/VQGANCLIP/Skulls/1%20Abstract%20skull%20by%20Maciej%20Drabik%20trending%20on%20artstation/314.webp",400,400,"#8B8F80"],["https://www.jonaso.de/artworks/VQGANCLIP/Cottage/Thomas%20Kinkade/2/100.webp",400,400,"#778A8F"],["https://www.jonaso.de/artworks/VQGANCLIP/Cottage/Thomas%20Kinkade/1/150.webp",400,400,"#6D7F88"],["https://www.jonaso.de/artworks/VQGANCLIP/Aliens/Third%20Eye/6/100.webp",400,400,"#A69782"],["https://www.jonaso.de/artworks/VQGANCLIP/Cloud%20Assassin/2/300.webp",400,219,"#6E768A"],["https://www.jonaso.de/artworks/VQGANCLIP/Cloud%20Assassin/4/100.webp",400,219,"#9D9296"],["https://www.jonaso.de/artworks/VQGANCLIP/Human/Face/2/200.webp",400,400,"#AFA091"],["https://www.jonaso.de/artworks/VQGANCLIP/Ghost%20in%20the%20Shell/2/4.webp",400,608,"#4C576C"],["https://www.jonaso.de/artworks/VQGANCLIP/The%20Other%20Team/1/200.webp",400,533,"#978386"],["https://www.jonaso.de/artworks/VQGANCLIP/Distracted%20World/3/125.webp",400,400,"#506683"],["https://www.jonaso.de/artworks/VQGANCLIP/Distracted%20World/2/125.webp",400,400,"#6A758C"],["https://www.jonaso.de/artworks/VQGANCLIP/Distracted%20World/1/100.webp",400,400,"#6C7873"],["https://www.jonaso.de/artworks/VQGANCLIP/China/Shamate/3/300.webp",400,296,"#5B635F"],["https://www.jonaso.de/artworks/VQGANCLIP/Devil/Al%20Pacino/3/50.webp",400,514,"#AB6C4E"],["https://www.jonaso.de/artworks/VQGANCLIP/Devil/Al%20Pacino/4/100.webp",400,514,"#A8664F"],["https://www.jonaso.de/artworks/VQGANCLIP/Devil/Al%20Pacino/1/50.webp",400,225,"#AB5947"],["https://www.jonaso.de/artworks/VQGANCLIP/Portraits/Thomas%20Nast/1/75.webp",400,384,"#8D8773"],["https://www.jonaso.de/artworks/VQGANCLIP/Portraits/Alexa%20Meade/4/125.webp",400,384,"#A78D74"],["https://www.jonaso.de/artworks/VQGANCLIP/Portraits/Alexa%20Meade/1/100.webp",400,384,"#708C90"],["https://www.jonaso.de/artworks/VQGANCLIP/Portraits/5/50.webp",400,384,"#62837A"],["https://www.jonaso.de/artworks/VQGANCLIP/Portraits/1/0020.webp",400,384,"#9E8D8D"],["https://www.jonaso.de/artworks/VQGANCLIP/Helmet/3/150.webp",400,416,"#677A86"],["https://www.jonaso.de/artworks/VQGANCLIP/Buildings/Brutalist%20Building/3/75.webp",400,400,"#717E6D"],["https://www.jonaso.de/artworks/VQGANCLIP/Buildings/Brutalist%20Building/2/100.webp",400,400,"#797E76"],["https://www.jonaso.de/artworks/VQGANCLIP/Buildings/Brutalist%20Building/1/200.webp",400,400,"#737B6D"],["https://www.jonaso.de/artworks/VQGANCLIP/abstract/redgreenorange/50.webp",400,400,"#685230"],["https://www.jonaso.de/artworks/VQGANCLIP/Artificial%20Intelligence/AI%20Overlord/7/325.webp",400,400,"#7290A4"],["https://www.jonaso.de/artworks/VQGANCLIP/Artificial%20Intelligence/AI%20Overlord/2/75.webp",400,400,"#6B83A0"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Eye/2/375.webp",400,400,"#66665B"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Eye/1/650.webp",400,400,"#8A786D"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Well/1/realesrgan/1125_out.webp",400,400,"#817965"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring/1/200.webp",400,400,"#645E56"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring%20%28animated%29/2/4.webp",400,400,"#6F5E54"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring%20%28animated%29/6/49.webp",400,400,"#8A938A"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring%20%28animated%29/4/9.webp",400,400,"#EAE9E8"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring%20%28animated%29/1/2.webp",400,400,"#7E6764"],["https://www.jonaso.de/artworks/VQGANCLIP/Rings/Ring%20of%20Fire/Fire%20Ring%20%28animated%29/1/1.webp",400,400,"#9B856F"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Parthenon/4/100.webp",400,528,"#836E65"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/9/125.webp",400,254,"#796962"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/7/75.webp",400,254,"#A1916F"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/3/50.webp",400,254,"#745E57"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/2/100.webp",400,254,"#816B67"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/6/75.webp",400,254,"#9E8465"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/5/50.webp",400,254,"#8C7855"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/8/50.webp",400,254,"#7C6861"],["https://www.jonaso.de/artworks/VQGANCLIP/Greece/Athens/4/75.webp",400,254,"#878A76"],["https://www.jonaso.de/artworks/VQGANCLIP/Illuminati/Burning%20Cross/3/50.webp",400,466,"#645649"],["https://www.jonaso.de/artworks/VQGANCLIP/Illuminati/Burning%20Cross/2/125.webp",400,466,"#4F402E"],["https://www.jonaso.de/artworks/VQGANCLIP/Illuminati/Burning%20Cross/1/150.webp",400,400,"#6A5336"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Self-portrait/run-8/50.webp",400,400,"#B8A291"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Self-portrait/run-5/350.webp",400,533,"#AA9D8B"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Gate%20to%20hell/run-9/200.webp",400,400,"#7E684C"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Gate%20to%20hell/run-15/500.webp",400,400,"#605742"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Gate%20to%20hell/run-14/200.webp",400,400,"#866B4D"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Gate%20to%20hell/run-10/250.webp",400,400,"#6F6148"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Hellish%20Inferno/run-4/300.webp",400,516,"#755942"],["https://www.jonaso.de/artworks/VQGANCLIP/Francisco%20Goya/Hellish%20Inferno/run-2/600.webp",400,516,"#6B4935"],["https://www.jonaso.de/artworks/VQGANCLIP/Isometric/3/100.webp",400,400,"#7C9489"],["https://www.jonaso.de/artworks/VQGANCLIP/Isometric/2/100.webp",400,400,"#7A7773"],["https://www.jonaso.de/artworks/VQGANCLIP/Isometric/1/150.webp",400,400,"#94A69A"],["https://www.jonaso.de/artworks/VQGANCLIP/Academia/Tenured%20Professor/1/400.webp",400,400,"#956856"],["https://www.jonaso.de/artworks/VQGANCLIP/King/Emperor%20has%20no%20clothes/2/325.webp",400,322,"#716B74"],["https://www.jonaso.de/artworks/VQGANCLIP/King/Emperor%20has%20no%20clothes/1/225.webp",400,322,"#807B68"],["https://www.jonaso.de/artworks/VQGANCLIP/Women/Beach/1/150.webp",400,400,"#B4BCA8"],["https://www.jonaso.de/artworks/VQGANCLIP/Women/Pensive%20Woman/200.webp",400,400,"#98754C"],["https://www.jonaso.de/artworks/VQGANCLIP/Disco/3/RealESRGAN/250.webp",400,266,"#6B5656"],["https://www.jonaso.de/artworks/VQGANCLIP/Disco/1/RealESRGAN/175.webp",400,266,"#76605A"],["https://www.jonaso.de/artworks/VQGANCLIP/People/Human%20Starving/2/450.webp",400,400,"#7A7766"],["https://www.jonaso.de/artworks/VQGANCLIP/People/Mark%20Zuckerberg/2/325.webp",400,216,"#7A7D78"],["https://www.jonaso.de/artworks/VQGANCLIP/People/Human%20with%20Horse%20Head/2/25.webp",400,342,"#90836C"],["https://www.jonaso.de/artworks/VQGANCLIP/Coconut/Coconut%20Love/1/200.webp",400,400,"#698A74"],["https://www.jonaso.de/artworks/VQGANCLIP/Shapes/Geometric%20Abstraction/1/350.webp",400,400,"#BAB6B7"],["https://www.jonaso.de/artworks/VQGANCLIP/Crime/The%20One%20Who%20Knocks/5/350.webp",400,520,"#616554"],["https://www.jonaso.de/artworks/VQGANCLIP/War/Soldier/1/75.webp",400,466,"#695534"],["https://www.jonaso.de/artworks/VQGANCLIP/War/War%20Memorial/3/200.webp",400,400,"#66655F"],["https://www.jonaso.de/artworks/VQGANCLIP/War/War%20Memorial/2/100.webp",400,400,"#7A716A"],["https://www.jonaso.de/artworks/VQGANCLIP/War/War%20Memorial/6/125.webp",400,400,"#7A807E"],["https://www.jonaso.de/artworks/VQGANCLIP/Cthulhu/ctulhu%20swallows%20earth%20by%20greg%20rutkowski%20%28target%20images%29/run%204/150.webp",400,400,"#435B5D"],["https://www.jonaso.de/artworks/VQGANCLIP/Cthulhu/ctulhu%20swallows%20earth%20by%20greg%20rutkowski%20%28target%20images%29/run%207/300.webp",400,400,"#435152"]]'),s=r(7240),a=r(9820),i=r(6511),w=r(8315),l=o.createElement;function c(){return l(o.Fragment,null,l(a.Z,{style:{paddingBottom:0}},l(s.Z,{generator:"VQGAN-CLIP",totalCount:n.length})),n.length?l(i.Z,{images:n}):l(w.Z,null))}}}]);