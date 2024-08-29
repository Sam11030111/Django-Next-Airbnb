import Link from "next/link"

import { ConversationType } from "@/app/inbox/page"

interface ConversationProps {
  conversation: ConversationType;
  userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
  conversation,
  userId
}) => {
  const otherUser = conversation.users.find((user) => user.id != userId)

  return (
    <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
        <p className="mb-6 text-xl">{otherUser?.name}</p>
        <Link href={`/inbox/${conversation.id}`} className="text-airbnb-dark">
            Go to conversation
        </Link>
    </div>
  )
}

export default Conversation