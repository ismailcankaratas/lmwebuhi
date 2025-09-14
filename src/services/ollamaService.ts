import axios from 'axios'

export interface OllamaModel {
  name: string
  size: number
  digest: string
  modified_at: string
}

export interface OllamaGenerateRequest {
  model: string
  prompt: string
  stream?: boolean
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    repeat_penalty?: number
  }
}

export interface OllamaChatRequest {
  model: string
  messages: Array<{
    role: 'user' | 'assistant' | 'system'
    content: string
  }>
  stream?: boolean
  options?: {
    temperature?: number
    top_p?: number
    top_k?: number
    repeat_penalty?: number
  }
  think?: boolean
}

export interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

class OllamaService {
  private baseURL: string
  private isConnected: boolean = false

  constructor(baseURL: string = 'http://localhost:11434') {
    this.baseURL = baseURL
  }

  async checkConnection(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/api/version`, {
        timeout: 5000,
      })
      this.isConnected = response.status === 200
      return this.isConnected
    } catch (error) {
      this.isConnected = false
      return false
    }
  }

  async getModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`)
      return response.data.models || []
    } catch (error) {
      console.error('Error fetching models:', error)
      throw new Error('Failed to fetch models. Make sure Ollama is running.')
    }
  }

  async generate(request: OllamaGenerateRequest): Promise<OllamaResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/api/generate`, request)
      return response.data
    } catch (error) {
      console.error('Error generating response:', error)
      throw new Error('Failed to generate response')
    }
  }

  async chat(request: OllamaChatRequest): Promise<OllamaResponse> {
    try {
      const response = await axios.post(`${this.baseURL}/api/chat`, request)
      return response.data
    } catch (error) {
      console.error('Error chatting:', error)
      throw new Error('Failed to chat')
    }
  }

  async *streamChat(request: OllamaChatRequest): AsyncGenerator<string, void, unknown> {
    try {
      const response = await fetch(`${this.baseURL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...request,
          stream: true,
          think: false,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (line.trim()) {
            try {
              const data = JSON.parse(line)
              if (data.message?.content) {
                yield data.message.content
              }
              if (data.done) {
                return
              }
            } catch (e) {
              // Skip invalid JSON lines
              continue
            }
          }
        }
      }
    } catch (error) {
      console.error('Error streaming chat:', error)
      throw new Error('Failed to stream chat')
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected
  }

  getBaseURL(): string {
    return this.baseURL
  }

  setBaseURL(url: string): void {
    this.baseURL = url
  }
}

export const ollamaService = new OllamaService()
