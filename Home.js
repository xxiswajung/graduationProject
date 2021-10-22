import React,{ useEffect } from 'react';



const Home=()=>{

    //<div>음식 정보 추가</div>
  
    useEffect(()=>{
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
        level: 10
      };
  
      var infowindow = new kakao.maps.InfoWindow({zIndex:1});
      var map = new kakao.maps.Map(container, options);
      //var markerPosition  = new kakao.maps.LatLng(37.365264512305174, 127.10676860117488); 
      
      if (navigator.geolocation) {
      
        // GeoLocation을 이용해서 접속 위치를 얻어옵니다
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var lat = position.coords.latitude, // 위도
                lon = position.coords.longitude; // 경도
            
            var locPosition1 = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
            
            // 마커와 인포윈도우를 표시합니다
            displayMarker2(locPosition1, message);
                
          });
        
    
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
        
    
          var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
                message = 'geolocation을 사용할수 없어요..'
    
        
                displayMarker2(locPosition1, message);
        
        }
      //marker.setMap(map);
      var ps = new kakao.maps.services.Places(); 
      var mpname="고덕역";
      ps.keywordSearch( mpname+"파스타", placesSearchCB); 
  
      
      function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
           var bounds = new kakao.maps.LatLngBounds();
    
            for (var i=0; i<data.length; i++) {
               displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
           }       
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    
      }
  
      function displayMarker(place) {
      
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });
    
        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    
      }
  
      function displayMarker2(locPosition, message) {
  
        // 마커를 생성합니다
        var marker2 = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        var iw = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;
    
        // 인포윈도우를 생성합니다
        var infowindow1 = new kakao.maps.InfoWindow({
            content : iw,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow1.open(map, marker2);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    
      }    
  
      
      }, [])
  
  
     
        return ( 

            <div id="map" style={{width:"100%", height:"1000px"}}></div>
          
        );
      
  }
export default Home;
