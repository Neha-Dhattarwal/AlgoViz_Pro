
from pydantic import ConfigDict, BaseModel, Field
from typing import Optional, List, Dict, Any, Annotated
from pydantic.functional_validators import BeforeValidator

PyObjectId = Annotated[str, BeforeValidator(str)]

class VisualizationStepModel(BaseModel):
    """
    Internal database model for an algorithm execution step.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    problem_id: PyObjectId = Field(...)
    step_number: int = Field(...)
    explanation: str = Field(...)
    variables: Dict[str, Any] = Field(default_factory=dict)
    array: List[int] = Field(default_factory=list)
    highlights: List[int] = Field(default_factory=list, description="Indices to highlight in the UI")
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "problem_id": "60d5ecb8b392d00015b6d9e1",
                "step_number": 1,
                "explanation": "Initialize i=0 and start scanning the array.",
                "variables": {"i": 0, "j": 1},
                "array": [5, 2, 8, 1, 9],
                "highlights": [0, 1]
            }
        },
    )
