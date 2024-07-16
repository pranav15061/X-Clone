import Post from "./Post";
import PostSkeleton from "../skeletons/PostSkeleton";
// import { POSTS } from "../../utils/db/dummy";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";


const Posts = ({feedType,username,userId}) => {
	
	// const isLoading=false;

	const getPostEndpoint = () => {
		switch (feedType) {
			case "forYou":
				return "/posts/all";
			case "following":
				return "/posts/following";
			case "posts":
				return `/posts/user/${username}`;
			case "likes":
				return `/posts/likes/${userId}`;	
			default:
				return "/posts/all";
		}
	};

	let POST_ENDPOINT = getPostEndpoint();
    POST_ENDPOINT="http://localhost:5000"+POST_ENDPOINT;
	// console.log(POST_ENDPOINT);


	const { data: posts,isLoading,refetch,isRefetching,} = useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			try {
				
				const token = localStorage.getItem("token");
				const res = await fetch(POST_ENDPOINT, {
					method: "GET",
					headers: {
					  Authorization: `Bearer ${token}`,
					},
				  });
				const data = await res.json();

				if (!res.ok) {
					throw new Error(data.error || "Something went wrong");
				}

				return data;
			} catch (error) {
				throw new Error(error);
			}
		},
	});

	useEffect(() => {
		refetch();
	}, [feedType, refetch,username]);


	return (
		<>
			{(isLoading || isRefetching) && (
				<div className='flex flex-col justify-center'>
					<PostSkeleton />
					<PostSkeleton />
					<PostSkeleton />
				</div>
			)}
			{!isLoading && !isRefetching && posts?.length === 0 && <p className='text-center my-4'>No posts in this tab. Switch 👻</p>}
			{!isLoading && !isRefetching && posts && (
				<div>
					{posts.map((post) => (
						<Post key={post._id} post={post} />
					))}
				</div>
			)}
		</>
	);
};
export default Posts;