export async function handleAsync<T>(
  promise: Promise<T>
): Promise<[T, undefined] | [undefined, string]> {
  try {
    return [await promise, undefined];
  } catch (e) {
    let errorMessage;

    if (e instanceof Error) errorMessage = e.message;
    else errorMessage = String(e);

    return [undefined, errorMessage];
  }
}
