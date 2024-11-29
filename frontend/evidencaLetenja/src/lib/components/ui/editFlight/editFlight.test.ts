import EditFlightDialog from '../EditFlight/editFlightDialog.svelte';
import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';

test('renders the EditFlight dialog and triggers the onSave function', async () => {
  // Mock data for the flight
  const mockFlight = {
    idPolet: 1,
    cas_vzleta: "01/01/2023 10:00",
    cas_pristanka: "01/01/2023 12:00",
    Pilot_idPilot: 101,
  };

  // Mock onSave function
  const mockOnSave = vi.fn();

  // Render the component
  render(EditFlightDialog, { polet: mockFlight, onSave: mockOnSave });

  // Find and click the trigger button to open the dialog
  const triggerButton = screen.getByText(/Uredi/i);
  await fireEvent.click(triggerButton);

  // Check if the dialog header is rendered
  expect(screen.getByText(/Uredi polet/i)).toBeInTheDocument();

  // Find and click the save button to trigger the onSave function
  const saveButton = screen.getByText(/Shrani/i);
  await fireEvent.click(saveButton);

  // Check if the onSave function was called
  expect(mockOnSave).toHaveBeenCalled();
});

test('updates flight data and calls onSave with updated values', async () => {
    // Mock data for the flight
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    // Mock onSave function
    const mockOnSave = vi.fn();

    // Render the component
    render(EditFlightDialog, { polet: mockFlight, onSave: mockOnSave });

    // Find and click the trigger button to open the dialog
    const triggerButton = screen.getByText(/Uredi/i);
    await fireEvent.click(triggerButton);

    // Update the Pilot ID input field
    const pilotIdInput = screen.getByLabelText(/Pilot ID/i);
    await fireEvent.input(pilotIdInput, { target: { value: '102' } });

    // Find and click the save button to trigger the onSave function
    const saveButton = screen.getByText(/Shrani/i);
    await fireEvent.click(saveButton);

    // Check if the onSave function was called with updated values
    expect(mockOnSave).toHaveBeenCalledWith({
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 102,
    });
});

test('renders the EditFlight dialog and triggers the onSave function', async () => {
    // Mock data for the flight
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    // Mock onSave function
    const mockOnSave = vi.fn();

    // Render the component
    render(EditFlightDialog, { polet: mockFlight, onSave: mockOnSave });

    // Find and click the trigger button to open the dialog
    const triggerButton = screen.getByText(/Uredi/i);
    await fireEvent.click(triggerButton);

    // Check if the dialog header is rendered
    expect(screen.getByText(/Uredi polet/i)).toBeInTheDocument();

    // Find and click the save button to trigger the onSave function
    const saveButton = screen.getByText(/Shrani/i);
    await fireEvent.click(saveButton);

    // Check if the onSave function was called
    expect(mockOnSave).toHaveBeenCalled();
});

test('updates flight data and calls onSave with updated values', async () => {
    // Mock data for the flight
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    // Mock onSave function
    const mockOnSave = vi.fn();

    // Render the component
    render(EditFlightDialog, { polet: mockFlight, onSave: mockOnSave });

    // Find and click the trigger button to open the dialog
    const triggerButton = screen.getByText(/Uredi/i);
    await fireEvent.click(triggerButton);

    // Update the Pilot ID input field
    const pilotIdInput = screen.getByLabelText(/Pilot ID/i);
    await fireEvent.input(pilotIdInput, { target: { value: '102' } });

    // Find and click the save button to trigger the onSave function
    const saveButton = screen.getByText(/Shrani/i);
    await fireEvent.click(saveButton);

    // Check if the onSave function was called with updated values
    expect(mockOnSave).toHaveBeenCalledWith({
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 102,
    });
});

test('opens the dialog when the trigger button is clicked', async () => {
    // Mock data for the flight
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    // Mock onSave function
    const mockOnSave = vi.fn();

    // Render the component
    render(EditFlightDialog, { polet: mockFlight, onSave: mockOnSave });

    // Find and click the trigger button to open the dialog
    const triggerButton = screen.getByText(/Uredi/i);
    await fireEvent.click(triggerButton);

    // Check if the dialog is open
    expect(screen.getByText(/Uredi polet/i)).toBeInTheDocument();
});

