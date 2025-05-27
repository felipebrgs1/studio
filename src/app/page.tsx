import PostCard from '@/components/PostCard';
import type { Post } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

async function getPosts(): Promise<Post[]> {
    try {
        // Add a small delay to simulate network latency for loading states if needed, but not for production.
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                next: { revalidate: 3600 }, // Revalidate every hour (3600 seconds)
            },
        );
        if (!response.ok) {
            console.error(
                `Failed to fetch posts: ${response.status} ${response.statusText}`,
            );
            return []; // Return empty array on HTTP error
        }
        return await response.json();
    } catch (error) {
        console.error('Network or other error fetching posts:', error);
        return []; // Return empty array on network or other errors
    }
}

export default async function HomePage() {
    const posts = await getPosts();

    return (
        <main className='min-h-screen flex flex-col'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow'>
                <header className='mb-8 sm:mb-12 text-center'>
                    <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-foreground'>
                        Scroll <span className='text-primary'>Insights</span>
                    </h1>
                    <p className='mt-3 text-md sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
                        Discover a collection of captivating posts. Click on any
                        card to learn more (and trigger a GA event!).
                    </p>
                </header>

                <Separator className='my-8 sm:my-12 bg-border' />

                {posts.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post}
                            />
                        ))}
                    </div>
                ) : (
                    <Alert
                        variant='default'
                        className='max-w-lg mx-auto'
                    >
                        <AlertCircle className='h-4 w-4' />
                        <AlertTitle>No Posts Found</AlertTitle>
                        <AlertDescription>
                            We couldn&apos;t retrieve any posts at the moment.
                            Please try again later.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <footer className='py-6 text-center text-sm text-muted-foreground border-t border-border'>
                <p>
                    &copy; {new Date().getFullYear()} Scroll Insights. All
                    rights reserved.
                </p>
            </footer>
        </main>
    );
}
