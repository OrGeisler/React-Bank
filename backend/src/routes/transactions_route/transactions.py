from fastapi import APIRouter , status , Response ,Request
from ...models.transaction import Transaction
from fastapi.responses import JSONResponse
from ...models.exceptions import *
from ...db import querys 
from ...db.db_proxy import db_proxy 

db = db_proxy()
transactions = APIRouter()


@transactions.post('/transactions', response_class= JSONResponse , status_code= status.HTTP_201_CREATED)
def addTransaction(transaction: Transaction):
    print(transaction)
    id = db.execute_insert_query(querys.sql_insert_transactions,(transaction.amount,transaction.category,transaction.vendor)) 
    return {
            "success": True,
            "payload": { 
                        "id":id,
                        "amount": transaction.amount,
                        "category": transaction.category,
                        "vendor": transaction.vendor
                    }
            }

@transactions.get('/transactions',response_class= JSONResponse , status_code= status.HTTP_200_OK)
def getTransactions():
    transactions_list = db.execute_select_all_query(querys.sql_select_all_transactions)
    return transactions_list


@transactions.delete('/transactions/{id}', response_class= JSONResponse , status_code= status.HTTP_204_NO_CONTENT)
def deleteTransaction(id):
    db.execute_delete_query(querys.sql_delete_transaction,id)
    return status.HTTP_204_NO_CONTENT

@transactions.get('/breakdown',response_class= JSONResponse , status_code= status.HTTP_200_OK)
def breakdown():
    breakdown = db.execute_select_all_query(querys.sql_breakdown_transaction)
    return breakdown
