import { Link } from "react-router-dom";
import RightPanelSkeleton from "../skeletons/RightPanelSkeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFollow from "../../hooks/useFollow";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";

const RightPanel = () => {
	
	const { data: suggestedUsers, isLoading } = useQuery({
		queryKey: ["suggestedUsers"],
		queryFn: async () => {
			try {
				const token = localStorage.getItem("token");
				const res = await fetch("http://localhost:5000/users/suggested",
					{
						method: "GET",
						headers:{
							"Authorization":`Bearer ${token}`
						},
					}
				);

				const data = await res.json();
				if (!res.ok) {
					throw new Error(data.error || "Something went wrong!");
				}
				return data;
			} catch (error) {
				throw new Error(error.message);
			}
		},
	});

	// test
	


	const [testfoll,settestfoll]=useState([]);

	const test=async()=>{
		try {
			const token = localStorage.getItem("token");
			const res = await fetch("http://localhost:5000/users/followers",
				{
					method: "GET",
					headers:{
						"Authorization":`Bearer ${token}`
					},
				}
			);

			const data = await res.json();
			// console.log(data,"From Right")
			settestfoll(data);

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong!");
			}

			
	
		} catch (error) {

			console.log(error.message);
			throw new Error(error.message);

		}
		
	}



	useEffect(()=>{
		test()
		
	},[testfoll])
	

	// getfollowers

	const { follow, isPending } = useFollow();


	if (suggestedUsers?.length === 0) return <div className='md:w-64 w-0'></div>;

	return (
		<>
		<div className="d-flex">
		<div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Who to follow</p>
				<div className='flex flex-col gap-4'>
					{/* item */}
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						suggestedUsers?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
								<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => {
											e.preventDefault();
											follow(user._id);
										}}
									>
										{isPending ? <LoadingSpinner size='sm' /> : "Follow"}
									</button>
								</div>
							</Link>
						))}

				
				</div>
			</div>
		</div>	

		
		 <div className='hidden lg:block my-4 mx-2'>
			<div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
				<p className='font-bold'>Followers</p>
				<div className='flex flex-col gap-4'>
					
					{isLoading && (
						<>
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
							<RightPanelSkeleton />
						</>
					)}
					{!isLoading &&
						testfoll?.map((user) => (
							<Link
								to={`/profile/${user.username}`}
								className='flex items-center justify-between gap-4'
								key={user._id}
							>
								<div className='flex gap-2 items-center'>
									<div className='avatar'>
										<div className='w-8 rounded-full'>
											<img src={user.profileImg || "/avatar-placeholder.png"} />
										</div>
									</div>
									<div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{user.fullName}
										</span>
										<span className='text-sm text-slate-500'>@{user.username}</span>
									</div>
								</div>
								<div>
								<button
										className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
										onClick={(e) => {
											e.preventDefault();
											follow(user._id);
										}}
									>
										{isPending ? <LoadingSpinner size='sm' /> : "Unfollow"}
									</button>
								</div>
							</Link>
						))}

				
				</div>
			</div>
		</div> 


		
		</div>

		</>
	);
};
export default RightPanel;