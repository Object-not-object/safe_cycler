import { useState, useEffect } from 'react';

// useDebounce hook definition
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout when the value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run when value or delay changes

  return debouncedValue;
}

export default useDebounce;
