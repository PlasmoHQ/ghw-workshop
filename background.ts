import tldr from "wikipedia-tldr"

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Quick Wiki Lookup For "%s"',
    contexts: ["selection"],
    id: "myContextMenuId"
  })
})

type WikiTldrThumbnail = {
  source: string
  width: number
  height: number
}

export type WikiTldr = {
  query: string
  type: string
  title: string
  displaytitle: string
  thumbnail: WikiTldrThumbnail
  originalimage: WikiTldrThumbnail
  lang: string
  description: string
  extract: string
  extract_html: string
}

export type WikiMessage = {
  type: string
  text: WikiTldr
}

chrome.contextMenus.onClicked.addListener(async function (info, tab) {
  const tldrText = await tldr(info.selectionText)
  chrome.tabs.sendMessage(tab.id, {
    type: "lookup",
    text: tldrText
  } as WikiMessage)
})
