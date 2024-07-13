//!BlogList.jsx:
//!This component fetches all blog posts from MongoDB via an API call.
//!It renders a list of BlogPost components, passing the data for each post as props.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogPost from '../BlogPost/BlogPost';
import './BlogList.scss';

const BlogList = ({ isPreview = true, limit = null }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log('Fetching posts...');
                const response = await axios.get('http://localhost:5050/api/posts');
                console.log('Fetched posts:', response.data);
                let sortedPosts = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                if (limit) {
                    sortedPosts = sortedPosts.slice(0, limit);
                }
                console.log('Posts to display:', sortedPosts);
                setPosts(sortedPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [limit]);

    return (
        <div className="blog-list">
            {posts.map(post => (
                <div key={post._id} className="blog-list__item">
                    <BlogPost
                        key={post._id}
                        id={post._id}
                        title={post.title}
                        date={new Date(post.date).toLocaleDateString()}
                        content={post.content}
                        imageData={post.imageData}
                        isPreview={isPreview}
                    />
                </div>
            ))}
        </div>
    );
};

export default BlogList;
