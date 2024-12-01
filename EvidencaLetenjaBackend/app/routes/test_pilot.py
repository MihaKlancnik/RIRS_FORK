import pytest
from fastapi.testclient import TestClient
from EvidencaLetenjaBackend.app.routes.pilot import router
from models.schemas import Pilot


client = TestClient(router)

def test_create_pilot():
    response = client.post("/dodajPilota/", json={"ime": "John", "priimek": "Doe"})
    assert response.status_code == 200
    assert response.json()["ime"] == "Jaka"
    assert response.json()["priimek"] == "koren"
    assert "idPilot" in response.json()

def test_read_pilots():
    response = client.get("/pridobiPilote/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_delete_pilot():
    # First, create a pilot to ensure there is one to delete
    create_response = client.post("/dodajPilota/", json={"ime": "Jaka", "priimek": "Doren"})
    pilot_id = create_response.json()["idPilot"]

    # Now, delete the created pilot
    delete_response = client.delete(f"/pilot/{pilot_id}")
    assert delete_response.status_code == 200
    assert delete_response.json() == {"message": "Pilot deleted successfully"}