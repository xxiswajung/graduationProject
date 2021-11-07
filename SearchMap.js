import React, { useEffect } from 'react'
//import Placeurl from './placeurl';
//import { BrowserRouter, Route,Link } from 'react-router-dom';

const { kakao } = window

function SearchMap({searchPlace}){
    
     

  useEffect(() => {

      var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
          mapOption = { 
              center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3// 지도의 확대 레벨 
        }; 

      var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
      var geocoder = new kakao.maps.services.Geocoder();
      // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 

      var mylocation;
      var infowindow2 = new kakao.maps.InfoWindow({zIndex:1});
      var ps = new kakao.maps.services.Places(); 
      if (navigator.geolocation) {
          
          // GeoLocation을 이용해서 접속 위치를 얻어옵니다
          navigator.geolocation.getCurrentPosition(function(position) {
              
              var lat = position.coords.latitude, // 위도
                  lon = position.coords.longitude; // 경도
              
              var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                  message = '<div style="padding:5px;">내 위치</div>'; // 인포윈도우에 표시될 내용입니다
            //searchAddrFromCoords(map.getCenter(), displayCenterInfo);
              // 마커와 인포윈도우를 표시합니다
              displayMarker(locPosition, message);
              searchAddrFromCoords(map.getCenter(), callback);
              
          });

      } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
          
          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
              message = 'geolocation을 사용할수 없어요..'
          searchAddrFromCoords(map.getCenter(), displayCenterInfo);
          displayMarker(locPosition, message);
      }



      // 키워드로 장소를 검색합니다
      // ps.keywordSearch(mylocation+'맛집', placesSearchCB);
      //ps.keywordSearch('맛집', placesSearchCB); 
              //     
              
      // console.log('내 위치2:'+mylocation);
      //console.log('내 위치2:'+mylocation);
      var callback = function(result, status) {
                  if (status === kakao.maps.services.Status.OK) {
              
                      console.log('지역 명칭 : ' + result[0].address_name);
                      mylocation=result[0].address_name;
                      console.log('행정구역 코드 : ' + result[0].code);
                    // console.log('내 위치:'+mylocation);
                      ps.keywordSearch(mylocation+searchPlace, placesSearchCB);
                  }
      };
      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({  
              map: map, 
              position: locPosition
          }); 
          
          var iwContent = message, // 인포윈도우에 표시할 내용
              iwRemoveable = true;

          // 인포윈도우를 생성합니다
          var infowindow = new kakao.maps.InfoWindow({
              content : iwContent,
              removable : iwRemoveable
          });
          
          // 인포윈도우를 마커위에 표시합니다 
          infowindow.open(map, marker);
          
          // 지도 중심좌표를 접속위치로 변경합니다
          map.setCenter(locPosition);      
      }    

      // 키워드 검색 완료 시 호출되는 콜백함수 입니다
      function placesSearchCB (data, status, pagination) {
          if (status === kakao.maps.services.Status.OK) {

              // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
              // LatLngBounds 객체에 좌표를 추가합니다
              var bounds = new kakao.maps.LatLngBounds();

              for (var i=0; i<data.length; i++) {
                  displayMarker2(data[i]);    
                  bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
              }       

              // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
              map.setBounds(bounds);
          } 
      }

      // 지도에 마커를 표시하는 함수입니다
      function displayMarker2(place) {
          
          // 마커를 생성하고 지도에 표시합니다
          var marker2 = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(place.y, place.x) 
          });

          // 마커에 클릭이벤트를 등록합니다
          kakao.maps.event.addListener(marker2, 'click', function() {
              // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
              infowindow2.setContent('<div id="showinfo" style="padding:5px;font-size:12px;"><a href="/Placeurl" target="_blank">' + place.place_name + '</a></div>');
              infowindow2.open(map, marker2);
          });
      }    
      function searchAddrFromCoords(coords, callback) {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
      }

      // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
      function displayCenterInfo(result, status) {
          if (status === kakao.maps.services.Status.OK) {
          // var infoDiv = document.getElementById('centerAddr');
              //var mylocation;
              for(var i = 0; i < result.length; i++) {
                  // 행정동의 region_type 값은 'H' 이므로
                  if (result[i].region_type === 'H') {
                  //  infoDiv.innerHTML = result[i].address_name;
                      mylocation=result[i].address_name; 
              //     ps.keywordSearch(mylocation+'맛집', placesSearchCB); 
                      break;
                  }
              }
          }    
      }


  }, [searchPlace])

 

  return (
    <div>
    <div id="map" style={{width:"100%", height:"1000px"}}></div>
   
    </div>
  )
}

export default SearchMap;
