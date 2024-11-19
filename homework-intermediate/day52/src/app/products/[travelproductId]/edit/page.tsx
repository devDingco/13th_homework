'use client';

import { FetchTravelproductDocument } from '@/commons/graphql/graphql';
import ProductWrite from '@/components/products-write';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export default function ProductsEditPage() {
	const params = useParams();
	const { data } = useQuery(FetchTravelproductDocument, {
		variables: { travelproductId: String(params.travelproductId) },
	});

	return (
		<>
			<ProductWrite isEdit={true} data={data} />
		</>
	);
}
