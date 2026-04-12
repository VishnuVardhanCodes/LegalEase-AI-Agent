export async function analyzeDocument(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "http://localhost:8000/api/analyze",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;

  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
}
