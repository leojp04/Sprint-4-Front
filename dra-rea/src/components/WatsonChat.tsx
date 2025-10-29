import { useEffect } from 'react'

type WatsonAssistantInstance = {
  render: () => Promise<void> | void
}

type WatsonAssistantChatOptions = {
  integrationID: string
  region: string
  serviceInstanceID: string
  clientVersion?: string
  onLoad: (instance: WatsonAssistantInstance) => Promise<void> | void
}

declare global {
  interface Window {
    watsonAssistantChatOptions?: WatsonAssistantChatOptions
  }
}

export default function WatsonChat() {
  useEffect(() => {
    window.watsonAssistantChatOptions = {
      integrationID: '1a5dfbed-4256-44e1-b454-a29ab50cfbbd',
      region: 'au-syd',
      serviceInstanceID: '9d12ace1-663f-4148-a73a-ba4bf3ecd704',
      onLoad: async (instance) => {
        await instance.render()
      }
    }

    const existingScript = document.getElementById('watson-chat-script')
    if (!existingScript) {
      setTimeout(() => {
        const script = document.createElement('script')
        script.id = 'watson-chat-script'
        const base = 'https://web-chat.global.assistant.watson.appdomain.cloud/versions/'
        const version = window.watsonAssistantChatOptions?.clientVersion ?? 'latest'
        script.src = `${base}${version}/WatsonAssistantChatEntry.js`
        document.head.appendChild(script)
      }, 0)
    }
  }, [])

  return null
}

