/*global kakao*/
import React, { useState, useEffect } from 'react';
import '../assets/css/kakaoMap.scss';

const KakaoMap = ({
	type = 1,
	width = "",
	height = "",
	markerWidth = 0,
	markerheight = 0,
	mapstyle = {
		width: width,
		height: height
	}
}) => {

	const [mapType, setMapType] = useState(type);  // 지도 타입
	const KakamapLoad = kakaomap => {
		const script = document.createElement("script");
		if (!window.kakao) {
			script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=866671d6395d0544cb776f5cf859699d&autoload=false&libraries=services";
			document.body.appendChild(script);
		}
		return new Promise(resolve => {
			if (!window.kakao) {
				script.addEventListener('load', function () {
					resolve();
				});
			} else {
				resolve();
			}

		})
	}
	useEffect(() => {
		KakamapLoad().then(() => {
			kakao.maps.load(() => {

				window.resize = () => {
					map.relayout();
				}

				// 지도 그리기
				var container = document.getElementById('map');
				var options = {
					center: new kakao.maps.LatLng(37.507652, 127.055559),  // 중심좌표
					level: 3  // 확대 레벨
				};

				var map = new kakao.maps.Map(container, options);

				// 커스텀 마커 생성
				var imageSrc = `${require('assets/images/common/icoLocation.png')}`,
					imageSize = new kakao.maps.Size(markerWidth, markerheight)

				// 마커의 이미지정보를 가지고 있는 마커이미지 생성
				var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize),
					markerPosition = new kakao.maps.LatLng(37.507652, 127.055559);  // 마커좌표

				var marker = new kakao.maps.Marker({
					position: markerPosition,
					image: markerImage
				});

				marker.setMap(map);

				// 클릭 이벤트
				kakao.maps.event.addListener(marker, 'click', () => {
					window.open('http://naver.com');
				});


				if (mapType === 2) {
					// 주소-좌표 변환 객체 생성
					var geocoder = new kakao.maps.services.Geocoder();

					// 초기 마커의 위치 좌표로 주소 요청
					var callback = (result, status) => {
						mapState(result, status);
					};
					geocoder.coord2Address(markerPosition.getLng(), markerPosition.getLat(), callback);

					const mapState = (result, status) => {
						if (status === kakao.maps.services.Status.OK) {
							var detailAddr = '<div id="addrName">' + result[0].address.address_name + '</div>';
							detailAddr += !!result[0].road_address ? '<div id="roadName"><span>도로명</span> ' + result[0].road_address.address_name + '</div>' : '';
							var resultAddr = document.getElementById('address');
							resultAddr.innerHTML = detailAddr;
						}
					}
				}
			});
		});
	}, []);


	return (
		<div className="mapWrap">
			<div id="map" style={mapstyle}></div>
			{
				mapType === 1 ?
					undefined
					:
					<div id="address"></div>
			}
		</div>
	);
}

export default KakaoMap;