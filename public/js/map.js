    // Initialize the map
    console.log(coordinates);
    const map = L.map("my-map").setView(coordinates, 14);

    // API Key for Geoapify
    const mapAccessAPIKey = mapAPIKey; // Use the API key from the script tag

    // Determine if the display is Retina
    const isRetina = L.Browser.retina;

    // Set tile URL based on Retina display
    const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${mapAccessAPIKey}`;
    const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${mapAccessAPIKey}`;

    // Add map tile layer
    L.tileLayer(isRetina ? retinaUrl : baseUrl, {
        attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | © OpenStreetMap <a href="https://www.openstreetmap.org/copyright" target="_blank">contributors</a>',
        maxZoom: 20,
        id: "osm-bright",
    }).addTo(map);

    // Define custom marker icon from Geoapify
    const customIcon = L.icon({
        iconUrl: `https://api.geoapify.com/v2/icon?type=material&icon=explore&contentColor=%23fe424d&color=%23fe424d&size=64&apiKey=${mapAccessAPIKey}`,
        iconSize: [48, 48], // Width and height of the icon
        iconAnchor: [24, 38], // Point where the marker is anchored
        popupAnchor: [0, -64] // Popup position
    });

    // Add a circle around the marker
    const circle = L.circle(coordinates, {
        color: '#fe424d',
        fillColor: '#fe424d',
        fillOpacity: 0.5,
        radius: 800
    }).addTo(map);

    // Add a marker with the custom Geoapify icon
    const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);
    marker.bindPopup("Exact location will be provided after booking");

    // Add mouseover and mouseout events to the marker
    marker.on("mouseover" , () => {
        marker.openPopup();
    })

    marker.on("mouseout" , () => {
        marker.closePopup();
    })