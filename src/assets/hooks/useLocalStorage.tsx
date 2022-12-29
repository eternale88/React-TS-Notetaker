import { useEffect, useState } from 'react'

const useLocalStorage = <T extends unknown>(
  key: string,
  initialValue: T | (() => T)
) => {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key)
    //check if value exists yet
    //doesn't exist
    if (jsonValue == null) {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    } else {
      //if exists return values
      return JSON.parse(jsonValue)
    }
  })

  // save data in local storage every time key or value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage
