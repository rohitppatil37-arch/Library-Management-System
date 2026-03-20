const API_URL = "https://script.google.com/macros/s/AKfycbzYdkU17A8AYqB1sCC9fChgFPU4piKBzb5cVCD_qgFRvc9XAAjLjiQaqqcXQRoUh31d/exec";

function login(){
  if(user.value==="admin" && pass.value==="1234"){
    window.location="dashboard.html";
  }
}

function logout(){
  window.location="index.html";
}

function goForm(){
  window.location="form.html";
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
  .then(()=>window.location="dashboard.html");
}

async function loadBooks(){

  const res = await fetch(API_URL);
  const books = await res.json();

  window.allBooks = books;
  displayBooks(books);
}

function search(q){
  const f = allBooks.filter(b =>
    b.name.includes(q) || b.author.includes(q) || String(b.sr).includes(q)
  );
  displayBooks(f);
}

function displayBooks(books){

  let html="", issued=0;

  books.forEach(b=>{

    let status="available";
    if(b.returnDate) status="returned";
    else if(b.reader){ status="issued"; issued++; }

    html+=`
    <div class="card">
      <h3>${b.name}</h3>
      <span class="status ${status}">${status}</span>
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

if(window.location.pathname.includes("dashboard")){
  loadBooks();
}
