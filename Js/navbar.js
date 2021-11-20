class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
      this.mobileMenu = document.querySelector(mobileMenu);
      this.navList = document.querySelector(navList);
      this.navLinks = document.querySelectorAll(navLinks);
      this.activeClass = "active";
  
      this.handleClick = this.handleClick.bind(this);
    }
  
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
      });
    }
  
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    }
  
    addClickEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    }
  
    init() {
      this.addClickEvent();
      return this;
    }
}
  
const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
   ".nav-list li",
);
mobileNavbar.init();


function Relogio()
{
  var momentoAtual = new Date();
 
  var dia = momentoAtual.getDate();
  corrigir(dia);
  var mes = momentoAtual.getMonth()+1;
  corrigir(mes);
  var ano = momentoAtual.getFullYear();
  var hora = momentoAtual.getHours();
  corrigir(hora);
  var minuto = momentoAtual.getMinutes();
  corrigir(minuto);
  var segundos = momentoAtual.getSeconds();
  
  function corrigir(i)
  {
    if(i<10)
      return "0"+i
  }
  var dataHora = dia+"/"+mes+"/"+ano+"  -  "+hora+":"+minuto+":"+segundos;
  
  window.document.getElementById('dataHora').innerHTML = dataHora;
} setInterval(Relogio,500);