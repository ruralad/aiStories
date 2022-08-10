<script lang="ts">
  import { Route, Router } from "svelte-routing";
  import About from "./routes/About.svelte";
  import Home from "./routes/Home.svelte";

  import Nav from "./lib/nav.svelte";

  export let url = "";
</script>

<Router {url}>
  <Nav />
  <div class="h-screen pt-10 bg-white dark:bg-black text-black dark:text-white">
    <Route path="about" component={About} />
    <Route path="/" component={Home} />
  </div>
</Router>
