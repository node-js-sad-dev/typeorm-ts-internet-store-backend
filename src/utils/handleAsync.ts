export async function handleAsync<T>(promise: Promise<T>) {
  try {
    const result = await promise;
    return { result };
  } catch (error) {
    console.log(error);
    return { error: error?.toString() || "Unhandled error" };
  }
}
