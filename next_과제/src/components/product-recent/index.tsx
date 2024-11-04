import Image from "next/image";

export default function RecentViewProducts() {
  const recentProducts = [
    {
      id: 1,
      name: "상품1",
      image: "/images/img-1.png",
    },
    {
      id: 2,
      name: "상품2",
      image: "/images/img-2.png",
    },
    {
      id: 3,
      name: "상품3",
      image: "/images/img-3.png",
    },
  ];
  if (recentProducts) {
    return (
      <div className="fixed right-4 bottom-4 border rounded-lg p-2 flex flex-col justify-center gap-2 bg-white shadow-lg z-10">
        <h5 className="font-medium text-sm">최근 본 상품</h5>
        <ul className="flex flex-col gap-4">
          {recentProducts.map((product) => (
            <li
              key={product.id}
              className="w-16 h-16 overflow-hidden rounded-lg"
            >
              <Image
                className="object-cover"
                src={product.image}
                alt={product.name}
                width={72}
                height={72}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
