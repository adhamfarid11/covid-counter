function getLocation() {
    console.log("memew");
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude + " " + position.coords.longitude);
            findProvince.fetchProvince(position.coords.latitude, position.coords.longitude);
          
        });
    } else {
        console.log("Sorry, unfortunately the browser won't allow the use of \'Geolocator\', please consider changing browser.");
    }
   
}
var findProvince = {
    fetchProvince : function (lat,long) {
        fetch(
            //TODO keknya ini diganti jadi HTTPS dehh biar ga kena yg secure itu
            "http://api.positionstack.com/v1/reverse" + 
            "?access_key=00862e8427c0cea3bdf708f49e429a3b" +
            "&query=" + lat + "," + long
        )
        .then((response) => response.json())
        .then((data) => this.getProvince(data))
    },
    getProvince : function (data) {
        const listProvince = [
            "dki jakarta", "west java", "central java", "east java", "east kalimantan", "daerah istimewa yogyakarta", "banten", 
            "riau", "bali", "south sulawesi", "north sulawesi", "west sulawesi", "south kalimantan", "NTT", "south sumatra", 
            "riau islands", "bangka belitung islands", "lampung", "central sulawesi", "central kalimantan", "west kalimantan",
            "aceh", "north kalimantan", "north sulawesi", "papua", "jambi", "NTB", "west papua", "bengkulu", "southeast sulawesi",
            "maluku", "west sulawesi", "north maluku", "gorontalo"
        ];
        console.log(data.data[0]);
        const {region} = data.data[0];
        console.log("nemu nehh " + region);

        var indexFound = 0;
        for(let i = 0; i < listProvince.length; i++) {
            if (listProvince[i].toLowerCase() == region.toLowerCase()) {
                indexFound = i;
                wilayah.fetchCorona(indexFound);
                break;
            }
        }
        
       

    }



    
}

function callProvinsi(province) {
    console.log(province);
    console.log("masuk");
    // wilayah.fetchCorona(province);
    cuacaKode.fetchCuaca(province);
}

// ! versi baru fetch data wilayah
var wilayah = {
    fetchCorona : function (indexFound) {
        // fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more')

        .then((response) => response.json())
        .then((data) => this.displayCoronaProvinsiWilayah(data, indexFound))
    },
    displayCoronaProvinsiWilayah : function (data, indexFound) {
        var flag = false;

        var indexNow = 0;
        
        data.map(i => {
            
            if (indexNow == indexFound) {
                const { kasus, sembuh, meninggal, provinsi, last_date} = i;
                console.log(kasus, sembuh, meninggal, provinsi);
                // document.querySelector(".h4-wilayah").innerText = "Saat ini kamu terdeteksi di provinsi " + provinsi;
                document.querySelector(".positif-wilayah").innerText = kasus.toLocaleString();
                document.querySelector(".sembuh-wilayah").innerText = sembuh.toLocaleString();
                document.querySelector(".meninggal-wilayah").innerText = meninggal.toLocaleString();
                document.querySelector(".last-update.wilayah").innerText = "Last Update: " + last_date;
                document.querySelector(".content-wilayah").classList.remove("no-detect");


                
                console.log(provinsi.toLowerCase());
                // //TODO cuaca belom bener
                // if (provinsi.toLowerCase() == "jakarta") {
                //     cuacaKode.fetchCuaca("dki jakarta");
                // } else if (provinsi.toLowerCase() == "daerah istimewa yogyakarta"){
                //     cuacaKode.fetchCuaca("diyogyakarta");
                // } else {
                //     console.log(provinsi.toLowerCase());
                //     cuacaKode.fetchCuaca(provinsi.toLowerCase());
                // }
                flag = true;
                return;
            }
            indexNow++;
        })
        
        
        if(flag != true) {
            document.querySelector(".content-wilayah").classList.add("no-detect");   
        }
    },
    find : function (wilayah) {
        
        if (wilayah.toLowerCase() == "jakarta") {
            this.fetchCorona("dki jakarta");
        } else if (wilayah.toLowerCase() == "jogja" || wilayah.toLowerCase() == "yogya" || wilayah.toLowerCase() == "yogyakarta")  {
            this.fetchCorona("daerah istimewa yogyakarta");
        }
        else {
            this.fetchCorona(wilayah);
        }
        
    }
}
// ! versi awal fetch data wilayah
// var wilayah = {
//     fetchCorona : function (province) {
//         // fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
//         fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more')

//         .then((response) => response.json())
//         .then((data) => this.displayCoronaProvinsiWilayah(data, province))
//     },
//     displayCoronaProvinsiWilayah : function (data, province) {
//         var flag = false;
        
//         data.map(i => {
//             if (i.provinsi.toLowerCase() == province.toLowerCase()) {
//                 const { kasus, sembuh, meninggal, provinsi, last_date} = i;
//                 console.log(kasus, sembuh, meninggal, provinsi);
//                 // document.querySelector(".h4-wilayah").innerText = "Saat ini kamu terdeteksi di provinsi " + provinsi;
//                 document.querySelector(".positif-wilayah").innerText = kasus.toLocaleString();
//                 document.querySelector(".sembuh-wilayah").innerText = sembuh.toLocaleString();
//                 document.querySelector(".meninggal-wilayah").innerText = meninggal.toLocaleString();
//                 document.querySelector(".last-update.wilayah").innerText = "Last Update: " + last_date;
//                 document.querySelector(".content-wilayah").classList.remove("no-detect");
//                 if (province.toLowerCase() == "jakarta") {
//                     cuacaKode.fetchCuaca("dki jakarta");
//                 } else if (Provinsi.toLowerCase() == "daerah istimewa yogyakarta"){
//                     cuacaKode.fetchCuaca("diyogyakarta");
//                 } else {
//                     cuacaKode.fetchCuaca(province);
//                 }
//                 flag = true;
//                 return;
//             }
//         })
        
        
//         if(flag != true) {
//             document.querySelector(".content-wilayah").classList.add("no-detect");   
//         }
//     },
//     find : function (wilayah) {
        
//         if (wilayah.toLowerCase() == "jakarta") {
//             this.fetchCorona("dki jakarta");
//         } else if (wilayah.toLowerCase() == "jogja" || wilayah.toLowerCase() == "yogya" || wilayah.toLowerCase() == "yogyakarta")  {
//             this.fetchCorona("daerah istimewa yogyakarta");
//         }
//         else {
//             this.fetchCorona(wilayah);
//         }
        
//     }
// }


var untukProvinsi = {
    fetchCorona : function (province) {
        // fetch('https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json')
        fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi/more')
        // fetch('https://vaksincovid19-api.vercel.app/api/vaksin') data vaksin
        // fetch('https://apicovid19indonesia-v2.vercel.app/api/indonesia/provinsi')
        // https://apicovid19indonesia-v2.vercel.app/api  ini cara aksesnya gmn
        .then((response) => response.json())
        .then((data) => this.displayCoronaProvinsi(data, province))
    },
    displayCoronaProvinsi : function (data, province) {
        var flag = false;
        data.map(i => {
            if (i.provinsi.toLowerCase() == province.toLowerCase()) {
                const { kasus, sembuh, meninggal, provinsi, last_date} = i;
                console.log(kasus, sembuh, meninggal, provinsi);
                // document.querySelector(".h4-wilayah").innerText = "Saat ini kamu terdeteksi di provinsi " + provinsi;
                document.querySelector(".h1-provinsi").innerText = "Data Covid " + provinsi;
                document.querySelector(".positif-provinsi").innerText = kasus.toLocaleString();
                document.querySelector(".sembuh-provinsi").innerText = sembuh.toLocaleString();
                document.querySelector(".meninggal-provinsi").innerText = meninggal.toLocaleString();
                document.querySelector(".last-update.provinsi").innerText = "Last Update: " + last_date;
                document.querySelector(".provinsi").classList.remove("loading");
                document.querySelector(".content-provinsi").classList.remove("loading");
                flag = true;
                return;
            }
        })
        
        
        if (flag != true) {
            popUpGaada(province);
            document.querySelector(".provinsi").classList.add("loading");
            document.querySelector(".content-provinsi").classList.add("loading");
        }
    },
    search : function () {
        var x = document.querySelector(".search-bar").value;
        if (x.toLowerCase() == "jakarta") {
            this.fetchCorona("dki jakarta");
            // cuacaKode.fetchCuaca("dki jakarta");
        } else if (x.toLowerCase() == "jogja" || x.toLowerCase() == "yogya" || x.toLowerCase() == "yogyakarta")  {
            this.fetchCorona("daerah istimewa yogyakarta");
            // cuacaKode.fetchCuaca("diyogyakarta");
        }
        else {
            this.fetchCorona(x);
        }
        
    }
}

var untukGlobalAndIndonesia = {
    fetchCorona : function () {
        // fetch('https://api.quarantine.country/api/v1/summary/latest')
        fetch('https://covid19.mathdro.id/api')
        .then((response) => response.json())
        // .then((data) => this.displayGlobal(data) & this.displayIndonesia(data))
        .then((data) => this.displayGlobal(data))
    },
    fetchCoronaIndo : function () {
        fetch('https://covid19.mathdro.id/api/countries/ID')
        .then((response) => response.json())
        .then((data) => this.displayIndonesia(data))
    },

    displayIndonesia : function (data) {
        const { confirmed, recovered, deaths} = data;
        document.querySelector(".positif-indo").innerText = confirmed.value.toLocaleString();
        document.querySelector(".sembuh-indo").innerText = recovered.value.toLocaleString();
        document.querySelector(".meninggal-indo").innerText = deaths.value.toLocaleString();
    },
    displayGlobal : function (data) {
        const { confirmed, recovered, deaths} = data;
        document.querySelector(".positif-global").innerText = confirmed.value.toLocaleString();
        document.querySelector(".sembuh-global").innerText = recovered.value.toLocaleString();
        document.querySelector(".meninggal-global").innerText = deaths.value.toLocaleString();
    }

}

// manggil fetch corona buat data global dan indonesia
untukGlobalAndIndonesia.fetchCorona();
untukGlobalAndIndonesia.fetchCoronaIndo();
// end of  manggil fetch corona buat data global dan indonesia

function popUpGaada(province) {
    const wordies = ["memek", "memew", "kontol", "kntl", "mmk", "titit", "toket", "tetew", "babi", "peler", ];
    if (province == "") {
        alert("Mohon isi kolom provinsi...");
        return;
    }
    for(let i = 0; i < wordies.length; i++) {
        if (province.toLowerCase() == wordies[i].toLowerCase()) {
            alert("Kasar goblokk...");
            return;  
        }
    }
    alert("Maaf, provinsi " + province.toUpperCase() +  " tidak tersedia di dalam database kami...");
}



// search result buat provinsi
document
    .querySelector(".search button")
    .addEventListener("click", function () {
        untukProvinsi.search();
})

document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        untukProvinsi.search();
    }
})
// end of search result buat provinsi



// bagian overlay 
function on() {
    document.getElementById("overlay").style.display = "flex";
}

function off() {
    document.getElementById("overlay").style.display = "none";
}



var cuacaKode = {
    fetchCuaca : function (wilayah) {
        fetch("https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json")
        .then((response) => response.json())
        .then((data) => this.cariKode(data, wilayah))
    },
    cariKode : function (data, wilayah) {
        const myArr = wilayah.split(" ");
        var wilayah_noSpace = "";
        var wilayah_space = "";
        myArr.forEach((i) => {
            wilayah_noSpace += i;
            wilayah_space += i.charAt(0).toUpperCase() + i.slice(1) + " ";
        })
        var x = null;
        data.map(i => {
            if (i.propinsi.toLowerCase() == wilayah_noSpace.toLowerCase()) {
                x = i
                return;
            }
        })
        console.log(wilayah_space);
        console.log(wilayah_noSpace);
        console.log(x);
        if (x != null) {
            const { id } = x;
            cuacaDisplay.fetchCuaca(id, wilayah_space, wilayah_noSpace);    
        }
        
    }
}

function cariTanggal(hari, jam) {
 
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();



    
}

var cuacaDisplay = {
    fetchCuaca : function (id, wilayah_space, wilayah_noSpace) {
        fetch("https://ibnux.github.io/BMKG-importer/cuaca/" + id + ".json")
        .then((response) => response.json())
        .then((data) => this.displayCuaca(data, id, wilayah_space, wilayah_noSpace))
    },
    displayCuaca: function (data, id, wilayah_space, wilayah_noSpace) {
    //    data.map(i => {
    //     const { kodeCuaca, cuaca, tempC, jamCuaca } = i;
    //    }) 

        var flag = false;
        for (var i = 0; i < data.length; i++) {
            const { kodeCuaca, cuaca, tempC, jamCuaca } = data[i];

            var arrNow = jamCuaca.split(" ");
            var arrDate = arrNow[0].split("-"); // ambil yg ke 3
            var arrTime = arrNow[1].split(":"); // ambil yg ke 1

            hariData = arrDate[2];
            jamData = arrTime[0];
            var today = new Date();

            if (today.getHours() <= 18) { // kalo di bawah jam 18
                console.log(today.getDate().toString(), hariData);

                if (hariData < 10) {
                    const myArr = hariData.split("");
                    hariData = myArr[1];
                }
                if (today.getDate().toString() == hariData) {
                    
                    
                    if ( today.getHours() < parseInt(jamData)) {
                        
                        var sisaHours = parseInt(jamData) - today.getHours();
                        
                        if (wilayah_space == "Diyogyakarta ") { // pake spasi soalnya kedetectnya ada spasi
                            wilayah_space = "Yogyakarta";
                        }

                        document.querySelector(".jam-paragraf").innerText = "dalam +- " + sisaHours + " jam";
                        document.querySelector(".city").innerText = "Prediksi Cuaca " + wilayah_space;
                        document.querySelector(".temp").innerText = tempC + "°C";
                        document.querySelector(".description").innerText = cuaca;
                        document.querySelector(".h4-wilayah").innerText = "Berdasarkan Quiz sebelumnya\nSaat ini kamu terdeteksi di provinsi " + wilayah_space;
                        flag = true;
                        document.querySelector(".content-wilayah").classList.remove("no-detect");
                        
                        
                        if(parseInt(kodeCuaca) > 59) {
                            document.querySelector(".isi-saran").innerText = "Mau hujan nih, mending kamu di rumah aja ya biar ga sakit selama pandemi 😷";
                        } else {
                            document.querySelector(".isi-saran").innerText = "Biarpun bentar lagi gak hujan, tetap jaga kondisi tubuhmu baik-baik ya 😊";
                        }
                        
                        
                        
                        var x = "https://ibnux.github.io/BMKG-importer/icon/" + kodeCuaca.toString() + ".png";
                        // console.log(x);
                        document.querySelector(".flex").style.backgroundImage = "url('"+ x + "')";

                        console.log(jamData);
                        return;
                    }
                }
            } else { // kalo diatas jam 18
                const { kodeCuaca, cuaca, tempC, jamCuaca } = data[i];
                var sisaHours = 24 - today.getHours();
                
                if (wilayah_space == "Diyogyakarta ") { // pake spasi soalnya kedetectnya ada spasi
                    wilayah_space = "Yogyakarta";
                }

                document.querySelector(".jam-paragraf").innerText = "dalam +- " + sisaHours + " jam";
                document.querySelector(".city").innerText = "Prediksi Cuaca " + wilayah_space;
                document.querySelector(".temp").innerText = tempC + "°C";
                document.querySelector(".description").innerText = cuaca;
                document.querySelector(".h4-wilayah").innerText = "Saat ini kamu terdeteksi di provinsi " + wilayah_space;
                flag = true;
                document.querySelector(".content-wilayah").classList.remove("no-detect");
                
                if(parseInt(kodeCuaca) > 59) {
                    document.querySelector(".isi-saran").innerText = "Mau hujan nih, mending kamu di rumah aja ya biar ga sakit selama pandemi 😷";
                } else {
                    document.querySelector(".isi-saran").innerText = "Biarpun bentar lagi gak hujan, tetap jaga kondisi tubuhmu baik-baik ya 😊";
                }
                
                
                
                var x = "https://ibnux.github.io/BMKG-importer/icon/" + kodeCuaca.toString() + ".png";
                // console.log(x);
                document.querySelector(".flex").style.backgroundImage = "url('"+ x + "')";
                console.log(jamData);
                break;
            }

            
        }

        // if (flag != true) {
        //     document.querySelector(".content-wilayah").classList.add("no-detect");   
        // }
        
        

        // document.querySelector(".icon").setAttribute("src", "https://ibnux.github.io/BMKG-importer/icon/"+ kodeCuaca +".png");
    },
}

