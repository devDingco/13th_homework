export default function Header({ h1, p }) {
  return (
    <div className="p-8 bg-white border-b">
      <h1 className="text-2xl font-bold text-gray-900">{h1}</h1>
      <p className="mt-2 text-gray-600">{p}</p>
    </div>
  );
}
