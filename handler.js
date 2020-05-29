import algolia from "algoliasearch";

const client = algolia("6HPJ3XEDR8", process.env.ALGOLIA_API_KEY);
const clientIndex = client.initIndex("test_POSTS");

("use strict");

export const indexPost = async (event, context, callback) => {
	const requestBody = JSON.parse(event.body);

	const post = {
		id: requestBody.entity.id,
		title: requestBody.entity.attributes.title,
		excerpt: requestBody.entity.attributes.excerpt,
		date: requestBody.entity.attributes.date,
		slug: requestBody.entity.attributes.slug,
		created_at: requestBody.entity.attributes.created_at,
	};

	try {
		await clientIndex.saveObject(post, {
			autoGenerateObjectIDIfNotExist: true,
		});
	} catch (e) {
		console.log(e);
		console.log("ERROR ALGOLIA");
	}

	const response = {
		statusCode: 204,
	};

	return response;
};
