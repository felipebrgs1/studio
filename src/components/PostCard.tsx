'use client';

import type { Post } from '@/lib/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { event as gaEvent } from '@/lib/ga';
import { GA_TRACKING_ID } from '@/lib/config';

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const handleCardClick = () => {
        console.log('👆 [GA Debug] Card clicked:', post.title, 'ID:', post.id);
        if (GA_TRACKING_ID) {
            gaEvent({
                action: 'card_click',
                category: 'Blog Post',
                label: post.title,
                value: post.id,
            });
        } else {
            console.warn(
                '⚠️ [GA Debug] GA_TRACKING_ID not found - event not sent',
            );
        }
        // Placeholder for navigation or other actions
        // console.log(`Card clicked: ${post.title}, ID: ${post.id}`);
    };

    return (
        <Card
            className='flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
            onClick={handleCardClick}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                }
            }}
            role='button' // Changed from group to button for better accessibility semantics
            tabIndex={0} // Make it focusable and interactive
            aria-label={`Read more about ${post.title}`}
        >
            <CardHeader className='pb-4'>
                <CardTitle className='text-xl font-semibold leading-tight group-hover:text-primary transition-colors'>
                    {post.title}
                </CardTitle>
                <CardDescription className='text-xs pt-1'>
                    Post ID: {post.id} / User ID: {post.userId}
                </CardDescription>
            </CardHeader>
            <CardContent className='flex-grow'>
                <p className='text-sm text-muted-foreground line-clamp-4'>
                    {post.body}
                </p>
            </CardContent>
        </Card>
    );
}
