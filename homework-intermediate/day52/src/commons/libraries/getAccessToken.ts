import { gql, GraphQLClient } from 'graphql-request';

type RestoreAccessTokenResponse = {
	restoreAccessToken: {
		accessToken: string;
	};
};

const RESOTRE_ACCESS_TOKEN = gql`
	mutation restoreAccessToken {
		restoreAccessToken {
			accessToken
		}
	}
`;

export const getAccessToken = async () => {
	try {
		const graphQLClient = new GraphQLClient(
			'https://main-practice.codebootcamp.co.kr/graphql',
			{
				credentials: 'include',
			},
		);
		const result =
			await graphQLClient.request<RestoreAccessTokenResponse>(
				RESOTRE_ACCESS_TOKEN,
			);
		const newAccessToken = result.restoreAccessToken.accessToken;
		return newAccessToken;
	} catch (error) {
		if (error instanceof Error)
			console.log('🚀 ~ getAccessToken ~ error.message:', error.message);
	}
};
