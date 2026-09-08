// Searchable city names mapped to [latitude, longitude].
// Used by the city search so kids can look up their hometown
// and see whether Santa has reached them yet.
// Heavy coverage of the US and Canada — every state/province
// capital, every city over ~40K, plus many smaller towns.

export const SEARCHABLE_CITIES = {
  // ═══════════════════════════════════════════
  // UNITED STATES — by state, comprehensive
  // ═══════════════════════════════════════════

  // Alabama
  "birmingham":[33.52,-86.80],"montgomery":[32.37,-86.30],"huntsville":[34.73,-86.59],
  "mobile":[30.69,-88.04],"tuscaloosa":[33.21,-87.57],"hoover":[33.41,-86.81],
  "dothan":[31.22,-85.39],"auburn al":[32.61,-85.48],"decatur al":[34.61,-86.98],
  "florence al":[34.80,-87.68],"gadsden":[34.01,-86.01],"opelika":[32.65,-85.38],

  // Alaska
  "anchorage":[61.22,-149.90],"fairbanks":[64.84,-147.72],"juneau":[58.30,-134.42],
  "sitka":[57.05,-135.33],"ketchikan":[55.34,-131.64],"wasilla":[61.58,-149.44],
  "kodiak":[57.79,-152.41],"nome":[64.50,-165.41],"barrow":[71.29,-156.79],

  // Arizona
  "phoenix":[33.45,-112.07],"tucson":[32.22,-110.93],"mesa":[33.42,-111.83],
  "chandler":[33.30,-111.84],"scottsdale":[33.49,-111.93],"glendale az":[33.54,-112.19],
  "gilbert":[33.35,-111.79],"tempe":[33.43,-111.94],"peoria az":[33.58,-112.24],
  "surprise":[33.63,-112.37],"yuma":[32.69,-114.62],"flagstaff":[35.20,-111.65],
  "goodyear":[33.44,-112.36],"lake havasu city":[34.48,-114.32],"prescott":[34.54,-112.47],
  "sedona":[34.87,-111.76],"sierra vista":[31.55,-110.30],

  // Arkansas
  "little rock":[34.75,-92.29],"fort smith":[35.39,-94.40],"fayetteville ar":[36.06,-94.16],
  "springdale":[36.19,-94.13],"jonesboro":[35.84,-90.70],"rogers":[36.33,-94.12],
  "conway":[35.09,-92.44],"bentonville":[36.37,-94.21],"pine bluff":[34.23,-92.00],
  "hot springs":[34.50,-93.06],"texarkana":[33.44,-94.05],

  // California
  "los angeles":[34.05,-118.24],"san diego":[32.72,-117.16],"san jose":[37.34,-121.89],
  "san francisco":[37.77,-122.42],"fresno":[36.75,-119.77],"sacramento":[38.58,-121.49],
  "long beach":[33.77,-118.19],"oakland":[37.80,-122.27],"bakersfield":[35.37,-119.02],
  "anaheim":[33.84,-117.91],"santa ana":[33.75,-117.87],"riverside":[33.95,-117.40],
  "stockton":[37.96,-121.29],"irvine":[33.68,-117.83],"chula vista":[32.64,-117.08],
  "fremont":[37.55,-121.99],"san bernardino":[34.11,-117.29],"modesto":[37.64,-120.99],
  "moreno valley":[33.94,-117.23],"fontana":[34.09,-117.44],"glendale":[34.14,-118.26],
  "huntington beach":[33.66,-117.99],"santa clarita":[34.39,-118.54],
  "garden grove":[33.77,-117.94],"oceanside":[33.20,-117.38],"rancho cucamonga":[34.11,-117.57],
  "ontario ca":[34.06,-117.65],"santa rosa":[38.44,-122.71],"elk grove":[38.41,-121.37],
  "corona":[33.88,-117.57],"lancaster":[34.70,-118.14],"palmdale":[34.58,-118.12],
  "salinas":[36.68,-121.66],"pomona":[34.06,-117.75],"escondido":[33.12,-117.09],
  "torrance":[33.84,-118.34],"pasadena":[34.15,-118.14],"orange":[33.79,-117.85],
  "fullerton":[33.87,-117.92],"thousand oaks":[34.17,-118.84],"roseville":[38.75,-121.29],
  "concord ca":[37.98,-122.03],"simi valley":[34.27,-118.78],"santa clara":[37.35,-121.95],
  "victorville":[34.54,-117.29],"vallejo":[38.10,-122.26],"berkeley":[37.87,-122.27],
  "el monte":[34.07,-118.03],"downey":[33.94,-118.13],"costa mesa":[33.64,-117.92],
  "inglewood":[33.96,-118.35],"carlsbad":[33.16,-117.35],"san leandro":[37.72,-122.16],
  "san marcos":[33.14,-117.17],"murrieta":[33.55,-117.21],"temecula":[33.49,-117.15],
  "santa maria":[34.95,-120.44],"redding":[40.59,-122.39],"visalia":[36.33,-119.29],
  "santa barbara":[34.42,-119.70],"san luis obispo":[35.28,-120.66],
  "santa cruz":[36.97,-122.03],"monterey":[36.60,-121.89],"napa":[38.30,-122.29],
  "eureka":[40.80,-124.16],"palm springs":[33.83,-116.55],"ventura":[34.27,-119.23],
  "san clemente":[33.43,-117.61],"palo alto":[37.44,-122.14],"mountain view":[37.39,-122.08],
  "sunnyvale":[37.37,-122.04],"cupertino":[37.32,-122.03],"redwood city":[37.49,-122.24],
  "san mateo":[37.56,-122.33],"daly city":[37.69,-122.47],"burbank":[34.18,-118.31],
  "west hollywood":[34.09,-118.36],"santa monica":[34.02,-118.49],"beverly hills":[34.07,-118.40],
  "malibu":[34.03,-118.68],"laguna beach":[33.54,-117.78],"newport beach":[33.62,-117.93],
  "encinitas":[33.04,-117.29],"davis":[38.54,-121.74],"san rafael":[37.97,-122.53],
  "petaluma":[38.23,-122.64],"chico":[39.73,-121.84],"merced":[37.30,-120.48],
  "lodi":[38.13,-121.27],"turlock":[37.49,-120.85],"manteca":[37.80,-121.22],
  "tracy":[37.74,-121.42],"gilroy":[37.01,-121.57],"hollister":[36.85,-121.40],
  "lompoc":[34.64,-120.46],"hanford":[36.33,-119.65],"porterville":[36.07,-119.02],
  "tulare":[36.21,-119.35],"madera":[36.96,-120.06],"clovis":[36.83,-119.70],
  "woodland":[38.68,-121.77],"yuba city":[39.14,-121.62],

  // Colorado
  "denver":[39.74,-104.99],"colorado springs":[38.83,-104.82],"aurora":[39.73,-104.83],
  "fort collins":[40.59,-105.08],"lakewood":[39.70,-105.08],"thornton":[39.87,-104.97],
  "arvada":[39.80,-105.09],"pueblo":[38.25,-104.61],"boulder":[40.01,-105.27],
  "greeley":[40.42,-104.71],"longmont":[40.17,-105.10],"loveland":[40.40,-105.07],
  "grand junction":[39.06,-108.55],"broomfield":[39.92,-105.09],"castle rock":[39.37,-104.86],
  "durango":[37.28,-107.88],"steamboat springs":[40.48,-106.83],"aspen":[39.19,-106.82],
  "vail":[39.64,-106.37],"telluride":[37.94,-107.81],"estes park":[40.38,-105.52],
  "glenwood springs":[39.55,-107.32],

  // Connecticut
  "hartford":[41.76,-72.69],"bridgeport":[41.18,-73.19],"new haven":[41.31,-72.92],
  "stamford":[41.05,-73.54],"waterbury":[41.56,-73.04],"norwalk":[41.12,-73.41],
  "danbury":[41.40,-73.45],"new britain":[41.66,-72.78],"bristol ct":[41.67,-72.95],
  "meriden":[41.54,-72.81],"manchester ct":[41.78,-72.52],"greenwich":[41.03,-73.63],
  "west hartford":[41.76,-72.74],"milford ct":[41.22,-73.06],"middletown ct":[41.56,-72.65],
  "mystic":[41.35,-71.97],"new london":[41.36,-72.10],

  // Delaware
  "wilmington":[39.74,-75.55],"dover":[39.16,-75.52],"newark de":[39.68,-75.75],
  "rehoboth beach":[38.72,-75.08],

  // Florida
  "jacksonville":[30.33,-81.66],"miami":[25.77,-80.19],"tampa":[27.95,-82.46],
  "orlando":[28.54,-81.38],"st petersburg":[27.77,-82.64],"hialeah":[25.86,-80.28],
  "tallahassee":[30.44,-84.28],"fort lauderdale":[26.12,-80.14],"port st lucie":[27.27,-80.35],
  "cape coral":[26.56,-81.95],"pembroke pines":[26.01,-80.22],"hollywood fl":[26.01,-80.15],
  "gainesville":[29.65,-82.32],"miramar":[25.99,-80.23],"coral springs":[26.27,-80.27],
  "clearwater":[27.97,-82.76],"palm bay":[28.03,-80.59],"lakeland":[28.04,-81.95],
  "pompano beach":[26.24,-80.12],"west palm beach":[26.72,-80.05],
  "davie":[26.08,-80.23],"boca raton":[26.36,-80.08],"deltona":[28.90,-81.26],
  "sunrise":[26.15,-80.28],"largo":[27.91,-82.79],"deerfield beach":[26.32,-80.10],
  "melbourne fl":[28.08,-80.61],"boynton beach":[26.53,-80.07],"fort myers":[26.64,-81.87],
  "pensacola":[30.44,-87.22],"daytona beach":[29.21,-81.02],"ocala":[29.19,-82.14],
  "sarasota":[27.34,-82.53],"naples fl":[26.14,-81.79],"key west":[24.56,-81.78],
  "kissimmee":[28.29,-81.41],"panama city fl":[30.16,-85.66],"destin":[30.39,-86.50],
  "st augustine":[29.89,-81.31],"sanford":[28.81,-81.27],"brandon":[27.94,-82.29],
  "winter haven":[28.02,-81.73],"palm coast":[29.59,-81.21],"apopka":[28.68,-81.51],
  "titusville":[28.61,-80.81],"vero beach":[27.64,-80.40],

  // Georgia
  "atlanta":[33.75,-84.39],"augusta":[33.47,-81.97],"columbus ga":[32.46,-84.99],
  "macon":[32.84,-83.63],"savannah":[32.08,-81.10],"athens ga":[33.96,-83.38],
  "sandy springs":[33.92,-84.38],"roswell":[34.02,-84.36],"johns creek":[34.03,-84.20],
  "albany ga":[31.58,-84.16],"warner robins":[32.61,-83.60],"alpharetta":[34.08,-84.29],
  "marietta":[33.95,-84.55],"valdosta":[30.83,-83.28],"smyrna":[33.88,-84.51],
  "dalton":[34.77,-84.97],"gainesville ga":[34.30,-83.82],"kennesaw":[34.02,-84.62],
  "peachtree city":[33.40,-84.60],"statesboro":[32.45,-81.78],

  // Hawaii
  "honolulu":[21.31,-157.86],"hilo":[19.72,-155.08],"kailua":[21.40,-157.74],
  "pearl city":[21.40,-157.97],"waipahu":[21.39,-158.01],"kaneohe":[21.42,-157.80],
  "lahaina":[20.87,-156.68],"kihei":[20.76,-156.45],"lihue":[21.97,-159.37],

  // Idaho
  "boise":[43.62,-116.20],"meridian":[43.61,-116.39],"nampa":[43.54,-116.56],
  "idaho falls":[43.47,-112.03],"pocatello":[42.86,-112.45],"caldwell":[43.66,-116.69],
  "coeur d'alene":[47.68,-116.78],"twin falls":[42.56,-114.46],"lewiston":[46.42,-117.02],
  "moscow id":[46.73,-117.00],"sun valley":[43.70,-114.35],"sandpoint":[48.28,-116.55],

  // Illinois
  "chicago":[41.88,-87.63],"aurora il":[41.76,-88.32],"joliet":[41.53,-88.08],
  "naperville":[41.79,-88.15],"rockford":[42.27,-89.09],"elgin":[42.04,-88.28],
  "springfield il":[39.80,-89.64],"peoria il":[40.69,-89.59],"champaign":[40.12,-88.24],
  "waukegan":[42.36,-87.84],"cicero":[41.85,-87.75],"bloomington il":[40.48,-88.99],
  "arlington heights":[42.09,-87.98],"evanston":[42.05,-87.69],"schaumburg":[42.03,-88.08],
  "decatur il":[39.84,-88.95],"normal":[40.51,-89.00],"urbana":[40.11,-88.21],
  "bolingbrook":[41.70,-88.07],"wheaton":[41.87,-88.11],"belleville":[38.52,-89.98],
  "des plaines":[42.03,-87.88],"orland park":[41.63,-87.86],"tinley park":[41.57,-87.79],
  "oak lawn":[41.72,-87.76],"berwyn":[41.85,-87.79],"oak park":[41.89,-87.78],
  "skokie":[42.03,-87.74],"quincy il":[39.94,-91.41],"dekalb":[41.93,-88.75],
  "galesburg":[40.95,-90.37],"carbondale":[37.73,-89.22],"danville il":[40.12,-87.63],
  "rantoul":[40.31,-88.16],

  // Indiana
  "indianapolis":[39.77,-86.16],"fort wayne":[41.08,-85.14],"evansville":[37.97,-87.56],
  "south bend":[41.68,-86.25],"carmel":[39.98,-86.12],"fishers":[39.96,-86.01],
  "bloomington in":[39.17,-86.53],"hammond":[41.58,-87.50],"gary":[41.59,-87.35],
  "lafayette":[40.42,-86.87],"muncie":[40.19,-85.39],"terre haute":[39.47,-87.41],
  "kokomo":[40.49,-86.13],"anderson":[40.11,-85.68],"noblesville":[40.05,-86.01],
  "greenwood":[39.61,-86.11],"elkhart":[41.68,-85.97],"mishawaka":[41.66,-86.16],
  "columbus in":[39.20,-85.92],"valparaiso":[41.47,-87.06],

  // Iowa
  "des moines":[41.60,-93.61],"cedar rapids":[41.98,-91.67],"davenport":[41.52,-90.58],
  "sioux city":[42.50,-96.40],"iowa city":[41.66,-91.53],"waterloo":[42.49,-92.34],
  "council bluffs":[41.26,-95.86],"ames":[42.03,-93.62],"dubuque":[42.50,-90.66],
  "ankeny":[41.73,-93.60],"west des moines":[41.58,-93.71],"cedar falls":[42.53,-92.45],
  "mason city":[43.15,-93.20],"burlington ia":[40.81,-91.11],"clinton ia":[41.84,-90.19],
  "fort dodge":[42.50,-94.17],"marshalltown":[42.05,-92.91],"ottumwa":[41.02,-92.41],

  // Kansas
  "wichita":[37.69,-97.34],"overland park":[38.98,-94.67],"kansas city ks":[39.11,-94.63],
  "olathe":[38.88,-94.82],"topeka":[39.05,-95.68],"lawrence":[38.97,-95.24],
  "shawnee":[39.02,-94.72],"manhattan ks":[39.18,-96.57],"lenexa":[38.95,-94.73],
  "salina":[38.84,-97.61],"hutchinson":[38.06,-97.93],"garden city ks":[37.97,-100.87],
  "dodge city":[37.75,-100.02],"emporia":[38.40,-96.18],"junction city":[39.03,-96.83],
  "hays":[38.88,-99.33],"liberal":[37.04,-100.92],

  // Kentucky
  "louisville":[38.25,-85.76],"lexington":[38.05,-84.50],"bowling green":[36.99,-86.44],
  "owensboro":[37.77,-87.11],"covington":[39.08,-84.51],"frankfort":[38.20,-84.87],
  "richmond ky":[37.75,-84.29],"florence ky":[38.99,-84.63],"georgetown ky":[38.21,-84.56],
  "elizabethtown":[37.69,-85.86],"henderson":[37.84,-87.59],"paducah":[37.08,-88.60],
  "ashland":[38.48,-82.64],"hopkinsville":[36.87,-87.49],

  // Louisiana
  "new orleans":[29.95,-90.08],"baton rouge":[30.44,-91.19],"shreveport":[32.53,-93.75],
  "metairie":[30.00,-90.18],"lafayette la":[30.22,-92.02],"lake charles":[30.23,-93.22],
  "kenner":[30.00,-90.24],"bossier city":[32.52,-93.73],"monroe la":[32.51,-92.12],
  "alexandria la":[31.31,-92.45],"houma":[29.60,-90.72],"new iberia":[30.00,-91.81],
  "slidell":[30.28,-89.77],"natchitoches":[31.76,-93.09],

  // Maine
  "portland me":[43.66,-70.26],"lewiston":[44.10,-70.21],"bangor":[44.80,-68.77],
  "south portland":[43.64,-70.28],"auburn me":[44.10,-70.24],"biddeford":[43.49,-70.45],
  "augusta":[44.31,-69.78],"bar harbor":[44.39,-68.20],"brunswick me":[43.91,-69.97],
  "waterville":[44.55,-69.63],"presque isle":[46.68,-68.02],"caribou":[46.86,-68.01],

  // Maryland
  "baltimore":[39.29,-76.61],"columbia md":[39.20,-76.86],"germantown":[39.17,-77.27],
  "silver spring":[38.99,-77.03],"waldorf":[38.65,-76.94],"frederick":[39.41,-77.41],
  "ellicott city":[39.27,-76.80],"glen burnie":[39.16,-76.62],"rockville":[39.08,-77.15],
  "bethesda":[38.98,-77.10],"dundalk":[39.25,-76.52],"annapolis":[38.98,-76.49],
  "bowie":[39.01,-76.73],"college park":[38.98,-76.94],"salisbury":[38.37,-75.60],
  "cumberland":[39.65,-78.76],"hagerstown":[39.64,-77.72],"towson":[39.40,-76.60],
  "ocean city md":[38.34,-75.08],

  // Massachusetts
  "boston":[42.36,-71.06],"worcester":[42.26,-71.80],"springfield ma":[42.10,-72.59],
  "cambridge":[42.37,-71.11],"lowell":[42.63,-71.32],"brockton":[42.08,-71.02],
  "new bedford":[41.64,-70.93],"quincy":[42.25,-71.00],"lynn":[42.47,-70.95],
  "fall river":[41.70,-71.15],"newton":[42.34,-71.21],"somerville":[42.39,-71.10],
  "lawrence":[42.71,-71.16],"framingham":[42.28,-71.42],"haverhill":[42.78,-71.08],
  "waltham":[42.38,-71.24],"brookline":[42.33,-71.12],"plymouth":[41.96,-70.67],
  "medford":[42.42,-71.11],"taunton":[41.90,-71.09],"salem":[42.52,-70.90],
  "pittsfield":[42.45,-73.25],"barnstable":[41.70,-70.30],"northampton":[42.33,-72.63],
  "amherst":[42.38,-72.52],"cape cod":[41.67,-70.30],"nantucket":[41.28,-70.10],
  "martha's vineyard":[41.39,-70.61],

  // Michigan
  "detroit":[42.33,-83.05],"grand rapids":[42.96,-85.67],"warren":[42.49,-83.03],
  "sterling heights":[42.58,-83.03],"ann arbor":[42.28,-83.74],"lansing":[42.73,-84.56],
  "flint":[43.01,-83.69],"dearborn":[42.32,-83.18],"livonia":[42.37,-83.35],
  "clinton township":[42.59,-82.93],"canton":[42.31,-83.48],"westland":[42.32,-83.40],
  "troy mi":[42.61,-83.15],"farmington hills":[42.49,-83.38],"kalamazoo":[42.29,-85.59],
  "southfield":[42.47,-83.22],"royal oak":[42.49,-83.14],"st clair shores":[42.50,-82.89],
  "pontiac":[42.64,-83.29],"taylor":[42.24,-83.27],"saginaw":[43.42,-83.95],
  "battle creek":[42.32,-85.18],"muskegon":[43.23,-86.25],"traverse city":[44.76,-85.62],
  "holland mi":[42.79,-86.11],"port huron":[42.97,-82.43],"jackson mi":[42.25,-84.40],
  "marquette":[46.55,-87.40],"midland mi":[43.62,-84.25],"east lansing":[42.74,-84.48],
  "petoskey":[45.37,-84.96],"mackinaw city":[45.78,-84.73],

  // Minnesota
  "minneapolis":[44.98,-93.26],"st paul":[44.95,-93.09],"rochester mn":[44.02,-92.47],
  "duluth":[46.79,-92.10],"bloomington mn":[44.84,-93.30],"brooklyn park":[45.09,-93.36],
  "plymouth mn":[45.01,-93.46],"maple grove":[45.07,-93.46],"woodbury":[44.92,-92.96],
  "st cloud":[45.56,-94.16],"eagan":[44.80,-93.17],"eden prairie":[44.85,-93.47],
  "coon rapids":[45.12,-93.30],"burnsville":[44.77,-93.28],"blaine":[45.16,-93.24],
  "lakeville":[44.65,-93.24],"mankato":[44.17,-94.00],"moorhead":[46.87,-96.77],
  "owatonna":[44.08,-93.23],"winona":[44.05,-91.64],"bemidji":[47.47,-94.88],
  "hibbing":[47.43,-92.94],"international falls":[48.60,-93.41],

  // Mississippi
  "jackson ms":[32.30,-90.18],"gulfport":[30.37,-89.09],"southaven":[34.99,-90.01],
  "hattiesburg":[31.33,-89.29],"biloxi":[30.40,-88.88],"olive branch":[34.96,-89.83],
  "tupelo":[34.26,-88.70],"meridian":[32.35,-88.70],"greenville ms":[33.41,-91.06],
  "vicksburg":[32.35,-90.88],"oxford ms":[34.37,-89.52],"starkville":[33.45,-88.82],
  "columbus ms":[33.50,-88.43],"natchez":[31.56,-91.40],

  // Missouri
  "kansas city":[39.10,-94.58],"st louis":[38.63,-90.20],"springfield mo":[37.22,-93.29],
  "columbia mo":[38.95,-92.33],"independence":[39.09,-94.42],"lee's summit":[38.91,-94.38],
  "o'fallon mo":[38.81,-90.70],"st joseph":[39.77,-94.85],"st charles":[38.78,-90.48],
  "blue springs":[39.02,-94.28],"joplin":[37.08,-94.51],"jefferson city":[38.58,-92.17],
  "cape girardeau":[37.31,-89.52],"branson":[36.64,-93.22],"sedalia":[38.70,-93.23],
  "hannibal":[39.71,-91.36],

  // Montana
  "billings":[45.78,-108.50],"missoula":[46.87,-114.00],"great falls":[47.50,-111.29],
  "bozeman":[45.68,-111.04],"butte":[46.00,-112.53],"helena":[46.60,-112.04],
  "kalispell":[48.20,-114.31],"whitefish":[48.41,-114.35],"miles city":[46.41,-105.84],

  // Nebraska
  "omaha":[41.26,-95.94],"lincoln":[40.81,-96.70],"bellevue ne":[41.14,-95.89],
  "grand island":[40.92,-98.34],"kearney":[40.70,-99.08],"north platte":[41.12,-100.77],
  "fremont ne":[41.43,-96.50],"hastings":[40.59,-98.39],"scottsbluff":[41.87,-103.67],
  "norfolk ne":[42.03,-97.42],"columbus ne":[41.43,-97.37],

  // Nevada
  "las vegas":[36.17,-115.14],"henderson":[36.04,-114.98],"reno":[39.53,-119.81],
  "north las vegas":[36.20,-115.12],"sparks":[39.53,-119.75],"carson city":[39.16,-119.77],
  "elko":[40.83,-115.76],"mesquite":[36.81,-114.07],"boulder city":[35.98,-114.83],
  "laughlin":[35.17,-114.57],

  // New Hampshire
  "manchester nh":[42.99,-71.45],"nashua":[42.77,-71.47],"concord nh":[43.21,-71.54],
  "dover nh":[43.20,-70.87],"rochester nh":[43.31,-70.98],"keene":[42.93,-72.28],
  "portsmouth nh":[43.07,-70.76],"laconia":[43.53,-71.47],"lebanon nh":[43.64,-72.25],
  "hanover":[43.70,-72.29],"north conway":[44.05,-71.13],"plymouth nh":[43.76,-71.69],

  // New Jersey
  "newark":[40.74,-74.17],"jersey city":[40.73,-74.08],"paterson":[40.92,-74.17],
  "elizabeth":[40.66,-74.21],"trenton":[40.22,-74.76],"clifton":[40.86,-74.16],
  "camden":[39.93,-75.12],"passaic":[40.86,-74.13],"union city":[40.77,-74.03],
  "east orange":[40.77,-74.21],"bayonne":[40.67,-74.11],"vineland":[39.49,-75.03],
  "new brunswick":[40.49,-74.45],"hoboken":[40.74,-74.03],"perth amboy":[40.51,-74.27],
  "atlantic city":[39.36,-74.42],"morristown":[40.80,-74.48],"hackensack":[40.89,-74.04],
  "princeton":[40.35,-74.66],"cherry hill":[39.93,-74.99],"toms river":[39.95,-74.20],
  "asbury park":[40.22,-74.01],"cape may":[38.94,-74.91],"montclair":[40.82,-74.21],
  "red bank":[40.35,-74.06],"woodbridge":[40.56,-74.28],

  // New Mexico
  "albuquerque":[35.08,-106.65],"las cruces":[32.31,-106.78],"rio rancho":[35.23,-106.66],
  "santa fe":[35.69,-105.94],"roswell":[33.39,-104.52],"farmington":[36.73,-108.22],
  "clovis nm":[34.40,-103.20],"hobbs":[32.71,-103.14],"alamogordo":[32.90,-105.96],
  "carlsbad nm":[32.42,-104.23],"gallup":[35.53,-108.74],"los alamos":[35.89,-106.31],
  "taos":[36.41,-105.57],"silver city":[32.77,-108.28],"truth or consequences":[33.13,-107.25],
  "ruidoso":[33.33,-105.67],

  // New York
  "new york":[40.71,-74.01],"buffalo":[42.89,-78.88],"rochester":[43.16,-77.62],
  "yonkers":[40.93,-73.90],"syracuse":[43.05,-76.15],"albany":[42.65,-73.76],
  "new rochelle":[40.91,-73.78],"mount vernon":[40.91,-73.84],"schenectady":[42.81,-73.94],
  "utica":[43.10,-75.23],"binghamton":[42.10,-75.91],"ithaca":[42.44,-76.50],
  "niagara falls":[43.09,-79.06],"troy":[42.73,-73.69],"white plains":[41.03,-73.77],
  "poughkeepsie":[41.70,-73.92],"saratoga springs":[43.08,-73.78],
  "kingston":[41.93,-73.99],"newburgh":[41.50,-74.01],"plattsburgh":[44.70,-73.45],
  "watertown":[43.97,-75.91],"oneida":[43.08,-75.65],"cortland":[42.60,-76.18],
  "oswego":[43.46,-76.51],"auburn ny":[42.93,-76.57],"canandaigua":[42.89,-77.28],
  "glen cove":[40.86,-73.63],"long island":[40.79,-73.13],"glens falls":[43.31,-73.64],
  "amsterdam ny":[42.94,-74.19],"oneonta":[42.45,-75.06],"ogdensburg":[44.69,-75.49],
  "massena":[44.93,-74.89],"jamestown":[42.10,-79.24],"dunkirk":[42.48,-79.33],
  "batavia":[43.00,-78.19],"geneva ny":[42.87,-76.98],"hornell":[42.33,-77.66],
  "corning":[42.14,-77.05],"elmira":[42.09,-76.81],"lockport":[43.17,-78.69],
  "north tonawanda":[43.04,-78.86],"tonawanda":[42.96,-78.88],"depew":[42.90,-78.69],
  "lackawanna":[42.83,-78.82],"west seneca":[42.85,-78.80],"cheektowaga":[42.88,-78.75],
  "williamsville":[42.96,-78.74],"kenmore":[42.97,-78.87],
  "east aurora":[42.77,-78.61],"hamburg":[42.72,-78.83],
  "lake placid":[44.28,-73.99],"cooperstown":[42.70,-74.92],
  "woodstock":[42.04,-74.12],"rhinebeck":[41.93,-73.91],"beacon":[41.50,-73.97],
  "cold spring":[41.42,-73.95],"tarrytown":[41.08,-73.86],"sleepy hollow":[41.09,-73.87],
  "bronxville":[40.94,-73.83],"pelham":[40.91,-73.81],"larchmont":[40.93,-73.75],
  "mamaroneck":[40.95,-73.73],"rye":[40.98,-73.69],"port chester":[41.00,-73.66],
  "ossining":[41.16,-73.86],"peekskill":[41.29,-73.92],"croton on hudson":[41.21,-73.89],

  // North Carolina
  "charlotte":[35.23,-80.84],"raleigh":[35.77,-78.64],"greensboro":[36.07,-79.79],
  "durham":[35.99,-78.90],"winston salem":[36.10,-80.24],"fayetteville":[35.05,-78.88],
  "cary":[35.79,-78.78],"wilmington nc":[34.23,-77.94],"high point":[35.96,-80.01],
  "concord nc":[35.41,-80.58],"greenville nc":[35.61,-77.37],"asheville":[35.60,-82.55],
  "gastonia":[35.26,-81.19],"jacksonville nc":[34.75,-77.43],"chapel hill":[35.91,-79.05],
  "huntersville":[35.41,-80.84],"apex":[35.73,-78.85],"hickory":[35.73,-81.34],
  "mooresville":[35.58,-80.81],"burlington nc":[36.10,-79.44],"rocky mount":[35.94,-77.79],
  "kannapolis":[35.49,-80.62],"sanford":[35.48,-79.18],"outer banks":[35.56,-75.47],
  "boone":[36.22,-81.67],"hendersonville":[35.32,-82.46],"new bern":[35.11,-77.04],

  // North Dakota
  "fargo":[46.88,-96.79],"bismarck":[46.81,-100.78],"grand forks":[47.93,-97.03],
  "minot":[48.23,-101.30],"west fargo":[46.87,-96.90],"mandan":[46.83,-100.89],
  "dickinson":[46.88,-102.79],"williston":[48.15,-103.62],"jamestown":[46.91,-98.71],
  "wahpeton":[46.27,-96.61],"devils lake":[48.11,-98.87],

  // Ohio
  "columbus":[39.96,-83.00],"cleveland":[41.50,-81.69],"cincinnati":[39.10,-84.51],
  "toledo":[41.65,-83.54],"akron":[41.08,-81.52],"dayton":[39.76,-84.19],
  "parma":[41.40,-81.73],"canton":[40.80,-81.38],"youngstown":[41.10,-80.65],
  "lorain":[41.45,-82.18],"hamilton oh":[39.40,-84.56],"springfield oh":[39.92,-83.81],
  "kettering":[39.69,-84.17],"elyria":[41.37,-82.11],"lakewood oh":[41.48,-81.80],
  "cuyahoga falls":[41.13,-81.48],"euclid":[41.59,-81.53],"mentor":[41.67,-81.34],
  "mansfield oh":[40.76,-82.52],"newark oh":[40.06,-82.40],"zanesville":[39.94,-82.01],
  "findlay":[41.04,-83.65],"marion oh":[40.59,-83.13],"sandusky":[41.45,-82.71],
  "bowling green oh":[41.37,-83.65],"athens oh":[39.33,-82.10],"chillicothe":[39.33,-82.98],
  "portsmouth oh":[38.73,-82.99],"wooster":[40.80,-81.94],"ashland oh":[40.87,-82.32],
  "ashtabula":[41.87,-80.79],"lima oh":[40.74,-84.11],

  // Oklahoma
  "oklahoma city":[35.47,-97.52],"tulsa":[36.15,-95.99],"norman":[35.22,-97.44],
  "broken arrow":[36.05,-95.79],"edmond":[35.65,-97.48],"lawton":[34.60,-98.39],
  "moore":[35.34,-97.49],"midwest city":[35.45,-97.40],"enid":[36.40,-97.88],
  "stillwater":[36.12,-97.06],"muskogee":[35.75,-95.37],"bartlesville":[36.75,-95.98],
  "shawnee ok":[35.33,-96.93],"ponca city":[36.71,-97.09],"ardmore":[34.17,-97.14],
  "durant":[33.99,-96.39],"mcalester":[34.93,-95.77],

  // Oregon
  "portland":[45.51,-122.68],"salem":[44.94,-123.04],"eugene":[44.05,-123.09],
  "gresham":[45.50,-122.43],"hillsboro":[45.52,-122.99],"beaverton":[45.49,-122.80],
  "bend":[44.06,-121.31],"medford":[42.33,-122.87],"springfield or":[44.05,-123.02],
  "corvallis":[44.56,-123.26],"albany or":[44.64,-123.11],"tigard":[45.43,-122.77],
  "lake oswego":[45.42,-122.67],"redmond or":[44.27,-121.17],"grants pass":[42.44,-123.33],
  "oregon city":[45.36,-122.61],"mcminnville":[45.21,-123.20],"ashland":[42.19,-122.71],
  "astoria":[46.19,-123.83],"hood river":[45.71,-121.52],"pendleton":[45.67,-118.79],
  "cannon beach":[45.89,-123.96],"seaside":[45.99,-123.92],"newport":[44.64,-124.05],
  "florence or":[43.98,-124.10],"klamath falls":[42.22,-121.73],
  "la grande":[45.32,-118.09],"baker city":[44.77,-117.83],
  "the dalles":[45.60,-121.18],"coos bay":[43.37,-124.22],

  // Pennsylvania
  "philadelphia":[39.95,-75.17],"pittsburgh":[40.44,-79.99],"allentown":[40.61,-75.49],
  "erie":[42.13,-80.09],"reading":[40.34,-75.93],"scranton":[41.41,-75.66],
  "bethlehem":[40.63,-75.37],"lancaster":[40.04,-76.31],"harrisburg":[40.27,-76.88],
  "york pa":[39.96,-76.73],"wilkes barre":[41.25,-75.88],"chester":[39.85,-75.36],
  "williamsport":[41.24,-77.00],"easton":[40.69,-75.22],"state college":[40.79,-77.86],
  "west chester":[39.96,-75.60],"norristown":[40.12,-75.34],"carlisle":[40.20,-77.19],
  "gettysburg":[39.83,-77.23],"chambersburg":[39.94,-77.66],"meadville":[41.64,-80.15],
  "altoona":[40.52,-78.40],"johnstown":[40.33,-78.92],"lebanon pa":[40.34,-76.41],
  "new castle pa":[41.00,-80.35],"pottsville":[40.69,-76.20],"sunbury":[40.86,-76.79],
  "lock haven":[41.14,-77.45],"bloomsburg":[41.00,-76.45],"lewisburg":[40.96,-76.88],
  "jim thorpe":[40.88,-75.73],"stroudsburg":[41.00,-75.19],"doylestown":[40.31,-75.13],
  "media":[39.92,-75.39],"king of prussia":[40.09,-75.38],

  // Rhode Island
  "providence":[41.82,-71.41],"warwick":[41.70,-71.42],"cranston":[41.78,-71.44],
  "pawtucket":[41.88,-71.38],"east providence":[41.81,-71.37],"woonsocket":[42.00,-71.51],
  "newport ri":[41.49,-71.31],"bristol ri":[41.68,-71.27],

  // South Carolina
  "charleston":[32.78,-79.93],"columbia sc":[34.00,-81.03],"north charleston":[32.85,-79.97],
  "mount pleasant":[32.79,-79.86],"rock hill":[34.92,-81.03],"greenville sc":[34.85,-82.40],
  "summerville":[33.02,-80.18],"goose creek":[32.98,-80.03],"hilton head":[32.22,-80.75],
  "florence sc":[34.20,-79.76],"spartanburg":[34.95,-81.93],"sumter":[33.92,-80.34],
  "myrtle beach":[33.69,-78.89],"anderson sc":[34.50,-82.65],"beaufort":[32.43,-80.67],
  "aiken":[33.56,-81.72],"orangeburg":[33.49,-80.86],

  // South Dakota
  "sioux falls":[43.55,-96.70],"rapid city":[44.08,-103.23],"aberdeen sd":[45.46,-98.49],
  "brookings":[44.31,-96.80],"watertown sd":[44.90,-97.11],"mitchell":[43.71,-98.03],
  "pierre":[44.37,-100.35],"yankton":[42.87,-97.40],"huron":[44.36,-98.21],
  "vermillion":[42.78,-96.93],"spearfish":[44.49,-103.86],"deadwood":[44.38,-103.73],

  // Tennessee
  "nashville":[36.16,-86.78],"memphis":[35.15,-90.05],"knoxville":[35.96,-83.92],
  "chattanooga":[35.05,-85.31],"clarksville":[36.53,-87.36],"murfreesboro":[35.85,-86.39],
  "franklin tn":[35.93,-86.87],"jackson tn":[35.61,-88.81],"johnson city":[36.31,-82.35],
  "hendersonville tn":[36.30,-86.62],"bartlett":[35.20,-89.87],"kingsport":[36.55,-82.56],
  "collierville":[35.04,-89.66],"smyrna tn":[35.98,-86.52],"cleveland tn":[35.16,-84.88],
  "gallatin":[36.39,-86.45],"cookeville":[36.16,-85.50],"columbia tn":[35.61,-87.04],
  "spring hill tn":[35.75,-86.93],"oak ridge":[36.01,-84.27],"pigeon forge":[35.79,-83.55],
  "gatlinburg":[35.71,-83.51],

  // Texas
  "houston":[29.76,-95.37],"san antonio":[29.42,-98.49],"dallas":[32.78,-96.80],
  "austin":[30.27,-97.74],"fort worth":[32.73,-97.32],"el paso":[31.77,-106.44],
  "arlington tx":[32.74,-97.11],"corpus christi":[27.80,-97.40],"plano":[33.02,-96.70],
  "laredo":[27.51,-99.51],"lubbock":[33.58,-101.86],"garland":[32.91,-96.64],
  "irving":[32.81,-96.95],"amarillo":[35.22,-101.83],"grand prairie":[32.75,-96.99],
  "brownsville":[25.90,-97.50],"mckinney":[33.20,-96.62],"frisco":[33.15,-96.82],
  "pasadena tx":[29.69,-95.21],"mesquite":[32.77,-96.60],"killeen":[31.12,-97.73],
  "mcallen":[26.20,-98.23],"midland":[31.99,-102.08],"beaumont":[30.09,-94.10],
  "round rock":[30.51,-97.68],"abilene":[32.45,-99.73],"odessa":[31.85,-102.37],
  "denton":[33.21,-97.13],"waco":[31.55,-97.15],"carrollton":[32.97,-96.89],
  "richardson":[32.95,-96.73],"lewisville":[33.05,-96.99],"tyler":[32.35,-95.30],
  "college station":[30.63,-96.33],"san marcos tx":[29.88,-97.94],"league city":[29.51,-95.09],
  "sugar land":[29.62,-95.63],"mission":[26.22,-98.32],"edinburg":[26.30,-98.16],
  "temple":[31.10,-97.34],"longview":[32.50,-94.74],"bryan":[30.67,-96.37],
  "pharr":[26.19,-98.19],"new braunfels":[29.70,-98.12],"flower mound":[33.01,-97.10],
  "cedar park":[30.51,-97.82],"baytown":[29.74,-94.98],"pflugerville":[30.44,-97.62],
  "georgetown tx":[30.63,-97.68],"san angelo":[31.46,-100.44],"allen":[33.10,-96.67],
  "port arthur":[29.90,-93.93],"lufkin":[31.34,-94.73],"nacogdoches":[31.60,-94.66],
  "conroe":[30.31,-95.46],"galveston":[29.30,-94.80],"south padre island":[26.11,-97.17],
  "fredericksburg tx":[30.27,-98.87],"kerrville":[30.05,-99.14],"marble falls":[30.58,-98.27],
  "wimberley":[29.99,-98.10],"dripping springs":[30.19,-98.09],

  // Utah
  "salt lake city":[40.76,-111.89],"west valley city":[40.69,-112.00],
  "provo":[40.23,-111.66],"west jordan":[40.61,-111.94],"orem":[40.30,-111.70],
  "sandy ut":[40.57,-111.88],"ogden":[41.22,-111.97],"st george":[37.10,-113.58],
  "layton":[41.06,-111.97],"south jordan":[40.56,-111.93],"lehi":[40.39,-111.85],
  "logan":[41.74,-111.83],"murray":[40.67,-111.89],"draper":[40.52,-111.86],
  "park city":[40.65,-111.50],"moab":[38.57,-109.55],"cedar city":[37.68,-113.06],
  "brigham city":[41.51,-112.02],

  // Vermont
  "burlington vt":[44.48,-73.21],"south burlington":[44.47,-73.17],
  "rutland":[43.61,-72.97],"barre":[44.20,-72.50],"montpelier":[44.26,-72.58],
  "st albans":[44.81,-73.08],"stowe":[44.46,-72.69],"brattleboro":[42.85,-72.56],
  "bennington":[42.88,-73.20],"woodstock vt":[43.62,-72.52],"manchester vt":[43.16,-73.07],
  "middlebury":[44.02,-73.17],"killington":[43.68,-72.82],

  // Virginia
  "virginia beach":[36.85,-75.98],"norfolk":[36.85,-76.29],"chesapeake":[36.77,-76.29],
  "richmond":[37.55,-77.46],"newport news":[37.09,-76.47],"alexandria":[38.80,-77.05],
  "hampton":[37.03,-76.35],"roanoke":[37.27,-79.94],"portsmouth va":[36.84,-76.30],
  "lynchburg":[37.41,-79.14],"suffolk":[36.73,-76.58],"harrisonburg":[38.45,-78.87],
  "charlottesville":[38.03,-78.48],"danville":[36.59,-79.39],"fredericksburg":[38.30,-77.46],
  "manassas":[38.75,-77.47],"williamsburg":[37.27,-76.71],"staunton":[38.15,-79.07],
  "winchester":[39.19,-78.17],"blacksburg":[37.23,-80.41],"radford":[37.13,-80.58],
  "lexington va":[37.78,-79.44],"waynesboro":[38.07,-78.89],

  // Washington
  "seattle":[47.61,-122.33],"spokane":[47.66,-117.43],"tacoma":[47.25,-122.44],
  "vancouver wa":[45.63,-122.67],"bellevue":[47.61,-122.20],"kent":[47.38,-122.24],
  "everett":[47.98,-122.20],"renton":[47.48,-122.22],"federal way":[47.31,-122.31],
  "yakima":[46.60,-120.51],"bellingham":[48.76,-122.49],"kirkland":[47.68,-122.21],
  "kennewick":[46.21,-119.17],"auburn wa":[47.31,-122.23],"redmond wa":[47.67,-122.12],
  "olympia":[47.04,-122.90],"lakewood wa":[47.17,-122.52],"pasco":[46.24,-119.10],
  "richland":[46.29,-119.28],"bremerton":[47.57,-122.63],"sammamish":[47.62,-122.04],
  "burien":[47.47,-122.35],"walla walla":[46.07,-118.33],"pullman":[46.73,-117.18],
  "wenatchee":[47.42,-120.31],"moses lake":[47.13,-119.28],"ellensburg":[46.99,-120.55],
  "port angeles":[48.12,-123.43],"sequim":[48.08,-123.10],"anacortes":[48.51,-122.61],
  "whidbey island":[48.23,-122.69],"leavenworth":[47.60,-120.66],
  "san juan islands":[48.53,-123.02],"chelan":[47.84,-120.02],
  "long beach wa":[46.35,-124.05],

  // West Virginia
  "charleston wv":[38.35,-81.63],"huntington wv":[38.42,-82.44],"morgantown":[39.63,-79.96],
  "parkersburg":[39.27,-81.56],"wheeling":[40.06,-80.72],"martinsburg":[39.46,-77.96],
  "fairmont":[39.49,-80.14],"beckley":[37.78,-81.19],"clarksburg":[39.28,-80.34],
  "lewisburg wv":[37.80,-80.45],"elkins":[38.93,-79.85],

  // Wisconsin
  "milwaukee":[43.04,-87.91],"madison":[43.07,-89.40],"green bay":[44.51,-88.02],
  "kenosha":[42.58,-87.82],"racine":[42.73,-87.78],"appleton":[44.26,-88.41],
  "waukesha":[43.01,-88.23],"oshkosh":[44.02,-88.54],"eau claire":[44.81,-91.50],
  "janesville":[42.68,-89.02],"west allis":[43.02,-88.01],"la crosse":[43.80,-91.24],
  "sheboygan":[43.75,-87.71],"wauwatosa":[43.05,-88.01],"fond du lac":[43.77,-88.44],
  "brookfield wi":[43.06,-88.11],"wausau":[44.96,-89.63],"beloit":[42.51,-89.03],
  "stevens point":[44.52,-89.57],"manitowoc":[44.09,-87.66],"marshfield":[44.67,-90.17],
  "wisconsin dells":[43.63,-89.77],"door county":[44.95,-87.18],
  "minocqua":[45.87,-89.71],"hayward":[46.01,-91.48],"superior":[46.72,-92.10],
  "ashland wi":[46.59,-90.88],

  // Wyoming
  "cheyenne":[41.14,-104.82],"casper":[42.87,-106.31],"laramie":[41.31,-105.59],
  "gillette":[44.29,-105.50],"rock springs":[41.59,-109.22],"sheridan":[44.80,-106.96],
  "jackson":[43.48,-110.76],"cody":[44.53,-109.06],"riverton":[42.86,-108.38],
  "lander":[42.83,-108.73],"thermopolis":[43.65,-108.21],"powell":[44.75,-108.76],

  // Washington D.C.
  "washington dc":[38.90,-77.04],"washington":[38.90,-77.04],

  // ═══════════════════════════════════════════
  // CANADA — by province, comprehensive
  // ═══════════════════════════════════════════

  // Alberta
  "calgary":[51.05,-114.09],"edmonton":[53.55,-113.47],"red deer":[52.27,-113.81],
  "lethbridge":[49.69,-112.83],"medicine hat":[50.04,-110.68],
  "grande prairie":[55.17,-118.80],"st albert":[53.63,-113.63],
  "airdrie":[51.29,-114.01],"spruce grove":[53.55,-113.90],"fort mcmurray":[56.73,-111.38],
  "leduc":[53.26,-113.55],"lloydminster":[53.28,-110.00],"camrose":[52.90,-112.83],
  "wetaskiwin":[52.97,-113.38],"cold lake":[54.46,-110.18],"brooks":[50.56,-111.90],
  "okotoks":[50.73,-113.98],"cochrane":[51.19,-114.47],"canmore":[51.09,-115.36],
  "banff":[51.18,-115.57],"jasper":[52.87,-118.08],"drumheller":[51.46,-112.71],
  "fort saskatchewan":[53.71,-113.21],"stony plain":[53.53,-114.01],
  "high river":[50.58,-113.87],"ponoka":[52.68,-113.58],"innisfail":[52.03,-113.95],
  "olds":[51.79,-114.11],"sylvan lake":[52.31,-114.10],"lacombe":[52.47,-113.74],
  "taber":[49.79,-112.15],"hinton":[53.40,-117.58],"edson":[53.58,-116.44],
  "peace river":[56.24,-117.29],"slave lake":[55.28,-114.77],

  // British Columbia
  "vancouver":[49.25,-123.12],"victoria":[48.44,-123.35],"kelowna":[49.88,-119.49],
  "abbotsford":[49.06,-122.25],"nanaimo":[49.17,-123.94],"kamloops":[50.67,-120.33],
  "prince george":[53.92,-122.75],"chilliwack":[49.17,-121.95],
  "vernon":[50.27,-119.27],"penticton":[49.50,-119.59],"courtenay":[49.69,-125.00],
  "campbell river":[50.02,-125.25],"cranbrook":[49.51,-115.77],"prince rupert":[54.32,-130.32],
  "powell river":[49.84,-124.52],"terrace":[54.52,-128.60],"fort st john":[56.24,-120.85],
  "dawson creek":[55.76,-120.24],"nelson":[49.49,-117.29],"trail":[49.10,-117.71],
  "revelstoke":[51.00,-118.20],"squamish":[49.70,-123.15],"whistler":[50.12,-122.95],
  "tofino":[49.15,-125.91],"parksville":[49.32,-124.32],"qualicum beach":[49.35,-124.44],
  "duncan":[48.78,-123.71],"ladysmith":[48.99,-123.82],"comox":[49.67,-124.90],
  "white rock":[49.02,-122.80],"langley":[49.10,-122.66],"surrey":[49.19,-122.85],
  "burnaby":[49.25,-122.95],"richmond bc":[49.17,-123.14],"coquitlam":[49.28,-122.79],
  "north vancouver":[49.32,-123.07],"west vancouver":[49.33,-123.17],
  "new westminster":[49.21,-122.91],"maple ridge":[49.22,-122.60],
  "port moody":[49.28,-122.86],"port coquitlam":[49.26,-122.78],
  "delta":[49.09,-123.06],"mission bc":[49.13,-122.31],
  "gibsons":[49.40,-123.51],"sechelt":[49.47,-123.76],
  "salt spring island":[48.83,-123.51],"sidney":[48.65,-123.40],
  "sooke":[48.37,-123.73],"lake cowichan":[48.83,-124.05],
  "kitimat":[54.05,-128.65],"smithers":[54.78,-127.17],"burns lake":[54.23,-125.76],
  "vanderhoof":[54.02,-124.00],"quesnel":[52.98,-122.49],"williams lake":[52.14,-122.14],
  "100 mile house":[51.64,-121.29],"merritt":[50.11,-120.79],
  "salmon arm":[50.70,-119.27],"golden":[51.30,-116.97],
  "fernie":[49.50,-115.06],"invermere":[50.51,-116.03],
  "kimberley":[49.67,-115.98],"castlegar":[49.33,-117.67],
  "rossland":[49.08,-117.80],"osoyoos":[49.03,-119.47],
  "oliver":[49.18,-119.55],"summerland":[49.60,-119.68],

  // Manitoba
  "winnipeg":[49.88,-97.15],"brandon":[49.84,-99.95],"steinbach":[49.53,-96.68],
  "thompson":[55.74,-97.86],"portage la prairie":[49.97,-98.29],
  "selkirk":[50.14,-96.88],"winkler":[49.18,-97.94],"morden":[49.19,-98.10],
  "dauphin":[51.15,-100.05],"the pas":[53.82,-101.24],"flin flon":[54.77,-101.88],
  "churchill":[58.77,-94.17],

  // New Brunswick
  "fredericton":[45.96,-66.65],"saint john":[45.27,-66.06],"moncton":[46.10,-64.80],
  "dieppe":[46.10,-64.68],"miramichi":[47.03,-65.47],"edmundston":[47.37,-68.33],
  "bathurst":[47.62,-65.65],"campbellton":[48.01,-66.67],"oromocto":[45.84,-66.48],
  "riverview":[46.06,-64.80],"woodstock nb":[46.15,-67.60],"sussex":[45.72,-65.51],
  "shediac":[46.22,-64.54],"st andrews":[45.07,-67.05],"sackville":[45.90,-64.37],
  "caraquet":[47.79,-64.96],

  // Newfoundland & Labrador
  "st johns":[47.56,-52.71],"corner brook":[48.95,-57.95],"mount pearl":[47.52,-52.81],
  "conception bay south":[47.52,-52.99],"paradise nl":[47.53,-52.87],
  "gander":[48.95,-54.61],"grand falls windsor":[48.93,-55.67],"happy valley goose bay":[53.30,-60.33],
  "labrador city":[52.95,-66.92],"clarenville":[48.18,-53.97],
  "bonavista":[48.65,-53.11],"twillingate":[49.65,-54.77],

  // Nova Scotia
  "halifax":[44.65,-63.57],"dartmouth":[44.67,-63.57],"sydney ns":[46.14,-60.19],
  "truro":[45.36,-63.28],"new glasgow":[45.59,-62.65],"glace bay":[46.20,-59.96],
  "kentville":[45.08,-64.50],"amherst":[45.83,-64.22],"bridgewater ns":[44.37,-64.52],
  "yarmouth":[43.84,-66.12],"antigonish":[45.62,-61.99],"wolfville":[45.09,-64.36],
  "lunenburg":[44.38,-64.32],"mahone bay":[44.45,-64.38],"chester":[44.54,-64.24],
  "peggy's cove":[44.49,-63.92],"shelburne":[43.76,-65.32],"digby":[44.62,-65.76],
  "annapolis royal":[44.74,-65.51],"pictou":[45.68,-62.71],

  // Ontario
  "toronto":[43.70,-79.42],"ottawa":[45.41,-75.70],"mississauga":[43.59,-79.64],
  "brampton":[43.68,-79.77],"hamilton":[43.25,-79.87],"london ontario":[42.98,-81.23],
  "markham":[43.88,-79.26],"vaughan":[43.84,-79.51],"kitchener":[43.45,-80.48],
  "windsor":[42.32,-83.04],"richmond hill":[43.88,-79.44],"oakville":[43.45,-79.69],
  "burlington":[43.33,-79.80],"greater sudbury":[46.49,-80.99],"sudbury":[46.49,-80.99],
  "oshawa":[43.90,-78.87],"barrie":[44.39,-79.69],"st catharines":[43.16,-79.24],
  "cambridge":[43.36,-80.31],"kingston":[44.23,-76.48],"guelph":[43.55,-80.25],
  "thunder bay":[48.38,-89.25],"waterloo":[43.46,-80.52],"chatham kent":[42.40,-82.19],
  "ajax":[43.85,-79.02],"pickering":[43.84,-79.09],"whitby":[43.90,-78.94],
  "clarington":[43.94,-78.61],"brantford":[43.14,-80.26],"milton":[43.52,-79.88],
  "newmarket":[44.06,-79.46],"peterborough":[44.30,-78.32],"niagara falls":[43.09,-79.06],
  "sault ste marie":[46.52,-84.35],"sarnia":[42.97,-82.40],"welland":[42.99,-79.25],
  "north bay":[46.31,-79.46],"belleville":[44.16,-77.38],"cornwall":[45.02,-74.73],
  "woodstock on":[43.13,-80.75],"stratford":[43.37,-80.98],"timmins":[48.48,-81.33],
  "orillia":[44.61,-79.42],"orangeville":[43.92,-80.10],"cobourg":[43.97,-78.17],
  "port hope":[43.95,-78.29],"brockville":[44.59,-75.68],"smiths falls":[44.90,-76.02],
  "pembroke":[45.83,-77.11],"collingwood":[44.50,-80.22],"wasaga beach":[44.52,-80.02],
  "midland":[44.75,-79.89],"penetanguishene":[44.77,-79.94],"gravenhurst":[44.92,-79.37],
  "bracebridge":[45.04,-79.31],"huntsville on":[45.33,-79.22],"parry sound":[45.34,-80.04],
  "tobermory":[45.25,-81.66],"owen sound":[44.57,-80.94],"meaford":[44.60,-80.59],
  "kincardine":[44.18,-81.63],"port elgin":[44.44,-81.39],"goderich":[43.74,-81.71],
  "grand bend":[43.32,-81.76],"sauble beach":[44.63,-81.27],"blue mountains":[44.49,-80.30],
  "prince edward county":[43.95,-77.15],"muskoka":[45.00,-79.30],
  "kenora":[49.77,-94.49],"dryden":[49.78,-92.84],"sioux lookout":[50.10,-91.92],
  "cochrane on":[49.07,-81.02],"kapuskasing":[49.42,-82.43],"hearst":[49.69,-83.67],
  "elliott lake":[46.38,-82.65],"blind river":[46.19,-82.97],
  "manitoulin island":[45.75,-82.00],"espanola":[46.26,-81.77],

  // Prince Edward Island
  "charlottetown":[46.24,-63.13],"summerside":[46.40,-63.79],
  "stratford pei":[46.22,-63.09],"cornwall pei":[46.23,-63.20],
  "montague":[46.17,-62.65],"souris":[46.35,-62.25],"cavendish":[46.49,-63.38],

  // Quebec
  "montreal":[45.51,-73.59],"quebec city":[46.81,-71.21],"laval":[45.57,-73.69],
  "gatineau":[45.48,-75.70],"longueuil":[45.54,-73.51],"sherbrooke":[45.40,-71.90],
  "saguenay":[48.43,-71.07],"levis":[46.80,-71.18],"trois rivieres":[46.34,-72.54],
  "terrebonne":[45.70,-73.64],"saint jean sur richelieu":[45.31,-73.27],
  "repentigny":[45.74,-73.47],"brossard":[45.47,-73.46],"drummondville":[45.88,-72.49],
  "saint jerome":[45.78,-74.00],"granby":[45.40,-72.73],"saint hyacinthe":[45.63,-72.95],
  "blainville":[45.67,-73.88],"rimouski":[48.45,-68.52],"victoriaville":[46.05,-71.97],
  "shawinigan":[46.57,-72.75],"sept iles":[50.22,-66.38],"rouyn noranda":[48.24,-79.03],
  "val d'or":[48.10,-77.80],"sorel tracy":[46.04,-73.11],"alma":[48.55,-71.65],
  "baie comeau":[49.22,-68.15],"joliette":[46.02,-73.44],"magog":[45.27,-72.15],
  "mont tremblant":[46.21,-74.60],"riviere du loup":[47.84,-69.54],
  "matane":[48.85,-67.53],"gaspe":[48.83,-64.49],"perce":[48.52,-64.21],
  "tadoussac":[48.15,-69.72],"la malbaie":[47.65,-70.15],"chicoutimi":[48.43,-71.07],
  "chibougamau":[49.92,-74.37],"amos":[48.57,-78.12],
  "thetford mines":[46.10,-71.30],"saint georges":[46.12,-70.67],
  "mont laurier":[46.55,-75.50],"maniwaki":[46.38,-75.97],

  // Saskatchewan
  "saskatoon":[52.13,-106.67],"regina":[50.45,-104.62],"prince albert":[53.20,-105.76],
  "moose jaw":[50.40,-105.53],"swift current":[50.29,-107.79],"yorkton":[51.21,-102.46],
  "north battleford":[52.78,-108.29],"estevan":[49.14,-103.00],"weyburn":[49.66,-103.85],
  "melfort":[52.86,-104.61],"humboldt":[52.20,-105.12],"meadow lake":[54.13,-108.43],
  "nipawin":[53.37,-104.00],"melville":[50.93,-102.81],"kindersley":[51.47,-109.17],
  "lloydminster sk":[53.28,-110.00],

  // Territories
  "whitehorse":[60.72,-135.05],"yellowknife":[62.45,-114.37],"iqaluit":[63.75,-68.52],
  "dawson city":[64.06,-139.43],"inuvik":[68.36,-133.72],"hay river":[60.82,-115.73],
  "fort smith nt":[60.00,-111.88],"watson lake":[60.06,-128.82],
  "rankin inlet":[62.81,-92.09],"cambridge bay":[69.12,-105.05],
  "pangnirtung":[66.15,-65.72],"resolute":[74.70,-94.97],
  "tuktoyaktuk":[69.45,-133.04],"old crow":[67.57,-139.83],

  // ═══════════════════════════════════════════
  // INTERNATIONAL — key cities kept compact
  // ═══════════════════════════════════════════

  // Mexico
  "mexico city":[19.43,-99.13],"guadalajara":[20.67,-103.39],"monterrey":[25.68,-100.32],
  "puebla":[19.04,-98.20],"tijuana":[32.53,-117.02],"cancun":[21.17,-86.85],
  "merida":[20.97,-89.62],"leon":[21.13,-101.67],"queretaro":[20.59,-100.39],

  // UK & Ireland
  "london":[51.51,-0.13],"manchester":[53.48,-2.24],"birmingham uk":[52.48,-1.90],
  "liverpool":[53.41,-2.98],"edinburgh":[55.95,-3.19],"glasgow":[55.87,-4.26],
  "bristol":[51.46,-2.60],"leeds":[53.80,-1.55],"sheffield":[53.38,-1.47],
  "cardiff":[51.48,-3.18],"belfast":[54.60,-5.93],"dublin":[53.33,-6.25],
  "cork":[51.90,-8.47],"oxford":[51.75,-1.26],"cambridge uk":[52.21,0.12],
  "york":[53.96,-1.08],"bath":[51.38,-2.36],"brighton":[50.82,-0.14],
  "nottingham":[52.95,-1.15],"newcastle uk":[54.98,-1.62],"aberdeen":[57.15,-2.09],
  "inverness":[57.48,-4.22],"coventry":[52.41,-1.51],

  // Europe
  "paris":[48.86,2.35],"berlin":[52.52,13.41],"madrid":[40.42,-3.70],
  "rome":[41.89,12.51],"amsterdam":[52.37,4.89],"brussels":[50.85,4.35],
  "vienna":[48.21,16.37],"prague":[50.09,14.42],"warsaw":[52.23,21.01],
  "lisbon":[38.72,-9.14],"barcelona":[41.39,2.17],"munich":[48.14,11.58],
  "milan":[45.46,9.19],"stockholm":[59.33,18.07],"copenhagen":[55.68,12.57],
  "oslo":[59.91,10.75],"helsinki":[60.17,24.94],"budapest":[47.50,19.04],
  "zurich":[47.38,8.54],"geneva":[46.20,6.14],"athens":[37.98,23.73],
  "bucharest":[44.43,26.11],"sofia":[42.70,23.32],"reykjavik":[64.15,-21.95],

  // Russia
  "moscow":[55.76,37.62],"st petersburg":[59.93,30.32],

  // Asia
  "tokyo":[35.68,139.69],"beijing":[39.91,116.40],"shanghai":[31.22,121.47],
  "mumbai":[19.08,72.88],"delhi":[28.65,77.23],"bangkok":[13.75,100.50],
  "singapore":[1.29,103.85],"seoul":[37.57,126.98],"hong kong":[22.28,114.17],
  "taipei":[25.05,121.53],"manila":[14.60,120.98],"jakarta":[-6.21,106.85],
  "kuala lumpur":[3.14,101.69],"dubai":[25.20,55.27],"istanbul":[41.01,28.95],
  "osaka":[34.69,135.50],"kyoto":[35.01,135.77],"kolkata":[22.57,88.36],
  "chennai":[13.08,80.28],"bangalore":[12.97,77.59],"hyderabad":[17.38,78.47],
  "pune":[18.52,73.86],"ahmedabad":[23.03,72.59],"jaipur":[26.92,75.79],

  // Australia & New Zealand
  "sydney":[-33.87,151.21],"melbourne":[-37.81,144.96],"brisbane":[-27.47,153.03],
  "perth":[-31.95,115.86],"adelaide":[-34.93,138.60],"canberra":[-35.28,149.13],
  "hobart":[-42.88,147.33],"darwin":[-12.46,130.84],"cairns":[-16.92,145.77],
  "gold coast":[-28.00,153.43],"auckland":[-36.85,174.76],"wellington":[-41.29,174.78],
  "christchurch":[-43.53,172.64],

  // South America
  "sao paulo":[-23.55,-46.64],"rio de janeiro":[-22.91,-43.18],
  "buenos aires":[-34.61,-58.38],"bogota":[4.61,-74.08],
  "lima":[-12.04,-77.03],"santiago":[-33.46,-70.65],

  // Africa
  "cairo":[30.04,31.24],"lagos":[6.45,3.39],"nairobi":[-1.28,36.82],
  "cape town":[-33.93,18.42],"johannesburg":[-26.20,28.04],

  // Caribbean
  "havana":[23.13,-82.38],"san juan":[18.47,-66.12],"kingston":[18.00,-76.79],
  "nassau":[25.06,-77.35],
};
