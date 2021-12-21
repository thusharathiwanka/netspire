export default {
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "src",
			title: "Source",
			type: "url",
		},
		{
			name: "category",
			title: "Category",
			type: "string",
		},
		{
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "userId",
			title: "User ID",
			type: "string",
		},
		{
			name: "postedBy",
			title: "Posted By",
			type: "postedBy",
		},
		{
			name: "save",
			title: "Save",
			type: "array",
			of: [{ type: "save" }],
		},
		{
			name: "comments",
			title: "Comments",
			type: "array",
			of: [{ type: "comment" }],
		},
	],
};
