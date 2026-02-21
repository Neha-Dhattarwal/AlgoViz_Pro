
from pydantic import BaseModel, Field
from typing import Optional

class ProblemBase(BaseModel):
    title: str
    description: str
    optimized_code: str
    language: str = "python"
    difficulty: str

class ProblemCreate(ProblemBase):
    """Schema for creating a new problem."""
    pass

class ProblemUpdate(BaseModel):
    """Schema for updating an existing problem."""
    title: Optional[str] = None
    description: Optional[str] = None
    optimized_code: Optional[str] = None
    language: Optional[str] = None
    difficulty: Optional[str] = None

class ProblemResponse(ProblemBase):
    """Schema for returning a problem to the client."""
    id: str

    class Config:
        from_attributes = True
