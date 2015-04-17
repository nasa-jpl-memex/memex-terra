// Globals
var myApp = {};

var country_to_latlon = {
   "Canada":{
      "latitude":"124",
      "longitude":"60"
   },
   "Libyan Arab Jamahiriya":{
      "latitude":"434",
      "longitude":"25"
   },
   "Sao Tome and Principe":{
      "latitude":"678",
      "longitude":"1"
   },
   "Venezuela, Bolivarian Republic of":{
      "latitude":"862",
      "longitude":"8"
   },
   "Guinea-Bissau":{
      "latitude":"624",
      "longitude":"12"
   },
   "Montenegro":{
      "latitude":"499",
      "longitude":"42"
   },
   "Lithuania":{
      "latitude":"440",
      "longitude":"56"
   },
   "Cambodia":{
      "latitude":"116",
      "longitude":"13"
   },
   "Saint Helena, Ascension and Tristan da Cunha":{
      "latitude":"654",
      "longitude":"-15.9333"
   },
   "Switzerland":{
      "latitude":"756",
      "longitude":"47"
   },
   "Ethiopia":{
      "latitude":"231",
      "longitude":"8"
   },
   "Aruba":{
      "latitude":"533",
      "longitude":"12.5"
   },
   "Swaziland":{
      "latitude":"748",
      "longitude":"-26.5"
   },
   "Argentina":{
      "latitude":"32",
      "longitude":"-34"
   },
   "Cameroon":{
      "latitude":"120",
      "longitude":"6"
   },
   "Burkina Faso":{
      "latitude":"854",
      "longitude":"13"
   },
   "Turkmenistan":{
      "latitude":"795",
      "longitude":"40"
   },
   "Ghana":{
      "latitude":"288",
      "longitude":"8"
   },
   "Saudi Arabia":{
      "latitude":"682",
      "longitude":"25"
   },
   "Rwanda":{
      "latitude":"646",
      "longitude":"-2"
   },
   "Togo":{
      "latitude":"768",
      "longitude":"8"
   },
   "Japan":{
      "latitude":"392",
      "longitude":"36"
   },
   "American Samoa":{
      "latitude":"16",
      "longitude":"-14.3333"
   },
   "Montserrat":{
      "latitude":"500",
      "longitude":"16.75"
   },
   "United States Minor Outlying Islands":{
      "latitude":"581",
      "longitude":"19.2833"
   },
   "Cocos (Keeling) Islands":{
      "latitude":"166",
      "longitude":"-12.5"
   },
   "Pitcairn":{
      "latitude":"612",
      "longitude":"-24.7"
   },
   "Guatemala":{
      "latitude":"320",
      "longitude":"15.5"
   },
   "Bosnia and Herzegovina":{
      "latitude":"70",
      "longitude":"44"
   },
   "Kuwait":{
      "latitude":"414",
      "longitude":"29.3375"
   },
   "Russian Federation":{
      "latitude":"643",
      "longitude":"60"
   },
   "Jordan":{
      "latitude":"400",
      "longitude":"31"
   },
   "Virgin Islands, British":{
      "latitude":"92",
      "longitude":"18.5"
   },
   "Dominica":{
      "latitude":"212",
      "longitude":"15.4167"
   },
   "Liberia":{
      "latitude":"430",
      "longitude":"6.5"
   },
   "Maldives":{
      "latitude":"462",
      "longitude":"3.25"
   },
   "Micronesia, Federated States of":{
      "latitude":"583",
      "longitude":"6.9167"
   },
   "Jamaica":{
      "latitude":"388",
      "longitude":"18.25"
   },
   "Oman":{
      "latitude":"512",
      "longitude":"21"
   },
   "Martinique":{
      "latitude":"474",
      "longitude":"14.6667"
   },
   "Albania":{
      "latitude":"8",
      "longitude":"41"
   },
   "Gabon":{
      "latitude":"266",
      "longitude":"-1"
   },
   "Niue":{
      "latitude":"570",
      "longitude":"-19.0333"
   },
   "Monaco":{
      "latitude":"492",
      "longitude":"43.7333"
   },
   "Wallis and Futuna":{
      "latitude":"876",
      "longitude":"-13.3"
   },
   "New Zealand":{
      "latitude":"554",
      "longitude":"-41"
   },
   "Virgin Islands, U.S.":{
      "latitude":"850",
      "longitude":"18.3333"
   },
   "Jersey":{
      "latitude":"832",
      "longitude":"49.21"
   },
   "Andorra":{
      "latitude":"20",
      "longitude":"42.5"
   },
   "Yemen":{
      "latitude":"887",
      "longitude":"15"
   },
   "Greenland":{
      "latitude":"304",
      "longitude":"72"
   },
   "Samoa":{
      "latitude":"882",
      "longitude":"-13.5833"
   },
   "Norfolk Island":{
      "latitude":"574",
      "longitude":"-29.0333"
   },
   "United Arab Emirates":{
      "latitude":"784",
      "longitude":"24"
   },
   "Guam":{
      "latitude":"316",
      "longitude":"13.4667"
   },
   "India":{
      "latitude":"356",
      "longitude":"20"
   },
   "Azerbaijan":{
      "latitude":"31",
      "longitude":"40.5"
   },
   "Lesotho":{
      "latitude":"426",
      "longitude":"-29.5"
   },
   "Saint Vincent and the Grenadines":{
      "latitude":"670",
      "longitude":"13.25"
   },
   "Kenya":{
      "latitude":"404",
      "longitude":"1"
   },
   "Macao":{
      "latitude":"446",
      "longitude":"22.1667"
   },
   "Turkey":{
      "latitude":"792",
      "longitude":"39"
   },
   "Afghanistan":{
      "latitude":"4",
      "longitude":"33"
   },
   "Bangladesh":{
      "latitude":"50",
      "longitude":"24"
   },
   "Mauritania":{
      "latitude":"478",
      "longitude":"20"
   },
   "Solomon Islands":{
      "latitude":"90",
      "longitude":"-8"
   },
   "Turks and Caicos Islands":{
      "latitude":"796",
      "longitude":"21.75"
   },
   "Saint Lucia":{
      "latitude":"662",
      "longitude":"13.8833"
   },
   "San Marino":{
      "latitude":"674",
      "longitude":"43.7667"
   },
   "French Polynesia":{
      "latitude":"258",
      "longitude":"-15"
   },
   "France":{
      "latitude":"250",
      "longitude":"46"
   },
   "Macedonia, the former Yugoslav Republic of":{
      "latitude":"807",
      "longitude":"41.8333"
   },
   "Syrian Arab Republic":{
      "latitude":"760",
      "longitude":"35"
   },
   "Bermuda":{
      "latitude":"60",
      "longitude":"32.3333"
   },
   "Slovakia":{
      "latitude":"703",
      "longitude":"48.6667"
   },
   "Somalia":{
      "latitude":"706",
      "longitude":"10"
   },
   "Peru":{
      "latitude":"604",
      "longitude":"-10"
   },
   "Vanuatu":{
      "latitude":"548",
      "longitude":"-16"
   },
   "Nauru":{
      "latitude":"520",
      "longitude":"-0.5333"
   },
   "Seychelles":{
      "latitude":"690",
      "longitude":"-4.5833"
   },
   "Norway":{
      "latitude":"578",
      "longitude":"62"
   },
   "Malawi":{
      "latitude":"454",
      "longitude":"-13.5"
   },
   "Cook Islands":{
      "latitude":"184",
      "longitude":"-21.2333"
   },
   "Benin":{
      "latitude":"204",
      "longitude":"9.5"
   },
   "Congo, the Democratic Republic of the":{
      "latitude":"180",
      "longitude":"0"
   },
   "Cuba":{
      "latitude":"192",
      "longitude":"21.5"
   },
   "Iran, Islamic Republic of":{
      "latitude":"364",
      "longitude":"32"
   },
   "Falkland Islands (Malvinas)":{
      "latitude":"238",
      "longitude":"-51.75"
   },
   "Mayotte":{
      "latitude":"175",
      "longitude":"-12.8333"
   },
   "Holy See (Vatican City State)":{
      "latitude":"336",
      "longitude":"41.9"
   },
   "China":{
      "latitude":"156",
      "longitude":"35"
   },
   "Armenia":{
      "latitude":"51",
      "longitude":"40"
   },
   "Timor-Leste":{
      "latitude":"626",
      "longitude":"-8.55"
   },
   "Dominican Republic":{
      "latitude":"214",
      "longitude":"19"
   },
   "Ukraine":{
      "latitude":"804",
      "longitude":"49"
   },
   "Bahrain":{
      "latitude":"48",
      "longitude":"26"
   },
   "Tonga":{
      "latitude":"776",
      "longitude":"-20"
   },
   "Finland":{
      "latitude":"246",
      "longitude":"64"
   },
   "Western Sahara":{
      "latitude":"732",
      "longitude":"24.5"
   },
   "Cayman Islands":{
      "latitude":"136",
      "longitude":"19.5"
   },
   "Central African Republic":{
      "latitude":"140",
      "longitude":"7"
   },
   "New Caledonia":{
      "latitude":"540",
      "longitude":"-21.5"
   },
   "Mauritius":{
      "latitude":"480",
      "longitude":"-20.2833"
   },
   "Tajikistan":{
      "latitude":"762",
      "longitude":"39"
   },
   "Liechtenstein":{
      "latitude":"438",
      "longitude":"47.1667"
   },
   "Australia":{
      "latitude":"36",
      "longitude":"-27"
   },
   "Mali":{
      "latitude":"466",
      "longitude":"17"
   },
   "Sweden":{
      "latitude":"752",
      "longitude":"62"
   },
   "Bulgaria":{
      "latitude":"100",
      "longitude":"43"
   },
   "United States":{
      "latitude":"840",
      "longitude":"38"
   },
   "Romania":{
      "latitude":"642",
      "longitude":"46"
   },
   "Angola":{
      "latitude":"24",
      "longitude":"-12.5"
   },
   "French Southern Territories":{
      "latitude":"260",
      "longitude":"-43"
   },
   "Chad":{
      "latitude":"148",
      "longitude":"15"
   },
   "South Africa":{
      "latitude":"710",
      "longitude":"-29"
   },
   "Tokelau":{
      "latitude":"772",
      "longitude":"-9"
   },
   "Cyprus":{
      "latitude":"196",
      "longitude":"35"
   },
   "South Georgia and the South Sandwich Islands":{
      "latitude":"239",
      "longitude":"-54.5"
   },
   "Brunei Darussalam":{
      "latitude":"96",
      "longitude":"4.5"
   },
   "Qatar":{
      "latitude":"634",
      "longitude":"25.5"
   },
   "Malaysia":{
      "latitude":"458",
      "longitude":"2.5"
   },
   "Austria":{
      "latitude":"40",
      "longitude":"47.3333"
   },
   "Mozambique":{
      "latitude":"508",
      "longitude":"-18.25"
   },
   "Uganda":{
      "latitude":"800",
      "longitude":"1"
   },
   "Hungary":{
      "latitude":"348",
      "longitude":"47"
   },
   "Niger":{
      "latitude":"562",
      "longitude":"16"
   },
   "Isle of Man":{
      "latitude":"833",
      "longitude":"54.23"
   },
   "Brazil":{
      "latitude":"76",
      "longitude":"-10"
   },
   "Faroe Islands":{
      "latitude":"234",
      "longitude":"62"
   },
   "Guinea":{
      "latitude":"324",
      "longitude":"11"
   },
   "Panama":{
      "latitude":"591",
      "longitude":"9"
   },
   "Korea, Republic of":{
      "latitude":"410",
      "longitude":"37"
   },
   "C\u032bte d'Ivoire":{
      "latitude":"384",
      "longitude":"8"
   },
   "Costa Rica":{
      "latitude":"188",
      "longitude":"10"
   },
   "Luxembourg":{
      "latitude":"442",
      "longitude":"49.75"
   },
   "Cape Verde":{
      "latitude":"132",
      "longitude":"16"
   },
   "Bahamas":{
      "latitude":"44",
      "longitude":"24.25"
   },
   "Gibraltar":{
      "latitude":"292",
      "longitude":"36.1833"
   },
   "Ireland":{
      "latitude":"372",
      "longitude":"53"
   },
   "Pakistan":{
      "latitude":"586",
      "longitude":"30"
   },
   "Palau":{
      "latitude":"585",
      "longitude":"7.5"
   },
   "Nigeria":{
      "latitude":"566",
      "longitude":"10"
   },
   "Ecuador":{
      "latitude":"218",
      "longitude":"-2"
   },
   "Czech Republic":{
      "latitude":"203",
      "longitude":"49.75"
   },
   "Viet Nam":{
      "latitude":"704",
      "longitude":"16"
   },
   "Belarus":{
      "latitude":"112",
      "longitude":"53"
   },
   "Algeria":{
      "latitude":"12",
      "longitude":"28"
   },
   "Slovenia":{
      "latitude":"705",
      "longitude":"46"
   },
   "El Salvador":{
      "latitude":"222",
      "longitude":"13.8333"
   },
   "Tuvalu":{
      "latitude":"798",
      "longitude":"-8"
   },
   "Saint Pierre and Miquelon":{
      "latitude":"666",
      "longitude":"46.8333"
   },
   "Marshall Islands":{
      "latitude":"584",
      "longitude":"9"
   },
   "Chile":{
      "latitude":"152",
      "longitude":"-30"
   },
   "Puerto Rico":{
      "latitude":"630",
      "longitude":"18.25"
   },
   "Belgium":{
      "latitude":"56",
      "longitude":"50.8333"
   },
   "Kiribati":{
      "latitude":"296",
      "longitude":"1.4167"
   },
   "Haiti":{
      "latitude":"332",
      "longitude":"19"
   },
   "Belize":{
      "latitude":"84",
      "longitude":"17.25"
   },
   "Hong Kong":{
      "latitude":"344",
      "longitude":"22.25"
   },
   "Sierra Leone":{
      "latitude":"694",
      "longitude":"8.5"
   },
   "Georgia":{
      "latitude":"268",
      "longitude":"42"
   },
   "Lao People's Democratic Republic":{
      "latitude":"418",
      "longitude":"18"
   },
   "Mexico":{
      "latitude":"484",
      "longitude":"23"
   },
   "Gambia":{
      "latitude":"270",
      "longitude":"13.4667"
   },
   "Philippines":{
      "latitude":"608",
      "longitude":"13"
   },
   "R\u0329union":{
      "latitude":"638",
      "longitude":"-21.1"
   },
   "Morocco":{
      "latitude":"504",
      "longitude":"32"
   },
   "Croatia":{
      "latitude":"191",
      "longitude":"45.1667"
   },
   "Mongolia":{
      "latitude":"496",
      "longitude":"46"
   },
   "Guernsey":{
      "latitude":"831",
      "longitude":"49.5"
   },
   "Thailand":{
      "latitude":"764",
      "longitude":"15"
   },
   "Namibia":{
      "latitude":"516",
      "longitude":"-22"
   },
   "Grenada":{
      "latitude":"308",
      "longitude":"12.1167"
   },
   "Taiwan, Province of China":{
      "latitude":"158",
      "longitude":"23.5"
   },
   "Iraq":{
      "latitude":"368",
      "longitude":"33"
   },
   "Tanzania, United Republic of":{
      "latitude":"834",
      "longitude":"-6"
   },
   "Portugal":{
      "latitude":"620",
      "longitude":"39.5"
   },
   "Estonia":{
      "latitude":"233",
      "longitude":"59"
   },
   "Uruguay":{
      "latitude":"858",
      "longitude":"-33"
   },
   "Equatorial Guinea":{
      "latitude":"226",
      "longitude":"2"
   },
   "Lebanon":{
      "latitude":"422",
      "longitude":"33.8333"
   },
   "Svalbard and Jan Mayen":{
      "latitude":"744",
      "longitude":"78"
   },
   "Uzbekistan":{
      "latitude":"860",
      "longitude":"41"
   },
   "Tunisia":{
      "latitude":"788",
      "longitude":"34"
   },
   "Djibouti":{
      "latitude":"262",
      "longitude":"11.5"
   },
   "Heard Island and McDonald Islands":{
      "latitude":"334",
      "longitude":"-53.1"
   },
   "Antigua and Barbuda":{
      "latitude":"28",
      "longitude":"17.05"
   },
   "Spain":{
      "latitude":"724",
      "longitude":"40"
   },
   "Colombia":{
      "latitude":"170",
      "longitude":"4"
   },
   "Burundi":{
      "latitude":"108",
      "longitude":"-3.5"
   },
   "Fiji":{
      "latitude":"242",
      "longitude":"-18"
   },
   "Barbados":{
      "latitude":"52",
      "longitude":"13.1667"
   },
   "Madagascar":{
      "latitude":"450",
      "longitude":"-20"
   },
   "Italy":{
      "latitude":"380",
      "longitude":"42.8333"
   },
   "Bhutan":{
      "latitude":"64",
      "longitude":"27.5"
   },
   "Sudan":{
      "latitude":"736",
      "longitude":"15"
   },
   "Bolivia, Plurinational State of":{
      "latitude":"68",
      "longitude":"-17"
   },
   "Nepal":{
      "latitude":"524",
      "longitude":"28"
   },
   "Malta":{
      "latitude":"470",
      "longitude":"35.8333"
   },
   "Netherlands":{
      "latitude":"528",
      "longitude":"52.5"
   },
   "Northern Mariana Islands":{
      "latitude":"580",
      "longitude":"15.2"
   },
   "Suriname":{
      "latitude":"740",
      "longitude":"4"
   },
   "Anguilla":{
      "latitude":"660",
      "longitude":"18.25"
   },
   "Netherlands Antilles":{
      "latitude":"530",
      "longitude":"12.25"
   },
   "Christmas Island":{
      "latitude":"162",
      "longitude":"-10.5"
   },
   "Indonesia":{
      "latitude":"360",
      "longitude":"-5"
   },
   "Iceland":{
      "latitude":"352",
      "longitude":"65"
   },
   "Zambia":{
      "latitude":"894",
      "longitude":"-15"
   },
   "Senegal":{
      "latitude":"686",
      "longitude":"14"
   },
   "Papua New Guinea":{
      "latitude":"598",
      "longitude":"-6"
   },
   "Saint Kitts and Nevis":{
      "latitude":"659",
      "longitude":"17.3333"
   },
   "Trinidad and Tobago":{
      "latitude":"780",
      "longitude":"11"
   },
   "Zimbabwe":{
      "latitude":"716",
      "longitude":"-20"
   },
   "Germany":{
      "latitude":"276",
      "longitude":"51"
   },
   "Denmark":{
      "latitude":"208",
      "longitude":"56"
   },
   "Kazakhstan":{
      "latitude":"398",
      "longitude":"48"
   },
   "Poland":{
      "latitude":"616",
      "longitude":"52"
   },
   "Moldova, Republic of":{
      "latitude":"498",
      "longitude":"47"
   },
   "Eritrea":{
      "latitude":"232",
      "longitude":"15"
   },
   "Kyrgyzstan":{
      "latitude":"417",
      "longitude":"41"
   },
   "British Indian Ocean Territory":{
      "latitude":"86",
      "longitude":"-6"
   },
   "Korea, Democratic People's Republic of":{
      "latitude":"408",
      "longitude":"40"
   },
   "Israel":{
      "latitude":"376",
      "longitude":"31.5"
   },
   "Sri Lanka":{
      "latitude":"144",
      "longitude":"7"
   },
   "Latvia":{
      "latitude":"428",
      "longitude":"57"
   },
   "Guyana":{
      "latitude":"328",
      "longitude":"5"
   },
   "Guadeloupe":{
      "latitude":"312",
      "longitude":"16.25"
   },
   "Honduras":{
      "latitude":"340",
      "longitude":"15"
   },
   "Myanmar":{
      "latitude":"104",
      "longitude":"22"
   },
   "Bouvet Island":{
      "latitude":"74",
      "longitude":"-54.4333"
   },
   "Egypt":{
      "latitude":"818",
      "longitude":"27"
   },
   "Nicaragua":{
      "latitude":"558",
      "longitude":"13"
   },
   "Singapore":{
      "latitude":"702",
      "longitude":"1.3667"
   },
   "Serbia":{
      "latitude":"688",
      "longitude":"44"
   },
   "Botswana":{
      "latitude":"72",
      "longitude":"-22"
   },
   "United Kingdom":{
      "latitude":"826",
      "longitude":"54"
   },
   "Antarctica":{
      "latitude":"10",
      "longitude":"-90"
   },
   "Congo":{
      "latitude":"178",
      "longitude":"-1"
   },
   "Greece":{
      "latitude":"300",
      "longitude":"39"
   },
   "Paraguay":{
      "latitude":"600",
      "longitude":"-23"
   },
   "French Guiana":{
      "latitude":"254",
      "longitude":"4"
   },
   "Palestinian Territory, Occupied":{
      "latitude":"275",
      "longitude":"32"
   },
   "Comoros":{
      "latitude":"174",
      "longitude":"-12.1667"
   }
}

$(function () {
  'use strict';

  myApp.map = null,
  myApp.locationBin = null,
  myApp.scale = null,
  myApp.pointFeature,
  myApp.ready = false,
  myApp.startTime = null;
  myApp.animationState = 0;
  myApp.timeRange = 0;
  myApp.location = null;
  myApp.locationType="address";
  myApp.visibleDialogs = [];
  myApp.prevTimestamp = 0;

  $( window ).resize(function() {
    myApp.resize();
  });

  myApp.map = geo.map({
          node: '#map',
          center: {
            x: -98.0,
            y: 39.5
          },
          zoom: 2,
          autoResize: false
        });
  myApp.map.createLayer(
    'osm',
    {
      baseUrl: 'http://otile1.mqcdn.com/tiles/1.0.0/map/'
    }
  );

  myApp.resize = function() {
    var height = $(window).height(),
        width  = $("#map").width();
    myApp.map.resize(0, 0, width, height);
  }
  myApp.resize();

  // Bind plugins
  //--------------------------------------------------------------------------
  $("#search").geocomplete();

  // Bind events
  //--------------------------------------------------------------------------
  $("#search").on('keydown', function() {
    if(event.keyCode == 13) {
        myApp.setLocationTypeToAddress();
        myApp.runQuery();
    }
  });

  $("#spinner .gs-spinner-icon").hide();
  $("#spinner .gs-spinner-text").hide();

  // Aggregate data
  //--------------------------------------------------------------------------
  function prepareDataForRendering(data) {
    var i = null, key = null, min = 0, max = 1, newData = [], ships_from, ships_to,
            dataItem = null, children = null, items = null, child = null;
    myApp.bin = {};

    if (data) {
      data.forEach(function(item) {
        ships_from  = item.ships_from
        ships_to = item.ships_to

        if (ships_to !== "Worldwide" && ships_from !== "Worldwide") {
          key = ships_from.trim();
          if (key in myApp.bin) {
            children = myApp.bin[key].children;
          } else {
            children = []
            dataItem = {"country": key, "children": children, "loc":country_to_latlon[key]};
            newData.push(dataItem);
            myApp.bin[key] = dataItem;
          }

          items = ships_to.split(",")
          for (i = 0; i < items.length; ++i) {
            child = items[i].trim();
            if (key !== child) {
              if (children.indexOf(child) !== -1) {
                continue;
              }
              else {
                children.push(child);
              }
            }
          }
        }

        // key = item.loc[0] + '|' + item.loc[1];
        // if (key in myApp.locationBin) {
        //   myApp.locationBin[key].binCount = 1 + myApp.locationBin[key].binCount;
        //   myApp.locationBin[key].urls.push(item.url);
        //   if (myApp.locationBin[key].binCount > max) {
        //     max = myApp.locationBin[key].binCount
        //   }
        // } else {
        //   item.binCount = 1;
        //   item.urls = [item.url];
        //   myApp.locationBin[key] = item;
        //   newdata.push(item);
        // }
      });

      console.log(newData);
    }

    return {"data": newData, "min": min, "max": max};
  }

  // Scrap a URL for images and return list of images URL
  //--------------------------------------------------------------------------
  function scrapUrl(url, callback) {
    $.ajax("api/v1/scrape?url="+url+"")
      .done(function(data) {
        if (callback !== undefined) {
          callback(data);
        }
      })
      .fail(function(err) {
        console.log(err);
      })
  }

  // Create visualization given a dataset
  //--------------------------------------------------------------------------
  function render(data, callback) {
    var aggdata = prepareDataForRendering(data);
    myApp.scale = d3.scale.linear().domain([aggdata.min, aggdata.max])
              .range([2, 50]);
    if (myApp.pointFeature === undefined) {
      myApp.pointFeature = myApp.map
                       .createLayer('feature')
                       .createFeature('point', {selectionAPI: true});
    }
    if (myApp.pointFeature) {
      myApp.pointFeature.geoOff(geo.event.feature.mouseclick);
    }

    myApp.pointFeature
      .data(aggdata.data)
      .position(function (d) { return { x:d.loc[0], y:d.loc[1] } })
      .style('radius', function (d) { return myApp.scale(d.binCount); })
      .style('stroke', false)
      .style('fillOpacity', 0.4)
      .style('fillColor', 'orange')
      .geoOn(geo.event.feature.mouseclick, function (evt) {
        var i = 0, anchor = null;

        var currLocation = $("#search").val();
        var clickedLocation = evt.data["place"];
        if (!currLocation || currLocation.length < 1 || currLocation !== myApp.location ||
          clickedLocation !== myApp.location) {
          $("#search").val(evt.data["place"])
          $("#search").trigger("geocode");
          myApp.location = evt.data["loc"];
          myApp.setLocationTypeToLatLon();
        }
        for (i = 0; i < evt.data.urls.length; ++i) {
          // Scrap the URL
          scrapUrl(evt.data.urls[i], function(images) {
            myApp.displaySearchResults({
              "data": evt.data,
              "images": images});
          });
        }

        if (myApp.location !== null || myApp.location !== undefined ||
        myApp.location !== "") {
          myApp.queryData(myApp.timeRange, {"value":myApp.location, "type":myApp.locationType},
            function(data) {
              // Format the data
              var adsPerDay = {}, newData = [], i, time, month, inst, timeString, item;
              for (i = 0; i < data.length; ++i) {
                time = new Date(data[i]["time"]);
                month = (time.getMonth() + 1);
                if (month < 10) {
                  month = ("0" + month);
                }
                timeString = time.getFullYear() + "-"
                               + month + "-" +
                               + time.getDate();
                if (timeString in adsPerDay) {
                  adsPerDay[timeString] = adsPerDay[timeString] + 1;
                } else {
                  adsPerDay[timeString] = 1;
                }
              }

              for (item in adsPerDay) {
                inst = {};
                inst["date"] = item;
                inst["value"] = adsPerDay[item];
                newData.push(inst);
              }

              if (newData.length > 1) {
                myApp.displayStatistics(newData, false);
              }
          });
        }
      });

    myApp.map.draw();

    if (callback) {
      callback();
    }
  }

  // Query given a time duration and location
  //--------------------------------------------------------------------------
  myApp.queryData = function(timeRange, location, callback) {
    var url = "api/v1/data?limit=100000&duration=["+timeRange+"]";

    if (location !== undefined || location !== null || location !== '') {
      url += "&location="+location.value+"&location_type="+location.type;
    }

    $.ajax(url)
      .done(function(data) {

        //console.log(data);

        $("#statistics").empty();

        if (callback !== undefined) {
          //console.log(data);
          callback(data);
        }
      })
      .fail(function(err) {
        console.log(err);
      })
  }

  // Update extents and then render
  //--------------------------------------------------------------------------
  myApp.runQuery = function() {
    $("#spinner .gs-spinner-icon").show();
    $("#spinner .gs-spinner-text").hide();

    myApp.clearLastSearch();

    // Now run the query
    myApp.timeRange = $("#slider").slider("values");
    myApp.location = $("#search").val();
    myApp.queryData(myApp.timeRange,
      {"value":myApp.location, "type":myApp.locationType}, function(data) {
      // Clear out any previous information
      myApp.clearLastSearch();

      render(data, function() {
        $("#spinner .gs-spinner-icon").hide();
        $("#spinner .gs-spinner-text").show();
        $("#spinner .gs-spinner-text").text(data.length);

        // Update the UI
        myApp.updateView(null, myApp.timeRange);
      });
    });
  }

  // Update view
  //--------------------------------------------------------------------------
  myApp.updateView = function(timestamp, timeRange)  {
    $ ("#start").html((new Date(timeRange[0] * 1000)).toDateString());
    $ ("#end").html((new Date(timeRange[1] * 1000)).toDateString());
  }

  // Animate data
  //--------------------------------------------------------------------------
  myApp.animate = function(timestamp) {
    if (myApp.ready) {
      // First get the values from the slider
      var range = $( "#slider" ).slider( "values" ),
          min = $( "#slider" ).slider( "option", "min" ),
          max = $( "#slider" ).slider( "option", "max" ),
          delta = myApp.timeRange[1] - myApp.timeRange[0],
          newRange = null,
          elapsedTime = timestamp - myApp.prevTimestamp;

      if (elapsedTime * 0.001 > 1) {
        myApp.prevTimestamp = timestamp;

        //console.log('elapsedTime * 0.001 ', elapsedTime * 0.001);

        if (myApp.animationState == 3 || myApp.animationState == 1) {
          newRange = [ range[ 0 ] + delta, range[ 1 ] + delta ];
        } else if (myApp.animationState == 2) {
          newRange = [ range[ 0 ] - delta, range[ 1 ] - delta ];
        }

        if (range[1] === max) {
          newRange[0] = min;
          newRange[1] = newRange[0] + delta;
        }
        if (newRange[0] >= max) {
          newRange[0] = min;
        }
        if (newRange[0] <= min) {
          newRange[0] = min;
        }
        if (newRange[1] > max) {
          newRange[1] = max;
        }
        if (newRange[1] <= min) {
          newRange[1] = newRange[0] + delta;
        }

        // Set the slider value
        $( "#slider" ).slider( "option", "values", newRange );

        myApp.timeRange = newRange;
        myApp.location = $("#search-location").text();

        // Query the data and create vis again
        myApp.queryData(myApp.timeRange,
          {"value":myApp.location, "type":myApp.locationType}, function(data) {
          render(data, function() {
            myApp.updateView(null, newRange);

            if (myApp.animationState === 1) {
              window.requestAnimationFrame(myApp.animate);
            }
          });
        });

      } else {
        window.requestAnimationFrame(myApp.animate);
      }
    }
  }

  $.ajax( "api/v1/data" )
    .done(function(range) {
      var format = d3.time.format("%Y-%m-%d"),
          min = new Date(range.duration.start.date * 1000),
          max = new Date(range.duration.end.date * 1000);

      // Set the date range
      $( "#slider" ).slider({
        range: true,
        min: min.getTime()/1000,
        max: max.getTime()/1000,
        values: [ min.getTime()/1000, min.getTime()/1000 + 24 * 3600 * 180 ],
        stop: function( event, ui ) {
          myApp.runQuery();
        }
      });

      myApp.runQuery();
      myApp.ready = true;
    })
    .fail(function() {
      console.log('failed');
    });

  $( "#slider" ).slider();
});


// Event handlers
//--------------------------------------------------------------------------
myApp.buttonBackPress = function() {
  myApp.animationState = 2;
  window.requestAnimationFrame(myApp.animate);
}

myApp.buttonPlayPress = function() {
  myApp.animationState = 1;
  window.requestAnimationFrame(myApp.animate);
}

myApp.buttonStopPress = function() {
  myApp.animationState = 0;
  var min = $( "#slider" ).slider( "option", "min" ),
      max = $( "#slider" ).slider( "option", "max" ),
      range = $( "#slider" ).slider( "option", "values" );

  $( "#slider" ).slider( "option", "values",
    [ min, min + (range[1] - range[0]) ] );

  myApp.runQuery();
}

myApp.buttonForwardPress = function() {
  myApp.animationState = 3;
  window.requestAnimationFrame(myApp.animate);
}

// Clear out any information that is related to a particular time duration
//--------------------------------------------------------------------------
myApp.clearLastSearch = function(callback) {
  // Clear images
  $("#images").empty();
}

// Display search result
//--------------------------------------------------------------------------
myApp.displaySearchResults = function(data, clearPrev) {
  var div = $("#images"),
      newDiv = $(document.createElement('div')),
      i = null;

  if (clearPrev) {
    myApp.clearLastSearch();
  }

  div.append(newDiv);
  newDiv.addClass('row');
  if (data.images.length > 0) {
    for (i = 0; i < data.images.length; ++i) {
      var imageDiv = $(document.createElement('div'));
      imageDiv.addClass('col-xs-4');
      newDiv.append(imageDiv)
      var newAnchor = $(document.createElement('a'));
      var newImage = $(document.createElement('img'));
      newImage.addClass('img-responsive img-fluid img-blur');
      newImage.on('mouseover', function() {
        $(this).addClass('img-clear');
        $(this).removeClass('img-blur');
      });
      newImage.on('mouseout', function() {
        $(this).addClass('img-blur');
        $(this).removeClass('img-clear');
      });
      imageDiv.append(newAnchor);
      newAnchor.append(newImage);
      newImage.attr('src', data.images[i]);
    }
  }
}

// Create statistical plot
//--------------------------------------------------------------------------
myApp.displayStatistics = function(data, clearPrev) {
  // var data = [
  //   {"date": "2012-01-05",  "value": 28},
  //   {"date": "2012-01-10",  "value": 43}
  // ];
  var spec = {
    "width": $("#statistics").width() * 0.90,
    "height": $("#statistics").height(),
    "padding": {"top": 10, "left": 30, "bottom": 30, "right": 30},
    "data": [
      {
        "name": "table",
        "format": {"type":"json", "parse":{"date":"date", "value":"number"}},
        "values": data
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "nice": true,
        "domain": {"data": "table", "field": "data.date"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "nice": true,
        "domain": {"data": "table", "field": "data.value"}
      },
      {
        "name": "color",
        "type": "ordinal",
        "range": "category20"
      }
    ],
    "axes": [
      {"type": "x", "scale": "x"},
      {"type": "y", "scale": "y"}
    ],
    "marks": [
      {
        "type": "line",
        "from": {"data": "table"},
        "properties": {
          "enter": {
            "interpolate": {"value": "monotone"},
            "x": {"scale": "x", "field": "data.date"},
            "y": {"scale": "y", "field": "data.value"},
            "size": {"value": 50},
            "stroke": {"scale": "color", "field": "data.indexname"},
            "strokeWidth": {"value": 2}
          },
          "update": {
            "opacity": {"value": 1}
          },
          "hover": {
            "opacity": {"value": 0.5}
          }
        }
      }
    ]
  }

  if (clearPrev) {
    $("#statistics").empty();
  }

  try {
    vg.parse.spec(spec, function(chart) {
    var view = chart({el:"#statistics"})
      .update();
    });
  } catch(err) {
  }
}

//--------------------------------------------------------------------------
myApp.setLocationTypeToAddress = function() {
  myApp.locationType = "address";
}

//--------------------------------------------------------------------------
myApp.setLocationTypeToLatLon = function() {
  myApp.locationType = "4326";
}

