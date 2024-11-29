import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom';
import AddFlightDialog from "../addFlight/addFlightDialog.svelte";

test('AddFlightDialog button can be clicked', async () => {
  render(AddFlightDialog);

  const button = screen.getByRole('button', { name: /Dodaj/i });

  await fireEvent.click(button);

  expect(button).toBeInTheDocument();
});

test('Dialog opens when Dodaj button is clicked', async () => {
  render(AddFlightDialog);

  const button = screen.getByRole('button', { name: /Dodaj/i });

  await fireEvent.click(button);

  const dialogTitle = await screen.findByText('Nov polet');
  expect(dialogTitle).toBeInTheDocument();
});



test('Dialog contains Shrani button when opened', async () => {
  render(AddFlightDialog);

  const button = screen.getByRole('button', { name: /Dodaj/i });

  await fireEvent.click(button);

  const saveButton = await screen.findByRole('button', { name: /Shrani/i });
  expect(saveButton).toBeInTheDocument();
});

