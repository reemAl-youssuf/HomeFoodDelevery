let btn=document.getElementsByClassName('read')[0];
let content=document.getElementsByClassName('content')[0];
let dots = document.getElementById("dots");

btn.onclick=(()=>{
  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btn.innerHTML = "Read more";
    content.style.display = "none";
  } else {
    dots.style.display = "none";
    btn.innerHTML = "Read less";
    content.style.display = "inline";
  }
})


