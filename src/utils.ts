// the date in time will be help-full for a cursor based pagination the random will help for the unique id
export const getUniqueId = () => new Date().getTime() + Math.random();

export async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }