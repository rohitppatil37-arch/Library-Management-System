const API_URL = "https://script.google.com/macros/s/AKfycbzYdkU17A8AYqB1sCC9fChgFPU4piKBzb5cVCD_qgFRvc9XAAjLjiQaqqcXQRoUh31d/exec";

/* LOGIN */
function login(){
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    window.location="form.html";
  }
}

/* FORM */
function goDashboard(){
  window.location="dashboard.html";
}

/* 🔥 SAVE BOOK */
function saveBook(){

  console.log("SAVE CLICKED 🔥");

  const data = {
    name: document.getElementById("name").value,
    author: document.getElementById("author").value,
    price: document.getElementById("price").value,
    publisher: document.getElementById("publisher").value,
    type: document.getElementById("type").value,
    bookNo: document.getElementById("bookNo").value,
    reader: document.getElementById("reader").value,
    issueDate: document.getElementById("issueDate").value,
    returnDate: document.getElementById("returnDate").value,
    remark: document.getElementById("remark").value
  };

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify(data),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then(res => res.json())
  .then(res => {
    console.log("RESPONSE:", res);
    alert("Saved Successfully ✅");
  })
  .catch(err => {
    console.error("ERROR:", err);
    alert("Error ❌");
  });
}

/* LOAD */
async function loadBooks(){
  const res = await fetch(API_URL);
  window.allBooks = await res.json();
}

/* SEARCH */
function search(){

  const q = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allBooks.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    String(b.sr).includes(q)
  );

  showResults(filtered);
}

/* RESULTS */
function showResults(data){

  let html="";
  data.forEach(b=>{
    html += `
    <div class="card">
      <b>${b.name}</b><br>
      लेखक: ${b.author}<br>
      अ.क्र.: ${b.sr}<br>
      शेरा: ${b.remark}
    </div>`;
  });

  document.getElementById("results").innerHTML = html;
}

/* AUTO LOAD */
if(window.location.pathname.includes("dashboard")){
  loadBooks();
}
