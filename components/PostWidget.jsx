import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

import { graphCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        if (slug) {
            getSimilarPosts(categories, slug).then((result) => {
                setRelatedPosts(result);
            });
        } else {
            getRecentPosts().then((result) => {
                setRelatedPosts(result);
            });
        }
    }, [slug]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">{slug ? 'Related Posts' : 'Recent Posts'}</h3>
            {relatedPosts.map((post, index) => (
                <div key={index} className="flex items-center w-full mb-4">
                    <div className="w-16 flex-none">
                        <Image
                            loader={graphCMSImageLoader}
                            alt={post.title}
                            height="90px"
                            width="90px"
                            unoptimized
                            className="flex-auto rounded-lg"
                            src={post.featuredImage.url}
                        />
                    </div>
                    <div className="flex-grow ml-4 transition duration-300 ease hover:text-pink-600 cursor-pointer">
                        <p className="text-gray-500 font-xs cursor-default">{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                        <Link href={`/post/${post.slug}`} className="text-md " key={index}>{post.title}</Link>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostWidget;
