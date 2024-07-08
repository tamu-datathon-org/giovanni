import Markdown from "markdown-to-jsx"
import getPostMetaData from "~/app/utils/getPostMetadata"
import React from "react"
import fs from 'fs'
import matter from "gray-matter"

function getPostContent(slug: any){
    const folder = 'src/datathonblogtopics/'
    const file = folder + `${slug}.md`
    const content = fs.readFileSync(file, 'utf8')

    const matterResult = matter(content)
    return matterResult
}

export const generateStaticParams = async () => {
    const posts = getPostMetaData('src/datathonblogtopics')
    return posts.map((post) => ({slug: post.slug}))
}

export async function generateMetadata({params}){
    //maybe error here lowkey
    const id = params?.slug ? '.' + params?.slug: ''
    return {
        title: `The Daily Datathon ${id.replaceAll('_',' ')}`
    }
}

export default function mainBlogPage(props: { params: { slug: any } }){

    const slug = props.params.slug
    const post = getPostContent(slug)
    console.log(post)
    return (
        <main>
            <article>
                <Markdown>
                    {post.content}
                </Markdown>
            </article>
        </main>
    )
}