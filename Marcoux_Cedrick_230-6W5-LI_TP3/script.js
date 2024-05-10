// Importation de la carte et ses paramètres
var map = L.map('map').setView([46.84218988544697, -71.3285654245193], 11);

// Tile layers
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var CyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var EsriWorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});


// Icones
var iconObserve = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/binocular.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

var iconPerdu = L.divIcon({
    class: 'icon',
    html: '<img src="Images/Icones/questionmark.svg" alt="" />',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
});

// Layers
var arrondissementLayer = L.geoJSON(Arrondissement, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.NOM);
    },
    style: function (feature) {
        return {
            color: feature.properties.stroke,
            weight: feature.properties['stroke-width'],
            opacity: feature.properties['stroke-opacity'],
            fillColor: feature.properties.fill,
            fillOpacity: feature.properties['fill-opacity']
        };
    }
}).addTo(map);

var chienPerduLayer = L.geoJSON(chienperdu, {
    onEachFeature: function (feature, layer) {
        var popupContent =
            "Nom: " + feature.properties.Nom + "<br>" +
            "Race: " + feature.properties.Race + "<br>" +
            "Date de disparition: " + feature.properties.Date + "<br>" +
            "État: " + feature.properties.État;
        layer.bindPopup(popupContent)
    },
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: iconPerdu });
    }
}).addTo(map);

var chienObserveLayer = L.geoJSON(chienobserve, {
    onEachFeature: function (feature, layer) {
        var popupContent2 =
            "Race: " + feature.properties.Race + "<br>" +
            "Date d'obervation: " + feature.properties.Date + "<br>" +
            "État: " + feature.properties.État;
        layer.bindPopup(popupContent2)
    },
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: iconObserve });
    }
}).addTo(map);

// Layer group
var layerGroup = L.layerGroup([arrondissementLayer, chienPerduLayer, chienObserveLayer]);

// Layer control
var baseMaps = {
    'Open Street Map': osm,
    'CyclOSM': CyclOSM,
    'Esri World Imagery': EsriWorldImagery
};

var overlays = {
    "Arrondissement": arrondissementLayer,
    "Chien perdu": chienPerduLayer,
    "Chien observé": chienObserveLayer
};

L.control.layers(baseMaps, overlays).addTo(map);

// Plugins supplémentaire

// Ajout de l'échelle
L.control.scale().addTo(map);
// Ajout de la légende

L.control.legend({
    position: "bottomleft",
    legends: [{
        label: "Chien perdu",
        type: "image",
        url: "Images/Icones/questionmark.svg",
    }, 
    {
        label: "Chien obervé",
type: "image",
        url: "Images/Icones/binocular.svg"
    }]
}).addTo(map);

// Ajout des crédits
var credits = L.controlCredits({
    imageurl: './Images/Logo_Cegep.png',
    imagealt: 'Logo cégep Limoilou',
    tooltip: 'Fait par le Département de la géomatique',
    width: '80px',
    height: '45px',
    expandcontent: 'Carte interactive<br/>Par <a href="https://www.cegeplimoilou.ca/" target="_blank">Cégep Limoilou</a>',
}).addTo(map);