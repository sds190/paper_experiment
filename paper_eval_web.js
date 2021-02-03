var elem = document.documentElement;

function openFullscreen(){
  if(elem.requestFullscreen){
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen){
    elem.webkitRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
  elem.mozRequestFullScreen();
  }
}

var row = 0;
var envelope_number = document.getElementById("envelope_number");
var id_input = document.getElementById("id_input");
var eval = document.getElementById("eval");
var finished_num = 0;
const sheet_name = 'eval';
const last_sheet_name ="last"
const header = document.getElementById("header");
const top_page = document.getElementById("top_page");
const guide = document.getElementById("guide");
const all_eval = document.getElementById("all_eval");
const next = document.getElementById("next");
const save = document.getElementById("save");
const rest = document.getElementById("rest");
const cont = document.getElementById("continue");
const last_eval = document.getElementById("last_eval");
const buttons = document.getElementById("buttons");
const condition = document.getElementById("condition");
const thank = document.getElementById("thank");
const all_output = document.body.querySelectorAll("output");
const attr01 = document.getElementById("attr01");
const color_eval = document.getElementById("color_eval");
var i = 0;

var ss_id = document.getElementById("ss_id");
ss_id.addEventListener("keydown", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    check_id();
  }
})

var colorr = document.getElementById("colorr");
colorr.addEventListener("keydown", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    check();
  }
})

function check_id(){
    var ss_id = document.getElementById("ss_id").value;
    if (ss_id == ""){
      alert("IDを入力してください");
    } else {
      check_in();
    }
  }

  function check_in() {
    var id = document.getElementById("ss_id");
    var spreadsheetId = id.value;
      gapi.client.sheets.spreadsheets.values.get({
          spreadsheetId: spreadsheetId ,
          range: sheet_name // KALAU CUMA NAMA SHEET, DIA AMBIL SEMUA DATA
      }).then((response) => {
          var result = response.result;
          var numRows = result.values ? result.values.length : 0;
          console.log(`${numRows} rows retrieved.`);
          // DATA ARRAY NYA ADA DI result.values MISAL MAU DIBACA
          i = numRows - 1//real need change to i
          top_page.style.display = "none";
          if(i<31){
            guide.style.display = "block";
          } else {
            thank.style.display = "block";
          }}, function (error) {
                alert("正しいIDを入力してください");
                reloadPage();
              });
        }

        function reloadPage(){
          location.reload(true);
        }

function start() {
  header.style.display = 'none';
  guide.style.display = 'none';
  if (i<31){
    if (i==0){
      input_time("練習タスクが始まる");
    } else if (i==30){
      save.style.display="none";
    } else {
      input_time("続く");
    }
    alert("パンフレットの内容ではなく折り方によって得られるUXを直観的に入力してください")
    envelope_number.innerHTML = i;
    top_page.style.display ='none';
    rest.style.display="none";
    alert("実験始まります");
    openFullscreen();
    setTimeout(function(){
      all_eval.style.display = 'block';
      attr01.focus();
    },500)} else{
      thank.style.display = "block";
    }
  }

  function resume(){
    if (i<31){
      guide.style.display = "block";
      rest.style.display = "none";
      cont.onclick = input_time("休憩終了");
    } else {
      thank.style.display = "block";
    }
  }

function focus_next_slider(e){
  var x = document.activeElement.id;
  var index = parseInt(x.slice(-2));
  const sliders = document.querySelectorAll('.slider');
  try{
    if (e.keyCode === 13){
      if(index<28){
        sliders[index].focus();
      } else if (index == 28){
        check();
      }}
    } catch(error){}
}

function focus_color(e){
  var color = document.getElementById('color')
  try{
    if (e.keyCode === 13){
        event.preventDefault();
        color.focus();
      }
    } catch(error){}
}

function focus_reason(e){
  const colorr = document.getElementById('colorr');
  try{
    if (e.keyCode === 13){
        event.preventDefault();
        colorr.focus();
      }
    } catch(error){}
}


  function check(){
      var output = document.getElementsByClassName("num_output");
      var color_name = document.getElementById("color");
      var color_reason = document.getElementById("colorr");
      var y=0;
      var z=0;
      for (x = 0; x<output.length; x++){
        if (output[x].value=='未'){
          y++;
        }}
      if (color_name.value == '' || color_reason.value ==''){
          z++;
        }
      if (y==0 && z==0){
        save_file();
        i++;
        next_envelope();
      }  else {
        if(y>0){
          alert('タスク１に'+y+'個の答えていない項目があります');
        }
        if (z>0){
          alert("タスク２を完成させてください");
        }
    }}

  function check2(){
        var output = document.getElementsByClassName("num_output");
        var color_name = document.getElementById("color");
        var color_reason = document.getElementById("colorr");
        var y=0;
        var z=0;
        for (x = 0; x<output.length; x++){
          if (output[x].value=='未'){
            y++;
          }}
          if (color_name.value == '' || color_reason.value ==''){
              z++;
            }
        if (y==0 && z==0){
          save_file();
          input_time("休憩開始");
          i++;
          hide_screen();
          // rest.style.display="inline-block";
        }  else {
          if(y>0){
            alert('タスク１に'+y+'個の答えていない項目があります');
          }
          if (z>0){
            alert("タスク２を完成させてください");
          }}}

  function check3(){
    var y = 0;
    var output = document.getElementsByClassName("cq");
    for (x = 0; x<output.length; x++){
      if (output[x].value=='未'){
        y++;
      }}
    if (y==0){
        save_condition();
        close_file();
    }  else {
        alert(y+'個の答えていない項目があります');
    }}

function save_condition(){
    var output = document.getElementsByClassName("cq");
    var data_array = [];
    for (x = 0; x<output.length; x++){
        data_array.push(output[x].value)
      }
    var body = {
          values: [
              data_array
          ]
      };
    var id = document.getElementById("ss_id");
    var spreadsheetId = id.value;
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: "condition", // INI NAMA SHEET YG BIASA DI BAWAH (DEFAULTNYA Sheet1)
        valueInputOption: 'RAW', // INI IKUTIN AJA
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`)
    });
  }


  function input_time(act){
    var d = new Date();
    var n = d.toLocaleTimeString();
    var data_array = [act, n, i];
    var body = {
          values: [
              data_array
          ]
      };
      // INI BUAT NAMBAHIN DATA KE SHEET NYA
    var id = document.getElementById("ss_id");
    var spreadsheetId = id.value;
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheetId,
        range: 'rest_time', // INI NAMA SHEET YG BIASA DI BAWAH (DEFAULTNYA Sheet1)
        valueInputOption: 'RAW', // INI IKUTIN AJA
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`)
    });
    if (act == "続く") {
      next_envelope();
    }
  }

  function next_envelope() {
      rest.style.display = "none";
      eval.style.display = "none";
      if (i<31){
        setTimeout(function(){
          document.body.scrollTop = 0;
          envelope_number.innerHTML = i;
          eval.reset();
          color_eval.reset();
          eval.style.display = "flex";
          all_output.innerHTML = "未";
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
          attr01.focus();
          openFullscreen();
        },500)
        if (i==30){
          save.style.display="none";
        }
      } else {
        all_eval.style.display="none";
        condition.style.display="block";
        input_time("実験後アンケートが始まる");
      }
    }

  function save_file() {
      var output = document.getElementsByClassName("num_output");
      var color_name = document.getElementById("color");
      var color_reason = document.getElementById("colorr");
      var data_array = [i];
      for (x = 0; x<output.length; x++){
          data_array.push(output[x].value)
        }
      data_array.push(color_name.value);
      data_array.push(color_reason.value);
      var body = {
            values: [
                data_array
            ]
        };
        // INI BUAT NAMBAHIN DATA KE SHEET NYA
      var id = document.getElementById("ss_id");
      var spreadsheetId = id.value;
      gapi.client.sheets.spreadsheets.values.append({
          spreadsheetId: spreadsheetId,
          range: sheet_name, // INI NAMA SHEET YG BIASA DI BAWAH (DEFAULTNYA Sheet1)
          valueInputOption: 'RAW', // INI IKUTIN AJA
          resource: body
      }).then((response) => {
          var result = response.result;
          console.log(`${result.updates.updatedCells} cells appended.`)
      });
    }

  function hide_screen() {
      all_eval.style.display="none";
      rest.style.display="inline-block";
      finished_num = i-1;
      const left_num = 30 - finished_num;
      if (i<31){
        alert("30枚中、"+finished_num+
        "枚のパンフレットの評価が終わりました。休憩が終わったら、「実験を続く」ボタンを押してください")
      } else{
        alert("30枚のパンフレットの評価が終わりました。次は気に入った色について答えていただきます。休憩が終わったら、「実験を続く」ボタンを押してください")
      }
}


function close_file(){
    all_eval.style.display="none";
    last_eval.style.display="none";
    condition.style.display="none";
    buttons.style.display="none";
    thank.style.display="block";
  }

    // 3 VALUE INI MUSTI DIUBAH SESUAI INSTRUKSI
    // for github
    // var CLIENT_ID = "514380287820-tbhleigkv9mandjaqgrm3i5065e6g4ks.apps.googleusercontent.com";
    // var API_KEY = "AIzaSyD1pa1gCIkPbBFSl8FPalMC0C3GSv5ks-k";

    var CLIENT_ID = "514380287820-vcdcub63jhtma7uis4s0ua4ifpfnnglm.apps.googleusercontent.com";
    var API_KEY = "AIzaSyCECtMWWF1h9a7q9cJdqS9AW-wEA0d5GXE";
    var spreadsheetId = ss_id;

    // INI BUAT SHOW/HIDE TOMBOL2, KALO display=none ITU DI HIDE, KALO display=inline-block ITU DI SHOW
    // DI APP HARUSNYA NGGA PERLU GINIAN
    var authorizeButton = document.getElementById('authorize_button');

    function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            // authorizeButton.style.display = 'none';
            header.style.display = 'none';
        } else {
            authorizeButton.style.display = 'inline-block';
        }
    }

    // DARI SINI KE BAWAH JANGAN DIUBAH

    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";

    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

            // Handle the initial sign-in state.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        }, function (error) {
            console.log(error)
        });
    }

    function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    }

    function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    }
