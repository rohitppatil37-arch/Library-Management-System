const API_URL = "https://script.google.com/macros/s/AKfycbzYdkU17A8AYqB1sCC9fChgFPU4piKBzb5cVCD_qgFRvc9XAAjLjiQaqqcXQRoUh31d/exec";

/* LOGIN */
function login(){
  if(user.value==="admin" && pass.value==="1234"){
    window.location="form.html";
  }
}

/* FORM */
function goDashboard(){
  window.location="dashboard.html";
}

function saveBook(){

  const data = {
    name:name.value,
    author:author.value,
    price:price.value,
    publisher:publisher.value,
    type:type.value,
    bookNo:bookNo.value,
    reader:reader.value,
    issueDate:issueDate.value,
    returnDate:returnDate.value,
    remark:remark.value
  };

  fetch(API_URL,{
    method:"POST",
    body:JSON.stringify(data)
  })
  .then(()=>alert("Saved ✅"));
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
