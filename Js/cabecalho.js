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
  const momentoAtual = new Date();
 
  const dia = verificarDataHora(momentoAtual.getDate());
  const mes = verificarDataHora(momentoAtual.getMonth())+1;
  const ano = momentoAtual.getFullYear();
  const hora = verificarDataHora(momentoAtual.getHours());
  const minuto = verificarDataHora(momentoAtual.getMinutes());
  const segundos = verificarDataHora(momentoAtual.getSeconds());
  
  function verificarDataHora(tempo)
  {
    return tempo <10 ? `0${tempo}` : tempo;
  }
  const dataHora = dia+"/"+mes+"/"+ano+"  -  "+hora+":"+minuto+":"+segundos;
  
  document.getElementById('dataHora').innerHTML = dataHora;
} setInterval(Relogio,1000);