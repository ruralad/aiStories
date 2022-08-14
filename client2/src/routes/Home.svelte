<script lang="ts">
  import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    where,
  } from "firebase/firestore";
  import { onMount } from "svelte";
  import { db } from "../utils/firebaseConfig";

  let totalStories: number;
  let latestStory: string;

  onMount(async () => {
    const ref = doc(db, "stats", "all");
    const docSnap = await getDoc(ref);
    totalStories = docSnap.data().numberOfStories;

    const q = query(
      collection(db, "stories"),
      where("number", "==", totalStories)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((d) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(d.id, " => ", d.data());
      latestStory = d.data().story;
    });
  });
</script>

<main class="grid h-full place-items-center ">
  <div class="bg-gray-100 dark:bg-gray-900/30 py-5 px-2 rounded w-1/2">
    <p class="inline opacity-50 dark:bg-gray-900 rounded px-2 py-1">
      Today's Story
    </p>
    <p class="p-2 ">{latestStory}</p>
  </div>
</main>
