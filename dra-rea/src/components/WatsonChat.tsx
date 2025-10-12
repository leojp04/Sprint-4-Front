

import { useEffect } from 'react'

declare global {
  interface Window {
    watsonAssistantChatOptions: any
  }
}

export default function WatsonChat() {
  useEffect(() => {

    window.watsonAssistantChatOptions = {
      integrationID: "1a5dfbed-4256-44e1-b454-a29ab50cfbbd", 
      region: "au-syd", 
      serviceInstanceID: "9d12ace1-663f-4148-a73a-ba4bf3ecd704", 
      onLoad: async (instance: any) => { await instance.render() }

    }


    const already = document.getElementById('watson-chat-script')
    if (!already) {
      setTimeout(function () {
        const t = document.createElement('script')
        t.id = 'watson-chat-script'
        t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
          ((window.watsonAssistantChatOptions && window.watsonAssistantChatOptions.clientVersion) || 'latest') +
          "/WatsonAssistantChatEntry.js"
        document.head.appendChild(t)
      }, 0)
    }

    return () => {} 
  }, [])

  return null
}
