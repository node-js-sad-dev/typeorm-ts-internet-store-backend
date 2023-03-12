export async function handleAsync<T>(promise: Promise<T>) {
  try {
    const result = await promise;
    return { result };
  } catch (error) {
    const { code, detail } = error as unknown as Record<string, any>;

    let errorMessage = error?.toString();

    if (code) {
      switch (code) {
        case "23505":
          errorMessage = `Duplicate error. ${detail}`;
          break;

        default:
          errorMessage = `Unhandled error code. ${code}`;
      }
    }

    return { error: errorMessage };
  }
}
