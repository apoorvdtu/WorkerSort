# WorkerSort

**A JavaScript library for sorting large arrays using Web Workers without blocking the main UI thread.**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install WorkerSort using npm:

```bash
npm install workersort
```

## Usage

To use WorkerSort in your project, follow these steps:

```javascript
import { sortArrayWithWorkers } from "workersort";

const arrayToSort = [5, 3, 8, 1, 2];
const comparator = (a, b) => a - b;

sortArrayWithWorkers(arrayToSort, comparator)
  .then((sortedArray) => {
    console.log("Sorted Array:", sortedArray);
  })
  .catch((error) => {
    console.error("Error sorting array:", error);
  });
```

## Features

- **Non-blocking**: Utilizes Web Workers to sort large arrays without blocking the main UI thread, ensuring smooth user experiences.
- **Efficient sorting**: Sorts large arrays in parallel, leveraging the capabilities of multi-core processors.
- **Custom comparator support**: Allows for flexible sorting using custom comparison functions.
- **Automatic worker management**: Handles the lifecycle of workers and merging of sorted results seamlessly.
- **Optimized performance**: Efficiently manages data processing through chunking.

## API Reference

### `sortArrayWithWorkers(array, comparator)`

Sorts an array using Web Workers.

#### Parameters

- `array`: The array to be sorted.
- `comparator`: A function that defines the sorting order.

#### Returns

- A promise that resolves to the sorted array.

#### Example

```javascript
const sortedArray = await sortArrayWithWorkers(array, (a, b) => a - b);
```

## Contributing

We welcome contributions to WorkerSort! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the ISC License.
