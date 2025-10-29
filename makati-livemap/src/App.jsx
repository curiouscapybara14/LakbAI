import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

export default function App() {
  useEffect(() => {
    const map = L.map("map").setView([14.5547, 121.0244], 14);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const locations = [
      {
        name: "One Ayala",
        coords: [14.5495, 121.0263],
        img: "oneayala.png",
        details: "A major transport hub and commercial complex near Ayala Center, connecting multiple bus and jeepney routes."
      },
      {
        name: "Dela Rosa Car Parks 1 & 2",
        coords: [14.5538, 121.0172],
        img: "carpark.png",
        details: "Parking facilities in Legazpi Village serving commuters and nearby office workers."
      },
      {
        name: "Valero 2 Car Park",
        coords: [14.5575, 121.0210],
        img: "login.png",
        details: "A convenient parking and pickup area near Salcedo Village, often used by employees and ride services."
      },
      {
        name: "McKinley Exchange Corporate Center Transport Hub",
        coords: [14.5511, 121.0306],
        img: "mckinley.png",
        details: "Bus terminal and corporate hub connecting EDSA and BGC routes."
      }
    ];

    const customIcon = L.icon({
      iconUrl: "/assets/marker.png",
      iconSize: [40, 60],
      iconAnchor: [20, 40],
      popupAnchor: [0, -35]
    });

    locations.forEach(loc => {
      const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
      marker.bindPopup(`
        <div style="text-align:center; max-width:200px;">
          <h3 style="margin-bottom:6px;">${loc.name}</h3>
          <img 
            // FIX 2: Path updated
            src="/assets/${loc.img}" 
            alt="${loc.name}" 
            style="width:100%; height:auto; border-radius:10px; margin-bottom:6px; object-fit:cover;"
          >
          <p style="font-size:13px; margin:0;">${loc.details}</p>
        </div>
      `);
    });

    const trafficData = [
      { coords: [14.5520, 121.0255], level: "green" },
      { coords: [14.5532, 121.0228], level: "yellow" },
      { coords: [14.5505, 121.0290], level: "red" }
    ];

    trafficData.forEach(area => {
      const color = area.level === "green" ? "#00FF00" : area.level === "yellow" ? "#FFFF00" : "#FF0000";
      L.circle(area.coords, {
        color,
        fillColor: color,
        fillOpacity: 0.3,
        radius: 100
      }).addTo(map);
    });

    const icons = [
      { name: "roadwork.png", coords: [14.5565, 121.0195], label: "Roadwork ongoing" },
      { name: "flood.png", coords: [14.5528, 121.0285], label: "Flood-prone area" },
      { name: "accident.png", coords: [14.5485, 121.0275], label: "Recent accident" },
      { name: "oneway.png", coords: [14.5560, 121.0248], label: "One-way road" },
      { name: "closure.png", coords: [14.5500, 121.0235], label: "Road closed temporarily" }
    ];

    icons.forEach(ic => {
      const icon = L.icon({
        iconUrl: `/assets/${ic.name}`,
        iconSize: [40, 50],
        iconAnchor: [15, 15],
      });
      L.marker(ic.coords, { icon })
        .addTo(map)
        .bindPopup(`<b>${ic.label}</b>`);
    });

    const buttonsDiv = L.control({ position: "topright" });
    buttonsDiv.onAdd = function () {
      const div = L.DomUtil.create("div", "zoom-buttons");
      div.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:5px; background:#fff; padding:8px; border-radius:10px;">
          ${locations.map(
            (loc, i) => `<button id="btn${i}" style="cursor:pointer; border:none; background:#2E6417; color:white; border-radius:6px; padding:4px;">${loc.name}</button>`
          ).join("")}
        </div>
      `;
      return div;
    };
    buttonsDiv.addTo(map);

    locations.forEach((loc, i) => {
      const button = document.getElementById(`btn${i}`);
      if (button) {
        button.addEventListener("click", () => {
          map.flyTo(loc.coords, 17);
        });
      }
    });

    const legend = L.control({ position: "bottomleft" });

    legend.onAdd = function () {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `
        <div><strong>Traffic</strong></div>
        <div><span class="sw" style="background:green"></span> Light</div>
        <div><span class="sw" style="background:yellow"></span> Moderate</div>
        <div><span class="sw" style="background:red"></span> Heavy</div>
        <hr style="margin:6px 0" />
        <div><strong>Incidents</strong></div>
        <div class="legend-icons">
          <div><img src="/assets/roadwork.png" alt="Roadwork"/> Roadwork</div>
          <div><img src="/assets/closure.png" alt="Closure"/> Closure</div>
          <div><img src="/assetsExample of a Mapbox map/accident.png" alt="Accident"/> Accident</div>
          <div><img src="/assets/flood.png" alt="Flood"/> Flood</div>
          <div><img src="/assets/oneway.png" alt="One-way"/> One-way</div>
        </div>
      `;
      return div;
    };
    legend.addTo(map);

    const backButton = L.control({ position: "bottomright" });

    backButton.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-control-back");
      div.innerHTML = `<a href="/home.html">&larr; Back to Home</a>`;
      
      L.DomEvent.disableClickPropagation(div);
      return div;
    };

    backButton.addTo(map);

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: "100vh", width: "100vw" }}></div>;
}