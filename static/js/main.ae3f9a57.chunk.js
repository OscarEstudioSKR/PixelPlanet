(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(a,e,n){a.exports=n.p+"static/media/SpritesTerreno02.e9b099ca.jpg"},function(a,e,n){a.exports=n.p+"static/media/SpritesTerreno01.a7af4673.jpg"},,,,,,function(a,e,n){a.exports=n.p+"static/media/SpritesTerreno03.d6317b93.jpg"},function(a,e,n){a.exports=n.p+"static/media/Personajes01.efb92a49.png"},,,function(a,e,n){a.exports=n.p+"static/media/menuSeresIma.b3419268.png"},function(a,e,n){a.exports=n(22)},,,,,,function(a,e,n){},function(a,e,n){},function(a,e,n){},function(a,e,n){"use strict";n.r(e);var i=n(0),t=n.n(i),o=n(11),s=n.n(o),r=(n(19),n(3)),l=n(4),c=n(6),u=n(5),d=n(7),m=(n(20),{config:{numCasillas:50,tamCasilla:80,vista:"",tablaVacia:{id:0,pos:[0,0],obstaculo:!1,penalizacionMov:0,imagenEncadenada:!1,imgSuelo:"",posImg:[0,0]},listaNombresF:["Lara","Eva","Clara","Marta","Fatima","Anna","Lucia","Carmen"]},tabla:[],seres:[]});function p(a){var e=Math.floor(a/m.config.numCasillas);return[Math.abs(a-e*m.config.numCasillas),e]}function g(a,e){return Math.floor(Math.random()*(e-a+1))+a}function f(a){return a[0]+a[1]*m.config.numCasillas}function b(a){var e=[],n=m.config.numCasillas*m.config.numCasillas,i=m.config.numCasillas;return a-i>=0&&e.push(a-i),a-i+1>=0&&p(a-i+1)[1]===p(a-i)[1]&&e.push(a-i+1),p(a+1)[1]===p(a)[1]&&e.push(a+1),a+i+1<n-1&&p(a+i+1)[1]===p(a+i)[1]&&e.push(a+i+1),a+i<n-1&&e.push(a+i),a+i-1<n-1&&p(a+i-1)[1]===p(a+i)[1]&&e.push(a+i-1),p(a-1)[1]===p(a)[1]&&e.push(a-1),a-i-1>=0&&p(a-i-1)[1]===p(a-i)[1]&&e.push(a-i-1),e}function h(a,e){return Math.abs(p(a)[0]-p(e)[0])+Math.abs(p(a)[1]-p(e)[1])}function v(a,e){var n=p(a),i=p(e);return e<a?i[1]===n[1]?7:i[0]>n[0]?2:i[0]<n[0]?8:1:e>a?i[1]===n[1]?3:i[0]>n[0]?4:i[0]<n[0]?6:5:0}var C=n(2),I=n.n(C),w=n(1),k=n.n(w),M=n(8),j=n.n(M),x=n(9),E=n.n(x);function z(a){switch(a){case"Valle":S("expansiva",300,500,2,3,I.a,"elevacion"),S("compacta",300,500,2,5,I.a,"elevacion"),S("compacta",1,5,20,30,I.a,"elevacion");break;case"Monta\xf1a":S("expansiva",300,500,2,3,I.a,"elevacion"),S("compacta",50,200,10,20,I.a,"elevacion"),S("compacta",1,20,20,30,I.a,"elevacion");break;case"Lagos":S("expansiva",300,500,2,3,k.a,"agua"),S("compacta",50,200,10,20,k.a,"agua"),S("compacta",20,50,20,30,k.a,"suelo");break;case"Pradera":S("repartida",3,10,5,10,k.a,"arboledaVerde"),S("expansiva",5,20,2,4,k.a,"arboledaVerde"),S("expansiva",5,10,1,3,k.a,"agrupacion"),S("expansiva",5,10,1,3,k.a,"agrupacion"),S("expansiva",5,10,1,3,k.a,"agrupacion"),S("expansiva",5,10,1,3,k.a,"agrupacion"),S("expansiva",5,10,1,3,I.a,"agrupacion"),S("expansiva",5,10,1,3,I.a,"agrupacion");break;case"Bosque":S("compacta",50,150,3,8,j.a,"interior"),S("expansiva",400,1e3,3,5,j.a,"interior"),S("repartida",20,50,3,6,j.a,"interior")}}function S(a,e,n,i,t,o,s){for(var r=m.config.numCasillas*m.config.numCasillas,l=[],c=[],u=0;u<g(i,t);u++){l=[g(0,r)];for(var d=0;d<g(e,n);d++)"expansiva"===a?l=l.concat(b(l[l.length-1]).filter(function(){return g(0,100)>80})):"compacta"===a?l=(l=l.concat(b(l[l.length-1]).filter(function(){return g(0,100)>30}))).concat(b(l[g(l.length/2,l.length)])):"repartida"===a&&((l=l.concat(b(l[g(0,l.length-1)]).filter(function(){return g(0,100)>90})))[g(0,l.length-1)]=g(0,r-1)),c=c.concat(l)}var p=[200*g(0,5),200*g(5,7)];c.map(function(a){m.tabla[a].imgSuelo=o,m.tabla[a].imagenInterior=!1,m.tabla[a].obstaculo=!1,m.tabla[a].imagenEncadenada=!1,m.tabla[a].penalizacionMov=0,"elevacion"===s?(m.tabla[a].obstaculo=!0,m.tabla[a].imagenEncadenada=!0,m.tabla[a].penalizacionMov=1e3):"agua"===s?(m.tabla[a].imagenEncadenada=!0,m.tabla[a].penalizacionMov=400):"suelo"===s?800===m.tabla[a].posImg[1]&&(m.tabla[a].penalizacionMov=300):"arboledaVerde"===s?(m.tabla[a].posImg=[g(0,10)>8?1e3:1200,800],m.tabla[a].penalizacionMov=300):"agrupacion"===s?m.tabla[a].posImg=p:"interior"===s&&(m.tabla[a].imagenEncadenada=!0,m.tabla[a].imagenInterior=!0,m.tabla[a].penalizacionMov=10)})}function y(a,e,n,i){m.seres.push({id:m.seres.length,nombre:m.config.listaNombresF[g(0,m.config.listaNombresF.length-1)],pos:p(a),dest:p(g(0,m.config.numCasillas*m.config.numCasillas-1)),ruta:[],posIntermedia:p(a),velocidad:g(1,10),direccionMov:0,img:E.a,estado:"",accion:"",inteligencia:g(7,20),agotamiento:g(5,100),sed:g(5,70),hambre:g(5,70),salud:g(5,70),sexo:n,raza:e,familia:i,habilidades:["Supervivencia b\xe1sica"],hogar:g(0,m.config.numCasillas*m.config.numCasillas-1),reproduccion:{}}),"Pixeliano"===e&&(m.seres[m.seres.length-1].reproduccion={tipoReproduccion:"Vivipara",cicloReproduccion:360,sexoEmbarazo:"Hembra"})}n(21);function O(a){return 1===a||3===a||5===a||7===a?10:2===a||4===a||6===a||8===a?14:0}function P(a){var e=0,n=a[0].f;return a.map(function(a,i){n>a.f&&(n=a.f,e=i)}),a[e]}function T(a,e,n){return e.map(function(i,t){i===a&&(n.push(i),e.splice(t,1))}),a}function V(a,e,n,i,t,o){return e.push({id:n,g:a+O(v(o,n)),h:10*h(n,f(i)),f:a+O(v(o,n))+10*h(n,f(i))+t.tabla[n].penalizacionMov,padre:o}),e[e.lenght-1]}function A(a,e,n,i,t){var o=a.reverse(),s=o[0].id;return t?e.push(f(n)):e.push(s),o.map(function(a,n){a.id==s&&(e.push(a.id),s=a.padre)}),e.reverse()}var F=function(a){function e(a){var n;function i(a){var e=m.seres[a.id];e.dest!=e.pos&&f(e.pos)!==f(e.dest)&&function(a){a.ruta.length>0?f(a.pos)!==f(a.posIntermedia)?(t(a,a.direccionMov),a.ruta.length>0&&(a.posIntermedia=p(a.ruta[0]))):(a.ruta.shift(),a.ruta.length>0?(a.posIntermedia=p(a.ruta[0]),a.direccionMov=v(f(a.pos),f(a.posIntermedia)),t(a,a.direccionMov)):a.posIntermedia=a.pos):(a.ruta=function(a,e,n){for(var i=[],t=f(e),o=[],s=[],r=0,l=[{id:f(e),g:0,h:10*h(f(e),f(n)),f:0+10*h(f(e),f(n))+m.tabla[f(e)].penalizacionMov,padre:f(e)}];r<300;){r++,l.length>0&&(t=T(P(l),l,i).id);var c=(o=b(t)).filter(function(a){return a==f(n)});if(c[0]==f(n)){var u=i[i.length-1];return i.push({id:c[0],g:u.g+O(v(u.id,c[0])),h:10*h(c[0],f(n)),f:u.g+O(v(u.id,c[0]))+10*h(c[0],f(n))+m.tabla[c[0]].penalizacionMov,padre:u.id}),A(i,s,n)}if(o.map(function(a){if(0===i.filter(function(e){return e.id===a}).length&&!1===m.tabla[a].obstaculo){var e=l.filter(function(e){return e.id===a}),o=i[i.length-1];if(!(e.length>0))return V(o.g,l,a,n,m,t);if(o.g+O(v(o.id,a))<e.g)return V(o.g,l,a,n,m,t)}}),r>299)return A(i,s,n)}}(0,a.pos,a.dest),a.ruta.length>0&&(a.posIntermedia=p(a.ruta[0])))}(e)}function t(a,e){var n=m.config.tamCasilla/4/m.config.tamCasilla;if(g(0,m.tabla[f(m.seres[a.id].posIntermedia)].penalizacionMov)<a.velocidad||g(0,10)>7)switch(m.seres[a.id].agotamiento+=.1,e){case 1:a.pos[1]-=n;break;case 2:a.pos[1]-=n,a.pos[0]+=n;break;case 3:a.pos[0]+=n;break;case 4:a.pos[0]+=n,a.pos[1]+=n;break;case 5:a.pos[1]+=n;break;case 6:a.pos[1]+=n,a.pos[0]-=n;break;case 7:a.pos[0]-=n;break;case 8:a.pos[0]-=n,a.pos[1]-=n}}return Object(r.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,a))).state={id:n.props.ser.id,tam:m.config.tamCasilla,vivido:0,posIntermedia:n.props.ser.posIntermedia,setStatePadre:function(){n.props.state.cambiarMenu(n.props.ser.id)}},setInterval(function(){n.setState({vivido:n.state.vivido++}),i(n.state)},100),n}return Object(d.a)(e,a),Object(l.a)(e,[{key:"cambioImagenAccion",value:function(a){var e=0,n=0,i=200*m.config.tamCasilla/40,t=m.tabla[f(a.posIntermedia)];return null!=t&&t.imgSuelo===k.a&&t.posImg[1]<=600&&t.posImg[1]>0?n=3*i:"Agotado"===a.estado?e=1*i:"Dormido"===a.estado&&(e=2*i),e+"px "+n+"px"}},{key:"render",value:function(){var a=this,e=m.seres[this.state.id],n={position:"absolute",zIndex:2,left:e.pos[0]*this.state.tam,top:e.pos[1]*this.state.tam,height:this.state.tam,width:this.state.tam,backgroundImage:"url("+e.img+")",backgroundPosition:this.cambioImagenAccion(e),backgroundSize:6*m.config.tamCasilla};return t.a.createElement("a",{style:n,className:"Seres",onClick:function(e){return a.state.setStatePadre()}})}}]),e}(i.Component),H=function(a){function e(a){var n;return Object(r.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,a))).state={obj:n.props.obj.id},n}return Object(d.a)(e,a),Object(l.a)(e,[{key:"render",value:function(){var a=m.tabla[this.state.obj],e={position:"absolute",left:a.pos[0]*m.config.tamCasilla,top:a.pos[1]*m.config.tamCasilla,height:m.config.tamCasilla,width:m.config.tamCasilla,backgroundImage:"url("+a.imgSuelo+")",backgroundPosition:a.posImg[0]*m.config.tamCasilla/200+"px "+a.posImg[1]*m.config.tamCasilla/200+"px",backgroundSize:6*m.config.tamCasilla};return t.a.createElement("div",{style:e},"VerObstaculo"===m.config.vista&&t.a.createElement("div",{style:{color:a.obstaculo?"red":"white"}},""+a.obstaculo),"VerPenalizacion"===m.config.vista&&t.a.createElement("div",null,a.penalizacionMov),"verIdCasillas"===m.config.vista&&t.a.createElement("div",null,a.id))}}]),e}(i.Component),N=n(12),R=n.n(N),B=function(a){function e(a){var n;return Object(r.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,a))).state={id:n.props.ser.id,setStatePadre:function(){n.props.state.cambiarMenu(-1)}},n}return Object(d.a)(e,a),Object(l.a)(e,[{key:"render",value:function(){var a=this,e=m.seres[this.state.id],n={position:"fixed",zIndex:10,top:"7%",right:"0",height:"85vh",width:"51vh",color:"white",fontSize:"1em",textAlign:"center",backgroundImage:"url("+R.a+")",backgroundSize:"100%"};return t.a.createElement("div",{style:n},t.a.createElement("a",{onClick:function(e){return a.state.setStatePadre()}},"CERRAR"),t.a.createElement("br",null),t.a.createElement("br",null),e.nombre+" (Familia "+e.familia+")",t.a.createElement("br",null),"Hogar "+e.hogar)}}]),e}(i.Component);!function(){for(var a=0,e=0;e<m.config.numCasillas;e++)for(var n=0;n<m.config.numCasillas;n++)m.tabla.push({id:a,pos:[n,e],obstaculo:!1,imagenEncadenada:!1,imagenInterior:!1,penalizacionMov:0,imgSuelo:I.a,posImg:Math.random()<.75?[0,0]:Math.random()>.95?Math.random()>.7?[1e3,800]:[200*Math.floor(6*Math.random()),800]:[200*Math.floor(7*Math.random()),1400-200*Math.floor(3*Math.random())]}),a++,800===m.tabla[m.tabla.length-1].posImg[1]&&(m.tabla[m.tabla.length-1].penalizacionMov=300);z("Pradera"),z("Monta\xf1a"),z("Lagos"),z("Bosque")}(),m.tabla.map(function(a){return function(a){if(!0===a.imagenEncadenada){var e=b(a.id).filter(function(e){var n=v(a.id,e);if(!0===m.tabla[e].imagenEncadenada&&m.tabla[e].imgSuelo===a.imgSuelo&&(1===n||3===n||5===n||7===n))return!0===m.tabla[e].imagenEncadenada});e.length>0?1==e.length?(e[0]===a.id+1&&(m.tabla[a.id].posImg=[0,400]),e[0]===a.id-1&&(m.tabla[a.id].posImg=[800,400]),e[0]===a.id+m.config.numCasillas&&(m.tabla[a.id].posImg=[400,600]),e[0]===a.id-m.config.numCasillas&&(m.tabla[a.id].posImg=[400,400])):2==e.length?e[0]===a.id+1&&e[1]===a.id-1||e[1]===a.id+1&&e[0]===a.id-1?m.tabla[a.id].posImg=[1e3,400]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id-m.config.numCasillas||e[1]===a.id+m.config.numCasillas&&e[0]===a.id-m.config.numCasillas?m.tabla[a.id].posImg=[400,200]:e[0]===a.id-m.config.numCasillas&&e[1]===a.id+1||e[1]===a.id-m.config.numCasillas&&e[0]===a.id+1?m.tabla[a.id].posImg=[200,400]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id+1||e[1]===a.id+m.config.numCasillas&&e[0]===a.id+1?m.tabla[a.id].posImg=[200,600]:e[0]===a.id+m.config.numCasillas&&e[1]===a.id-1||e[1]===a.id+m.config.numCasillas&&e[0]===a.id-1?m.tabla[a.id].posImg=[1200,200]:m.tabla[a.id].posImg=[1e3,200]:3==e.length?(!1===e.includes(a.id-1)&&(m.tabla[a.id].posImg=[600,200]),!1===e.includes(a.id+1)&&(m.tabla[a.id].posImg=[800,200]),!1===e.includes(a.id-m.config.numCasillas)&&(m.tabla[a.id].posImg=[600,600]),!1===e.includes(a.id+m.config.numCasillas)&&(m.tabla[a.id].posImg=[600,400])):8===(e=b(a.id).filter(function(e){return m.tabla[e].imgSuelo===a.imgSuelo})).length&&g(0,10)>3?20==g(0,20)?m.tabla[a.id].posImg=[800,600]:m.tabla[a.id].posImg=[1e3,600]:m.tabla[a.id].posImg=[200,200]:m.tabla[a.id].posImg=[1200,600],m.tabla[a.id].imagenInterior&&8===e.length&&(m.tabla[a.id].penalizacionMov=10,g(0,50)>42?(m.tabla[a.id].posImg=[200*g(0,5),200*g(5,7)],m.tabla[a.id].penalizacionMov=100):g(0,50)>25?m.tabla[a.id].posImg=[200*g(4,5),600]:g(0,10)>5&&(m.tabla[a.id].posImg=[200*g(0,5),800],m.tabla[a.id].penalizacionMov=500),m.tabla[a.id].obstaculo=!1)}}(a)}),y(0,"Pixeliano","Hembra","Halem");for(var L=1;L<5;L++)y(L,"Pixeliano","Hembra","Olgran");var X=0;document.onkeypress=function(a){console.log("Tecla: "+a.keyCode),101===a.keyCode&&m.config.tamCasilla+10<150&&(m.config.tamCasilla+=10),113===a.keyCode&&m.config.tamCasilla-10>0&&(m.config.tamCasilla-=10),100===a.keyCode&&window.scrollTo(window.scrollX+25,window.scrollY),97===a.keyCode&&window.scrollTo(window.scrollX-25,window.scrollY),119===a.keyCode&&window.scrollTo(window.scrollX,window.scrollY-25),115===a.keyCode&&window.scrollTo(window.scrollX,window.scrollY+25),X=a.keyCode},document.onkeyup=function(a){a.keyCode===X&&(X=0)},document.onmousedown=function(a){console.log("Codigo rat\xf3n: "+a.button)};var Y=function(a){function e(a){var n;return Object(r.a)(this,e),(n=Object(c.a)(this,Object(u.a)(e).call(this,a))).state={tamCasilla:m.config.tamCasilla,menuPersonajes:-1,cambiarMenu:function(a){n.setState({menuPersonajes:a})}},n}return Object(d.a)(e,a),Object(l.a)(e,[{key:"render",value:function(){var a=this;return t.a.createElement("div",{className:"App"},m.tabla.map(function(a,e){return t.a.createElement(H,{obj:a,key:a+"-"+e})}),m.seres.map(function(e,n){return t.a.createElement(F,{db:m,ser:e,key:e+"-"+n,state:a.state})}),-1!=this.state.menuPersonajes&&t.a.createElement(B,{ser:m.seres[this.state.menuPersonajes],state:this.state}))}}]),e}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(t.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(a){a.unregister()})}],[[13,1,2]]]);
//# sourceMappingURL=main.ae3f9a57.chunk.js.map