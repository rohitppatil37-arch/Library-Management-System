const API_URL = "https://script.google.com/macros/s/AKfycbzYdkU17A8AYqB1sCC9fChgFPU4piKBzb5cVCD_qgFRvc9XAAjLjiQaqqcXQRoUh31d/exec";

/* LOAD BOOKS */
async function loadBooks(){
  const res = await fetch(API_URL);
  window.allBooks = await res.json();
}

/* SEARCH */
function showSuggestions(){

  let q = searchInput.value.toLowerCase();
  let type = searchType.value;

  let html="";

  allBooks.forEach(b=>{
    if(String(b[type]).toLowerCase().includes(q)){
      html += `<div onclick="selectBook('${b.sr}')">${b.name}</div>`;
    }
  });

  suggestions.innerHTML = html;
}

/* SELECT BOOK */
function selectBook(sr){

  let b = allBooks.find(x=>String(x.sr)==sr);

  let status = b.reader ? `दिलेलं: ${b.reader}` : "Available";

  results.innerHTML = `
  <div class="card">
    <h3>${b.name}</h3>
    <p>${b.author}</p>
    <p>${status}</p>
    <button onclick="requestBook('${b.sr}')">Request</button>
  </div>`;
}

/* REQUEST */
function requestBook(sr){

  let b = allBooks.find(x=>String(x.sr)==sr);

  if(b.reader){
    alert("उपलब्ध नाही ❌");
    return;
  }

  fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({action:"request",sr:sr})
  });

  alert("Request sent ✅");
}

/* ADMIN REQUEST LOAD */
async function loadRequests(){

  const res = await fetch(API_URL+"?type=requests");
  const data = await res.json();

  let html="";

  data.forEach(r=>{
    html += `
    <div class="card">
      Request for book ${r.sr}
      <button onclick="approve('${r.sr}')">Approve</button>
    </div>`;
  });

  requests.innerHTML = html;
}

/* APPROVE */
function approve(sr){

  fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({action:"approve",sr:sr})
  });

  alert("Approved ✅");
}

/* SAVE BOOK */
function saveBook(){

  fetch(API_URL,{
    method:"POST",
    body:JSON.stringify({
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
    })
  });

  alert("Saved ✅");
}

/* AUTO LOAD */
if(location.pathname.includes("member")){
  loadBooks();
}
