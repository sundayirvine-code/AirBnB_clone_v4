$(document).ready(function() {
  const amenitiesChecked = {}; // dictionary to store checked amenities

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
});
