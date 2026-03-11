import pandas as pd

INPUT = "../data/sheets/providers.csv"
OUTPUT = "../data/sheets/providers_clean.csv"

df = pd.read_csv(INPUT)

df.columns = df.columns.str.strip()

df["province"] = df["province"].str.title()
df["city"] = df["city"].str.title()
df["provider_name"] = df["provider_name"].str.strip()

df = df.drop_duplicates(subset=["provider_name", "city"])

df.to_csv(OUTPUT, index=False)

print("Clean dataset generated:", OUTPUT)