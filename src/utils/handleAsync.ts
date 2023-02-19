export function handleAsync<T>(promise: Promise<T>): Promise<[T, null]>;

export function handleAsync<T>(promise: Promise<T>): Promise<[null, string]>;

export async function handleAsync<T>(
  promise: Promise<T>
): Promise<[T, null] | [null, string]> {
  try {
    return [await promise, null];
  } catch (e) {
    let errorMessage;

    if (e instanceof Error) errorMessage = e.message;
    else errorMessage = String(e);

    return [null, errorMessage];
  }
}
