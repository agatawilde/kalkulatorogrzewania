
var submit = document.getElementById("submit");

//zmienne
var length = document.getElementById("length");
var width = document.getElementById("width");
var height = document.getElementById("height");
var stories = document.getElementById("stories");
var year = document.getElementById("year");
var climate = document.getElementById("climate");
var heatstorage = document.getElementById("heatstorage");

//wyniki
var qco = document.getElementById("qco");

var usecoal = document.getElementById("usecoal");
var pricecoal = document.getElementById("pricecoal");
var emissioncoal = document.getElementById("emissioncoal");

var uselpg = document.getElementById("uselpg");
var pricelpg = document.getElementById("pricelpg");
var emissionlpg = document.getElementById("emissionlpg");

var usegas = document.getElementById("usegas");
var pricegas = document.getElementById("pricegas");
var emissiongas = document.getElementById("emissiongas");

var usenetcogen = document.getElementById("usenetcogen");
var pricenetcogen = document.getElementById("pricenetcogen");
var emissionnetcogen = document.getElementById("emissionnetcogen");

var usenetplant = document.getElementById("usenetplant");
var pricenetplant = document.getElementById("pricenetplant");
var emissionnetplant = document.getElementById("emissionnetplant");

var usehpww = document.getElementById("usehpww");
var pricehpww = document.getElementById("pricehpww");
var emissionhpww = document.getElementById("emissionhpww");

var usehpgw = document.getElementById("usehpgw");
var pricehpgw = document.getElementById("pricehpgw");
var emissionhpgw = document.getElementById("emissionhpgw");

var usehpaw = document.getElementById("usehpaw");
var pricehpaw = document.getElementById("pricehpaw");
var emissionhpaw = document.getElementById("emissionhpaw");

var usehpbw = document.getElementById("usehpbw");
var pricehpbw = document.getElementById("pricehpbw");
var emissionhpbw = document.getElementById("emissionhpbw");

var useel = document.getElementById("useel");
var priceel = document.getElementById("priceel");
var emissionel = document.getElementById("emissionel");

var usewood = document.getElementById("usewood");
var pricewood = document.getElementById("pricewood");
var emissionwood = document.getElementById("emissionwood");

var usepelet = document.getElementById("usepelet");
var pricepelet = document.getElementById("pricepelet");
var emissionpelet = document.getElementById("emissionpelet");

// checking if it works
// submit.addEventListener("click", function () {
// 	console.log("click is working");
// })

//mniej czytelne
// meters.addEventListener("change", function (){
//   var metersvalue = meters.value;
//   var buildngtypevalue = buildingtype.value;

//   var qcoresult = Number(metersvalue)*2;
//   qco.textContent = qcoresult;
//   pricegas.textContent = metersvalue;
// })

//bardziej czytelne - rozdzielone
length.addEventListener("change", updateValue);
width.addEventListener("change", updateValue);
height.addEventListener("change", updateValue);
stories.addEventListener("change", updateValue);
year.addEventListener("change", updateValue);
climate.addEventListener("change", updateValue);
heatstorage.addEventListener("change", updateValue);


//wartosc wspolczynnika wh
var whfossil = 1.1;
var whwood = 0.2;
var whcogen = 0.8;
var whplant = 1.25;
var whelectr = 3;

//sprawnosc nhg wytwarzania z nosnika
//hp - heat pump, w - water, g -  glicol, a - air

var nhgcoal = 0.69;
var nhgpelet = 0.65;
var nhgwood = 0.7;
var nhgelectricheater = 0.99;
var nhgoil = 0.84;
var nhggas = 0.93;
var nhghpww = 3.8;
var nhghpgw = 3.75;
var nhghpaw = 2.8;
var nhghpbw = 3.75;
var nhgnetheat = 0.95;

//sprawnosc nh,e'

var nheelectr = 0.9;
var nhewoodoil = 0.7;
var nhewater = 0.85;

//sprawnosc nhd
var  nhdnetheat = 0.89;
var nhdother = 1;

//sprawnosc nhs
var nhstrue = 0.93;
var nhsfalse = 1;

//sciana zewnetrzna Ukmax
var ukwall2021 = 0.2;
var ukwall2014 = 0.23;
var ukwall2002 = 0.3;
var ukwall1991 = 0.55;
var ukwall1982 = 0.75;
var ukwall1974 = 1.16;

//podloga ukmax = 
var ukfloor2021 = 0.3;
var ukfloor2014 = 0.45;
var ukfloor2002 = 0.6;
var ukfloor1991 = 0.6;
var ukfloor1982 = 1.16;
var ukfloor1974 = 1.16;

//temperatura srednia wewnetrzna tempintsh
var tempintsh = 20;

//srednia temperatura powietrza zewnetrznego tempme
var tempme1 = 7.7;
var tempme2 = 7.9;
var tempme3 = 7.6;
var tempme4 = 6.9;
var tempme5 = 5.5;

//projektowa temperatura zewnetrzna tempe
var tempe1 = -16;
var tempe2 = -18;
var tempe3 = -20;
var tempe4 = -22;
var tempe5 = -24;

//liczba godzin i miesiecy
var mnths = 5;
var tm = 720;

//utb
var utb1 = 0.2;
var utb2 = 0.1;

//wartości opałowe
var wcoal = 22;
var wlpg = 47.3;
var wgas = 48;

var wwood = 15.6; 
var woil = 40.4;

//emisja co2
var cocoal = 94;
var colpg = 63.1;
var cogas = 55.33;

var conetcogen = 93.49;
var conetplant = 94.94;

var coel = 102.6;

var cowood = 112;
var cooil = 76.56;



function updateValue() {
  //values
  var lengthvalue = length.value;
  var widthvalue = width.value;
  var heightvalue = height.value;
  var storiesvalue = stories.value;
  var yearvalue = year.value;
  var heatstoragevalue = heatstorage.value;
  var climatevalue = climate.value;

  //used variables
  var volume = storiesvalue*lengthvalue*widthvalue*heightvalue;
  var akfloor = lengthvalue*widthvalue;
  var akwall = storiesvalue*(2*lengthvalue*heightvalue + 2*widthvalue*heightvalue);
  var obw = 2*lengthvalue+2*widthvalue;
  var bprim = akfloor/(0.5*obw);
  
  var ukfloor;
  var ukwall;
  var nhs;


  if (yearvalue === "2021") {
    ukfloor = ukfloor2021;
    ukwall = ukwall2021;
  } else if (yearvalue === "2014") {
    ukfloor = ukfloor2014;
    ukwall = ukwall2014;
  } else if (yearvalue === "2002") {
    ukfloor = ukfloor2002;
    ukwall = ukwall2002;
  } else if (yearvalue === "1991") {
    ukfloor = ukfloor1991;
    ukwall = ukwall1991;
  } else if (yearvalue === "1982") {
    ukfloor = ukfloor1982;
    ukwall = ukwall1982;
  } else if (yearvalue === "1974") {
    ukfloor = ukfloor1974;
    ukwall = ukwall1974;
  }
  
  if (heatstoragevalue === "false") {
    nhs = nhsfalse;

  } else if (heatstoragevalue === "true") {
    nhs=nhstrue;
  }
  
  if (climatevalue === "1") {
    tempe = tempe1;
    tempme = tempme1;
  } else if (climatevalue === "2") {
    tempe = tempe2;
    tempme = tempme2;
  } else if (climatevalue === "3") {
    tempe = tempe3;
    tempme = tempme3;
  }else if (climatevalue === "4") {
    tempe = tempe4;
    tempme = tempme4;
  }else if (climatevalue === "5") {
    tempe = tempe5;
    tempme = tempme5;
  }

  if (volume <= 100) {
    utb=utb1;

  } else if (volume > 100) {
    utb=utb2;
  }

  if (ukfloor >= 1 && (bprim>0 && bprim<=2)) {
    ueq = 0.55;
  } else if (ukfloor > 1 && (bprim>2 && bprim<=4)) {
    ueq = 0.45;
  } else if (ukfloor > 1 && (bprim>4 && bprim<=6)) {
    ueq = 0.38;
  } else if (ukfloor > 1 && (bprim>6 && bprim<=8)) {
    ueq = 0.33;
  } else if (ukfloor > 1 && (bprim>8 && bprim<=10)) {
    ueq = 0.30;
  } else if (ukfloor > 1 && (bprim>10 && bprim<=12)) {
    ueq = 0.27;
  } else if (ukfloor > 1 && (bprim>12 && bprim<=14)) {
    ueq = 0.24;
  } else if (ukfloor > 1 && (bprim>14 && bprim<=16)) {
    ueq = 0.22;
  } else if (ukfloor > 1 && (bprim>16 && bprim<=18)) {
    ueq = 0.21;
  } else if (ukfloor > 1 && (bprim>18 && bprim<=20)) {
    ueq = 0.19;


  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>0 && bprim<=2)) {
    ueq = 0.33;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>2 && bprim<=4)) {
    ueq = 0.30;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>4 && bprim<=6)) {
    ueq = 0.27;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>6 && bprim<=8)) {
    ueq = 0.25;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>8 && bprim<=10)) {
    ueq = 0.23;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>10 && bprim<=12)) {
    ueq = 0.21;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>12 && bprim<=14)) {
    ueq = 0.19;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>14 && bprim<=16)) {
    ueq = 0.18;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>16 && bprim<=18)) {
    ueq = 0.17;
  } else if (ukfloor > 0.4 && ukfloor < 0.7 && (bprim>18 && bprim<=20)) {
    ueq = 0.16;
  } 
  
  else if (ukfloor < 0.4 && (bprim>0 && bprim<=2)) {
    ueq = 0.17;
  } else if (ukfloor < 0.4 && (bprim>2 && bprim<=4)) {
    ueq = 0.17;
  } else if (ukfloor < 0.4 && (bprim>4 && bprim<=6)) {
    ueq = 0.17;
  } else if (ukfloor < 0.4 && (bprim>6 && bprim<=8)) {
    ueq = 0.16;
  } else if (ukfloor < 0.4 && (bprim>8 && bprim<=10)) {
    ueq = 0.15;
  } else if (ukfloor < 0.4 && (bprim>10 && bprim<=12)) {
    ueq = 0.14;
  } else if (ukfloor < 0.4 && (bprim>12 && bprim<=14)) {
    ueq = 0.14;
  } else if (ukfloor < 0.4 && (bprim>14 && bprim<=16)) {
    ueq = 0.13;
  } else if (ukfloor < 0.4 && (bprim>16 && bprim<=18)) {
    ueq = 0.12;
  } else if (ukfloor < 0.4 && (bprim>18 && bprim<=20)) {
    ueq = 0.12;
  }
  

  //obliczenia

  //energia uzytkowa
  
  //wentylacja
  
  var vve1n=0.31*0.001*akfloor;
  var hves=1200*vve1n;
  var qvesn=hves*(tempintsh-tempe)*tm*0.001;
  //przenikanie
  var fg2= (20-tempme)/(20-tempe);
  var htrig = 1.45*fg2*akfloor*ueq;
  var ukc = ukwall+utb;
  var htrie = akwall*ukc;
  var htris = htrie + htrig;
  var qtrsn = htris*(tempintsh-tempe)*tm*0.001;

  //zyski
  var awindows = 0.125*akfloor;
  var qsolh = 0.7*awindows*238*0.75*0.5;
  var qinth = 6.8*akfloor*720*0.001;
  var qhgnsn = qsolh + qinth;

  //koncowo
  var qhhtsn = qtrsn + qvesn;
  var qhndsn = mnths*(qhhtsn - qhgnsn);

  //htris to htrs ale podkreślało
  qco.textContent = qhndsn.toFixed(2);

  //energia koncowa
  var ntotcoal=nhgcoal*nhewater*nhdother*nhs;
  var ntotlpg=nhggas*nhewater*nhdother*nhs;
  var ntotgas=nhggas*nhewater*nhdother*nhs;
  var ntotnet=nhgnetheat*nhewater*nhdnetheat*nhs;
  
  var ntothpww=nhghpww*nhewater*nhdother*nhs;
  var ntothpgw=nhghpgw*nhewater*nhdother*nhs;
  var ntothpaw=nhghpaw*nhewater*nhdother*nhs;
  var ntothpbw=nhghpbw*nhewater*nhdother*nhs;
  var ntotel=nhggas*nheelectr*nhdother*nhs;

  var ntotwood=nhgwood*nhewoodoil*nhdother*nhs;
  var ntotpelet=nhgpelet*nhewoodoil*nhdother*nhs;
  var ntotoil=nhgoil*nhewoodoil*nhdother*nhs;

  var qkcoal = qhndsn/ntotcoal;
  var qklpg = qhndsn/ntotlpg;
  var qkgas = qhndsn/ntotgas;
  var qknet = qhndsn/ntotnet;
  
  var qkhpww = qhndsn/ntothpww;
  var qkhpgw = qhndsn/ntothpgw;
  var qkhpaw = qhndsn/ntothpaw;
  var qkhpbw = qhndsn/ntothpbw;
  var qkel = qhndsn/ntotel;
  
  var qkwood = qhndsn/ntotwood;
  var qkpelet = qhndsn/ntotpelet;
  var qkoil = qhndsn/ntotoil;

  //nieodn energia pierwotna
  var qphcoal = qkcoal*whfossil;
  var qphlpg = qklpg*whfossil;
  var qphgas = qkgas*whfossil;

  var qphnetcogen = qknet*whcogen;
  var qphnetplant = qknet*whplant;

  var qphhpww = qkhpww*whelectr;
  var qphhpgw = qkhpgw*whelectr;
  var qphhpaw = qkhpaw*whelectr;
  var qphhpbw = qkhpbw*whelectr;
  var qphel = qkel*whelectr;

  var qphwood = qkwood*whwood;
  var qphpelet = qkpelet*whwood;
  var qphoil = qkoil*whfossil;
  
  //koszt
  var prcoal = 1*qphcoal/wcoal;
  var prlpg = 1*qphcoal/wcoal;
  var prgas = 1*qphcoal/wcoal;
  
  var prnetcogen = qphnetcogen;
  var prnetplant = qphnetplant;

  var prhpww = qphhpww*0.7;
  var prhpgw = qphhpgw*0.7;
  var prhpaw = qphhpaw*0.7;
  var prhpbw = qphhpbw*0.7;
  var prel = qphel*0.7;

  var prwood = 1*qphwood/wwood;
  var prpelet = 1*qphpelet/wwood;
  var proil = 1*qphoil/woil;

  //emisja
  var emcoal = 36*0.0000001*cocoal*qkcoal;
  var emlpg =36*0.0000001*colpg*qklpg;
  var emgas = 36*0.0000001*cogas*qkgas;
  var emnetcogen = 36*0.0000001*conetcogen*qknet;
  var emnetplant = 36*0.0000001*conetplant*qknet;

  var emhpww = 36*0.0000001*coel*qkhpww;
  var emhpgw = 36*0.0000001*coel*qkhpgw;
  var emhpaw = 36*0.0000001*coel*qkhpaw;
  var emhpbw = 36*0.0000001*coel*qkhpbw;
  var emel = 36*0.0000001*coel*qkel;

  var emwood = 36*0.0000001*cowood*qkwood;
  var empelet = 36*0.0000001*cowood*qkpelet;
  var emoil = 36*0.0000001*cooil*qkoil;


  //publikuje wyniki
  usecoal.textContent = qphcoal.toFixed(2);
  uselpg.textContent = qphlpg.toFixed(2);
  usegas.textContent = qphgas.toFixed(2);

  usenetcogen.textContent = qphnetcogen.toFixed(2);
  usenetplant.textContent = qphnetplant.toFixed(2);

  usehpww.textContent = qphhpww.toFixed(2);
  usehpgw.textContent = qphhpgw.toFixed(2);
  usehpaw.textContent = qphhpaw.toFixed(2);
  usehpbw.textContent = qphhpbw.toFixed(2);
  useel.textContent = qphel.toFixed(2);

  usewood.textContent = qphwood.toFixed(2);
  usepelet.textContent = qphpelet.toFixed(2);
  useoil.textContent = qphoil.toFixed(2);
  
  //koszty
  pricecoal.textContent = prcoal.toFixed(2);
  pricelpg.textContent = prlpg.toFixed(2);
  pricegas.textContent = prgas.toFixed(2);

  pricenetcogen.textContent = prnetcogen.toFixed(2);
  pricenetplant.textContent = prnetplant.toFixed(2);

  pricehpww.textContent = prhpww.toFixed(2);
  pricehpgw.textContent = prhpgw.toFixed(2);
  pricehpaw.textContent = prhpaw.toFixed(2);
  pricehpbw.textContent = prhpbw.toFixed(2);
  priceel.textContent = prel.toFixed(2);

  pricewood.textContent = prwood.toFixed(2);
  pricepelet.textContent = prpelet.toFixed(2);
  priceoil.textContent = proil.toFixed(2);

  //emisja
  emissioncoal.textContent = emcoal.toFixed(2);
  emissionlpg.textContent = emlpg.toFixed(2);
  emissiongas.textContent = emgas.toFixed(2);

  emissionnetcogen.textContent = emnetcogen.toFixed(2);
  emissionnetplant.textContent = emnetplant.toFixed(2);

  emissionhpww.textContent = emhpww.toFixed(2);
  emissionhpgw.textContent = emhpgw.toFixed(2);
  emissionhpaw.textContent = emhpaw.toFixed(2);
  emissionhpbw.textContent = emhpbw.toFixed(2);
  emissionel.textContent = emel.toFixed(2);

  emissionwood.textContent = emwood.toFixed(2);
  emissionpelet.textContent = empelet.toFixed(2);
  emissionoil.textContent = emoil.toFixed(2);

  // qco.textContent = qhndsn;

  // if (meters.value > 100) {
  //   qcoresult = "Zuzycie ciepla 1"
  // } else if (meters.value<100) {
  //   qcoresult = "Zuzycie ciepla 2"
  // } else {
  //   qcoresult = "Zuzycie ciepla 3"
  // }

  // var qcoresult = Number(meters.value);
  // qco.textContent = qcoresult;

  // qco.textContent = ukfloor;

  // pricegas.textContent = metersvalue;


  //to dobre
  // pricegas.textContent = pricegasvalue;
  // emissiongas.textContent = emissiongasvalue;
  // usegas.textContent = usegasvalue;

  // pricecoal.textContent = pricecoalvalue;
  // emissioncoal.textContent = emissioncoalvalue;
  // usecoal.textContent = usecoalvalue;

  // priceel.textContent = priceelvalue;
  // emissionel.textContent = emissionelvalue;
  // useel.textContent = useelvalue;

}




