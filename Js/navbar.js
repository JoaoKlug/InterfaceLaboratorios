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
 
  var dia = verificarDataHora(momentoAtual.getDate());
  var mes = verificarDataHora(momentoAtual.getMonth())+1;
  var ano = momentoAtual.getFullYear();
  var hora = verificarDataHora(momentoAtual.getHours());
  var minuto = verificarDataHora(momentoAtual.getMinutes());
  var segundos = verificarDataHora(momentoAtual.getSeconds());
  
  function verificarDataHora(n)
  {
    if(n<10){
      return "0"+n;
    }
    else{
      return n;
    }
  }
  var dataHora = dia+"/"+mes+"/"+ano+"  -  "+hora+":"+minuto+":"+segundos;
  
  window.document.getElementById('dataHora').innerHTML = dataHora;
} setInterval(Relogio,500);