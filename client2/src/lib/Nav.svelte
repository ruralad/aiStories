<script lang="ts">
  import Icon from "@iconify/svelte";
  import { onMount } from "svelte";

  const STORAGE_KEY = "theme";
  const DARK_PREFERENCE = "(prefers-color-scheme: dark)";

  const THEMES = {
    DARK: "dark",
    LIGHT: "light",
  };
  let currentTheme: string;

  const prefersDarkThemes = () => window.matchMedia(DARK_PREFERENCE).matches;

  const toggleTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(
        STORAGE_KEY,
        prefersDarkThemes() ? THEMES.LIGHT : THEMES.DARK
      );
    }
    applyTheme();
  };
  const applyTheme = () => {
    const preferredTheme = prefersDarkThemes() ? THEMES.DARK : THEMES.LIGHT;
    currentTheme = localStorage.getItem(STORAGE_KEY) ?? preferredTheme;

    if (currentTheme === THEMES.DARK) {
      document.body.classList.remove(THEMES.LIGHT);
      document.body.classList.add(THEMES.DARK);
    } else {
      document.body.classList.remove(THEMES.DARK);
      document.body.classList.add(THEMES.LIGHT);
    }
  };

  onMount(() => {
    applyTheme();
    window.matchMedia(DARK_PREFERENCE).addEventListener("change", applyTheme);
  });
</script>

<nav
  class="w-screen px-5 pt-5 bg-white dark:bg-black dark:text-white absolute flex justify-between"
>
  <h2>aiStories</h2>
  <div class="flex">
    <span class="bg-red cursor-pointer" on:click={toggleTheme}>
      {#if currentTheme === "light"}
        <Icon icon="bi:moon-fill" />
      {:else}
        <Icon icon="akar-icons:sun" />
      {/if}
    </span>
  </div>
</nav>
