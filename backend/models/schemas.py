from pydantic import BaseModel

class QueryRequest(BaseModel):
    query: str

class ContactRequest(BaseModel):
    sender: str
    message: str