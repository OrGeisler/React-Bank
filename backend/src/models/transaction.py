from dataclasses import dataclass

@dataclass
class Transaction:
    amount: int
    category: str
    vendor: str
    type: str