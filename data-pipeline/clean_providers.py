from pathlib import Path
import pandas as pd

BASE_DIR = Path(__file__).resolve().parents[1]
INPUT = BASE_DIR / "data" / "sheets" / "providers.csv"
OUTPUT = BASE_DIR / "data" / "sheets" / "providers_clean.csv"

df = pd.read_csv(INPUT)

# limpiar nombres de columnas
df.columns = df.columns.str.strip()

# normalizar textos
df["province"] = df["province"].astype(str).str.strip().str.title()
df["city"] = df["city"].astype(str).str.strip().str.title()
df["provider_name"] = df["provider_name"].astype(str).str.strip()

# eliminar duplicados
df = df.drop_duplicates(subset=["provider_name", "city"])

# exportar dataset limpio
df.to_csv(OUTPUT, index=False)

print("Clean dataset generated:", OUTPUT)