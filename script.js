function goLogin(){
  window.location.href="login.html";
}

function login(){
  if(user.value==="admin" && pass.value==="1234"){
    window.location.href="home.html";
  }else{
    alert("Wrong login");
  }
}

function logout(){
  window.location.href="index.html";
}

function goForm(){
  window.location.href="form.html";
}

/* 🔍 SEARCH FULL DETAILS */
function searchBook(q){

  const books = [
    {
      sr:"1",
      name:"मृत्युंजय",
      author:"शिवाजी सावंत",
      price:"500",
      publisher:"ABC",
      type:"कादंबरी",
      bookNo:"B101",
      reader:"राहुल",
      issueDate:"2026-03-20",
      returnDate:"",
      remark:"दिलं आहे - राहुल"
    }
  ];

  let html="";

  books.forEach(b=>{

    if(b.name.includes(q) || b.author.includes(q) || b.sr.includes(q)){

      let status = b.returnDate
        ? "🟢 जमा झाले"
        : b.reader
        ? "🔴 दिलं आहे"
        : "🟢 उपलब्ध";

      html += `
      <div class="card">
        <h3>${b.name}</h3>
        <p><b>अ.क्र.:</b> ${b.sr}</p>
        <p><b>लेखक:</b> ${b.author}</p>
        <p><b>किंमत:</b> ₹${b.price}</p>
        <p><b>प्रकाशक:</b> ${b.publisher}</p>
        <p><b>प्रकार:</b> ${b.type}</p>
        <p><b>क्रमांक:</b> ${b.bookNo}</p>
        <p><b>वाचक:</b> ${b.reader || "-"}</p>
        <p><b>घेण्याचा दिनांक:</b> ${b.issueDate || "-"}</p>
        <p><b>जमा दिनांक:</b> ${b.returnDate || "-"}</p>
        <p><b>शेरा:</b> ${b.remark}</p>
        <p><b>Status:</b> ${status}</p>
      </div>`;
    }

  });

  document.getElementById("results").innerHTML = html;
}

/* FORM SUBMIT DEMO */
function submitForm(){
  alert("Saved (Demo) ✅");
}
