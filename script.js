/**
 * MLBB Community Website - Section About JavaScript
 * Menangani animasi fade-in / slide-up saat section masuk ke viewport pengguna.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Cek apakah pengguna mengaktifkan "prefers-reduced-motion"
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const animateElements = document.querySelectorAll('.ml-animate');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px', // Animasi aktif saat elemen berada ~80px di atas layar bawah
      threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Hentikan pemantauan setelah elemen muncul agar animasi cukup berjalan sekali
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(element => {
      scrollObserver.observe(element);
    });
  } else {
    // Jika browser tidak mendukung IntersectionObserver atau pengguna mengurangi animasi
    const animateElements = document.querySelectorAll('.ml-animate');
    animateElements.forEach(element => {
      element.classList.add('is-visible');
    });
  }
});