type Props = {
    message: string
    role: "user" | "ai"
  }
  
  const ChatBubble = ({ message, role }: Props) => {
  
    const isUser = role === "user"
  
    return (
      <div
        className={`max-w-xl px-5 py-3 rounded-xl mb-4 ${
          isUser
            ? "ml-auto bg-cyan-500 text-black"
            : "mr-auto bg-white/10 backdrop-blur-md"
        }`}
      >
        {message}
      </div>
    )
  }
  
  export default ChatBubble