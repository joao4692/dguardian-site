var map, markers=[];

function initMap(){
  var container=document.getElementById('mapa-container');
  container.style.padding='0';
  container.style.minHeight='400px';
  container.innerHTML='';
  container.style.borderRadius='14px';
  container.style.overflow='hidden';

  var mapDiv=document.createElement('div');
  mapDiv.style.width='100%';
  mapDiv.style.height='420px';
  container.appendChild(mapDiv);

  map=L.map(mapDiv,{zoomControl:true,scrollWheelZoom:false}).setView([-7.5,-36.5],6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
    attribution:'© OpenStreetMap © CARTO',
    subdomains:'abcd',
    maxZoom:18
  }).addTo(map);

  var cidades=document.querySelectorAll('.cid');
  cidades.forEach(function(c){
    var lat=parseFloat(c.dataset.lat);
    var lng=parseFloat(c.dataset.lng);
    var nome=c.querySelector('.cid-nome').textContent;
    var est=c.querySelector('.cid-est').textContent;

    var icon=L.divIcon({
      html:'<div style="width:14px;height:14px;background:#c49a1a;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.25)"></div>',
      iconSize:[14,14],
      iconAnchor:[7,7],
      className:''
    });

    var m=L.marker([lat,lng],{icon:icon}).addTo(map);
    m.bindPopup('<strong style="font-size:13px">'+nome+'</strong><br><span style="font-size:11px;color:#888">'+est+'</span>');
    markers.push({marker:m,el:c});

    c.addEventListener('click',function(){
      document.querySelectorAll('.cid').forEach(function(x){x.classList.remove('on')});
      c.classList.add('on');
      map.setView([lat,lng],10,{animate:true});
      m.openPopup();
    });
  });
}

if(window.L){initMap();}
else{document.querySelector('script[src*="leaflet.js"]').addEventListener('load',initMap);}
