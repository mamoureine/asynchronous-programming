const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function iterateWithAsyncAwait(values) {
  for (let index = 0; index < values.length; index += 1) {
    console.log(values[index]);

    if (index < values.length - 1) {
      await delay(1000);
    }
  }
}

function simulatedApiCall(shouldFail = false) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("The simulated API request failed."));
        return;
      }

      resolve({ message: "Data fetched successfully." });
    }, 1000);
  });
}

async function awaitCall(shouldFail = false) {
  try {
    const data = await simulatedApiCall(shouldFail);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Sorry, we couldn't load the data. Please try again.");
    return null;
  }
}

async function chainedAsyncFunctions() {
  const firstStep = async () => {
    await delay(1000);
    console.log("First step complete.");
  };
  const secondStep = async () => {
    await delay(1000);
    console.log("Second step complete.");
  };
  const thirdStep = async () => {
    await delay(1000);
    console.log("Third step complete.");
  };

  await firstStep();
  await secondStep();
  await thirdStep();
}

async function concurrentRequests() {
  const results = await Promise.all([
    simulatedApiCall().then((data) => ({ request: "first", data })),
    simulatedApiCall().then((data) => ({ request: "second", data })),
  ]);

  console.log(results);
  return results;
}

async function parallelCalls(urls) {
  const responses = await Promise.all(
    urls.map(async (url) => {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed for ${url}: ${response.status}`);
      }

      return response.json();
    }),
  );

  console.log(responses);
  return responses;
}
