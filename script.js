function goLogin(){
  window.location.href="login.html";
}

function login(){
  const u = document.getElementById('user').value;
  const p = document.getElementById('pass').value;

  if(u==="admin" && p==="1234"){
    window.location.href="home.html";
  }else{
    alert("Invalid Login");
  }
}

function logout(){
  window.location.href="index.html";
}

function goForm(){
  window.location.href="form.html";
}

function searchBook(q){
  const data = [
    {name:"शामची आई", author:"साने गुरुजी"},
    {name:"मृत्युंजय", author:"शिवाजी सावंत"}
  ];

  let html="";
  data.forEach(b=>{
    if(b.name.includes(q)){
      html += `<div style="background:#1f2937;padding:10px;margin:5px;border-radius:8px;">
        ${b.name} - ${b.author}
      </div>`;
    }
  });

  document.getElementById("results").innerHTML = html;
}
