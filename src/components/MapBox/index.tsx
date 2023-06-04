import React, { useEffect, useState } from "react";
import { Container, NotFoundBox } from "./styles";

declare global {
  interface Window {
    kakao: any;
  }
}

const { kakao } = window;

const MapBox = (address: any) => {
  const fullAddress = address.children;

  const [map, setMap] = useState<any>(null);
  const [isValidAddress, setValidAddress] = useState(true);

  useEffect(() => {
    const mapContainer = document.getElementById("kakao_map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 2,
    };

    setMap(new kakao.maps.Map(mapContainer, options));
  }, []);

  useEffect(() => {
    if (!map) return;

    if (!address) {
      setValidAddress(false);
      return;
    }

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(fullAddress, (result: any, status: any) => {
      if (status === kakao.maps.services.Status.OK) {
        setValidAddress(true);

        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        map.setCenter(coords);
      } else {
        // console.log(`주소 검색 실패: ${fullAddress}`);
        setValidAddress(false);
      }
    });
  }, [fullAddress, map]);

  return (
    <Container>
      <div
        id="kakao_map"
        style={{
          width: "800px",
          height: isValidAddress ? "300px" : "0",
        }}
      ></div>
      {isValidAddress ? (
        <></>
      ) : (
        <NotFoundBox>지도를 불러오는 중입니다...</NotFoundBox>
      )}
    </Container>
  );
};

export default MapBox;
