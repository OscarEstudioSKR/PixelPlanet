(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(a,e,i){a.exports=i.p+"static/media/SpritesTerreno01.ffc5ffb0.jpg"},function(a,e,i){a.exports=i.p+"static/media/SpritesTerreno02.87139cf4.jpg"},,,,,,function(a,e,i){a.exports=i.p+"static/media/SpritesTerreno03.3e1f710f.jpg"},,,function(a,e,i){a.exports=i.p+"static/media/Personajes01.0835a94b.png"},function(a,e,i){a.exports=i(25)},,,,,,function(a,e,i){},function(a,e,i){},function(a,e,i){},,,,,function(a,e,i){"use strict";i.r(e);var o=i(0),n=i.n(o),t=i(10),s=i.n(t),c=(i(18),i(3)),r=i(4),l=i(6),d=i(5),u=i(7),m=(i(19),{config:{numCasillas:80,tamCasilla:80,vista:"",tablaVacia:{id:0,pos:[0,0],obstaculo:!1,penalizacionMov:0,imagenEncadenada:!1,imgSuelo:"",posImg:[0,0]},listaNombresF:["Lara","Eva","Clara","Marta","Fatima","Anna","Lucia","Carmen"]},tabla:[],seres:[],listaNecesidades:[{requisito:function(a){return a.agotamiento>75},estado:"Agotado",accion:"Agotado",efecto:"Dormido",tiempoAccion:50}],listaMemorias:[{id:0,nombre:"Dormir en el suelo",detonante:"Agotado",accion:"Yendo a dormir",satisfaccionGeneral:5,satisfaccionEspecifica:[{id:0,idPos:33,especifica:50}],origenDescubrimiento:"Natal",edadDescubrimiento:0,obtiene:function(a){return m.seres[a.id].agotamiento=10}}]});function p(a){var e=Math.floor(a/m.config.numCasillas);return[Math.abs(a-e*m.config.numCasillas),e]}function g(a,e){return Math.floor(Math.random()*(e-a+1))+a}function f(a){return a[0]+a[1]*m.config.numCasillas}function b(a){var e=[],i=m.config.numCasillas*m.config.numCasillas,o=m.config.numCasillas;return a-o>=0&&e.push(a-o),a-o+1>=0&&p(a-o+1)[1]===p(a-o)[1]&&e.push(a-o+1),p(a+1)[1]===p(a)[1]&&e.push(a+1),a+o+1<i-1&&p(a+o+1)[1]===p(a+o)[1]&&e.push(a+o+1),a+o<i-1&&e.push(a+o),a+o-1<i-1&&p(a+o-1)[1]===p(a+o)[1]&&e.push(a+o-1),p(a-1)[1]===p(a)[1]&&e.push(a-1),a-o-1>=0&&p(a-o-1)[1]===p(a-o)[1]&&e.push(a-o-1),e}function v(a,e){return Math.abs(p(a)[0]-p(e)[0])+Math.abs(p(a)[1]-p(e)[1])}function h(a,e){var i=p(a),o=p(e);return e<a?o[1]===i[1]?7:o[0]>i[0]?2:o[0]<i[0]?8:1:e>a?o[1]===i[1]?3:o[0]>i[0]?4:o[0]<i[0]?6:5:0}var C=i(1),I=i.n(C),M=i(2),w=i.n(M),k=i(8),j=i.n(k),E=i(11),A=i.n(E);function y(a){switch(a){case"Valle":x("expansiva",300,500,2,3,I.a,"elevacion"),x("compacta",300,500,2,5,I.a,"elevacion"),x("compacta",1,5,20,30,I.a,"elevacion");break;case"Monta\xf1a":x("expansiva",300,500,2,3,I.a,"elevacion"),x("compacta",50,200,10,20,I.a,"elevacion"),x("compacta",1,20,20,30,I.a,"elevacion");break;case"Lagos":x("expansiva",300,500,2,3,w.a,"agua"),x("compacta",50,200,10,20,w.a,"agua"),x("compacta",20,50,20,30,w.a,"suelo");break;case"Pradera":x("repartida",1,100,5,10,w.a,"arboledaVerde"),x("expansiva",60,150,2,4,w.a,"arboledaVerde"),x("expansiva",5,10,1,3,w.a,"agrupacion"),x("expansiva",5,10,1,3,w.a,"agrupacion"),x("expansiva",5,10,1,3,w.a,"agrupacion"),x("expansiva",5,10,1,3,w.a,"agrupacion"),x("expansiva",5,10,1,3,I.a,"agrupacion"),x("expansiva",5,10,1,3,I.a,"agrupacion");break;case"Bosque":x("compacta",50,150,3,8,j.a,"interior"),x("expansiva",400,800,2,4,j.a,"interior"),x("repartida",20,50,2,4,j.a,"interior")}}function x(a,e,i,o,n,t,s){for(var c=m.config.numCasillas*m.config.numCasillas,r=[],l=[],d=0;d<g(o,n);d++){r=[g(0,c)];for(var u=0;u<g(e,i);u++)"expansiva"===a?r=r.concat(b(r[r.length-1]).filter(function(){return g(0,100)>80})):"compacta"===a?r=(r=r.concat(b(r[r.length-1]).filter(function(){return g(0,100)>30}))).concat(b(r[g(r.length/2,r.length)])):"repartida"===a&&((r=r.concat(b(r[g(0,r.length-1)]).filter(function(){return g(0,100)>90})))[g(0,r.length-1)]=g(0,c-1)),l=l.concat(r)}var p=[200*g(0,5),200*g(5,7)];l.map(function(a){m.tabla[a].imgSuelo=t,m.tabla[a].imagenInterior=!1,m.tabla[a].obstaculo=!1,m.tabla[a].imagenEncadenada=!1,m.tabla[a].penalizacionMov=0,"elevacion"===s?(m.tabla[a].obstaculo=!0,m.tabla[a].imagenEncadenada=!0,m.tabla[a].penalizacionMov=1e3):"agua"===s?(m.tabla[a].imagenEncadenada=!0,m.tabla[a].penalizacionMov=400):"suelo"===s?800===m.tabla[a].posImg[1]&&(m.tabla[a].penalizacionMov=300):"arboledaVerde"===s?(m.tabla[a].posImg=[g(0,10)>8?1e3:1200,800],m.tabla[a].penalizacionMov=300):"agrupacion"===s?m.tabla[a].posImg=p:"interior"===s&&(m.tabla[a].imagenEncadenada=!0,m.tabla[a].imagenInterior=!0,m.tabla[a].penalizacionMov=10)})}function z(a){m.seres.push({id:m.seres.length,nombre:m.config.listaNombresF[g(0,m.config.listaNombresF.length-1)],tipo:"criatura",pos:p(a),dest:p(35),ruta:[],posIntermedia:p(a),velocidad:g(1,10),direccionMov:0,img:A.a,estado:"",accion:"",tareaCalculada:!1,memoriaActiva:{},objetivoEnMarcha:!1,necesidad:{},necesidadActivada:!1,tiempoAccion:0,inteligencia:g(7,20),memoria:[m.listaMemorias[0]],agotamiento:g(100,120),sed:g(5,70),hambre:g(5,70),salud:g(5,70)})}i(20);function O(a){return 1===a||3===a||5===a||7===a?10:2===a||4===a||6===a||8===a?14:0}function S(a){var e=0,i=a[0].f;return a.map(function(a,o){i>a.f&&(i=a.f,e=o)}),a[e]}function N(a,e,i){return e.map(function(o,n){o===a&&(i.push(o),e.splice(n,1))}),a}function T(a,e,i,o,n,t){return e.push({id:i,g:a+O(h(t,i)),h:10*v(i,f(o)),f:a+O(h(t,i))+10*v(i,f(o))+n.tabla[i].penalizacionMov,padre:t}),e[e.lenght-1]}function F(a,e,i,o,n){var t=a.reverse(),s=t[0].id;return n?e.push(f(i)):e.push(s),t.map(function(a,i){a.id==s&&(e.push(a.id),s=a.padre)}),e.reverse()}i(21);var P=function(a){function e(a){var i;function o(a){var e=m.seres[a.id],i=[],o=[],t={};!1===e.necesidadActivada&&(console.log("Comprobando necesidades"),(i=m.listaNecesidades.filter(function(a){return a.requisito(e)})).length>0?(console.log("Necesidad detectada "+i[0].estado),m.seres[a.id].estado=i[0].estado,!1===e.tareaCalculada?(console.log("Calculando tarea..."),m.seres[a.id].objetivoEnMarcha=!1,(o=e.memoria.filter(function(a){return a.detonante===e.estado})).length>0?(t=function(a,e){var i=function(a,i){return(a.especifica+i.satisfaccionGeneral+v(a.idPos,f(e)))/3},o={id:0,mejorIdEspecifica:0,valorFinal:0};return a.map(function(a){a.satisfaccionEspecifica.map(function(e){i(e,a)>o.valorFinal&&(o={id:a.id,mejorIdEspecifica:e.id,valorFinal:i(e,a)})})}),o}(o,e.dest)).valorFinal>0?(m.seres[a.id].memoriActiva=t,m.seres[a.id].tareaCalculada=!0,m.seres[a.id].objetivoEnMarcha=!0,m.seres[a.id].necesidad=m.listaNecesidades.filter(function(a){return a.requisito(e)})[0],m.seres[a.id].estado=e.necesidad.estado,m.seres[a.id].accion=e.necesidad.accion,console.log("Sabe que hacer "+e.estado),m.seres[a.id].necesidadActivada=!0):console.log("La soluci\xf3n encontrada no es satisfactoria"):console.log("No conoce una soluci\xf3n")):console.log("Tarea calculada con exito!")):(console.log("No tiene necesidades"),m.seres[a.id].dest=p(g(0,500)),m.seres[a.id].objetivoEnMarcha=!0)),!0===e.objetivoEnMarcha&&(f(e.pos)!==f(e.dest)?(console.log("Moviendose..."),function(a){console.log("Moviendo..."),a.ruta.length>0?f(a.pos)!==f(a.posIntermedia)?(n(a,a.direccionMov),a.ruta.length>0&&(a.posIntermedia=p(a.ruta[0]))):(a.ruta.shift(),a.ruta.length>0?(a.posIntermedia=p(a.ruta[0]),a.direccionMov=h(f(a.pos),f(a.posIntermedia)),n(a,a.direccionMov)):a.posIntermedia=a.pos):(console.log(a.nombre+" Buscando una nueva ruta a "+f(a.dest)),a.ruta=function(a,e,i){for(var o=[],n=f(e),t=[],s=[],c=0,r=[{id:f(e),g:0,h:10*v(f(e),f(i)),f:0+10*v(f(e),f(i))+m.tabla[f(e)].penalizacionMov,padre:f(e)}];c<300;){c++,r.length>0&&(n=N(S(r),r,o).id);var l=(t=b(n)).filter(function(a){return a==f(i)});if(l[0]==f(i)){var d=o[o.length-1];return o.push({id:l[0],g:d.g+O(h(d.id,l[0])),h:10*v(l[0],f(i)),f:d.g+O(h(d.id,l[0]))+10*v(l[0],f(i))+m.tabla[l[0]].penalizacionMov,padre:d.id}),F(o,s,i)}if(t.map(function(a){if(0===o.filter(function(e){return e.id===a}).length&&!1===m.tabla[a].obstaculo){var e=r.filter(function(e){return e.id===a}),t=o[o.length-1];if(!(e.length>0))return T(t.g,r,a,i,m,n);if(t.g+O(h(t.id,a))<e.g)return T(t.g,r,a,i,m,n)}}),c>299)return F(o,s,i)}}(0,a.pos,a.dest),a.ruta.length>0?a.posIntermedia=p(a.ruta[0]):console.log("No ha podido obtener una ruta, 0 pasos encontrados."))}(e)):m.seres[a.id].tiempoAccion>0?(console.log("Tick-tack: "+e.tiempoAccion),m.seres[a.id].tiempoAccion--,0===m.seres[a.id].tiempoAccion&&(console.log(" y fin"),m.seres[a.id].objetivoEnMarcha=!1,m.seres[a.id].tareaCalculada=!1,m.seres[a.id].ruta=[],m.seres[a.id].estado="",m.seres[a.id].accion="",m.seres[a.id].necesidad={},m.seres[a.id].necesidadActivada=!1)):e.necesidadActivada?(e.memoria[e.memoriActiva.id].obtiene(e),m.seres[a.id].estado=e.necesidad.efecto,m.seres[a.id].tiempoAccion=e.necesidad.tiempoAccion,m.seres[a.id].ruta=[],m.seres[a.id].necesidad={},console.log(e.nombre+" ha llegado a su destino "+f(e.dest)+" y esta "+e.estado)):m.seres[a.id].tiempoAccion=g(1,50))}function n(a,e){var i=m.config.tamCasilla/4/m.config.tamCasilla;if(g(0,m.tabla[f(m.seres[a.id].posIntermedia)].penalizacionMov)<a.velocidad||g(0,10)>7)switch(m.seres[a.id].agotamiento+=1,e){case 1:a.pos[1]-=i;break;case 2:a.pos[1]-=i,a.pos[0]+=i;break;case 3:a.pos[0]+=i;break;case 4:a.pos[0]+=i,a.pos[1]+=i;break;case 5:a.pos[1]+=i;break;case 6:a.pos[1]+=i,a.pos[0]-=i;break;case 7:a.pos[0]-=i;break;case 8:a.pos[0]-=i,a.pos[1]-=i}}return Object(c.a)(this,e),(i=Object(l.a)(this,Object(d.a)(e).call(this,a))).state={id:i.props.ser.id,tam:m.config.tamCasilla,vivido:0,posIntermedia:i.props.ser.posIntermedia},setInterval(function(){i.setState({vivido:i.state.vivido++}),o(i.state)},100),i}return Object(u.a)(e,a),Object(r.a)(e,[{key:"cambioImagenAccion",value:function(a){var e=0;return"Agotado"===a.estado?e=400:"Dormido"===a.estado&&(e=800),e+"px 0px"}},{key:"render",value:function(){var a=m.seres[this.state.id],e={position:"absolute",zIndex:2,left:a.pos[0]*this.state.tam,top:a.pos[1]*this.state.tam,height:this.state.tam,width:this.state.tam,backgroundImage:"url("+a.img+")",backgroundPosition:this.cambioImagenAccion(a),backgroundSize:6*m.config.tamCasilla};return n.a.createElement("div",{style:e,className:"Seres"},a.estado)}}]),e}(o.Component),V=function(a){function e(a){var i;return Object(c.a)(this,e),(i=Object(l.a)(this,Object(d.a)(e).call(this,a))).state={obj:i.props.obj.id},i}return Object(u.a)(e,a),Object(r.a)(e,[{key:"render",value:function(){var a=m.tabla[this.state.obj],e={position:"absolute",left:a.pos[0]*m.config.tamCasilla,top:a.pos[1]*m.config.tamCasilla,height:m.config.tamCasilla,width:m.config.tamCasilla,backgroundImage:"url("+a.imgSuelo+")",backgroundPosition:a.posImg[0]*m.config.tamCasilla/200+"px "+a.posImg[1]*m.config.tamCasilla/200+"px",backgroundSize:6*m.config.tamCasilla};return n.a.createElement("div",{style:e},"VerObstaculo"===m.config.vista&&n.a.createElement("div",{style:{color:a.obstaculo?"red":"white"}},""+a.obstaculo),"VerPenalizacion"===m.config.vista&&n.a.createElement("div",null,a.penalizacionMov),"verIdCasillas"===m.config.vista&&n.a.createElement("div",null,a.id))}}]),e}(o.Component);!function(){for(var a=0,e=0;e<m.config.numCasillas;e++)for(var i=0;i<m.config.numCasillas;i++)m.tabla.push({id:a,pos:[i,e],obstaculo:!1,imagenEncadenada:!1,imagenInterior:!1,penalizacionMov:0,imgSuelo:I.a,posImg:Math.random()<.75?[0,0]:Math.random()>.95?Math.random()>.7?[1e3,800]:[200*Math.floor(6*Math.random()),800]:[200*Math.floor(7*Math.random()),1400-200*Math.floor(3*Math.random())]}),a++,800===m.tabla[m.tabla.length-1].posImg[1]&&(m.tabla[m.tabla.length-1].penalizacionMov=300);y("Pradera"),y("Monta\xf1a"),y("Lagos"),y("Bosque")}(),m.tabla.map(function(a){return function(a){if(!0===a.imagenEncadenada){var e=b(a.id).filter(function(e){var i=h(a.id,e);if(!0===m.tabla[e].imagenEncadenada&&m.tabla[e].imgSuelo===a.imgSuelo&&(1===i||3===i||5===i||7===i))return!0===m.tabla[e].imagenEncadenada});e.length>0?1==e.length?(e[0]===a.id+1&&(m.tabla[a.id].posImg=[0,400]),e[0]===a.id-1&&(m.tabla[a.id].posImg=[800,400]),e[0]===a.id+m.config.numCasillas&&(m.tabla[a.id].posImg=[400,600]),e[0]===a.id-m.config.numCasillas&&(m.tabla[a.id].posImg=[400,400])):2==e.length?e[0]===a.id+1&&e[1]===a.id-1||e[1]===a.id+1&&e[0]===a.id-1?m.tabla[a.id].posImg=[1e3,400]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id-m.config.numCasillas||e[1]===a.id+m.config.numCasillas&&e[0]===a.id-m.config.numCasillas?m.tabla[a.id].posImg=[400,200]:e[0]===a.id-m.config.numCasillas&&e[1]===a.id+1||e[1]===a.id-m.config.numCasillas&&e[0]===a.id+1?m.tabla[a.id].posImg=[200,400]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id+1||e[1]===a.id+m.config.numCasillas&&e[0]===a.id+1?m.tabla[a.id].posImg=[200,600]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id-1||e[1]===a.id+m.config.numCasillas&&e[0]===a.id-1?m.tabla[a.id].posImg=[1200,200]:m.tabla[a.id].posImg=[1e3,200]:3==e.length?(!1===e.includes(a.id-1)&&(m.tabla[a.id].posImg=[600,200]),!1===e.includes(a.id+1)&&(m.tabla[a.id].posImg=[800,200]),!1===e.includes(a.id-m.config.numCasillas)&&(m.tabla[a.id].posImg=[600,600]),!1===e.includes(a.id+m.config.numCasillas)&&(m.tabla[a.id].posImg=[600,400])):8===(e=b(a.id).filter(function(e){return m.tabla[e].imgSuelo===a.imgSuelo})).length&&g(0,10)>3?20==g(0,20)?m.tabla[a.id].posImg=[800,600]:m.tabla[a.id].posImg=[1e3,600]:m.tabla[a.id].posImg=[200,200]:m.tabla[a.id].posImg=[1200,600],m.tabla[a.id].imagenInterior&&8===e.length&&(m.tabla[a.id].penalizacionMov=10,g(0,50)>42?(m.tabla[a.id].posImg=[200*g(0,5),200*g(5,7)],m.tabla[a.id].penalizacionMov=100):g(0,50)>25?m.tabla[a.id].posImg=[200*g(4,5),600]:g(0,10)>5&&(m.tabla[a.id].posImg=[200*g(0,5),800],m.tabla[a.id].penalizacionMov=500),m.tabla[a.id].obstaculo=!1)}}(a)}),z(0);for(var q=0;q<5;q++)z(q);var B=0;document.onkeypress=function(a){console.log("Tecla: "+a.keyCode),101===a.keyCode&&m.config.tamCasilla+10<150&&(m.config.tamCasilla+=10),113===a.keyCode&&m.config.tamCasilla-10>0&&(m.config.tamCasilla-=10),100===a.keyCode&&window.scrollTo(window.scrollX+25,window.scrollY),97===a.keyCode&&window.scrollTo(window.scrollX-25,window.scrollY),119===a.keyCode&&window.scrollTo(window.scrollX,window.scrollY-25),115===a.keyCode&&window.scrollTo(window.scrollX,window.scrollY+25),B=a.keyCode},document.onkeyup=function(a){a.keyCode===B&&(B=0)},document.onmousedown=function(a){console.log("Codigo rat\xf3n: "+a.button)};var D=function(a){function e(a){var i;return Object(c.a)(this,e),(i=Object(l.a)(this,Object(d.a)(e).call(this,a))).state={tamCasilla:m.config.tamCasilla},i}return Object(u.a)(e,a),Object(r.a)(e,[{key:"render",value:function(){return n.a.createElement("div",{className:"App"},m.tabla.map(function(a,e){return n.a.createElement(V,{obj:a,key:a+"-"+e})}),m.seres.map(function(a,e){return n.a.createElement(P,{db:m,ser:a,key:a+"-"+e})}))}}]),e}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(a){a.unregister()})}],[[12,1,2]]]);
//# sourceMappingURL=main.2a3fef00.chunk.js.map