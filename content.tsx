import cssText from "data-text:~/style.css"
import { useEffect, useState } from "react"

import type { WikiMessage, WikiTldr } from "~background"

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

function IndexPopup() {
  const [wikiTldr, setWikiTldr] = useState<WikiTldr>(null)

  useEffect(() => {
    chrome.runtime.onMessage.addListener(function ({
      type,
      text
    }: WikiMessage) {
      setWikiTldr(text)
      return true
    })
  }, [])

  return (
    <div>
      <div className="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Wikipedia TLDR
        </h1>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">
          {wikiTldr && wikiTldr["title"]}
        </h2>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {wikiTldr && wikiTldr["extract"]}
        </p>
      </div>
    </div>
  )
}

export default IndexPopup
