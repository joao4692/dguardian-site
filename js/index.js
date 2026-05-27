// =====================
// MENU MOBILE
// =====================
var menuBtn = document.getElementById('menuBtn');
var navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// Fecha o menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
});

// =====================
// MAPA LEAFLET
// =====================
function initMap() {
  var container = document.getElementById('mapa-container');
  if (!container) return;

  var map = L.map('mapa-container', {
    zoomControl: true,
    scrollWheelZoom: false,
    dragging: true,
    tap: true
  }).setView([-7.5, -36.5], 6);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap © CARTO',
    subdomains: 'abcd',
    maxZoom: 18
  }).addTo(map);

  var pinIcon = L.divIcon({
    html: '<div style="width:14px;height:14px;background:#c49a1a;border:2.5px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    className: ''
  });

  var cidades = document.querySelectorAll('.cid');

  cidades.forEach(function (cid) {
    var lat = parseFloat(cid.dataset.lat);
    var lng = parseFloat(cid.dataset.lng);
    var nome = cid.querySelector('.cid-nome').textContent;
    var est = cid.querySelector('.cid-est').textContent;

    var marker = L.marker([lat, lng], { icon: pinIcon }).addTo(map);
    marker.bindPopup(
      '<strong style="font-size:13px;color:#111">' + nome + '</strong>' +
      '<br><span style="font-size:11px;color:#666">' + est + '</span>'
    );

    cid.addEventListener('click', function () {
      document.querySelectorAll('.cid').forEach(function (c) {
        c.classList.remove('on');
      });
      cid.classList.add('on');
      map.flyTo([lat, lng], 10, { duration: 1.2 });
      marker.openPopup();
    });
  });

  // Abre o primeiro pin por padrão
  var primeiro = document.querySelector('.cid.on');
  if (primeiro) {
    var lat0 = parseFloat(primeiro.dataset.lat);
    var lng0 = parseFloat(primeiro.dataset.lng);
    map.setView([lat0, lng0], 9);
  }
}

// Aguarda o Leaflet carregar
if (typeof L !== 'undefined') {
  initMap();
} else {
  var leafletScript = document.querySelector('script[src*="leaflet.js"]');
  if (leafletScript) {
    leafletScript.addEventListener('load', initMap);
  }
}

// =====================
// SCROLL SUAVE PARA ÂNCORAS
// =====================
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      var offset = 72; // altura do navbar fixo
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});

// =====================
// NAVBAR — muda fundo ao scrollar
// =====================
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13,17,23,0.98)';
  } else {
    navbar.style.background = 'rgba(13,17,23,0.92)';
  }
});
