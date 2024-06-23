import PostCard from "~/app/_components/PostCard"
import getPostMetaData from "~/app/utils/getPostMetadata"

export default function DatathonBlogPage(){

    const postMetadata = getPostMetaData('src/datathonblogtopics')
    return(
        <main>
        <div className='postsContainer'>
            {postMetadata.map((post, postIndex) => {
                return (
                    <PostCard key={postIndex} post={post} />
                )
            })}
        </div>
        </main>
    )
}