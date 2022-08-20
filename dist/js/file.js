let progressSection = document.querySelector(".progress-section"),
  progressBars = document.querySelectorAll(".progress-bar"),
  progH3 = document.querySelectorAll(".progress-section .text h3");

window.onscroll = function () {
  if (this.scrollY >= progressSection.offsetTop - 250) {
    // animate progress bar on scroll
    progressBars.forEach((bar) => {
      progressCountdown(bar.parentElement.previousElementSibling.lastElementChild, bar.getAttribute("aria-valuenow"));
      bar.style.width = bar.getAttribute("aria-valuenow") + '%';
    });

    // animate progress card numbers on scroll
    progH3.forEach((h3) => {
      let progH3Interval = setInterval(() => {
        if(Number(h3.textContent) >= h3.dataset.value) clearInterval(progH3Interval);
        else h3.textContent = Number(h3.textContent) + 1;
      }, 50);
    })
  }

  // scroll-up button
  if (this.scrollY > 900) document.querySelector(".go-up").style.display = "block";
  else document.querySelector(".go-up").style.display = "none";

  // scroll progress bar
  let availableHeight = document.documentElement.offsetHeight - document.documentElement.clientHeight;
  document.querySelector(".scrollProgressBar").style.height = `${Math.round(window.scrollY / availableHeight * 100)}%`
};

function progressCountdown(el, limit) {
  let progCountInterval, i = 0;

  progCountInterval = setInterval(() => {
    el.textContent >= limit ? clearInterval(progCountInterval) : el.textContent = i + '%';
    i += 10;
  }, 200);
}

// handle go-up button click event
document.querySelector(".go-up").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});

// handle filteration buttons
let filterUl = document.querySelector(".portfolio .filterUl"),
    filterLis = document.querySelectorAll(".portfolio .filterUl li"),
    filterImgs = document.querySelectorAll(".portfolio .portf-img");

filterLis.forEach((li, index) => {
  if (index === 0) li.classList.add("active");

  li.addEventListener("click", () => {
    filterLis.forEach((li) => {li.classList.remove("active")});
    li.classList.add("active");

    filterImgs.forEach((img) => {
      if(img.firstElementChild.classList.contains(li.textContent.toLowerCase())){
        img.parentElement.style.display = "block";
      } else img.parentElement.style.display = "none"
    });
  });
});

filterImgs.forEach((img) => {
  img.addEventListener("click", () => {
    if(document.querySelector(".activeFilter")) document.querySelector(".activeFilter").remove();

    let activeDiv = document.createElement("div"),
        cancelBtn = document.createElement("button");

    cancelBtn.classList.add("fa-solid");
    cancelBtn.classList.add("fa-xmark");
    cancelBtn.setAttribute("value", "#&f00d;")
    
    activeDiv.classList.add("activeFilter");
    activeDiv.appendChild(img.firstElementChild.cloneNode(true));
    activeDiv.appendChild(cancelBtn);
    document.body.appendChild(activeDiv);
  });
});

document.onkeyup = (e) => {
  if (e.key === "Escape" && document.querySelector(".activeFilter"))
    document.querySelector(".activeFilter").remove(); 
}

document.onclick = (e) => {
  if (e.target.classList.contains("activeFilter"))
    e.target.remove(); 
  else if (e.target.tagName.toLowerCase() === 'path' || e.target.tagName.toLowerCase() === 'svg')
    document.querySelector(".activeFilter").remove();
}

// handle dynamic year
document.querySelector(".footer .year").textContent = new Date().getFullYear();


// AOS (Animate On Scroll) Library
AOS.init({duration: 2000, once: true});

// Dynamic Header
const headroom = new Headroom(document.querySelector("header"));
headroom.init();

// handle textarea words count
let textareaSpan = document.querySelector(".textarea-count"),
    textareaMaxLength = parseInt(textareaSpan.previousElementSibling.getAttribute("maxlength"));

textareaSpan.textContent = textareaMaxLength;

textareaSpan.previousElementSibling.oninput = function () {
  textareaSpan.textContent = textareaMaxLength - this.value.length;

  if (textareaSpan.textContent === "0") textareaSpan.classList.add("zero");
  else textareaSpan.classList.remove("zero");
}
