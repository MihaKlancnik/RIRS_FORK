from fastapi import APIRouter, HTTPException
from core.database import get_connection
from models.schemas import Pilot
from typing import List

router = APIRouter()

@router.post("/dodajPilota/", response_model=Pilot)
def create_pilot(pilot: Pilot):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO Pilot (ime, priimek) 
            VALUES (?, ?)''', 
            (pilot.ime, pilot.priimek))
        conn.commit()
        pilot.idPilot = cursor.lastrowid
    return pilot

@router.get("/pridobiPilote/", response_model=List[Pilot])
def read_pilots():
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Pilot")
        rows = cursor.fetchall()
        return [Pilot(**dict(row)) for row in rows]

@router.delete("/pilot/{idPilot}", response_model=dict)
def delete_pilot(idPilot: int):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM Pilot WHERE idPilot = ?", (idPilot,))
        conn.commit()
    return {"message": "Pilot deleted successfully"}

@router.put("/pilot/{idPilot}", response_model=Pilot)
def update_pilot(idPilot: int, updated_pilot: Pilot):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE Pilot 
            SET ime = ?, priimek = ? 
            WHERE idPilot = ?''', 
            (updated_pilot.ime, updated_pilot.priimek, idPilot))
        conn.commit()
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Pilot not found")
    updated_pilot.idPilot = idPilot
    return updated_pilot
