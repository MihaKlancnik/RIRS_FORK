<script lang="ts">
    import * as Carousel from "$lib/components/ui/carousel/index.js";
    import Button from "@/components/ui/button/button.svelte";
    import { onMount } from "svelte";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Cell } from "@/components/ui/calendar";
    import AddPlaneDialog from "$lib/components/ui/addPlane/addPlaneDialog.svelte";
    
    type Pilot = {
      idpilota: number;
      ime: string;
      priimek: string;
    };
  
    let pilotes: Pilot[] = [];
  
    async function getPilotes() {
      try {
        const response = await fetch("http://localhost:8000/pridobiPilote/");
        if (response.ok) {
            pilotes = await response.json();
        } else {
          console.error("Failed to fetch pilotes data");
        }
      } catch (error) {
        console.error("Error fetching planes data:", error);
      }
    }

    async function handlePlaneSave(planeData: {
        idpilota: number;
        ime: string;
        priimek: string;
    }) {
        try {
            const response = await fetch("http://localhost:8000/pilot/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(planeData),
            });

            if (!response.ok) {
                throw new Error("Failed to save plane data");
            }

            const result = await response.json();
            console.log("Plane saved successfully:", result);
            refreshPage();
        } catch (error) {
            console.error("Error saving plane:", error);
        }
    }

  

    async function deletePlane(id: number) {
        const response = await fetch(`http://localhost:8000/pilot/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            pilotes = pilotes.filter((pilotes) => pilotes.idpilota !== id);
            console.log("Izbrisan pilot:", id);
        } else {
            console.error("Pilot ni bil uspešno izbrisan:", response.statusText);
        }
    }

    onMount(() => {
        console.log(pilotes)
      getPilotes();
    });

    function refreshPage() {
        getPilotes();
    }

  </script>
  
  <main class=" flex flex-col gap-6 max-w-7xl mx-auto px-4 py-8">
    <section>
      <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 text-center text-gray-800">
        Letala
      </h1>
    </section>

   <!--  <section>
      <AddPlaneDialog onSave={handlePlaneSave} />
    </section> -->
  
    <section>
      <Carousel.Root>
        <Carousel.Content class="flex gap-4">
          {#each pilotes as plane}
            <Carousel.Item class="carousel-item">
              <div class="plane-card w-full max-w-7xl mx-auto p-6 rounded-lg border-solid border-2 border-indigo-500 shadow-md bg-white transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <p class="text-gray-600"><strong>ID:</strong> {plane.idpilota}</p>
                <p class="text-gray-600"><strong>Ime:</strong> {plane.ime}</p>
                <p class="text-gray-600"><strong>Priimek:</strong> {plane.priimek}</p>
                <Button class="bg-red-500 text-white" on:click={() => deletePlane(plane.idpilota)}>Izbrisan pilot</Button>
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
                  <Table.Head>Izbriši</Table.Head>
              </Table.Row>
          </Table.Header>
          <Table.Body>
              {#each pilotes as plane}
                  <Table.Row>
                      <Table.Cell>{plane.idpilota}</Table.Cell>
                      <Table.Cell>{plane.ime}</Table.Cell>
                      <Table.Cell>{plane.priimek}</Table.Cell>
                      <Table.Cell><Button id="delete-pilote-button" class="bg-red-500 text-white" on:click={() => deletePlane(plane.idpilota)}>Izbrisi pilota</Button></Table.Cell>
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
  
    .plane-card {
      width: 100%;
      background: white;
      border-radius: 0.75rem;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s, box-shadow 0.3s;
    }
  
    .plane-card:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }
  
    .plane-card h2 {
      color: #2d3748;
    }
  
    .plane-card p {
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
  
  
  
  