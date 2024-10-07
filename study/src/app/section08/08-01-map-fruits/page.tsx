const FRUITS = [
  { id: 1, name: "Apple", price: 100 },
  { id: 2, name: "Banana", price: 200 },
  { id: 3, name: "Cherry", price: 300 },
  { id: 4, name: "Durian", price: 400 },
  { id: 5, name: "Elderberry", price: 500 },
];

export default function MapFruitsPage() {
  const result = FRUITS.map((fruit) => (
    <li key={fruit.id}>
      {fruit.name} - {fruit.price}
    </li>
  ));

  return (
    <div>
      <h1>Section 08: List and Keys</h1>
      <h2>Fruits</h2>
      {/* 유지보수 하기 어려운 방법 */}
      <ul>{result}</ul>

      {/* 유지보수 하기 좋은 방법 */}
      <ul>
        {FRUITS.map((fruit) => (
          <li key={fruit.id}>
            {fruit.name} - {fruit.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
