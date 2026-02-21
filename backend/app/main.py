
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from typing import List, Dict, Any
import os
import json

app = FastAPI(title="AlgoViz Asset Server")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Robust path calculation relative to this file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS_BASE = os.path.join(BASE_DIR, "assets")
DB_FILE = os.path.join(BASE_DIR, "problems_db.json")

@app.get("/problems")
async def list_problems():
    """Aggregates problems from problems_db.json and metadata.json files."""
    problems = []
    
    # 1. Try to load from the static DB file first
    if os.path.exists(DB_FILE):
        try:
            with open(DB_FILE, "r") as f:
                problems = json.load(f)
        except Exception as e:
            print(f"Error loading problems_db.json: {e}")

    # 2. Overlay or add from assets/ folder if it exists
    if os.path.exists(ASSETS_BASE):
        for folder in os.listdir(ASSETS_BASE):
            folder_path = os.path.join(ASSETS_BASE, folder)
            if not os.path.isdir(folder_path):
                continue
                
            meta_path = os.path.join(folder_path, "metadata.json")
            if os.path.exists(meta_path):
                try:
                    with open(meta_path, "r") as f:
                        data = json.load(f)
                        if "id" not in data:
                            data["id"] = folder
                        
                        # Replace if exists in DB, otherwise append
                        existing_idx = next((i for i, p in enumerate(problems) if p["id"] == data["id"]), -1)
                        if existing_idx > -1:
                            problems[existing_idx] = data
                        else:
                            problems.append(data)
                except Exception as e:
                    print(f"Error loading metadata for {folder}: {e}")
                
    return problems

@app.get("/problems/{slug}/{asset_path:path}")
async def get_asset(slug: str, asset_path: str):
    """Serves specific files from a question folder."""
    full_path = os.path.join(ASSETS_BASE, slug, asset_path)
    
    if not os.path.exists(full_path):
        # If it's code, we might have it in the JSON DB
        if asset_path.startswith("code/"):
            if os.path.exists(DB_FILE):
                with open(DB_FILE, "r") as f:
                    db = json.load(f)
                    prob = next((p for p in db if p["id"] == slug), None)
                    if prob:
                        lang = "javascript" if ".js" in asset_path else "python" if ".py" in asset_path else "java"
                        return prob["code"].get(lang, "")

        raise HTTPException(status_code=404, detail=f"Asset {asset_path} not found")
    
    if full_path.endswith(".json"):
        with open(full_path, "r") as f:
            return json.load(f)
    elif full_path.endswith(".md"):
        with open(full_path, "r") as f:
            return {"content": f.read()}
    
    return FileResponse(full_path)

@app.get("/health")
async def health_check():
    return {
        "status": "online", 
        "db_exists": os.path.exists(DB_FILE),
        "assets_exists": os.path.exists(ASSETS_BASE)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
