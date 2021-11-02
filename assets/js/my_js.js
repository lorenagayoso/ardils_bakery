const toppings = document.querySelectorAll('input[name="topping-radio"]');

const size = $("select[name='size']")[0];

const relleno = $("select[name='relleno']")[0];

const delivery = $("select[name='delivery']")[0];

const qty = $("input#quantity")[0];

const submit = $("#submit")[0];

const precio_caba = $("#caba_price")[0];

const message_caba = $("#caba_message")[0];

const delivery_message = $("#delivery_message")[0];

const clock_message = $("#clock_message")[0];

const clock_message2 = $("#clock_message2")[0];

const clock_element = $("#clock")[0];

const location_ip = $("#location")[0];

let topping_selected;

let relleno_selected;

let size_chosen;

let delivery_chosen;

let response_emoji;

function emojis_by_temp(temp_param){
if(temp_param >= 22)
{response_emoji = ["¿Salió birrita ",["🥵","🔥"]," ?"];}
else if((temp_param < 22) && (temp_param >= 16))
{response_emoji = ["Lindo día para ",["😍","🧉 + 🧁"]," , no?"];}
else {response_emoji = ["¿Qué tal un café para calentarnos un poco ",["🥶","☕"]," ?"];}
return response_emoji
;}

$(document).ready(function() {
$.ajax({
  url: 'https://ipinfo.io/json',
  success: function(data,textStatus,xhr){
  location_ip.innerText = data["city"];
  lat = data["loc"].split(",")[0];
  lng = data["loc"].split(",")[1];
  const params = 'airTemperature';
  const start = new Date().toISOString();
  const end = new Date().toISOString();

  fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${start}&end=${end}`, {
  headers: {
    'Authorization': '5d8d4c0a-3b40-11ec-86a1-0242ac130002-5d8d4c78-3b40-11ec-86a1-0242ac130002'
  }
  }).then((response) => response.json()).then((jsonData) => {
   
  let temperatura = jsonData.hours[0].airTemperature.noaa;
  let response_emoji_txt = emojis_by_temp(temperatura)[0] + emojis_by_temp(temperatura)[1][1] + emojis_by_temp(temperatura)[2];
  let response_emoji_img = emojis_by_temp(temperatura)[1][0];
  let result = $("#ip-result-container")[0];
  result.getElementsByTagName("p")[0].innerText  = "Te acompañamos en estos " + temperatura + " grados " + response_emoji_img + " " + response_emoji_txt;
  $(result).slideDown();

  window.onscroll = function() {myFunction()};

  function myFunction() {
  if (document.body.scrollTop  > 350 || document.documentElement.scrollTop > 350) {
  $(result).slideUp();
  }}
  });

  }, 
  error: function(xhr,textStatus,error){
  console.log(xhr);
  console.log(textStatus);
  console.log(error)
  }
})
;})

/*document.addEventListener("DomContentLoaded", jQuery.getJSON('https://ipinfo.io/json', function myData(data) {;
location.innerText = JSON.parse(JSON.stringify(data,null,2))["city"];
;}))*/

/*$(document).ready(function() {$.getJSON('https://ipinfo.io/json', function myData(data) {
const location = $("#location")[0];
location.innerText = JSON.parse(JSON.stringify(data,null,2))["city"];
;})})*/


if((new Date().getHours() < 18)){
                              promo_index = 0
                              delivery.options[4].innerText = "CABA (GRATIS!)"
                              delivery.options[4].value = 4
                              ;} 

    else {
         promo_index = 1
         delivery.options[4].innerText = "CABA ($150)"
         delivery.options[4].value = 3
         ;}



const 

precios_size =
{
  media_docena : 300 ,
  docena : 550 ,
  promo_20_18 : 700 
}

precios_delivery =
{
  norte : 250 ,
  sur : 500 ,
  oeste : 700 ,
  caba : 150 ,
  retira : 0
}


const

promo_time = {
  color : ["color : black","color : lightgrey"] ,
  texto: ["Pedí GRATIS ahora en CABA :)", "Ups! No es horario de promo :("] ,
  precio : [0, 150] ,
  mensaje : "Envío gratis antes de las 18" ,
  mensaje_estilo: [{
                  "color": "#e83e8c",
                  "font-size": "inherit",
                  "font-weight": "bold" ,
                  "display": "flex",
                  "align-items": "center", 
                  "flex-direction": "column",
                  },
                  {
                  "margin" :"auto",
                  "width" :"80%",
                  "color":"#8261ee",
                  "font-size": "larger",
                  "font-weight": "bold" ,
                  "display": "flex",
                  "align-items": "center",
                  "text-align": "center", 
                  "flex-direction": "column"
                  }],

  mensaje_estilo_2: [{
                  "display": "none",
                  },
                  {
                  "display": "flex",
                  "align-items": "center",
                  "text-align": "center", 
                  "flex-direction": "column",
                  "margin" :"auto",
                  "width" :"80%",
                  "color":"black",
                  "margin-top": "5px",
                  "font-size": "regular",
                  }]

}

function tour_start() {
introJs().start();
}

function clock() {
let time = new Date(),
    
    
   hours = time.getHours(),
    
    
    minutes = time.getMinutes(),
    
    
    seconds = time.getSeconds();

  $('.clock')[0].innerHTML = tiempo(hours) + ":" + tiempo(minutes) + ":" + tiempo(seconds);
  
  function tiempo(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}

setInterval(clock, 1000);

clock_element.setAttribute("style", promo_time.color[promo_index])

clock_message.innerText = promo_time.texto[promo_index]

precio_caba.innerText = promo_time.precio[promo_index]

message_caba.innerText = promo_time.mensaje

Object.assign(clock_message.style, promo_time.mensaje_estilo[promo_index])

Object.assign(clock_message2.style, promo_time.mensaje_estilo_2[promo_index])


$("input[value = 'none']")[0].checked = true


toppings.forEach((i) => {
    i.addEventListener("change", function() {
      let relleno_selected = $("select[name='relleno']")[0].options[relleno.selectedIndex].value;
      let topping_selected = i.value;

      if(topping_selected == relleno_selected) 
      {

        Swal.fire({
        showDenyButton: true,
        icon: 'question' ,
        title: '<strong>Seleccionaste el mismo gusto para relleno y topping</strong>',
        text : '¿Esto es lo que quieres?',
        confirmButtonText: 'Lo sé, AMO',
        denyButtonText: 'Me equivoqué'
        }).then((result) => {
        if (result.isConfirmed) {
         Swal.fire('Perfecto!' , 'También amamos nuestro gusto de ' + relleno_selected)
        } else if (result.isDenied) {
        Swal.fire('De acuerdo, no los seleccionaremos :)')
        $("input[value = 'none']")[0].checked = true
        $("option[value='none']")[0].selected = true;
        }
        })

	  ;}

    else if((topping_selected == "Blueberry") || (topping_selected == "Limon")) 
    {

    $("input[value = 'Blueberry']")[0].checked = false;
    $("input[value = 'Limon']")[0].checked = false;

    let response =  prompt("No contamos con este gusto :( .Estos son nuestros gustos disponibles: Chocolate, Frutilla o Maracuyá");

    function success_gusto(){Swal.fire('Excelente!',
                               'Este sabor también te encantará. Lo seleccionaremos por ti :)',
                               'success')}

    if(response == null)       {
                                Swal.fire("Si no seleccionas un nuevo topping, no podrás generar un pedido :(")
                                $("input[value = 'none']")[0].checked = true
                               ;}
    
		else if(response.length > 0) {
                                if((response.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase() == "maracuya") 
                                {
                                success_gusto()
                                $("input[value = 'Maracuya']")[0].checked = true
                                ;}


                                else if((response.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase() == "frutilla") 
                                {
                                success_gusto()
                                $("input[value = 'Frutilla']")[0].checked = true
                                ;}

                                else if((response.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase() == "chocolate") 
                                {
                                success_gusto()
                                $("input[value = 'Chocolate']")[0].checked = true
                                ;}

                            ;}


      else if(response.length == 0) {
                                Swal.fire("Selecciona otro topping y vuelve a intentarlo")
                                $("input[value = 'none']")[0].checked = true
                               ;}


	}})});

 
function toppings_selection(){
 for(i=0 ; i < toppings.length ; i++) {
  if(toppings[i].checked == true) {return toppings[i].value}
 ;}
 ;}

function order_selection(){

let relleno_selected = relleno["selectedOptions"][0];

let topping_selected = toppings_selection();

let size_chosen = size["selectedOptions"][0];

let delivery_chosen = delivery["selectedOptions"][0] ;

let size_fee = Object.values(precios_size)[size_chosen.value] ;

let qty_value = qty.value ;

let delivery_fee = Object.values(precios_delivery)[delivery_chosen.value] ;

let precio_current = (size_fee * qty_value) + delivery_fee ;

let orden_resumen = 
[
"<strong>Relleno:</strong>" + " " + relleno_selected.value ,
"<strong>Topping:</strong> " + " " + toppings_selection(),
"<strong>Presentacion:</strong> " + " " + size_chosen.innerText.split(" (")[0] ,
"<strong>Cantidad:</strong> " + " " + qty_value ,
"<strong>Envio:</strong> " + " " + delivery_chosen.innerText,
"<strong>Total + IVA(21%):</strong>" + " " + precio_current * 1.21
];

return orden_resumen
;}



function order_format(ordenParam) {
for (let i = 0; i < ordenParam.length; i++) {
ordenParam[i] = "<br>" + ordenParam[i] + "<br>";
}
return ordenParam.join(" ");
}



//FUNCIONES DE LOS BOTONES


//CALCULO DEL ENVIO

function envio_calc(){

let size_chosen = size["selectedOptions"][0];

let delivery_chosen = delivery["selectedOptions"][0];

if((size_chosen.value == "empty") || (delivery_chosen.value == "empty")) {

Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Olvidaste info importante para calcular tu envío',
  footer: 'Completá los campos 3 y 4'
})

}

else {

let subtotal_resumen = order_selection().slice(-4);

order_format(subtotal_resumen)

Swal.fire({
  title: "Envío estimado",
  html : order_format(subtotal_resumen),
  width: 400,
  padding: '3em',
})

;}

;}


// SOLICITUD DE ORDEN 

function submit_order(){

let relleno_selected = relleno["selectedOptions"][0];

let size_chosen = size["selectedOptions"][0];

let delivery_chosen = delivery["selectedOptions"][0] ;

if((size_chosen.value == "empty") || (delivery_chosen.value == "empty") || (relleno_selected.value == "none") || (toppings_selection() == "none")) {

Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Olvidaste info importante para generar tu orden',
  footer: 'Asegúrate de completar todos los campos'
})

;}

else {

let total_resumen = order_selection();

Swal.fire({
  showDenyButton: true,
  title: "Resumen de la orden",
  html : order_format(total_resumen),
  width: 400,
  padding: '3em',
  confirmButtonText: 'Si, lo quiero!',
  denyButtonText: 'Hmm... no estoy segur@'
}).then((result) => {
  if (result.isConfirmed) {
  Swal.fire({
  title: 'Hemos recibido tu orden!',
  text: 'Confirmanos tu nombre para continuar con tu pedido',
  input: 'text',
  inputAttributes: {
    autocapitalize: 'off'
  },
  confirmButtonText: 'Ahi va'
  }).then((result) => {
  if (result.isConfirmed) {
  localStorage.setItem("name" , result.value )
  Swal.fire(
  'Gracias,' + result.value,
  'En unos minutos, nos comunicamos con vos',
  'success'
  )
  }})
  }})
}
}


// BORRAR SELECCION

function reset_values(){
$("#result").innerText = "" ;
;}



/* 	
    let topping_tooltip_text = document.querySelector(".box input:checked ~ .tooltiptext").textContent

*/
