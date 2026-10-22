const fs = require('fs');
const path = require('path');
const sharp = require(process.env.SHARP_MODULE || 'sharp');
const dir = __dirname;
const original = fs.readFileSync(path.join(dir,'..','cyberpunk-banner.svg'),'utf8');
let workstation = original.slice(original.indexOf('<g shape-rendering=')).replace('</svg>','');
workstation = workstation.replace('translate(805 62) scale(4)','translate(810 118) scale(3.35)');
const colors = {'#22d3ee':'#c4f36b','#a78bfa':'#a1adbc','#67e8f9':'#e2f8b5','#c28c6d':'#a8aeb5','#ad765d':'#858d97','#dda381':'#c5cbd1','#8d5e4c':'#717b85','#34446b':'#3b4651','#465a87':'#53616b','#071a29':'#0b1419'};
for(const [a,b] of Object.entries(colors))workstation=workstation.split(a).join(b);
function svg(frame) {
 const phase=frame/32*Math.PI*2;
 let stars='';
 for(let i=0;i<72;i++){let x=735+(i*83%430),y=44+(i*47%292);stars+='<rect x="'+x+'" y="'+y+'" width="2" height="2" fill="#bac4ce" opacity="'+(.12+.17*(1+Math.sin(phase+i))/2)+'"/>';}
 let trees='';
 for(let i=0;i<15;i++){let x=735+i*33,h=35+(i*47%75);trees+='<path d="M'+x+' 343v-'+h+'m0 14l-12 13m12-8l11 12m-11 0l-18 17m18-10l16 16" stroke="#263139" stroke-width="3" fill="none"/>';}
 const pulse=775+(frame*10)%320;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="400" viewBox="0 0 1200 400" role="img" aria-labelledby="title desc">
<title id="title">Shakeeb Aduham — embedded systems in progress</title><desc id="desc">An original dark terminal scene with a pixel workstation, moonlit trees, and a subtle lime signal.</desc>
<defs>
<pattern id="dots" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="1" height="1" fill="#9eabb5" opacity=".10"/></pattern>
<linearGradient id="sky" x1="0" x2="1"><stop stop-color="#0b1015"/><stop offset="1" stop-color="#151d26"/></linearGradient>
</defs>
<rect x="1" y="1" width="1198" height="398" rx="12" fill="#0b1015" stroke="#35404b"/>
<path d="M1 39H1199" stroke="#35404b"/>
<g fill="#87939d"><circle cx="25" cy="21" r="4"/><circle cx="41" cy="21" r="4"/><circle cx="57" cy="21" r="4"/></g>
<g font-family="Consolas,monospace" fill="#9aa7b2" font-size="12" letter-spacing="2"><text x="82" y="26">SHA-KEEB / HARDWARE LAB</text><text x="1060" y="26">EST. / CSE</text></g>
<path d="M727 40H1198V360H727Z" fill="url(#sky)"/>
<path d="M735 40H1198V360H735Z" fill="url(#dots)"/>
${stars}
<circle cx="1080" cy="100" r="37" fill="#c6cdd1" opacity=".75"/>
<circle cx="1095" cy="88" r="32" fill="#151d26"/>
<path d="M727 293L805 247 856 280 940 225 1032 280 1110 233 1198 282V360H727Z" fill="#1b252e"/>
${trees}
<rect x="776" y="108" width="379" height="240" rx="3" fill="#0b1015" fill-opacity=".85" stroke="#56616c"/>
<path d="M776 131H1155" stroke="#56616c"/>
<g font-family="Consolas,monospace" font-size="10" fill="#a6b1ba"><text x="790" y="124">WORKBENCH.EXE</text><text x="1115" y="124">_ □ ×</text></g>
${workstation}
<path d="M792 334H823L831 325H846L854 334H1118" stroke="#506335" stroke-width="2" fill="none"/>
<rect x="${pulse}" y="331" width="13" height="4" fill="#c4f36b" opacity=".8"/>
<g font-family="Consolas,monospace">
<text x="48" y="91" fill="#c4f36b" font-size="12" letter-spacing="3">CODE / CIRCUITS / CONTROL</text>
<text x="45" y="161" fill="#f0f2ef" font-size="51" font-weight="700" letter-spacing="-2">SHAKEEB ADUHAM</text>
<text x="48" y="202" fill="#bec7cd" font-size="18">Computer Systems Engineering · SLIIT</text>
<text x="48" y="246" fill="#e1e6df" font-size="20">Aspiring Embedded Systems Engineer</text>
<text x="48" y="287" fill="#8e9da8" font-size="14">Learning where software meets the physical world.</text>
<text x="48" y="330" fill="#c4f36b" font-size="13">&gt; learn. build. measure. improve.</text>
<rect x="356" y="319" width="8" height="14" fill="#c4f36b" opacity="${.25+.65*(1+Math.sin(phase))/2}"/>
</g>
<path d="M24 361H1176" stroke="#35404b"/>
<g font-family="Consolas,monospace" font-size="11" letter-spacing="2" fill="#8d9aa5"><text x="48" y="384">AUTOMOTIVE / INDUSTRIAL / AEROSPACE</text><text x="898" y="384">SYSTEMS IN PROGRESS</text></g>
<rect x="1164" y="375" width="6" height="6" fill="#c4f36b" opacity="${.4+.5*(1+Math.sin(phase))/2}"/>
</svg>`;
}
async function main(){
 fs.mkdirSync(path.join(dir,'frames'),{recursive:true});
 for(let i=0;i<32;i++){const s=svg(i);if(i===0)fs.writeFileSync(path.join(dir,'..','embedded-banner.svg'),s);await sharp(Buffer.from(s)).png().toFile(path.join(dir,'frames',String(i).padStart(2,'0')+'.png'));}
}
main().catch(e=>{console.error(e);process.exit(1)});