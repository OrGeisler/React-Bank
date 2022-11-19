from fastapi import FastAPI ,status
import uvicorn
from src.routes.transactions_route.transactions import transactions
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

origins = [
    'http://localhost:3000',
    "http://localhost:3001",
    "http://localhost:3000/transactions",
    "http://localhost:3000/balance"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(transactions)



@app.get('/sanity' , response_class= JSONResponse , status_code= status.HTTP_200_OK)
def root():
    return {"message":"Server is up and running"}



if __name__ == "__main__":
    uvicorn.run("server:app",host="localhost", port=8000,reload=True)
