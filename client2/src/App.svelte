<script lang="ts">
  import { Link, Route, Router } from "svelte-routing";
  import About from "./routes/About.svelte";
  import Home from "./routes/Home.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav>
    <Link to="/">Home</Link>
    <Link to="about">About</Link>
  </nav>
  <div>
    <Route path="about" component={About} />
    <Route path="/" component={Home} />
  </div>
</Router>
