// Loader
window.addEventListener("load",()=>{
document.getElementById("loader").style.display="none"
})

// Mobile nav
document.querySelector(".hamburger")
.addEventListener("click",()=>{
document.querySelector(".nav-links")
.classList.toggle("show")
})

document.querySelectorAll(".nav-links a")
.forEach(link=>{
link.addEventListener("click",()=>{
document.querySelector(".nav-links")
.classList.remove("show")
})
})

/* Universal modal system */

const projectCards = document.querySelectorAll(".project-card");
const modals = document.querySelectorAll(".project-modal");
const closeButtons = document.querySelectorAll(".close-modal");

projectCards.forEach(card => {
card.addEventListener("click", () => {
const modalId = card.getAttribute("data-modal");
document.getElementById(modalId).classList.add("active");
});
});

closeButtons.forEach(btn => {
btn.addEventListener("click", () => {
btn.closest(".project-modal").classList.remove("active");
});
});

modals.forEach(modal => {
modal.addEventListener("click", e => {
if (e.target === modal) modal.classList.remove("active");
});
});



// Scroll reveal
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting)
e.target.classList.add("active")
})
},{threshold:.2})

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el))

// Smooth scroll
document.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{
anchor.addEventListener("click",e=>{
e.preventDefault()
const target=document.querySelector(
anchor.getAttribute("href"))
window.scrollTo({
top:target.offsetTop-90,
behavior:"smooth"
})
})
})

// Active nav highlight
const sections=document.querySelectorAll("section")
const navLinks=document.querySelectorAll(".nav-links a")

window.addEventListener("scroll",()=>{
let current=""

sections.forEach(section=>{
const top=section.offsetTop-120
if(scrollY>=top)
current=section.id
})

navLinks.forEach(link=>{
link.classList.remove("active")
if(link.getAttribute("href")==="#"+current)
link.classList.add("active")
})
})

// Scroll progress
window.addEventListener("scroll",()=>{
const scrollTop=
document.documentElement.scrollTop

const height=
document.documentElement.scrollHeight-
document.documentElement.clientHeight

document.getElementById("progress-bar")
.style.width=(scrollTop/height)*100+"%"
})

// Hero parallax
window.addEventListener("scroll",()=>{
const y=window.scrollY
document.querySelector(".parallax")
.style.transform=`translateY(${y*0.3}px)`
})
