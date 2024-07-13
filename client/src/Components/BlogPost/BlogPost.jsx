import React from 'react';
import { Link } from 'react-router-dom';
import './BlogPost.scss';

const BlogPost = ({ id, title, date, content, imageData, isPreview = true }) => {
    const previewContent = content.split(' ').slice(0, 30).join(' ') + '...';

    return (
        <div className="blog-post">
            <h2 className="blog-post__title">{title}</h2>
            {imageData && <img src={imageData} alt={title} className="blog-post__image" />}
            <p className="blog-post__date">{date}</p>
            <p className="blog-post__content">
                {isPreview ? previewContent : content}
            </p>
            {isPreview && <Link to={`/post/${id}`}>Continue Reading...</Link>}
        </div>
    );
};

export default BlogPost;