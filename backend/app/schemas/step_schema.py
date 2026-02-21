
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class StepBase(BaseModel):
    step_number: int
    explanation: str
    variables: Dict[str, Any] = {}
    array: List[int] = []
    highlights: List[int] = []

class StepCreate(StepBase):
    """Schema for creating a step. Problem ID is usually taken from the URL."""
    pass

class StepResponse(StepBase):
    """Schema for returning a step from the API."""
    id: str
    problem_id: str

    class Config:
        from_attributes = True

class VisualizationResponse(BaseModel):
    """Schema for the full visualization sequence of a problem."""
    total_steps: int
    steps: List[StepBase]
