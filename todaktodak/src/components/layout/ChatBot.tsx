import { MessageSquare } from "lucide-react";

export default function ChatBot() {
  return (
    <button className="fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700">
      <MessageSquare className="w-6 h-6" />
    </button>
  );
}
