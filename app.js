const API_URL = "https://script.google.com/macros/s/AKfycbzYdkU17A8AYqB1sCC9fChgFPU4piKBzb5cVCD_qgFRvc9XAAjLjiQaqqcXQRoUh31d/exec";

/* 🔐 LOGIN */
function login(){
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if(u==="admin" && p==="1234"){
    window.location="dashboard.html";
  }else{
    alert("Invalid Login ❌");
  }
}

/* 🚪 LOGOUT */
function logout(){
  window.location="index.html";
}

/* ➕ FORM PAGE */
function goForm(){
  window.location="form.html";
}

/* 💾 SAVE BOOK */
function saveBook(){

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
    body:JSON.stringify(data)
  })
  .then(()=>{
    alert("Saved Successfully ✅");
    window.location="dashboard.html";
  })
  .catch(()=>{
    alert("Error saving data ❌");
  });
}

/* 📥 LOAD BOOKS */
async function loadBooks(){

  document.getElementById("results").innerHTML = "Loading... ⏳";

  try{
    const res = await fetch(API_URL);
    const books = await res.json();

    window.allBooks = books;
    displayBooks(books);
  }catch(e){
    document.getElementById("results").innerHTML = "Error loading data ❌";
  }
}

/* 🔍 SEARCH */
function search(q){

  q = q.toLowerCase();

  const filtered = allBooks.filter(b =>
    b.name.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    String(b.sr).includes(q)
  );

  document.getElementById("suggestions").innerHTML="";
  displayBooks(filtered);
}

/* ⚡ LIVE SUGGESTIONS */
function showSuggestions(q){

  if(!q){
    document.getElementById("suggestions").innerHTML="";
    return;
  }

  q = q.toLowerCase();

  let html="";
  let count = 0;

  allBooks.forEach(b=>{

    if(
      b.name.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      String(b.sr).includes(q)
    ){

      if(count < 5){  // 👉 limit suggestions
        html += `
        <div class="suggestion-item" onclick="selectBook('${b.sr}')">
          📘 ${b.name} <br><small>${b.author}</small>
        </div>`;
        count++;
      }

    }

  });

  document.getElementById("suggestions").innerHTML = html;
}

/* 👉 SELECT FROM SUGGESTION */
function selectBook(sr){

  const book = allBooks.find(b => String(b.sr) === String(sr));

  document.getElementById("suggestions").innerHTML="";
  document.getElementById("searchInput").value = book.name;

  displayBooks([book]);
}

/* 🎯 DISPLAY */
function displayBooks(books){

  if(!books.length){
    document.getElementById("results").innerHTML = "No records found ❌";
    return;
  }

  let html="";
  let issued=0;

  books.forEach(b=>{

    let status="available";
    let statusText="Available";

    if(b.returnDate){
      status="returned";
      statusText="Returned";
    }
    else if(b.reader){
      status="issued";
      statusText="Issued";
      issued++;
    }

    html+=`
    <div class="card">
      <h3>${b.name}</h3>
      <span class="status ${status}">${statusText}</span>

      <p>अ.क्र.: ${b.sr}</p>
      <p>लेखक: ${b.author}</p>
      <p>किंमत: ₹${b.price}</p>
      <p>प्रकाशक: ${b.publisher}</p>
      <p>प्रकार: ${b.type}</p>
      <p>क्रमांक: ${b.bookNo}</p>
      <p>वाचक: ${b.reader||"-"}</p>
      <p>घेण्याचा दिनांक: ${b.issueDate||"-"}</p>
      <p>जमा दिनांक: ${b.returnDate||"-"}</p>
      <p>शेरा: ${b.remark}</p>
    </div>`;
  });

  document.getElementById("results").innerHTML = html;

  document.getElementById("total").innerText = books.length;
  document.getElementById("issued").innerText = issued;
  document.getElementById("available").innerText = books.length - issued;
}

/* 🚀 AUTO LOAD */
if(window.location.pathname.includes("dashboard")){
  loadBooks();
}
