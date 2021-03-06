import React, { useEffect,useState } from 'react';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';


//const { kakao } = window

/*global kakao*/


function MapContainer({answer, time}){

   
 
  // let today= new Date();

   const [getMoment, setMoment] = useState(moment())
   const today = getMoment 
   
   let mapd=today.format('D')
   let mapm=today.format('MM')
   let mapy=today.format('YY')
   let mylocation;
   let items;
   const [kindoffood, setkindoffood] = useState(-1);
    let tmpnum=0;
    let linum=0;
   items = answer.map(data=>{
    return(
     
    <div>
      <ul>
        <li style={{position:'relative'}}>
          <p>추천 {++linum}</p>
          <p>{data.name}</p>
          <p>총 칼로리 : {data.total} kcal</p>
          <span> 탄수화물 : {data.carbo} g </span>
          <span> 단백질 : {data.pro} g  </span>
          <span> 지방 : {data.fat} g  </span>
        </li>
      </ul>
    </div>
    )
    
    })

  function plusclick(){
    
    setkindoffood(kindoffood+1);
  
  }

  function minusclick(){
    
    setkindoffood(kindoffood-1);
  
  }

 
  

    useEffect(()=>{

       console.log("앤썰:"+answer);
       
             
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 3// 지도의 확대 레벨 
            }; 
        
        console.log("length는"+answer.length);

        const fn=answer.map(data=>data.name);
        const tlist=answer.map(data=>data.total);
        const clist=answer.map(data=>data.carbo);
        const flist=answer.map(data=>data.fat);
        const plist=answer.map(data=>data.pro);
     


        
       
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();
        var m=0;
     

        var infowindow2 = new kakao.maps.InfoWindow({zIndex:1});

       
       
        if (navigator.geolocation) {
            
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">내 위치</div>'; // 인포윈도우에 표시될 내용입니다
               
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

        var callback = function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                    
                        mylocation=result[0].address_name;
                    }
                    
                        var ps = new kakao.maps.services.Places();
                        ps.keywordSearch(mylocation+fn[kindoffood], placesSearchCB);
                      
                        
        }
        

        
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
        function placesSearchCB (data, status,pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    console.log("충격:"+kindoffood);
                    displayMarker2(data[i],fn[kindoffood]);    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       
                //setkindoffood(kindoffood+1)

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
            
        }

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker2(place,title) {
            
            // 마커를 생성하고 지도에 표시합니다
            var marker2 = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(place.y, place.x) 
            });

            // 마커에 클릭이벤트를 등록합니다
            kakao.maps.event.addListener(marker2, 'mouseover', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
               displayInfowindow(marker2,place,title);
              
            });
           
        }    
        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }

        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {
            
                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                   
                        mylocation=result[i].address_name; 
              
                        break;
                    }
                }
            }    
        }

        function displayInfowindow(marker,place,ftitle) {
            var ktitle=encodeURI(ftitle,"UTF-8");
            var content ='<div>'+ place.place_name+'</div>';
            content+='<div><a href="/#/logadd?'+ktitle+'/'+mapy+'/'+mapm+'/'+mapd+'/'+time+'/'+plist[kindoffood]+'/'+ clist[kindoffood]+'/'+ flist[kindoffood]+'/'+ tlist[kindoffood]+'">' +ftitle+'</a></div>';
           
            infowindow2.setContent(content);
            infowindow2.open(map, marker);
           
        }


}, [kindoffood])

    

      
        return ( 


       <div>
           
            <Grid container spacing={3}>
                
                <Grid item xs={7}>
               
                <div id="map" style={{width:"100%", height:"1000px"}}></div>
                

                </Grid>
                <Grid item xs={5}>
                    <button onClick={minusclick}>{"<"}</button>
                    <span> 추천 { kindoffood+1} 음식점 찾기</span>
                    <button onClick={plusclick}>{">"}</button>
                  
                    <div>{items}</div>
                  
                        
                     
                </Grid>
            </Grid>
        </div>
        );

   
    
  
}
export default MapContainer;