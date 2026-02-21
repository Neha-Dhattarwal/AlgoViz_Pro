
from pydantic import ConfigDict, BaseModel, Field
from typing import Optional, Annotated
from pydantic.functional_validators import BeforeValidator

# Represents an ObjecID field in the database.
# It will be represented as a `str` in the model but stored as an `ObjectId` in MongoDB.
PyObjectId = Annotated[str, BeforeValidator(str)]

class ProblemModel(BaseModel):
    """
    Internal database model for a Coding Problem.
    """
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    title: str = Field(...)
    description: str = Field(...)
    optimized_code: str = Field(...)
    language: str = Field(default="python")
    difficulty: str = Field(...) # Easy, Medium, Hard
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "title": "Two Sum",
                "description": "Find two numbers that add up to a target.",
                "optimized_code": "def two_sum(nums, target): ...",
                "language": "python",
                "difficulty": "Easy"
            }
        },
    )
