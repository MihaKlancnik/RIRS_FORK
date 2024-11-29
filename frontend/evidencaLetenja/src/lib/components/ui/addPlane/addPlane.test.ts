import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import AddPlaneDialog from "../addPlane/addPlaneDialog.svelte";

test('renders and clicks Add Plane button', async () => {
  // Render the component
  render(AddPlaneDialog);

  // Find the trigger button
  const button = screen.getByTestId('add-plane-dialog-button');

  // Verify the button is in the document
  expect(button).toBeInTheDocument();

  // Simulate clicking the button
  await fireEvent.click(button);

  // Ensure the test does not throw an error (click handled correctly)
  expect(button).toBeVisible();
});

test('Dialog opens and contains input fields when Add Plane button is clicked', async () => {
  // Render the component
  render(AddPlaneDialog);

  // Find the trigger button
  const button = screen.getByTestId('add-plane-dialog-button');

  // Simulate clicking the button
  await fireEvent.click(button);

  // Verify the dialog title is present
  const dialogTitle = await screen.findByText('Novo letalo');
  expect(dialogTitle).toBeInTheDocument();

  // Verify the input fields are present
  const imeLetalaInput = await screen.findByLabelText('Ime letala');
  const tipInput = await screen.findByLabelText('Tip');
  const registrskaInput = await screen.findByLabelText('Registrska številka');
  const idFlightInput = await screen.findByLabelText('ID poleta');

  expect(imeLetalaInput).toBeInTheDocument();
  expect(tipInput).toBeInTheDocument();
  expect(registrskaInput).toBeInTheDocument();
  expect(idFlightInput).toBeInTheDocument();
});

test('onSave is called with correct data when Shrani button is clicked', async () => {
  const onSaveMock = vi.fn();
  render(AddPlaneDialog, { onSave: onSaveMock });

  const button = screen.getByTestId('add-plane-dialog-button');

  await fireEvent.click(button);

  const imeLetalaInput = await screen.findByLabelText('Ime letala');
  const tipInput = await screen.findByLabelText('Tip');
  const registrskaInput = await screen.findByLabelText('Registrska številka');
  const idFlightInput = await screen.findByLabelText('ID poleta');

  await fireEvent.input(imeLetalaInput, { target: { value: 'Boeing 737' } });
  await fireEvent.input(tipInput, { target: { value: 'Commercial' } });
  await fireEvent.input(registrskaInput, { target: { value: 'S5-ABC' } });
  await fireEvent.input(idFlightInput, { target: { value: '456' } });

  const saveButton = await screen.findByRole('button', { name: /Shrani/i });
  await fireEvent.click(saveButton);

  expect(onSaveMock).toHaveBeenCalledWith({
    ime_letala: 'Boeing 737',
    tip: 'Commercial',
    registrska_st: 'S5-ABC',
    Polet_idPolet: 456,
  });
});