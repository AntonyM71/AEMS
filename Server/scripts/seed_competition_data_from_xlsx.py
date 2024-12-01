import argparse
from pathlib import Path

import pandas as pd

from app.competition_management.create_competition_from_xlsx import (
    process_competitors_df,
)

parser = argparse.ArgumentParser()
parser.add_argument(
    "--excel_file",
    help="Path to the Excel/CSV file containing competitor data",
    required=True,
    type=Path,
)
parser.add_argument(
    "--competition_name", help="Name of Competition to Create", required=True, type=str
)

args = parser.parse_args()
excel_path: Path = Path(args.excel_file)
print(f"Attempting to read file: {excel_path}")
if not excel_path.exists():
    print(f"File: {excel_path} does not exist")
    exit(1)
if excel_path.suffix == ".xlsx":
    competitors_df = pd.read_excel(excel_path)
elif excel_path.suffix == ".csv":
    competitors_df = pd.read_csv(excel_path)
else:
    print(f"File: {excel_path} must have suffix '.xlsx' or  '.csv'")
    exit(1)
process_competitors_df(
    competitors_df=competitors_df, competition_name=args.competition_name
)
