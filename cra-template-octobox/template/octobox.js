let config={rootPath:""};const buildConfigRootPath=async()=>{const t=require("fs-extra");await(async()=>{let e=await t.readJson(`${__dirname}/package.json`);config.rootPath=e.homepage,config.rootPath.endsWith("/")&&(config.rootPath=config.rootPath.substring(0,config.rootPath.length-1))})().catch(t=>console.log(t))},buildRoutes=async()=>{const t=require("fs-extra"),e=require("fast-glob"),n=require("replaceall");await(async()=>{try{const o=(await e("src/pages/**/{Index.{tsx,jsx},[[]*.{tsx,jsx}}")).map(t=>{let e=t.replace("src/pages/","");t=e.endsWith(".tsx")?e.substring(0,e.length-4):e,e.endsWith("Index.tsx")&&(e=e.substring(0,e.length-10)),e.endsWith(".tsx")&&(e=e.substring(0,e.length-4)),e=n("[...","*",e),e=n("[",":",e),e=n("]","",e);for(const t of e)if("*"===t){const n=e.substring(e.indexOf(t));n.substring(1,n.indexOf("/")),e=e.replace(n,"")}return e.endsWith("/")||(e+="/"),e.startsWith("/")||(e=`/${e}`),e.toLowerCase(),{path:e,component:`./pages/${t}`}});let a=await t.readFile(`${__dirname}/src/Router.tsx`);const s=(a=a.toString()).substring(a.indexOf("// routes-begin"),a.indexOf("// routes-end"));let i="// routes-begin\n// AUTO-GENERATED SECTION - DO NOT EDIT";if(o.length>0){for(const t of o)i+=`\nimport page${o.indexOf(t)} from "${t.component}";`;i+="\nconst routes = [ ";for(const t of o){const e=o.indexOf(t);i+=`{ path: "${t.path}", component: page${e} }, `}i=i.substring(0,i.length-2),i+=" ];",i+="\n"}else i+="\nconst routes = null;\n";i+=`const appBasename = "${config.rootPath}";\nexport { appBasename };\n`;const r=n(s,i,a);await t.writeFile(`${__dirname}/src/Router.tsx`,r)}catch(t){console.log(t)}})().catch(t=>console.log(t))},buildStaticNotFoundPage=async()=>{const t=require("fs-extra"),e=require("replaceall");await(async()=>{let n={};config.rootPath.startsWith("/")?n.rootPath=config.rootPath.substring(1):n.rootPath=config.rootPath;let o=n.rootPath.split("/").length;""===n.rootPath.split("/")[n.rootPath.split("/").length-1]&&o--;let a=await t.readFile(`${__dirname}/public/404.html`);const s=(a=a.toString()).substring(a.indexOf("// path-begin"),a.indexOf("// path-end"));let i="// path-begin\n    // AUTO-GENERATED SECTION - DO NOT EDIT\n";const r=e(s,i+=`    var pathSegmentsToKeep = ${o};\n    `,a);await t.writeFile(`${__dirname}/public/404.html`,r)})().catch(t=>console.log(t))},runScripts=async()=>{await buildConfigRootPath(),await buildRoutes(),await buildStaticNotFoundPage()};runScripts().catch(t=>console.log(t));