// Globals
var myApp = {};

var country_to_latlon = {
   "Canada":{
      "latitude":"60",
      "longitude":"-95"
   },
   "Libyan Arab Jamahiriya":{
      "latitude":"25",
      "longitude":"17"
   },
   "Sao Tome and Principe":{
      "latitude":"1",
      "longitude":"7"
   },
   "Venezuela, Bolivarian Republic of":{
      "latitude":"8",
      "longitude":"-66"
   },
   "Guinea-Bissau":{
      "latitude":"12",
      "longitude":"-15"
   },
   "Montenegro":{
      "latitude":"42",
      "longitude":"19"
   },
   "Lithuania":{
      "latitude":"56",
      "longitude":"24"
   },
   "Cambodia":{
      "latitude":"13",
      "longitude":"105"
   },
   "Saint Helena, Ascension and Tristan da Cunha":{
      "latitude":"-15.9333",
      "longitude":"-5.7"
   },
   "Switzerland":{
      "latitude":"47",
      "longitude":"8"
   },
   "Ethiopia":{
      "latitude":"8",
      "longitude":"38"
   },
   "Aruba":{
      "latitude":"12.5",
      "longitude":"-69.9667"
   },
   "Swaziland":{
      "latitude":"-26.5",
      "longitude":"31.5"
   },
   "Argentina":{
      "latitude":"-34",
      "longitude":"-64"
   },
   "Cameroon":{
      "latitude":"6",
      "longitude":"12"
   },
   "Burkina Faso":{
      "latitude":"13",
      "longitude":"-2"
   },
   "Turkmenistan":{
      "latitude":"40",
      "longitude":"60"
   },
   "Ghana":{
      "latitude":"8",
      "longitude":"-2"
   },
   "Saudi Arabia":{
      "latitude":"25",
      "longitude":"45"
   },
   "Rwanda":{
      "latitude":"-2",
      "longitude":"30"
   },
   "Togo":{
      "latitude":"8",
      "longitude":"1.1667"
   },
   "Japan":{
      "latitude":"36",
      "longitude":"138"
   },
   "American Samoa":{
      "latitude":"-14.3333",
      "longitude":"-170"
   },
   "Montserrat":{
      "latitude":"16.75",
      "longitude":"-62.2"
   },
   "United States Minor Outlying Islands":{
      "latitude":"19.2833",
      "longitude":"166.6"
   },
   "Cocos (Keeling) Islands":{
      "latitude":"-12.5",
      "longitude":"96.8333"
   },
   "Pitcairn":{
      "latitude":"-24.7",
      "longitude":"-127.4"
   },
   "Guatemala":{
      "latitude":"15.5",
      "longitude":"-90.25"
   },
   "Bosnia and Herzegovina":{
      "latitude":"44",
      "longitude":"18"
   },
   "Kuwait":{
      "latitude":"29.3375",
      "longitude":"47.6581"
   },
   "Russian Federation":{
      "latitude":"60",
      "longitude":"100"
   },
   "Jordan":{
      "latitude":"31",
      "longitude":"36"
   },
   "Virgin Islands, British":{
      "latitude":"18.5",
      "longitude":"-64.5"
   },
   "Dominica":{
      "latitude":"15.4167",
      "longitude":"-61.3333"
   },
   "Liberia":{
      "latitude":"6.5",
      "longitude":"-9.5"
   },
   "Maldives":{
      "latitude":"3.25",
      "longitude":"73"
   },
   "Micronesia, Federated States of":{
      "latitude":"6.9167",
      "longitude":"158.25"
   },
   "Jamaica":{
      "latitude":"18.25",
      "longitude":"-77.5"
   },
   "Oman":{
      "latitude":"21",
      "longitude":"57"
   },
   "Martinique":{
      "latitude":"14.6667",
      "longitude":"-61"
   },
   "Albania":{
      "latitude":"41",
      "longitude":"20"
   },
   "Gabon":{
      "latitude":"-1",
      "longitude":"11.75"
   },
   "Niue":{
      "latitude":"-19.0333",
      "longitude":"-169.8667"
   },
   "Monaco":{
      "latitude":"43.7333",
      "longitude":"7.4"
   },
   "Wallis and Futuna":{
      "latitude":"-13.3",
      "longitude":"-176.2"
   },
   "New Zealand":{
      "latitude":"-41",
      "longitude":"174"
   },
   "Virgin Islands, U.S.":{
      "latitude":"18.3333",
      "longitude":"-64.8333"
   },
   "Jersey":{
      "latitude":"49.21",
      "longitude":"-2.13"
   },
   "Andorra":{
      "latitude":"42.5",
      "longitude":"1.6"
   },
   "Yemen":{
      "latitude":"15",
      "longitude":"48"
   },
   "Greenland":{
      "latitude":"72",
      "longitude":"-40"
   },
   "Samoa":{
      "latitude":"-13.5833",
      "longitude":"-172.3333"
   },
   "Norfolk Island":{
      "latitude":"-29.0333",
      "longitude":"167.95"
   },
   "United Arab Emirates":{
      "latitude":"24",
      "longitude":"54"
   },
   "Guam":{
      "latitude":"13.4667",
      "longitude":"144.7833"
   },
   "India":{
      "latitude":"20",
      "longitude":"77"
   },
   "Azerbaijan":{
      "latitude":"40.5",
      "longitude":"47.5"
   },
   "Lesotho":{
      "latitude":"-29.5",
      "longitude":"28.5"
   },
   "Saint Vincent and the Grenadines":{
      "latitude":"13.25",
      "longitude":"-61.2"
   },
   "Kenya":{
      "latitude":"1",
      "longitude":"38"
   },
   "Macao":{
      "latitude":"22.1667",
      "longitude":"113.55"
   },
   "Turkey":{
      "latitude":"39",
      "longitude":"35"
   },
   "Afghanistan":{
      "latitude":"33",
      "longitude":"65"
   },
   "Bangladesh":{
      "latitude":"24",
      "longitude":"90"
   },
   "Mauritania":{
      "latitude":"20",
      "longitude":"-12"
   },
   "Solomon Islands":{
      "latitude":"-8",
      "longitude":"159"
   },
   "Turks and Caicos Islands":{
      "latitude":"21.75",
      "longitude":"-71.5833"
   },
   "Saint Lucia":{
      "latitude":"13.8833",
      "longitude":"-61.1333"
   },
   "San Marino":{
      "latitude":"43.7667",
      "longitude":"12.4167"
   },
   "French Polynesia":{
      "latitude":"-15",
      "longitude":"-140"
   },
   "France":{
      "latitude":"46",
      "longitude":"2"
   },
   "Macedonia, the former Yugoslav Republic of":{
      "latitude":"41.8333",
      "longitude":"22"
   },
   "Syrian Arab Republic":{
      "latitude":"35",
      "longitude":"38"
   },
   "Bermuda":{
      "latitude":"32.3333",
      "longitude":"-64.75"
   },
   "Slovakia":{
      "latitude":"48.6667",
      "longitude":"19.5"
   },
   "Somalia":{
      "latitude":"10",
      "longitude":"49"
   },
   "Peru":{
      "latitude":"-10",
      "longitude":"-76"
   },
   "Vanuatu":{
      "latitude":"-16",
      "longitude":"167"
   },
   "Nauru":{
      "latitude":"-0.5333",
      "longitude":"166.9167"
   },
   "Seychelles":{
      "latitude":"-4.5833",
      "longitude":"55.6667"
   },
   "Norway":{
      "latitude":"62",
      "longitude":"10"
   },
   "Malawi":{
      "latitude":"-13.5",
      "longitude":"34"
   },
   "Cook Islands":{
      "latitude":"-21.2333",
      "longitude":"-159.7667"
   },
   "Benin":{
      "latitude":"9.5",
      "longitude":"2.25"
   },
   "Congo, the Democratic Republic of the":{
      "latitude":"0",
      "longitude":"25"
   },
   "Cuba":{
      "latitude":"21.5",
      "longitude":"-80"
   },
   "Iran, Islamic Republic of":{
      "latitude":"32",
      "longitude":"53"
   },
   "Falkland Islands (Malvinas)":{
      "latitude":"-51.75",
      "longitude":"-59"
   },
   "Mayotte":{
      "latitude":"-12.8333",
      "longitude":"45.1667"
   },
   "Holy See (Vatican City State)":{
      "latitude":"41.9",
      "longitude":"12.45"
   },
   "China":{
      "latitude":"35",
      "longitude":"105"
   },
   "Armenia":{
      "latitude":"40",
      "longitude":"45"
   },
   "Timor-Leste":{
      "latitude":"-8.55",
      "longitude":"125.5167"
   },
   "Dominican Republic":{
      "latitude":"19",
      "longitude":"-70.6667"
   },
   "Ukraine":{
      "latitude":"49",
      "longitude":"32"
   },
   "Bahrain":{
      "latitude":"26",
      "longitude":"50.55"
   },
   "Tonga":{
      "latitude":"-20",
      "longitude":"-175"
   },
   "Finland":{
      "latitude":"64",
      "longitude":"26"
   },
   "Western Sahara":{
      "latitude":"24.5",
      "longitude":"-13"
   },
   "Cayman Islands":{
      "latitude":"19.5",
      "longitude":"-80.5"
   },
   "Central African Republic":{
      "latitude":"7",
      "longitude":"21"
   },
   "New Caledonia":{
      "latitude":"-21.5",
      "longitude":"165.5"
   },
   "Mauritius":{
      "latitude":"-20.2833",
      "longitude":"57.55"
   },
   "Tajikistan":{
      "latitude":"39",
      "longitude":"71"
   },
   "Liechtenstein":{
      "latitude":"47.1667",
      "longitude":"9.5333"
   },
   "Australia":{
      "latitude":"-27",
      "longitude":"133"
   },
   "Mali":{
      "latitude":"17",
      "longitude":"-4"
   },
   "Sweden":{
      "latitude":"62",
      "longitude":"15"
   },
   "Bulgaria":{
      "latitude":"43",
      "longitude":"25"
   },
   "United States":{
      "latitude":"38",
      "longitude":"-97"
   },
   "Romania":{
      "latitude":"46",
      "longitude":"25"
   },
   "Angola":{
      "latitude":"-12.5",
      "longitude":"18.5"
   },
   "French Southern Territories":{
      "latitude":"-43",
      "longitude":"67"
   },
   "Chad":{
      "latitude":"15",
      "longitude":"19"
   },
   "South Africa":{
      "latitude":"-29",
      "longitude":"24"
   },
   "Tokelau":{
      "latitude":"-9",
      "longitude":"-172"
   },
   "Cyprus":{
      "latitude":"35",
      "longitude":"33"
   },
   "South Georgia and the South Sandwich Islands":{
      "latitude":"-54.5",
      "longitude":"-37"
   },
   "Brunei Darussalam":{
      "latitude":"4.5",
      "longitude":"114.6667"
   },
   "Qatar":{
      "latitude":"25.5",
      "longitude":"51.25"
   },
   "Malaysia":{
      "latitude":"2.5",
      "longitude":"112.5"
   },
   "Austria":{
      "latitude":"47.3333",
      "longitude":"13.3333"
   },
   "Mozambique":{
      "latitude":"-18.25",
      "longitude":"35"
   },
   "Uganda":{
      "latitude":"1",
      "longitude":"32"
   },
   "Hungary":{
      "latitude":"47",
      "longitude":"20"
   },
   "Niger":{
      "latitude":"16",
      "longitude":"8"
   },
   "Isle of Man":{
      "latitude":"54.23",
      "longitude":"-4.55"
   },
   "Brazil":{
      "latitude":"-10",
      "longitude":"-55"
   },
   "Faroe Islands":{
      "latitude":"62",
      "longitude":"-7"
   },
   "Guinea":{
      "latitude":"11",
      "longitude":"-10"
   },
   "Panama":{
      "latitude":"9",
      "longitude":"-80"
   },
   "Korea, Republic of":{
      "latitude":"37",
      "longitude":"127.5"
   },
   "C\u032bte d'Ivoire":{
      "latitude":"8",
      "longitude":"-5"
   },
   "Costa Rica":{
      "latitude":"10",
      "longitude":"-84"
   },
   "Luxembourg":{
      "latitude":"49.75",
      "longitude":"6.1667"
   },
   "Cape Verde":{
      "latitude":"16",
      "longitude":"-24"
   },
   "Bahamas":{
      "latitude":"24.25",
      "longitude":"-76"
   },
   "Gibraltar":{
      "latitude":"36.1833",
      "longitude":"-5.3667"
   },
   "Ireland":{
      "latitude":"53",
      "longitude":"-8"
   },
   "Pakistan":{
      "latitude":"30",
      "longitude":"70"
   },
   "Palau":{
      "latitude":"7.5",
      "longitude":"134.5"
   },
   "Nigeria":{
      "latitude":"10",
      "longitude":"8"
   },
   "Ecuador":{
      "latitude":"-2",
      "longitude":"-77.5"
   },
   "Czech Republic":{
      "latitude":"49.75",
      "longitude":"15.5"
   },
   "Viet Nam":{
      "latitude":"16",
      "longitude":"106"
   },
   "Belarus":{
      "latitude":"53",
      "longitude":"28"
   },
   "Algeria":{
      "latitude":"28",
      "longitude":"3"
   },
   "Slovenia":{
      "latitude":"46",
      "longitude":"15"
   },
   "El Salvador":{
      "latitude":"13.8333",
      "longitude":"-88.9167"
   },
   "Tuvalu":{
      "latitude":"-8",
      "longitude":"178"
   },
   "Saint Pierre and Miquelon":{
      "latitude":"46.8333",
      "longitude":"-56.3333"
   },
   "Marshall Islands":{
      "latitude":"9",
      "longitude":"168"
   },
   "Chile":{
      "latitude":"-30",
      "longitude":"-71"
   },
   "Puerto Rico":{
      "latitude":"18.25",
      "longitude":"-66.5"
   },
   "Belgium":{
      "latitude":"50.8333",
      "longitude":"4"
   },
   "Kiribati":{
      "latitude":"1.4167",
      "longitude":"173"
   },
   "Haiti":{
      "latitude":"19",
      "longitude":"-72.4167"
   },
   "Belize":{
      "latitude":"17.25",
      "longitude":"-88.75"
   },
   "Hong Kong":{
      "latitude":"22.25",
      "longitude":"114.1667"
   },
   "Sierra Leone":{
      "latitude":"8.5",
      "longitude":"-11.5"
   },
   "Georgia":{
      "latitude":"42",
      "longitude":"43.5"
   },
   "Lao People's Democratic Republic":{
      "latitude":"18",
      "longitude":"105"
   },
   "Mexico":{
      "latitude":"23",
      "longitude":"-102"
   },
   "Gambia":{
      "latitude":"13.4667",
      "longitude":"-16.5667"
   },
   "Philippines":{
      "latitude":"13",
      "longitude":"122"
   },
   "R\u0329union":{
      "latitude":"-21.1",
      "longitude":"55.6"
   },
   "Morocco":{
      "latitude":"32",
      "longitude":"-5"
   },
   "Croatia":{
      "latitude":"45.1667",
      "longitude":"15.5"
   },
   "Mongolia":{
      "latitude":"46",
      "longitude":"105"
   },
   "Guernsey":{
      "latitude":"49.5",
      "longitude":"-2.56"
   },
   "Thailand":{
      "latitude":"15",
      "longitude":"100"
   },
   "Namibia":{
      "latitude":"-22",
      "longitude":"17"
   },
   "Grenada":{
      "latitude":"12.1167",
      "longitude":"-61.6667"
   },
   "Taiwan, Province of China":{
      "latitude":"23.5",
      "longitude":"121"
   },
   "Iraq":{
      "latitude":"33",
      "longitude":"44"
   },
   "Tanzania, United Republic of":{
      "latitude":"-6",
      "longitude":"35"
   },
   "Portugal":{
      "latitude":"39.5",
      "longitude":"-8"
   },
   "Estonia":{
      "latitude":"59",
      "longitude":"26"
   },
   "Uruguay":{
      "latitude":"-33",
      "longitude":"-56"
   },
   "Equatorial Guinea":{
      "latitude":"2",
      "longitude":"10"
   },
   "Lebanon":{
      "latitude":"33.8333",
      "longitude":"35.8333"
   },
   "Svalbard and Jan Mayen":{
      "latitude":"78",
      "longitude":"20"
   },
   "Uzbekistan":{
      "latitude":"41",
      "longitude":"64"
   },
   "Tunisia":{
      "latitude":"34",
      "longitude":"9"
   },
   "Djibouti":{
      "latitude":"11.5",
      "longitude":"43"
   },
   "Heard Island and McDonald Islands":{
      "latitude":"-53.1",
      "longitude":"72.5167"
   },
   "Antigua and Barbuda":{
      "latitude":"17.05",
      "longitude":"-61.8"
   },
   "Spain":{
      "latitude":"40",
      "longitude":"-4"
   },
   "Colombia":{
      "latitude":"4",
      "longitude":"-72"
   },
   "Burundi":{
      "latitude":"-3.5",
      "longitude":"30"
   },
   "Fiji":{
      "latitude":"-18",
      "longitude":"175"
   },
   "Barbados":{
      "latitude":"13.1667",
      "longitude":"-59.5333"
   },
   "Madagascar":{
      "latitude":"-20",
      "longitude":"47"
   },
   "Italy":{
      "latitude":"42.8333",
      "longitude":"12.8333"
   },
   "Bhutan":{
      "latitude":"27.5",
      "longitude":"90.5"
   },
   "Sudan":{
      "latitude":"15",
      "longitude":"30"
   },
   "Bolivia, Plurinational State of":{
      "latitude":"-17",
      "longitude":"-65"
   },
   "Nepal":{
      "latitude":"28",
      "longitude":"84"
   },
   "Malta":{
      "latitude":"35.8333",
      "longitude":"14.5833"
   },
   "Netherlands":{
      "latitude":"52.5",
      "longitude":"5.75"
   },
   "Northern Mariana Islands":{
      "latitude":"15.2",
      "longitude":"145.75"
   },
   "Suriname":{
      "latitude":"4",
      "longitude":"-56"
   },
   "Anguilla":{
      "latitude":"18.25",
      "longitude":"-63.1667"
   },
   "Netherlands Antilles":{
      "latitude":"12.25",
      "longitude":"-68.75"
   },
   "Christmas Island":{
      "latitude":"-10.5",
      "longitude":"105.6667"
   },
   "Indonesia":{
      "latitude":"-5",
      "longitude":"120"
   },
   "Iceland":{
      "latitude":"65",
      "longitude":"-18"
   },
   "Zambia":{
      "latitude":"-15",
      "longitude":"30"
   },
   "Senegal":{
      "latitude":"14",
      "longitude":"-14"
   },
   "Papua New Guinea":{
      "latitude":"-6",
      "longitude":"147"
   },
   "Saint Kitts and Nevis":{
      "latitude":"17.3333",
      "longitude":"-62.75"
   },
   "Trinidad and Tobago":{
      "latitude":"11",
      "longitude":"-61"
   },
   "Zimbabwe":{
      "latitude":"-20",
      "longitude":"30"
   },
   "Germany":{
      "latitude":"51",
      "longitude":"9"
   },
   "Denmark":{
      "latitude":"56",
      "longitude":"10"
   },
   "Kazakhstan":{
      "latitude":"48",
      "longitude":"68"
   },
   "Poland":{
      "latitude":"52",
      "longitude":"20"
   },
   "Moldova, Republic of":{
      "latitude":"47",
      "longitude":"29"
   },
   "Eritrea":{
      "latitude":"15",
      "longitude":"39"
   },
   "Kyrgyzstan":{
      "latitude":"41",
      "longitude":"75"
   },
   "British Indian Ocean Territory":{
      "latitude":"-6",
      "longitude":"71.5"
   },
   "Korea, Democratic People's Republic of":{
      "latitude":"40",
      "longitude":"127"
   },
   "Israel":{
      "latitude":"31.5",
      "longitude":"34.75"
   },
   "Sri Lanka":{
      "latitude":"7",
      "longitude":"81"
   },
   "Latvia":{
      "latitude":"57",
      "longitude":"25"
   },
   "Guyana":{
      "latitude":"5",
      "longitude":"-59"
   },
   "Guadeloupe":{
      "latitude":"16.25",
      "longitude":"-61.5833"
   },
   "Honduras":{
      "latitude":"15",
      "longitude":"-86.5"
   },
   "Myanmar":{
      "latitude":"22",
      "longitude":"98"
   },
   "Bouvet Island":{
      "latitude":"-54.4333",
      "longitude":"3.4"
   },
   "Egypt":{
      "latitude":"27",
      "longitude":"30"
   },
   "Nicaragua":{
      "latitude":"13",
      "longitude":"-85"
   },
   "Singapore":{
      "latitude":"1.3667",
      "longitude":"103.8"
   },
   "Serbia":{
      "latitude":"44",
      "longitude":"21"
   },
   "Botswana":{
      "latitude":"-22",
      "longitude":"24"
   },
   "United Kingdom":{
      "latitude":"54",
      "longitude":"-2"
   },
   "Antarctica":{
      "latitude":"-90",
      "longitude":"0"
   },
   "Congo":{
      "latitude":"-1",
      "longitude":"15"
   },
   "Greece":{
      "latitude":"39",
      "longitude":"22"
   },
   "Paraguay":{
      "latitude":"-23",
      "longitude":"-58"
   },
   "French Guiana":{
      "latitude":"4",
      "longitude":"-53"
   },
   "Palestinian Territory, Occupied":{
      "latitude":"32",
      "longitude":"35.25"
   },
   "Comoros":{
      "latitude":"-12.1667",
      "longitude":"44.25"
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
            dataItem = null, children = null, items = null, child = null, childKey = null,
            childrenKeys = null;
    myApp.bin = {};

    if (data) {
      data.forEach(function(item) {
        ships_from  = item.ships_from
        ships_to = item.ships_to

        if (ships_to !== "Worldwide" && ships_from !== "Worldwide") {
          key = ships_from.trim();
          if (key in myApp.bin) {
            children = myApp.bin[key].children;
            childrenKeys = myApp.bin[key].childrenKeys;
          } else {
            children = [];
            childrenKeys = [];
            dataItem = {"country": key, "childrenKeys": childrenKeys, "children": children, "loc":country_to_latlon[key]};
            dataItem.x = parseFloat(dataItem.loc["longitude"]);
            dataItem.y = parseFloat(dataItem.loc["latitude"]);
            newData.push(dataItem);
            myApp.bin[key] = dataItem;
          }

          items = ships_to.split(",")
          for (i = 0; i < items.length; ++i) {
            childKey = items[i].trim();
            if (key !== childKey) {
              if (childrenKeys.indexOf(child) !== -1) {
                continue;
              }
              else {
                if (childKey in newData) {
                  children.push(newData[childKey]);
                } else {
                   var newChildren = []
                   dataItem = {"country": childKey, "childrenKeys": [], "children": newChildren, "loc":country_to_latlon[childKey]};
                   dataItem.x = parseFloat(dataItem.loc["longitude"]);
                   dataItem.y = parseFloat(dataItem.loc["latitude"]);
                   newData.push(dataItem);
                   myApp.bin[key] = dataItem;
                   children.push(dataItem);
                }
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
    var newData = prepareDataForRendering(data);
    var layer = myApp.map.createLayer('feature', {'renderer' : 'd3'}),
        style = {
        nodes: {
          stroke: false,
          fill: true,
          fillColor: { r: 0.8, g: 0.5, b: 0.0 },
          fillOpacity: 1.0
        },
        links: {
          strokeColor: { r:0.2, g:0.2, b:0.7 },
          strokeWidth: 5.0,
          strokeOpacity: 0.1,
        },
        linkType: 'path'
      };
    layer.createFeature('graph')
        .data(newData.data)
        .style(style);
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

