sql_insert_transactions =    """
                           INSERT IGNORE into transactions (amount,category,vendor,type) 
                           values (%s,%s,%s,%s)
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

sql_balance_transactions =     """
                                SELECT IFNULL(SUM(t.amount),0)-(SELECT IFNULL(SUM(j.amount),0)
                                                                FROM `bank`.`transactions` AS j
                                                                WHERE j.type = 'withdraw') AS sum
                                FROM `bank`.`transactions` AS t
                                WHERE t.type = 'deposit'
                                """