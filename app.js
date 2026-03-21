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

  let status = b.reader 
    ? `📕 दिलेले: ${b.reader}` 
    : "📗 उपलब्ध";

  document.getElementById("results").innerHTML = `
    <div class="card">
      <h3>${b.name}</h3>
      <p>✍️ लेखक: ${b.author}</p>
      <p>${status}</p>

      <button onclick="requestBook('${b.sr}')">
        📩 पुस्तक मागणी करा
      </button>
    </div>
  `;
}

/* REQUEST */
function requestBook(sr){

  // 👉 member नाव घ्या
  const member = prompt("तुमचे नाव टाका");

  if(!member){
    alert("⚠️ कृपया तुमचे नाव टाका");
    return;
  }

  // 👉 selected book शोध
  const b = allBooks.find(x => String(x.sr) == sr);

  // 👉 check availability
  if(b.reader){
    alert("❌ हे पुस्तक सध्या उपलब्ध नाही");
    return;
  }

  // 👉 backend ला data पाठवा
  fetch(API_URL,{
    method:"POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      action: "request",
      sr: sr,
      name: b.name,      // 🔥 book name
      member: member     // 🔥 member name
    })
  });

  alert("✅ तुमची मागणी नोंदवली आहे");
}
/* ADMIN REQUEST LOAD */
async function loadRequests(){

  const res = await fetch(API_URL+"?type=requests");
  const data = await res.json();

  let html="";

  data.forEach(r=>{
    html += `
    <div class="card">
      📘 <b>${r.name}</b><br>
      अ.क्र.: ${r.sr}<br>
      👤 सदस्य: ${r.member}

      <button onclick="approve('${r.sr}','${r.member}')">
        ✔️ मंजूर करा
      </button>
    </div>`;
  });

  document.getElementById("requests").innerHTML = html;
}
/* APPROVE */
function approve(sr, member){

  fetch(API_URL,{
    method:"POST",
    body: JSON.stringify({
      action:"approve",
      sr:sr,
      member:member
    })
  });

  alert("✅ पुस्तक मंजूर केले आहे");
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

  alert("✅ पुस्तक नोंद यशस्वी झाली");
}

/* AUTO LOAD */
if(location.pathname.includes("member")){
  loadBooks();
}
