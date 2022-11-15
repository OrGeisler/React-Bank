sql_insert_transactions =    """
                           INSERT IGNORE into transactions (amount,category,vendor) 
                           values (%s,%s,%s)
                           """

sql_select_all_transactions =    """
                                SELECT *
                                From transactions
                                """
                        
sql_delete_transaction =    """
                            DELETE FROM transactions 
                            WHERE id = %s
                            """

sql_breakdown_transaction =     """
                                SELECT transactions.category , SUM(transactions.amount) AS amount
                                From transactions
                                GROUP BY transactions.category
                                """