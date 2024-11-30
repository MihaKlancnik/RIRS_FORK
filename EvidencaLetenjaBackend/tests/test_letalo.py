import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

@pytest.fixture
def sample_letalo():
    return {
        "ime_letala": "Test Letalo",
        "tip": "Test Tip",
        "registrska_st": "TEST123",
        "Polet_idPolet": 1
    }

def test_create_letalo(sample_letalo):
    # naredi novo letalo
    response = client.post("/dodajLetalo/", json=sample_letalo)
    assert response.status_code == 200

    created_letalo = response.json()
    assert created_letalo["ime_letala"] == sample_letalo["ime_letala"]
    assert created_letalo["tip"] == sample_letalo["tip"]
    assert created_letalo["registrska_st"] == sample_letalo["registrska_st"]
    assert created_letalo["Polet_idPolet"] == sample_letalo["Polet_idPolet"]
    assert created_letalo["Polet_idPolet"] == sample_letalo["Polet_idPolet"]

def test_read_letala():
    # pridobi vsa letala
    response = client.get("/pridobiLetala/")
    assert response.status_code == 200

    letalos = response.json()
    assert isinstance(letalos, list)
    if letalos:
        assert "ime_letala" in letalos[0]
        assert "tip" in letalos[0]
        assert "registrska_st" in letalos[0]
        assert "Polet_idPolet" in letalos[0]


def test_update_letalo(sample_letalo):
    # Create a new Letalo first
    create_response = client.post("/dodajLetalo/", json=sample_letalo)
    assert create_response.status_code == 200

    created_letalo = create_response.json()
    updated_data = {
        "ime_letala": "Updated Letalo",
        "tip": "Updated Tip",
        "registrska_st": "UPDATED123",
        "Polet_idPolet": 2
    }

    update_response = client.put(f"/letalo/{created_letalo['idLetalo']}", json=updated_data)
    assert update_response.status_code == 200
    update_message = update_response.json()
    assert update_message["message"] == f"Letalo with id {created_letalo['idLetalo']} updated successfully"

    # Verify the update
    get_response = client.get("/pridobiLetala/")
    assert get_response.status_code == 200
    updated_letalos = get_response.json()
    assert any(letalo["idLetalo"] == created_letalo["idLetalo"] and
               letalo["ime_letala"] == updated_data["ime_letala"] for letalo in updated_letalos)

def test_delete_letalo(sample_letalo):
    # Create a new Letalo first
    create_response = client.post("/dodajLetalo/", json=sample_letalo)
    assert create_response.status_code == 200

    created_letalo = create_response.json()
    delete_response = client.delete(f"/letalo/{created_letalo['idLetalo']}")
    assert delete_response.status_code == 200
    assert delete_response.json()["message"] == "Letalo deleted successfully"

    # Verify deletion
    get_response = client.get("/pridobiLetala/")
    assert get_response.status_code == 200
    letalos = get_response.json()
    assert not any(letalo["idLetalo"] == created_letalo["idLetalo"] for letalo in letalos)

def test_update_non_existent_letalo():
    non_existent_id = 9999
    update_data = {
        "ime_letala": "Non-existent Letalo",
        "tip": "Tip",
        "registrska_st": "NONEXIST123",
        "Polet_idPolet": 1
    }
    response = client.put(f"/letalo/{non_existent_id}", json=update_data)
    assert response.status_code == 404
    assert response.json()["detail"] == "Letalo not found"

def test_delete_non_existent_letalo():
    non_existent_id = 9999
    response = client.delete(f"/letalo/{non_existent_id}")
    assert response.status_code == 404
    assert response.json()["detail"] == "Letalo not found"

def test_create_letalo_validation_error():
    invalid_data = {
        "ime_letala": "Invalid Letalo",
        "registrska_st": "INVALID123",
        "Polet_idPolet": 1
    }
    response = client.post("/dodajLetalo/", json=invalid_data)
    assert response.status_code == 422  
    assert "tip" in response.json()["detail"][0]["loc"]