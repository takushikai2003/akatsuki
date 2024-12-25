export function searchNearbyPlaces(lat, lng, radius = 100, type = ["store"]) {
    return new Promise((resolve, reject) => {
        // 検索する座標を設定
        const centerCoordinates = { lat: lat, lng: lng };
    
        // PlacesServiceを作成するためのダミーの地図オブジェクトを作成（表示はしない）
        const map = new google.maps.Map(document.createElement("div"));
    
        // PlacesServiceオブジェクトを作成
        const service = new google.maps.places.PlacesService(map);
    
        // Nearby Searchリクエストを設定
        const request = {
            location: centerCoordinates,
            radius: radius, // 検索半径
            type: type, // 場所の種類を指定
        };


        // Nearby Searchを実行
        service.nearbySearch(request, async (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                const detailedPlaces = await Promise.all(results.map(async (place) => {
                    const request = {
                        placeId: place.place_id,
                        fields: ['name', 'reviews'],
                    };

                    const placeDetails = await new Promise((resolve, reject) => {
                        service.getDetails(request, (place, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                resolve(place);
                            }
                            else {
                                reject(status);
                            }
                        });
                    });

                    return placeDetails;
                }));

                resolve(detailedPlaces);
            }
            else {
                reject(status);
            }
        });
    });
}
  
  