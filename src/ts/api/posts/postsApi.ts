import { PostEntity } from "../../models";

const baseUrl = 'http://localhost:8080';
const getPostsUri = () => `${baseUrl}/api/posts`;
const getPostUri = (id: number) => `${baseUrl}/api/posts/${id}`;

const mapToPosts = (posts: any[]): PostEntity[] => {
    return posts.map(mapToPost);
};

const mapToPost = (e)  => {
    return {
        id: e.id,
        date: e.date,
        title: e.title,
        author: e.author,
        text: e.text,
        tags: e.tags,
        imgUrl: e.imgUrl,
        status: e.status,
    };
};

const fetchPosts = (): Promise<PostEntity[]> => {
    return fetch(getPostsUri())
        .then((response) => {
            if (!response.ok) {
                alert(response.statusText);
            }
            return (response.json())
        })
        .then(mapToPosts);
}

const deletePost = (id: number): Promise<void> => {
    return fetch(getPostUri(id), {
        method: "DELETE",
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 404) {
                    alert("Post with id = " + id + " not found");
                } else alert(response.statusText);
            }
        });
};

const savePost = (post: PostEntity): Promise<any> => {
    let url: string;
    let method: string;

    if (post.id) {
        url = getPostUri(post.id);
        method = "PUT";
    } else {
        url = getPostsUri();
        method = "POST";
    }

    post.date = Date.now();
    return fetch(url, {
        method,
        body: JSON.stringify(post),
        headers: new Headers({
            "Content-type": "application/json",
        }),
    })
        .then((res: Response) => {
            if (!res.ok) {
                alert(res.statusText);
            }
            if (res.statusText !== "No Content")
                return (res.json())
            else
                return post;
        })
        .catch(err => console.log(err));

};

export const postsAPI = {
    fetchPosts,
    deletePost,
    savePost
};