(() => {
  const root = document.documentElement;

  // Ano no footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Tema (dark/light)
  const THEME_KEY = "theme";
  const toggleBtn = document.getElementById("themeToggle");
  const toggleIcon = document.getElementById("themeIcon");

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      if (toggleIcon) toggleIcon.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      if (toggleIcon) toggleIcon.textContent = "🌙";
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const isLight = root.getAttribute("data-theme") === "light";
      applyTheme(isLight ? "dark" : "light");
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });
})();