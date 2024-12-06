<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { onMount } from "svelte";

  type Pilot = {
      idPilot: number;
      ime: string;
      priimek: string;
  };

  let pilotes: Pilot[] = [];
  let newPilot: Partial<Pilot> = { ime: "", priimek: "" };

  async function getPilotes() {
      try {
          const response = await fetch("http://localhost:8000/pridobiPilote/");
          if (response.ok) {
              const data = await response.json();
              console.log("Fetched pilote data:", data);
              pilotes = data;
          } else {
              console.error("Failed to fetch pilote data", response.statusText);
          }
      } catch (error) {
          console.error("Error fetching pilote data:", error);
      }
  }

  async function deletePilot(idpilota: number) {
      if (!confirm("Are you sure you want to delete this pilot?")) return;

      try {
          const response = await fetch(`http://localhost:8000/pilot/${idpilota}`, {
              method: "DELETE",
          });

          if (response.ok) {
              alert("Pilot successfully deleted.");
              pilotes = pilotes.filter((pilot) => pilot.idPilot !== idpilota);
          } else {
              console.error("Failed to delete pilot", response.statusText);
              alert("Failed to delete pilot.");
          }
      } catch (error) {
          console.error("Error deleting pilot:", error);
          alert("Error deleting pilot.");
      }
  }

  async function addPilot() {
      if (!newPilot.ime || !newPilot.priimek) {
          alert("Please fill in all fields.");
          return;
      }

      try {
          const response = await fetch("http://localhost:8000/dodajPilota/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newPilot),
          });

          if (response.ok) {
              const addedPilot = await response.json();
              pilotes = [...pilotes, addedPilot];
              newPilot = { ime: "", priimek: "" };
              alert("Pilot successfully added.");
          } else {
              console.error("Failed to add pilot", response.statusText);
              alert("Failed to add pilot.");
          }
      } catch (error) {
          console.error("Error adding pilot:", error);
          alert("Error adding pilot.");
      }
  }

  onMount(() => {
      getPilotes();
  });
</script>

<main class="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-8">
  <section>
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center text-gray-800">
          Piloti
      </h1>
  </section>

  <section>
      <form class="flex flex-col gap-4 items-center mb-8">
          <input 
              type="text" 
              placeholder="Ime" 
              bind:value={newPilot.ime} 
              class="p-2 border rounded w-full max-w-md" 
          />
          <input 
              type="text" 
              placeholder="Priimek" 
              bind:value={newPilot.priimek} 
              class="p-2 border rounded w-full max-w-md" 
          />
          <button 
              type="button" 
              on:click={addPilot} 
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
              Dodaj Pilota
          </button>
      </form>
  </section>

  <section>
      <Carousel.Root>
          <Carousel.Content class="flex gap-4">
              {#each pilotes as pilote}
                  <Carousel.Item class="carousel-item">
                      <div class="pilote-card w-full max-w-7xl mx-auto p-6 rounded-lg border-solid border-2 border-indigo-500 shadow-md bg-white transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                          <p class="text-gray-600"><strong>ID:</strong> {pilote.idPilot}</p>
                          <p class="text-gray-600"><strong>Ime:</strong> {pilote.ime}</p>
                          <p class="text-gray-600"><strong>Priimek:</strong> {pilote.priimek}</p>
                          <button 
                              class="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              on:click={() => deletePilot(pilote.idPilot)}
                          >
                              Izbriši
                          </button>
                      </div>
                  </Carousel.Item>
              {/each}
          </Carousel.Content>
          <Carousel.Previous class="carousel-control" />
          <Carousel.Next class="carousel-control" />
      </Carousel.Root>
  </section>

  <section>
      <Table.Root>
          <Table.Header>
              <Table.Row class="table-row">
                  <Table.Head>ID</Table.Head>
                  <Table.Head>Ime</Table.Head>
                  <Table.Head>Priimek</Table.Head>
                  <Table.Head>Akcije</Table.Head>
              </Table.Row>
          </Table.Header>
          <Table.Body>
              {#each pilotes as pilote}
                  <Table.Row>
                      <Table.Cell>{pilote.idPilot}</Table.Cell>
                      <Table.Cell>{pilote.ime}</Table.Cell>
                      <Table.Cell>{pilote.priimek}</Table.Cell>
                      <Table.Cell>
                          <button 
                              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              on:click={() => deletePilot(pilote.idPilot)}
                          >
                              Izbriši
                          </button>
                      </Table.Cell>
                  </Table.Row>
              {/each}
          </Table.Body>
      </Table.Root>
  </section>
</main>

<style>
  .carousel-item {
      display: flex;
      justify-content: center;
      width: 100%;
      padding: 1rem;
  }

  .pilote-card {
      width: 100%;
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
  }

  .pilote-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  }

  .pilote-card h2 {
      color: #2d3748;
  }

  .pilote-card p {
      color: #4a5568;
      margin-bottom: 0.5rem;
  }

  .carousel-control {
      font-size: 1.5rem;
      color: #4a5568;
      background: transparent;
      border: none;
      cursor: pointer;
      transition: color 0.3s;
  }

  .carousel-control:hover {
      color: #2d3748;
  }
</style>