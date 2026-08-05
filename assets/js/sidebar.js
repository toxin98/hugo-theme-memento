console.log("sidebar.js loaded");

document.addEventListener('DOMContentLoaded', () => {

  const buttons = document.querySelectorAll('.toggle-left, .toggle-right');
  const sidebars = document.querySelectorAll('.sidebar-left, .sidebar-right');
  const overlay = document.querySelector(".sidebar-overlay");

  function closeSidebar(){
    sidebars.forEach(sidebar=>{
      sidebar.classList.remove("open");
    });

    overlay.classList.remove("active");

    unlockScroll();
  }


  function openSidebar(sidebar){
    sidebar.classList.add("open");
    overlay.classList.add("active");

    lockScroll();
  }

  let scrollPosition = 0;


  function lockScroll(){

    scrollPosition = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }


  function unlockScroll(){

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);
  }

  buttons.forEach(button=>{

    button.addEventListener("click",()=>{

      const target = button.dataset.target;

      const sidebar = document.querySelector( `.` + target);


      const isOpen = sidebar.classList.contains("open");


      closeSidebar();


      if(!isOpen){
        openSidebar(sidebar);
      }

    });

  });

  overlay.addEventListener("click",closeSidebar);


  // ESC关闭
  document.addEventListener("keydown",(e)=>{
    if(e.key==="Escape"){
      closeSidebar();
    }
  });

  // document.querySelectorAll('.sidebar-left, .sidebar-right').forEach(sidebar => {
  //   sidebar.addEventListener('click', e => {
  //     e.stopPropagation();
  //   });
  // });

  // document.addEventListener('click', () => {
  //   document.querySelectorAll('.sidebar-left, .sidebar-right').forEach(sidebar => {
  //     sidebar.classList.remove('is-open');
  //   });
  // });

});
