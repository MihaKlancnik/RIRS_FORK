<script lang="ts">
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label/index.js";

    export let onSave: (data: { idpilota: number; ime: string; priimek: string }) => void;
    export let pilotData: { idpilota: number; ime: string; priimek: string } | null = null;

    let isDialogOpen = false;
    let idpilota: number = 0;
    let ime: string = "";
    let priimek: string = "";

    // Watch for changes in pilotData and update the form fields
    $: {
        if (pilotData) {
            idpilota = pilotData.idpilota;
            ime = pilotData.ime;
            priimek = pilotData.priimek;
        }
    }

    function handleSave() {
        if (onSave) {
            onSave({ idpilota, ime, priimek });
            isDialogOpen = false; // Close dialog after saving
        }
    }
</script>

<Dialog.Root bind:open={isDialogOpen}>
    <Dialog.Trigger
        class="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
    >
        Poglej Podrobnosti
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Podatki Pilota</Dialog.Title>
            <Dialog.Description>
                Podrobnosti o pilotu.
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="idpilota" class="text-right">ID Pilota</Label>
                <div id="idpilota" class="col-span-3">{idpilota}</div>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="ime" class="text-right">Ime</Label>
                <div id="ime" class="col-span-3">{ime}</div>
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
                <Label for="priimek" class="text-right">Priimek</Label>
                <div id="priimek" class="col-span-3">{priimek}</div>
            </div>
        </div>
        <Dialog.Footer>
            <button
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                on:click={handleSave}
            >
                Shrani
            </button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
