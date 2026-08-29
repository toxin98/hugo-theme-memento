document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll(".sidebar-toggle");
  const sidebars = document.querySelectorAll(".sidebar");
  const overlay = document.querySelector(".overlay");

  function closeSidebar(){
    sidebars.forEach(sidebar=>{
      sidebar.classList.remove("open");
    });

    buttons.forEach(button => button.setAttribute("aria-expanded", "false"));
    overlay?.classList.remove("active");

    unlockScroll();
  }


  function openSidebar(sidebar){
    sidebar.classList.add("open");
    overlay?.classList.add("active");

    lockScroll();
  }

  function lockScroll(){

    document.body.style.overflow = "hidden";

  }

  function unlockScroll(){

    document.body.style.overflow = "";

  }

  buttons.forEach(button=>{

    button.addEventListener("click",()=>{

      const target = button.dataset.target;

      const sidebar = document.querySelector(`.sidebar[data-position="${target}"]`);

      if (!sidebar) {
        button.hidden = true;
        return;
      }

      sidebar.id ||= `sidebar-${target}`;
      button.setAttribute("aria-controls", sidebar.id);

      const isOpen = sidebar.classList.contains("open");

      closeSidebar();

      if(!isOpen){
        openSidebar(sidebar);
        button.setAttribute("aria-expanded", "true");
      }

    });

  });

  overlay?.addEventListener("click", closeSidebar);

  // ESC关闭
  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
      closeSidebar();
    }
  });

});
