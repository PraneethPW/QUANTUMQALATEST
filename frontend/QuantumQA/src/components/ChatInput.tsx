import { useState } from "react"

type Props = {
  onSend: (q: string) => void
}

const ChatInput = ({ onSend }: Props) => {

  const [text, setText] = useState("")

  const submit = () => {
    if (!text.trim()) return
    onSend(text)
    setText("")
  }

  return (
    <div className="flex gap-4 mt-6">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask a quantum question..."
        className="flex-1 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 outline-none"
      />

      <button
        onClick={submit}
        className="bg-cyan-400 text-black px-6 rounded-xl hover:scale-105 transition"
      >
        Ask
      </button>

    </div>
  )
}

export default ChatInput