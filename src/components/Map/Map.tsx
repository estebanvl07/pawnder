import React, { useEffect, useRef } from "react";

import MapView from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import Overlay from "ol/Overlay";
import { Avatar } from "@heroui/avatar";
import "ol/ol.css"; // Importa estilos por defecto de OpenLayers

const Map = () => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   // if (!mapRef.current) return;
  //   if (!mapRef.current) return;

  //   // Crear el mapa
  //   const map = new MapView({
  //     target: mapRef.current,
  //     layers: [
  //       new TileLayer({
  //         source: new OSM(), // Carga los mapas de OpenStreetMap
  //       }),
  //     ],
  //     view: new View({
  //       center: fromLonLat([-74.7813, 10.9685]), // Coordenadas de Nueva York
  //       zoom: 12,
  //     }),
  //   });

  //   if (markerRef.current) {
  //     const marker = new Overlay({
  //       position: fromLonLat([-74.7813, 10.9685]),
  //       element: markerRef.current, // Ya seguro que no es null
  //       positioning: "center-center",
  //     });

  //     map.addOverlay(marker);
  //   }

  //   return () => map.setTarget(); // Limpiar el mapa al desmontar el componente
  // }, []);

  return (
    <div className="relative">
      <div ref={mapRef} className="h-[100vh] w-full" />
      <div ref={markerRef} className="rounded-full bg-white p-2">
        {/* <Avatar
          src="https://heroui.com/avatars/avatar-1.png"
          size="md"
          radius="full"
        /> */}
      </div>
    </div>
  );
};

export default Map;
