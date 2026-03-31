import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const allowedFiles = new Set(["providers.csv", "providers_clean.csv"]);

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> }
) {
  const { file } = await context.params;

  if (!allowedFiles.has(file)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const filePath = path.resolve(
    process.cwd(),
    "..",
    "..",
    "..",
    "data",
    "sheets",
    file
  );

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${file}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to read file" },
      { status: 500 }
    );
  }
}