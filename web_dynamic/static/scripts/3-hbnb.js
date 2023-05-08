$(document).ready(function() {
  const amenitiesChecked = {};

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data('id');
    const amenityName = $(this).data('name');
    if ($(this).is(':checked')) {
      amenitiesChecked[amenityId] = amenityName;
    } else {
      delete amenitiesChecked[amenityId];
    }
    const amenitiesList = Object.values(amenitiesChecked).join(', ');
    if (amenitiesList.length > 0) {
      $('div.amenities > h4').text(amenitiesList);
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  // Send GET request to API status endpoint
  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  // Send POST request to places_search endpoint
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function(data) {
      for (const place of data) {
        const article = $('<article>');
        const title = $('<div>').addClass('title').append($('<h2>').text(place.name));
        const info = $('<div>').addClass('information');
        const maxGuests = $('<div>').addClass('max_guest').text(`${place.max_guest} Guests`);
        const numberRooms = $('<div>').addClass('number_rooms').text(`${place.number_rooms} Rooms`);
        const numberBathrooms = $('<div>').addClass('number_bathrooms').text(`${place.number_bathrooms} Bathrooms`);
        const priceByNight = $('<div>').addClass('price_by_night').text(`$${place.price_by_night} per night`);
        const review = $('<div>').addClass('reviews').append($('<h2>').text('Reviews'));
        const description = $('<div>').addClass('description').text(place.description);
        info.append(maxGuests, numberRooms, numberBathrooms, priceByNight);
        article.append(title, info, review, description);
        $('section.places').append(article);
      }
    }
  });
});
