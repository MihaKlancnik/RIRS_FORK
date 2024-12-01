
import { render, fireEvent, screen } from '@testing-library/svelte';
import { expect, test, vi } from 'vitest';
import '@testing-library/jest-dom';
import EditFlightDialog from "../editFlight/editFlightDialog.svelte";
//"$lib/components/ui/addFlight/addFlightDialog.svelte";

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

test("renders the dialog and saves data with onSave", async () => {
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    const mockOnSave = vi.fn();

    render(EditFlightDialog, {
        polet: mockFlight,
        onSave: mockOnSave,
    });

    // Open the dialog
    const triggerButton = screen.getByText(/Uredi/i);
    await fireEvent.click(triggerButton);

    // Verify dialog header
    expect(screen.getByText(/Uredi polet/i)).toBeInTheDocument();

    // Update Pilot ID field
    const pilotIdInput = screen.getByLabelText(/Pilot ID/i);
    await fireEvent.input(pilotIdInput, { target: { value: 102 } });

    // Save the updated data
    const saveButton = screen.getByText(/Shrani/i);
    await fireEvent.click(saveButton);

    expect(mockOnSave).toHaveBeenCalledWith({
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 102,
    });
});

test("does not call onSave when dialog is not open", async () => {
    const mockFlight = {
        idPolet: 1,
        cas_vzleta: "01/01/2023 10:00",
        cas_pristanka: "01/01/2023 12:00",
        Pilot_idPilot: 101,
    };

    const mockOnSave = vi.fn();

    render(EditFlightDialog, {
        polet: mockFlight,
        onSave: mockOnSave,
    });

    // Ensure the dialog is not open initially
    expect(screen.queryByText(/Uredi polet/i)).not.toBeInTheDocument();

    // Save button should not trigger onSave
    const saveButton = screen.queryByText(/Shrani/i);
    if (saveButton) await fireEvent.click(saveButton);

    expect(mockOnSave).not.toHaveBeenCalled();
});


