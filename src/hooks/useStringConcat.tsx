import React from 'react'

export default function useStringConcat(longString: string) {
  const [shortenedString, setShortenedString] = React.useState<string>('');

  const trimString = (str: string, length: number) => {
      return str.length > length ? str.substring(0, length) + "..." : str;
  }

  React.useEffect(() => {
    if(longString) {
      setShortenedString(trimString(longString,10))
    }
  }, [])

  return shortenedString
}