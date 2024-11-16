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

if args.excel_file.suffix == ".xlsx":
    competitors_df = pd.read_excel(args.excel_file)
elif args.excel_file.suffix == ".csv":
    competitors_df = pd.read_csv(args.excel_file)
else:
    print(f"File: {args.excel_file} must have suffix '.xlsx>' or  'csv'")
    exit(1)
process_competitors_df(
    competitors_df=competitors_df, competition_name=args.competition_name
)
