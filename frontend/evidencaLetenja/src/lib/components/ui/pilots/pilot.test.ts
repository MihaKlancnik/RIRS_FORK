import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import AddFlightDialog from "../pilots/pilotDialog.svelte"; // Adjust the import path as needed

test('AddFlightDialog button can be clicked', async () => {
  render(AddFlightDialog, {
    onSave: () => {}, // Mock function
    pilotData: { idpilota: 1, ime: 'Janez', priimek: 'Novak' } // Provide sample data
  });

  const button = screen.getByRole('button', { name: /Poglej Podrobnosti/i });

  await fireEvent.click(button);

  // Check if the button is still in the document after clicking
  expect(button).toBeInTheDocument();
});

test('Dialog opens when Poglej Podrobnosti button is clicked', async () => {
  render(AddFlightDialog, {
    onSave: () => {}, // Mock function
    pilotData: { idpilota: 1, ime: 'Janez', priimek: 'Novak' } // Provide sample data
  });

  const button = screen.getByRole('button', { name: /Poglej Podrobnosti/i });

  await fireEvent.click(button);

  // Check if the dialog content is rendered after the button is clicked
  const dialogTitle = await screen.findByText('Podatki Pilota');
  expect(dialogTitle).toBeInTheDocument();
});

test('Dialog contains Shrani button when opened', async () => {
  render(AddFlightDialog, {
    onSave: () => {}, // Mock function
    pilotData: { idpilota: 1, ime: 'Janez', priimek: 'Novak' } // Provide sample data
  });

  const button = screen.getByRole('button', { name: /Poglej Podrobnosti/i });

  await fireEvent.click(button);

  const saveButton = await screen.findByRole('button', { name: /Shrani/i });
  expect(saveButton).toBeInTheDocument();
});


test('Dialog displays pilot details correctly', async () => {
    render(AddFlightDialog, {
      onSave: () => {}, // Mock function
      pilotData: { idpilota: 1, ime: 'Janez', priimek: 'Novak' } // Provide sample data
    });
  
    // Trigger the dialog open
    const button = screen.getByRole('button', { name: /Poglej Podrobnosti/i });
    await fireEvent.click(button);
  
    // Check if the dialog contains the pilot's details
    expect(screen.getByText('ID Pilota')).toBeInTheDocument();
    expect(screen.getByText('Janez')).toBeInTheDocument();
    expect(screen.getByText('Novak')).toBeInTheDocument();
  });


  test('Dialog displays the Shrani button', async () => {
    render(AddFlightDialog, {
      onSave: () => {}, // Mock function
      pilotData: { idpilota: 1, ime: 'Janez', priimek: 'Novak' } // Provide sample data
    });
  
    // Open the dialog
    const button = screen.getByRole('button', { name: /Poglej Podrobnosti/i });
    await fireEvent.click(button);
  
    // Check if the Shrani button is present in the dialog
    expect(screen.getByRole('button', { name: /Shrani/i })).toBeInTheDocument();
  });
  